import {Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {COLORS} from "@/constants/colors";

const SafeScreen = ({children} : any) => {
    const insets = useSafeAreaInsets();

    return (
        <View
        className="flex-1"
            style={{
                paddingTop: insets.top,
                backgroundColor: COLORS.background,
            }}
        >
            {children}
        </View>
    )
}

export default SafeScreen;
