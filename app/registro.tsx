import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { db } from '../src/service/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegistroScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleEnviar = async () => {
    if (!nome || !email || !matricula) {
      Alert.alert("Campos Obrigatórios", "Por favor, preencha nome, e-mail e matrícula.");
      return;
    }

    setCarregando(true);
    try {
      await addDoc(collection(db, "solicitacoes"), {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        matricula: matricula.trim(),
        curso: curso.trim(),
        status: "pendente",
        dataSolicitacao: serverTimestamp()
      });

      Alert.alert("Solicitação Enviada! 🌿", "Recebemos seu pedido. Você receberá um e-mail assim que sua conta for aprovada.");
      router.replace('/');
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar sua solicitação. Verifique sua conexão.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* Botão Voltar */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={28} color="#2E7D32" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Novo Cadastro 🌿</Text>
            <Text style={styles.subtitle}>Junte-se à revolução sustentável do ValorEco.</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nome Completo *"
                value={nome}
                onChangeText={setNome}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="E-mail Institucional *"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="card-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Matrícula *"
                keyboardType="numeric"
                value={matricula}
                onChangeText={setMatricula}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="school-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Curso (Ex: Eng. de Software)"
                value={curso}
                onChangeText={setCurso}
              />
            </View>

            <TouchableOpacity
              style={[styles.mainButton, carregando && { opacity: 0.7 }]}
              onPress={handleEnviar}
              disabled={carregando}
            >
              <Text style={styles.buttonText}>
                {carregando ? "Enviando..." : "Solicitar Acesso"}
              </Text>
            </TouchableOpacity>

            <Text style={styles.footerNote}>
              * Campos obrigatórios. Sua solicitação passará por análise da administração.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 25 },
  backButton: { width: 40, height: 40, justifyContent: 'center', marginBottom: 20 },
  header: { marginBottom: 35 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1B5E20', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', lineHeight: 22 },
  form: { marginTop: 10 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 60,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: '#333' },
  mainButton: {
    backgroundColor: '#2E7D32',
    height: 65,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  footerNote: { textAlign: 'center', color: '#999', fontSize: 12, marginTop: 25, lineHeight: 18 }
});