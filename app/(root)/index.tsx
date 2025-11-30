import {SignedIn, SignedOut, useClerk, useUser} from '@clerk/clerk-expo'
import {Link, router, useFocusEffect, useRouter} from 'expo-router'
import {Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View} from 'react-native'
import {SignOutButton} from "@/components/signOutButton";
import {useTransactions} from "@/hooks/useTransactions";
import {useCallback, useEffect, useState} from "react";
import PageLoader from "@/components/pageLoader";
import {COLORS} from "@/constants/colors";
import {Ionicons} from "@expo/vector-icons";
import BalanceCard from "@/components/balanceCard";
import TransactionItem from "@/components/transactionItem";
import NoTransactionsFound from "@/components/noTransactionsFound";

export default function Page() {
    const { user } = useUser()
    const router = useRouter()
    const {transactions, summary, loading, loadData, deleteTransaction} = useTransactions(user?.id)
    const [refreshing, setRefreshing] =  useState(false);

    useFocusEffect(
        useCallback(()=> {
            if(user?.id) loadData()
        }, [loadData])
    )
    /*useEffect(()=> {
        console.log('rerender')
        if(user?.id) loadData()
    }, [])*/
    if(loading && !refreshing) return <PageLoader />
    console.log("SUMMARY", summary)
    const onRefresh= async ()=> {
        setRefreshing(true)
        await loadData()
        setRefreshing(false)
    }
    const handleDelete = (id: string) => {
         Alert.alert("Delete Transaction", "Are you sure you want to delete this item?", [
             {text: "Cancel", style: "cancel"},
             {text: "Delete", style: "destructive", onPress: ()=> deleteTransaction(id)},
         ])
    }
    return (
        <View className="flex-1" style={{
            backgroundColor: COLORS.background
        }}>
            <View className="p-5 pb-0">
                {/*Header*/}
                <View className="flex-row justify-between items-center mb-5 px-0 py-3">
                    {/*Left*/}
                    <View className="flex-1 flex-row items-center">
                        <Image source={require('../../assets/images/logo.png')} className="w-[75px] h-[75px]" resizeMode="contain"/>
                        <View className="flex-1">
                            <Text className="text-[14px] mb-[2px]" style={{
                                color: COLORS.textLight,
                            }}>Welcome,</Text>
                            <Text className="text-[16px] font-semibold" style={{
                                color: COLORS.text,
                            }}>
                                {user?.emailAddresses[0]?.emailAddress.split('@')[0]}
                            </Text>
                        </View>
                    </View>
                    {/*Right*/}
                    <View className="flex-row items-center gap-[12px]">
                        <TouchableOpacity className="px-4 py-[10px] rounded-3xl flex-row items-center" style={{
                            backgroundColor: COLORS.primary,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                        }} onPress={()=> router.push('/createScreen')}>
                            <Ionicons name="add" size={20} color="#fff" />
                            <Text className="font-semibold ml-1" style={{
                                color: COLORS.white,
                            }}>Add</Text>
                        </TouchableOpacity>
                        <SignOutButton />
                    </View>
                </View>
                <BalanceCard balance={summary.balance} income={summary.income} expense={summary.expense} />

                <View className="flex-row justify-between items-center mb-[10px] pb-[5px]">
                    <Text className="text-[18px] font-semibold mb-[15px] mt-[10px] flex-row items-center" style={{
                        color: COLORS.text
                    }}>Recent Transactions</Text>
                </View>
            </View>

            <FlatList
                className="flex-1 mx-5"
                contentContainerStyle={{
                    paddingBottom: 20,
                }}
                data={transactions}
                renderItem={(item)=> (
                    <TransactionItem item={item.item} onDelete={handleDelete} />
                )}
                ListEmptyComponent={<NoTransactionsFound />}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </View>
    )
}
