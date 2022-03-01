import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './LoginStyles';

function LoginScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    function onLoginIn() {

        if(email.length === 0){
            setErrorMessage("Please enter an email adress");
            return
        }
        if(password.length === 0){
            setErrorMessage("Please enter a password");
            return
        }

        console.log("Email: " + email + "  |  Password: " + password);

    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer} >
                <View style={styles.titleBox} >
                    <Text style={styles.title}>MINDER</Text>
                </View>
    
            </View>

            <View style={styles.inputContainer} >
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <View style={styles.buttonContainer} >
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onLoginIn()}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={{ color: '#FF0000', fontSize: 18 }}>{errorMessage}</Text>
            </View>
            
        </View>
    )
}

export default LoginScreen;