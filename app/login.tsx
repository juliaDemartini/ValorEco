import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    // Redireciona direto para a Home dentro da pasta (tabs)
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.logoText}>ValorEco 🌿</Text>
        <Text style={styles.subtitle}>Acesse com sua matrícula ou e-mail</Text>

        {/* Campo Matrícula/E-mail */}
        <TextInput
          style={styles.input}
          placeholder="Matrícula ou E-mail"
          placeholderTextColor="#999"
          autoCapitalize="none"
        />

        {/* Campo Senha */}
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
        />

        {/* Esqueci a Senha */}
        <TouchableOpacity style={styles.forgotPass}>
          <Text style={styles.forgotPassText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        {/* Botão Entrar */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
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
    elevation: 2, // Sombra suave no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
});