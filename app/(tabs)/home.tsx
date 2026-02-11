import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'; // Combinei tudo aqui
import { db } from '../../src/service/firebaseConfig'; // Verifique se o nome da pasta é service ou services


export default function HomeScreen() {
  const router = useRouter();
  const auth = getAuth();

  // Estados para dados reais do Firebase
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const registrarReciclagem = async () => {
      try {
        const user = auth.currentUser; // Agora ele vai achar!
        if (user && userData) {
          const userRef = doc(db, "usuarios", user.email!);

          const novoSaldo = (userData.saldo || 0) + 10;
          const novoTotalReciclado = (userData.totalReciclado || 0) + 2;

          await updateDoc(userRef, {
            saldo: novoSaldo,
            totalReciclado: novoTotalReciclado
          });

          alert("Incrível! +10 EcoValores creditados. 🌿");
        }
      } catch (error) {
        console.error("Erro ao atualizar pontos:", error);
      }
    };

  useEffect(() => {
    const user = auth.currentUser;

    if (user && user.email) {
      const docRef = doc(db, "usuarios", user.email);
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
        setLoading(false);
      }, (error) => {
        console.error("Erro no Firebase:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // SE NÃO TIVER USUÁRIO, MANDA PARA O LOGIN OU PARA O LOADING FALSE
      setLoading(false);
      // router.replace('/login'); // Opcional: forçar volta ao login
    }
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Header Dinâmico: Puxa nome do Firestore */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Olá, {userData?.nome || 'Estudante'}! 👋</Text>
            <Text style={styles.studentInfo}>{userData?.curso || 'Software Engineering Student'}</Text>
          </View>

          <TouchableOpacity
            style={styles.avatar}
            onPress={() => router.push('/(tabs)/perfil')}
          >
            <Ionicons name="person" size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Wallet Card Dinâmico: Puxa saldo real */}
        <View style={styles.walletCard}>
          <Text style={styles.walletLabel}>Saldo EcoValor</Text>
          <Text style={styles.walletValue}>$ {userData?.saldo || 0} EV</Text>
        </View>

        {/* Seção: Meta de Reciclagem (Pode ser calculada com base no totalReciclado) */}
        <View style={styles.goalSection}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>Meta Semanal</Text>
            <Text style={styles.goalPercent}>
              {Math.min(Math.round(((userData?.totalReciclado || 0) / 20) * 100), 100)}%
            </Text>
          </View>
          <View style={styles.progressBar}>
           <View style={[styles.progressFill, { width: `${Math.min((userData?.totalReciclado || 0) / 20 * 100, 100)}%` }]} />
          </View>
          <Text style={styles.goalDetail}>
            Reciclado: {userData?.totalReciclado || 0}kg de uma meta de 20kg!
          </Text>
        </View>

        {/* Grid de Atalhos */}
        <View style={styles.grid}>
          {[
            { n: 'Catálogo', i: 'book' }, { n: 'Cupons', i: 'pricetags' },
            { n: 'Impacto', i: 'earth' }, { n: 'Ajuda', i: 'help-circle' }
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.gridItem}>
              <Ionicons name={item.i} size={28} color="#2E7D32" />
              <Text style={styles.gridText}>{item.n}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

    <TouchableOpacity style={styles.fab} onPress={registrarReciclagem}>
        <Ionicons name="scan" size={30} color="white" />
        <Text style={styles.fabText}>ESCANEAR ESTAÇÃO</Text>
      </TouchableOpacity>
    </View>
  );
}



// ... Mantenha os seus estilos originais (styles) ...
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 25, paddingTop: 60 },
  welcome: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  studentInfo: { color: '#666', fontSize: 14 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#2E7D32', justifyContent: 'center', alignItems: 'center' },
  walletCard: { backgroundColor: '#1B5E20', margin: 20, padding: 25, borderRadius: 20, elevation: 5 },
  walletLabel: { color: '#FFF', opacity: 0.8, fontSize: 14 },
  walletValue: { color: '#FFF', fontSize: 36, fontWeight: 'bold' },
  goalSection: { padding: 20, backgroundColor: '#FFF', marginHorizontal: 20, borderRadius: 15 },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  goalTitle: { fontWeight: 'bold', color: '#333' },
  goalPercent: { color: '#2E7D32', fontWeight: 'bold' },
  progressBar: { height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#2E7D32' },
  goalDetail: { marginTop: 8, fontSize: 12, color: '#999' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 15, justifyContent: 'space-between' },
  gridItem: { width: '47%', backgroundColor: '#FFF', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 15, elevation: 2 },
  gridText: { marginTop: 8, fontWeight: '500', color: '#444' },
  fab: { position: 'absolute', bottom: 30, alignSelf: 'center', backgroundColor: '#4CAF50', flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 30, alignItems: 'center', elevation: 10 },
  fabText: { color: 'white', fontWeight: 'bold', marginLeft: 10, fontSize: 16 }
});