import { Stack } from "expo-router";
import "../global.css"
import SafeScreen from "@/components/safeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import {tokenCache} from "@clerk/clerk-expo/token-cache";
import {Slot} from "expo-router";
import {StatusBar} from "expo-status-bar";

const  RootLayout = () =>  {
  return (
      <ClerkProvider tokenCache={tokenCache}>
        <SafeScreen>
          <Slot />
        </SafeScreen>
          <StatusBar style='auto' />
      </ClerkProvider>
  );
}

export default RootLayout;
//testing to push master directly
