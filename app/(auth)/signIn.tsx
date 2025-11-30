import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {COLORS} from "@/constants/colors";
import {Ionicons} from "@expo/vector-icons";

export default function Page() {
    const { signIn, setActive, isLoaded } = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // Handle the submission of the sign-in form
    const onSignInPress = async () => {
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId })
                router.replace('/')
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            if ((err as any)?.errors?.[0]?.code !== "form_password_incorrect") {
                setError("An unexpected error occurred. Please try again.")
            } else {
                setError("Password is incorrect. Please try again.")
            }
        }
    }

    return (
        <KeyboardAwareScrollView style={{
            flex: 1
        }} contentContainerStyle={{
            flexGrow: 1,
        }} enableAutomaticScroll={true} enableOnAndroid={true} extraScrollHeight={30}>
            <View className="flex-1 items-center justify-center p-5" style={{
                backgroundColor: COLORS.background,
            }}>
                <Image source={require('../../assets/images/revenue-i4.png')} className="w-[300px] h-[300px] object-contain"/>

                <Text className="text-[32px] font-bold text-center" style={{
                    color: COLORS.text,
                    marginVertical: 15,
                }}>Welcome Back</Text>
                {error ? (
                    <View
                        style = {{
                            backgroundColor: "#FFE5E5",
                            borderLeftColor: COLORS.expense
                        }}
                        className="p-3 rounded-[8px] border-l-4 mb-4 flex-row align-center w-full">
                        <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
                        <Text style={{color: COLORS.text}} className="ml-2 flex-1 text-[14px]">{error}</Text>
                        <TouchableOpacity onPress={()=> setError("")}>
                            <Ionicons name="close" size={20} color={COLORS.textLight}/>
                        </TouchableOpacity>
                    </View>
                ) : null}
                <TextInput
                    style={{
                        borderColor: error? COLORS.expense : COLORS.border,
                        color: COLORS.text,
                    }}
                    className="bg-white rounded-[12px] p-[15px] mb-4 border-[1px] text-[16px] w-full"
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter email"
                    placeholderTextColor="$9A8478"
                    onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                />
                <TextInput
                    style={{
                        borderColor: error? COLORS.expense : COLORS.border,
                        color: COLORS.text,
                    }}
                    className="bg-white rounded-[12px] p-[15px] mb-4 border-[1px] text-[16px] w-full"
                    value={password}
                    placeholder="Enter password"
                    placeholderTextColor="#9A8478"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                <TouchableOpacity style={{
                    backgroundColor: COLORS.primary,
                }} className="rounded-[12px] w-full p-4 items-center mt-[10px] mb-5" onPress={onSignInPress}>
                    <Text style={{
                        color: COLORS.white,
                    }} className="text-[18px] font-[600]">Sign In</Text>
                </TouchableOpacity>
                <View className="flex-row justify-center items-center gap-[8px]">
                    <Text className="text-[16px]" style={{
                        color: COLORS.text,
                    }}>Don&apos;t have an account?</Text>
                    <Link href="/signUp" asChild>
                        <Text style={{
                            color: COLORS.primary
                        }} className="text-[16px] font-[600]">Sign up</Text>
                    </Link>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}
