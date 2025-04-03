import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { ToastConfigParams } from 'react-native-toast-message';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Types/types";
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '@/Redux/Thunks/authThunk';
import { clearError } from '@/Redux/Slice/authSlice';
import { RootState, AppDispatch } from '@/Redux/Store/store';
import EmailInput from '@/components/EmailInput';
import PasswordInput from '@/components/commonPassInput';
import CommonButton from '@/components/commonButton';
import { Toast, createToastConfig, showToast } from "@/utility/toastUtility";

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
}

export default function SignUpScreen({ navigation }: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

    const { theme } = useTheme();   

    // Clear error when component mounts or unmounts
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    // Show error toast when error state changes
    useEffect(() => {
        if (error) {
            showToast(error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            showToast('Registration successful!');
            setName('');
            setEmail('');
            setPassword('');
            navigation.navigate('Home');
        }
    }, [isAuthenticated, navigation]);

    const toastConfig = createToastConfig(theme)

    const togglePasswordVisibility = () => { setIsPasswordVisible(!isPasswordVisible) };

    const emailValidation = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const passValidation = (password: string): boolean => (password.length >= 6);

    const showToast = (message: string) => {
        Toast.show({
            type: 'customToast',
            text1: message,
            position: "bottom",
            visibilityTime: 2000,
        });
    };

    const handleSignUp = () => {
        if (!name || !email || !password) {
            showToast('Please fill all fields');
            return;
        }
        else if (!emailValidation(email)) {
            showToast("Invalid Email");
            return;
        }
        else if (!passValidation(password)) {
            showToast("Password must be at least 6 characters");
            return;
        }
        
        const userData = { name, email, password };
        dispatch(signUpUser(userData))
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.contentContainer}>
                    <Text style={[styles.title, { color: theme.textColor }]}>Create an account</Text>

                    <View style={styles.inputContainer}>
                        <Text style={[styles.inputLabel, { color: theme.textColor }]}>Name</Text>
                        <TextInput
                            style={[styles.input, {
                                backgroundColor: theme.inputBackground,
                                color: theme.textColor,
                                borderColor: theme.borderColor
                            }]}
                            placeholder='Name'
                            placeholderTextColor={theme.secondaryText}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <EmailInput
                        email={email}
                        setEmail={setEmail}
                        theme={theme}
                    />

                    <PasswordInput
                        password={password}
                        setPassword={setPassword}
                        theme={theme}
                    />

                    <CommonButton
                        onPress={handleSignUp}
                        title="Sign Up"
                        theme={theme}
                        style={styles.submitButton}
                        loading={isLoading}
                    />

                    <View style={styles.loginContainer}>
                        <Text style={{ color: theme.secondaryText }}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                            <Text style={{ color: theme.linkColor, fontWeight: 'bold' }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Toast config={toastConfig} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: -30
    },
    scrollContainer: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 30,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 40,
    },
    inputContainer: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,   
    },
    passwordContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        padding: 16,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 12,
        marginRight: 4,
    },
    submitButton: {
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 32,
        height: 56, // Fixed height to avoid jumping when showing loading indicator
        justifyContent: 'center',
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
        paddingBottom: 20,
    }
});