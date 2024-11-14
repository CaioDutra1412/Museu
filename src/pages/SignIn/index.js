import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { AuthContext } from '../../contexts/auth';
import Logo from '../../images/museu64.png';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { siginIn, navigation } = useContext(AuthContext);

    const handleSignIn = () => {
        if (email !== '' && password !== '') {
            siginIn(email, password);
        }
    }

    const handleSignUp = () => {
        navigation.navigate('CADASTRO');
    }

    return (
        <View style={styles.Container}>
            <View style={styles.LogoArea}>
                <Image style={styles.Logo} source={Logo} />
            </View>
            <View style={styles.ContainerInput}>
                <View style={styles.InputArea}>
                    <Icon name='user' size={18} color='#FFFFFF' />
                    <TextInput style={styles.Input} placeholder='E-mail' placeholderTextColor='#FFFFFF' onChangeText={(value) => setEmail(value)} />
                </View>
                <View style={styles.InputArea}>
                    <Icon name='lock' size={18} color='#FFFFFF' />
                    <TextInput style={styles.Input} secureTextEntry={true} placeholder='Senha' placeholderTextColor='#FFFFFF' onChangeText={(value) => setPassword(value)} />
                </View>
            </View>
            <View style={styles.ButtonArea}>
                <TouchableOpacity style={styles.Button} onPress={() => handleSignIn()}>
                    <Text style={styles.TextButton}>LOGIN</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.RegisterArea}>
                <TouchableOpacity style={styles.RegisterButton} onPress={() => handleSignUp()}>
                    <Text style={styles.TextButtonRegister}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6495ED'
    },
    LogoArea: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 50
    },
    Logo: {
        tintColor: '#FFFFFF'
    },
    ContainerInput: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 50,
        marginBottom: 50
    },
    InputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '75%',
        padding: 10
    },
    Input: {
        borderBottomWidth: 1,
        borderColor: '#FFFFFF',
        width: '90%',
        marginLeft: 10,
        color: '#FFFFFF',
        fontSize: 20
    },
    ButtonArea: {
        width: '70%'
    },
    Button: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextButton: {
        color: '#696969',
        fontWeight: 'bold',
        fontSize: 20
    },
    RegisterArea: {
        marginTop: 50,
        marginBottom: 50
    },
    RegisterButton: {
    },
    TextButtonRegister: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold'
    }
})