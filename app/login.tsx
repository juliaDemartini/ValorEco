import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons'; // Importe necessário para o ícone
import { db } from '../../src/services/firebaseConfig'; // Corrigido para 'services'

export default function LoginScreen() {
  const router = useRouter();
  const auth = getAuth();


  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado do olho
  const handleRequestAccount = () => {
  // Isso vai levar o aluno para o arquivo app/registro.tsx (ou o nome que você der)
  router.push('/registro');
  }

  const handleLogin = () => {
    if (email === '' || senha === '') {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    setCarregando(true);

    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        setCarregando(false);
        router.replace('/(tabs)/home');
      })
      .catch((error) => {
        setCarregando(false);
        const errorCode = error.code;

        if (errorCode === 'auth/invalid-email') Alert.alert("Erro", "E-mail inválido.");
        else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password' || errorCode === 'auth/invalid-credential') {
          Alert.alert("Erro", "Usuário ou senha incorretos.");
        } else {
          Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente.");
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.logoText}>ValorEco 🌿</Text>
        <Text style={styles.subtitle}>Acesse com seu e-mail cadastrado</Text>

        {/* Input de E-mail */}
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#999"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Container da Senha com Olho */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry={!passwordVisible} // Lógica de visibilidade
            value={senha}
            onChangeText={setSenha}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color="#2E7D32"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPass}>
          <Text style={styles.forgotPassText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: carregando ? 0.7 : 1 }]}
          onPress={handleLogin}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
        {/* Link para solicitar cadastro */}
                  <TouchableOpacity style={styles.registerLink} onPress={handleRequestAccount}>
                    <Text style={styles.registerText}>
                      Não tem uma conta? <Text style={styles.registerTextBold}>Solicite seu cadastro</Text>
                    </Text>
                  </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  inner: { flex: 1, justifyContent: 'center', padding: 30 },
  logoText: { fontSize: 36, fontWeight: 'bold', color: '#2E7D32', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40 },
  input: {
    backgroundColor: '#FFF',
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // Estilos novos para o container da senha
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 15,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  eyeIcon: {
    paddingLeft: 10,
  },
  forgotPass: { alignSelf: 'flex-end', marginBottom: 30, marginRight: 5 },
  forgotPassText: { color: '#0047AB', fontWeight: '500', fontSize: 14 },
  button: {
    backgroundColor: '#2E7D32',
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
  registerLink: {
    marginTop: 20,
    alignSelf: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerTextBold: {
    color: '#2E7D32',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});