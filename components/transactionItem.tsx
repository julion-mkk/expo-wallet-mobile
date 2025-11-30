import {Text, TouchableOpacity, View} from "react-native";
import {COLORS} from "@/constants/colors";
import {Ionicons} from "@expo/vector-icons";
import {formatDate} from "@/lib/utils";

const CATEGORY_ICONS : Record<string, string> = {
    "Food & Drinks" : 'fast-food',
    Shopping: 'cart',
    Transportation: 'car',
    Entertainment: 'film',
    Bills: 'receipt',
    Income: 'cash',
    Other: 'ellipsis-horizontal',
}

const getIcon = (category: string): string =>
    CATEGORY_ICONS[category] ?? 'pricetag-outline';

const TransactionItem = ({item, onDelete} : any) => {
    console.log('asdsss', item)
    //const iconName = CATEGORY_ICONS[item.category] || 'pricetag-outline' ;
    return (
        <View className="rounded-[12px] mb-[10px] flex-row items-center" style={{
            backgroundColor: COLORS.card,
            shadowColor: COLORS.shadow,
            shadowOffset: {
                width: 0, height: 1
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        }}>
            <TouchableOpacity className="flex-1 flex-row p-[15px] items-center" >
                <View className="w-[40px] h-[40px] rounded-[20px] bg-[#F5F5F5] justify-center items-center mr-3">
                    <Ionicons name={getIcon(item.category) as keyof typeof Ionicons.glyphMap} size={22} color={item.category === 'Income' ? COLORS.income : COLORS.expense} />
                </View>
                <View className="flex-1">
                    <Text className="text-[16px] font-medium mb-1" style={{
                        color: COLORS.text,
                    }}>{item.title}</Text>
                    <Text className="text-[14px]" style={{
                        color: COLORS.textLight,
                    }}>{item.category}</Text>
                </View>
                <View className="items-end">
                    <Text className="text-[16px] font-semibold mb-1" style={{
                        color: item.category === 'Income' ? COLORS.income : COLORS.expense
                    }}>{item.category === 'Income'? "+" : "-"} ¥{Intl.NumberFormat().format(Math.abs(parseInt(item.amount)))}</Text>
                    <Text className="text-[12px]" style={{
                        color: COLORS.textLight
                    }}>{formatDate(item.created_at)}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className="p-[15px] border-l" style={{
                borderLeftColor: COLORS.border,
            }} onPress={() => onDelete(item.id)}>
                <Ionicons name='trash-outline' size={20} color={COLORS.expense} />
            </TouchableOpacity>
        </View>
    )
}

export default TransactionItem
