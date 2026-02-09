import React, { useEffect } from 'react';
import { StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Esse cronômetro DEVE rodar assim que a tela abrir
    const timer = setTimeout(() => {
      console.log("Tentando navegar para o login...");
      router.replace('/login');
    }, 3000);

    return () => clearTimeout(timer); // Limpa o timer se a tela fechar
  }, []);

  return (
    <LinearGradient colors={['#0047AB', '#2E7D32']} style={styles.container}>
      <Text style={styles.logo}>ValorEco 🌿</Text>
      <ActivityIndicator size="large" color="#FFF" />

      {/* Botão de segurança se o automático falhar */}
      <TouchableOpacity
        onPress={() => router.replace('/login')}
        style={{ marginTop: 20 }}
      >
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 40, fontWeight: 'bold', color: '#FFF', marginBottom: 20 },
});