import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {COLORS} from "@/constants/colors";
import {Ionicons} from "@expo/vector-icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function SignUp() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [pendingVerification, setPendingVerification] = React.useState(false)
    const [code, setCode] = React.useState('')
    const [error, setError] = React.useState('')

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                emailAddress,
                password,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setPendingVerification(true)
        } catch (err) {
            if((err as any).errors?.[0]?.code === 'form_identifier_exists') {
                setError('That email address is already in use. Please sign in instead.')
            } else {
                setError('An unexpected error occurred. Please try again.')
            }
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
                router.replace('/')
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    if (pendingVerification) {
        return (
            <View style={{
                backgroundColor: COLORS.background
            }} className="flex-1 p-5 justify-center items-center">
                <Text style={{
                    color: COLORS.text
                }} className="text-2xl font-bold m-5 text-center">Verify your email</Text>
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
                    style = {{
                        backgroundColor: COLORS.white,
                        borderColor: error? COLORS.expense : COLORS.border,
                        color: COLORS.text,
                    }}
                    className={`rounded-[12px] p-[15px] mb-4 border-[1px] text-[16px] w-full text-center tracking-[2px]`}
                    value={code}
                    placeholder="Enter your verification code"
                    placeholderTextColor="$9A8478"
                    onChangeText={(code) => setCode(code)}
                />
                <TouchableOpacity style={{
                    backgroundColor: COLORS.primary,
                }} className="rounded-xl p-4 align-center mt-[10px] mb-5"  onPress={onVerifyPress}>
                    <Text className="text-white font-[18px] font-semibold">Verify Email</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <KeyboardAwareScrollView style={{
            backgroundColor: COLORS.background,
        }} contentContainerStyle={{flexGrow: 1}} enableAutomaticScroll={true} enableOnAndroid={true} extraScrollHeight={100} className="flex-1">
            <View className="flex-1 p-5 items-center align-center justify-center" style={{
                backgroundColor: COLORS.background,
            }}>
                <Image
                    source={require("../../assets/images/revenue-i2.png")}
                    className="w-[300px] h-[310px] items-center"
                    style={{
                        resizeMode: 'contain',
                    }}
                />
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
                <Text style={{
                    color: COLORS.text
                }} className="text-2xl font-bold m-5 text-center">Create an account</Text>
                <TextInput
                    style={{
                        borderColor: error? COLORS.expense : COLORS.border,
                        color: COLORS.text,
                    }}
                    className="bg-white rounded-[12px] p-[15px] mb-4 border-[1px] text-[16px] w-full"
                    autoCapitalize="none"
                    placeholderTextColor="#9A8478"
                    value={emailAddress}
                    placeholder="Enter email"
                    onChangeText={(email) => setEmailAddress(email)}
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
                }} className="rounded-[12px] w-full p-4 items-center mt-[10px] mb-5" onPress={onSignUpPress}>
                    <Text style={{
                        color: COLORS.white,
                    }} className="text-[18px] font-[600]">Sign Up</Text>
                </TouchableOpacity>
                <View className="flex-row justify-center items-center gap-[8px]">
                    <Text className="text-[16px]" style={{
                        color: COLORS.text,
                    }}>Already have an account?</Text>
                    <TouchableOpacity onPress={()=> router.back()}>
                        <Text style={{
                            color: COLORS.primary
                        }} className="text-[16px] font-[600]">Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}
