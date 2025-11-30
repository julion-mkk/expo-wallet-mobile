import {Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "@/constants/colors";
import {Ionicons} from "@expo/vector-icons";
import {useRouter} from "expo-router";

const NoTransactionsFound = () => {
    const router = useRouter()
    return (
        <View className="rounded-[16px] p-[30px] items-center justify-center mt-[10px]" style={{
            backgroundColor: COLORS.card,
            shadowColor: COLORS.shadow,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        }}>
            <Ionicons name="receipt-outline" size={60} color={COLORS.textLight} className="mb-4" />
            <Text className="text-[18px] font-semibold mb-8" style={{
                color: COLORS.text
            }}>No transactions yet</Text>
            <Text className="text-[14px] text-center mb-5 leading-5" style={{
                color: COLORS.textLight
            }}>Start tracking your finances by adding your first transaction</Text>
            <TouchableOpacity className="flex-row items-center py-[10px] px-4 rounded-[20px]" style={{
                backgroundColor: COLORS.primary,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2,
            }} onPress={()=> router.push("/createScreen")}>
                <Ionicons name='add-circle' size={18} color={COLORS.white} />
                <Text className="font-semibold ml-[6px]" style={{
                    color: COLORS.white
                }}>Add Transactions</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NoTransactionsFound;
