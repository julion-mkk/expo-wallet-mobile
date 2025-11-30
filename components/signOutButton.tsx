import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import {Alert, Text, TouchableOpacity} from 'react-native'
import {COLORS} from "@/constants/colors";
import {Ionicons} from "@expo/vector-icons";

export const SignOutButton = () => {
    // Use `useClerk()` to access the `signOut()` function
    const { signOut } = useClerk()
    const handleSignOut = async () => {
        Alert.alert("Logging out","Are you sure you want to log out?", [{
            text: 'Cancel',
            style: 'cancel'
        }, {
            text: "Log Out",
            style: "destructive",
            onPress: async () => {
                try {
                    await signOut()
                    // Redirect to your desired page
                    Linking.openURL(Linking.createURL('/signIn'))
                } catch (err) {
                    // See https://clerk.com/docs/custom-flows/error-handling
                    // for more info on error handling
                    console.error(JSON.stringify(err, null, 2))
                }
            }
        }
        ])
    }
    return (
        <TouchableOpacity className="p-[10px] rounded-[20px]" style={{
            backgroundColor: COLORS.card,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
        }} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
        </TouchableOpacity>
    )
}
