import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, Image, Alert, StyleSheet } from 'react-native';
import { supabase } from '../supabaseClient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  GroupDetails: { group: any };
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.log("Erro no login:", error);
        console.log("Mensagem de erro:", error.message);

        if (error.message.toLowerCase().includes("invalid login credentials")) {
          Alert.alert("Erro no login", "E-mail ou senha incorretos.");
        } else if (error.message.toLowerCase().includes("email not confirmed")) {
          Alert.alert("Erro no login", "E-mail não confirmado. Verifique sua caixa de entrada.");
        } else {
          Alert.alert("Erro no login", error.message);
        }
      } else {
        Alert.alert("Login realizado com sucesso!");
        navigation.navigate('Home');
      }
    } catch (err) {
      console.error("Erro inesperado no login:", err);
      Alert.alert("Erro inesperado", "Algo deu errado. Tente novamente mais tarde.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: 'https://disciplinas.uvv.br/assets/images/uvv-brasao.png' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Seja bem-vindo(a) de volta!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.link}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Criar uma conta</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  logo: {
    width: 185,
    height: 185,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1F2C73',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 16,
  },
  link: {
    color: '#58608C',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#1F2C73',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});