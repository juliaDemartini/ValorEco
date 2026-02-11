import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../src/service/firebaseConfig';

export default function ProfileScreen() {
  const router = useRouter();
  const auth = getAuth();

  // Estados para os dados do banco
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        // Busca o documento no Firestore usando o e-mail do usuário como ID
        const docRef = doc(db, "usuarios", user.email!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("Documento não encontrado no Firestore!");
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Dinâmico */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color="#2E7D32" />
        </View>
        <Text style={styles.userName}>{userData?.nome || "Usuário"}</Text>
        <Text style={styles.userBio}>{userData?.curso || "Estudante"} | FAETERJ</Text>
      </View>

      {/* Cards de Estatísticas com Dados do Banco */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="leaf" size={24} color="#2E7D32" />
          <Text style={styles.statValue}>{userData?.totalReciclado || 0}kg</Text>
          <Text style={styles.statLabel}>Reciclado</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="wallet" size={24} color="#0047AB" />
          <Text style={styles.statValue}>$ {userData?.saldo || 0}</Text>
          <Text style={styles.statLabel}>EcoValores</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="star" size={24} color="#FFD700" />
          <Text style={styles.statValue}>Lvl 1</Text>
          <Text style={styles.statLabel}>Ranking</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="school-outline" size={22} color="#444" />
          <Text style={styles.menuText}>Matrícula: {userData?.matricula || "Não informada"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#D32F2F" />
          <Text style={[styles.menuText, { color: '#D32F2F' }]}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ... Mantenha os seus estilos originais (styles) abaixo ...
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    header: { alignItems: 'center', paddingVertical: 40, backgroundColor: '#F8F9FA' },
    avatarContainer: { position: 'relative' },
    userName: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 10 },
    userBio: { fontSize: 14, color: '#666' },
    statsRow: {
      flexDirection: 'row', justifyContent: 'space-around',
      padding: 20, marginTop: -20, backgroundColor: 'transparent'
    },
    statCard: {
      backgroundColor: '#FFF', width: '28%', padding: 15, borderRadius: 15,
      alignItems: 'center', elevation: 4, shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4
    },
    statValue: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
    statLabel: { fontSize: 12, color: '#999' },
    menuSection: { paddingHorizontal: 20, marginTop: 20 },
    menuItem: {
      flexDirection: 'row', alignItems: 'center', paddingVertical: 18,
      borderBottomWidth: 1, borderBottomColor: '#F0F0F0'
    },
    menuText: { flex: 1, marginLeft: 15, fontSize: 16, color: '#444' }
  });