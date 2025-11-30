import {ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import {useUser} from "@clerk/clerk-expo";
import {useState} from "react";
import {API_URL} from "@/constants/api";
import {COLORS} from "@/constants/colors";
import {Ionicons} from "@expo/vector-icons";

const CATEGORIES = [
    {id: "food", name: "Food & Drinks", icon: 'fast-food'},
    {id: "shopping", name: "Shopping", icon: 'cart'},
    {id: "transportation", name: "Transportation", icon: 'car'},
    {id: "entertainment", name: "Entertainment", icon: 'film'},
    {id: "bills", name: "Bills", icon: 'receipt'},
    {id: "income", name: "Income", icon: 'cash'},
    {id: "other", name: "Other", icon: 'ellipsis-horizontal'},
]

const createScreen = () => {
    const router = useRouter()
    const {user} = useUser()
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [isExpense, setIsExpense] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const handleCreate = async () => {
        if(!title.trim()) return Alert.alert('Error', 'Please enter a transaction title')
        if(!amount || isNaN(parseInt(amount)) || parseInt(amount) <= 0) return Alert.alert('Error', 'Please enter a valid amount')
        if(!selectedCategory) return Alert.alert('Error', 'Please select a category')
        setIsLoading(true)
        try {
            const response = await fetch(`${API_URL}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user?.id,
                    title: title.trim(),
                    amount: amount.trim(),
                    category: selectedCategory,
                }),
            })
            if(!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to create transaction')
            }
            Alert.alert("Success", "Transaction created successfully")
            router.back()
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to create transaction');
            console.log('Create Transaction Error:', error);
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <View className="flex-1" style={{
            backgroundColor: COLORS.background,
        }}>
            <View className="flex-row justify-between items-center p-5 border-b" style={{
                borderBottomColor: COLORS.border,
            }}>
                <TouchableOpacity className="p-[5px]" onPress={() => router.back()}>
                    <Ionicons name='arrow-back' size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text className="text-[18px] font-semibold" style={{
                    color: COLORS.text
                }}>New Transaction</Text>
                <TouchableOpacity onPress={handleCreate} disabled={isLoading} className="flex-row items-center gap-[4px]" style={{
                    opacity: isLoading ? 0.6 : 1,
                }}>
                    <Text className="text-[16px] font-semibold" style={{
                        color: COLORS.primary
                    }}>{isLoading? 'Saving...' : 'Save'}</Text>
                    {!isLoading && <Ionicons name='checkmark' size={18} color={COLORS.primary} />}
                </TouchableOpacity>
            </View>

            <View className="m-4 rounded-[16px] p-4" style={{
                backgroundColor: COLORS.card,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
            }}>
                <View className="flex-row mb-5 gap-[10px]">
                    <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 rounded-[25px] border" style={{
                        backgroundColor:isExpense? COLORS.primary :  COLORS.white,
                        borderColor: isExpense? COLORS.primary : COLORS.border,
                    }} onPress={()=> setIsExpense(true)}>
                        <Ionicons className="mr-2" name='arrow-down-circle' size={22} color={isExpense ? COLORS.white : COLORS.expense} />
                        <Text className="text-[16px] font-medium" style={{
                            color: isExpense ? COLORS.white : COLORS.text,
                        }}>
                            Expense
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 rounded-[25px] border" style={{
                        backgroundColor:!isExpense? COLORS.primary :  COLORS.white,
                        borderColor: !isExpense? COLORS.primary : COLORS.border,
                    }} onPress={()=> setIsExpense(false)}>
                        <Ionicons className="mr-2" name='arrow-up-circle' size={22} color={!isExpense? COLORS.white : COLORS.income} />
                        <Text className="ext-[16px] font-medium" style={{
                            color: !isExpense? COLORS.white : COLORS.text,
                        }}>
                            Income
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-row items-center border-b pb-4 mb-5" style={{
                    borderBottomColor: COLORS.border
                }}>
                    <Text className="text-[32px] font-bold mr-2" style={{
                        color: COLORS.text,
                    }} >¥</Text>
                    <TextInput
                        className="flex-1 text-[36px] font-bold" style={{
                            color: COLORS.text,
                    }}
                        placeholder='0'
                        placeholderTextColor={COLORS.textLight}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric" />
                </View>
                <View className="flex-row items-center border rounded-[12px] p-1 mb-5" style={{
                    borderColor: COLORS.border,
                    backgroundColor: COLORS.white
                }}>
                    <Ionicons name='create-outline' size={22} color={COLORS.textLight} className="mx-3"/>
                    <TextInput
                        className="flex-1 p-3 text-[16px]" style={{
                            color: COLORS.text,
                    }}
                        placeholder='Transaction Title'
                        placeholderTextColor={COLORS.textLight}
                        value={title}
                        onChangeText={setTitle} />
                </View>
                <Text className="text-[18px] font-semibold mb-[15px] mt-[10px] flex-row items-center" style={{
                    color: COLORS.text,
                }}>
                    <Ionicons name='pricetag-outline' size={16} color={COLORS.text} className="mr-2" /> Category
                </Text>
                <View className="flex-row flex-wrap gap-[10px]">
                    {CATEGORIES.map((category) => (
                        <TouchableOpacity key={category.id} className="flex-row items-center px-4 py-[10px] rounded-[20px] border" style={{
                            borderColor: selectedCategory === category.name? COLORS.primary : COLORS.border,
                            backgroundColor:selectedCategory === category.name? COLORS.primary : COLORS.white
                        }} onPress={()=> setSelectedCategory(category.name)}>
                            <Ionicons name={category.icon as any} size={20} color={selectedCategory === category.name? COLORS.white : COLORS.text} className="mr-[6px]" />
                            <Text className="text-[14px]" style={{
                                color: selectedCategory === category.name? COLORS.white : COLORS.text
                            }}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {isLoading && (
                <View className="p-5 items-center justify-center">
                    <ActivityIndicator size='large' color={COLORS.primary} />
                </View>
            )}
        </View>
    )
}

export default createScreen
