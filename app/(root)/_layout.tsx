import {useUser} from "@clerk/clerk-expo";
import {Redirect, Stack} from "expo-router";

const Layout = () => {
    const { isSignedIn, isLoaded } = useUser()
    if(!isLoaded) return null
    if(!isSignedIn) return <Redirect href={"/signIn"} />
    return (
        <Stack screenOptions={{headerShown: false}}></Stack>
    )
}

export default Layout
