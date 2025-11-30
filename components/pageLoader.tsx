import {ActivityIndicator, Text, View} from "react-native";
import {COLORS} from "@/constants/colors";

const PageLoader = () => {
    return (
        <View className="flex-1 justify-center items-center" style={{
            backgroundColor: COLORS.background
        }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
    )
}

export default PageLoader
