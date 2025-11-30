import {Text, View} from "react-native";
import {COLORS} from "@/constants/colors";

type SummaryProps = {
    balance: number,
    income: number,
    expense: number,
}
const BalanceCard = (summary: SummaryProps) => {
    return (
        <View className="rounded-[20px] p-5 mb-5" style={{
            backgroundColor: COLORS.card,
            shadowColor: COLORS.shadow,
            shadowOffset: {
                width: 0, height: 2
            },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 3,
        }}>
            <Text className="text-[16px] mb-2" style={{
                color: COLORS.textLight,
            }}>Total Balance</Text>

            <Text className="text-[32px] font-bold mb-5" style={{
                color: COLORS.text,
            }}>¥ {Intl.NumberFormat().format(summary.balance)}</Text>

            <View className="flex-row justify-between">
                <View className="flex-1 w-full items-center border-r-[1px]" style={{
                    borderColor: COLORS.border
                }}>
                    <Text className="text-[14px] mb-1" style={{
                        color: COLORS.textLight,
                    }}>Income</Text>
                    <Text className="text-[18px] font-semibold" style={{
                        color: COLORS.income
                    }}>+ ¥ {Intl.NumberFormat().format(parseInt(summary.income.toString()))}</Text>
                </View>
                {/*<View className="flex-1 items-center border-r-[1px]" style={{
                    borderColor: COLORS.border
                }}/>*/}
                <View className="flex-1 w-full items-center">
                    <Text className="text-[14px] mb-1" style={{
                        color: COLORS.textLight,
                    }}>Expenses</Text>
                    <Text className="text-[18px] font-semibold" style={{
                        color: COLORS.expense
                    }}>- ¥ {Intl.NumberFormat().format(parseInt(summary.expense.toString()))} </Text>
                </View>
            </View>
        </View>
    )
}

export default BalanceCard
