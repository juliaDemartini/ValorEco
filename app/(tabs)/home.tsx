import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Header: Nome e Avatar */}
        <View style={styles.header}>
              <View>
                <Text style={styles.welcome}>Olá, Julia! 👋</Text>
                <Text style={styles.studentInfo}>Software Engineering Student</Text>
              </View>

              {/* Avatar Clicável que leva ao Perfil */}
              <TouchableOpacity
                style={styles.avatar}
                onPress={() => router.push('/(tabs)/perfil')}
              >
                <Ionicons name="person" size={30} color="#FFF" />
              </TouchableOpacity>
            </View>

        {/* Wallet Card: Saldo EV */}
        <View style={styles.walletCard}>
          <Text style={styles.walletLabel}>Saldo EcoValor</Text>
          <Text style={styles.walletValue}>$ 150 EV</Text>
        </View>

        {/* Seção: Meta de Reciclagem */}
        <View style={styles.goalSection}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalTitle}>Meta Semanal</Text>
            <Text style={styles.goalPercent}>75%</Text>
          </View>
          <View style={styles.progressBar}><View style={[styles.progressFill, { width: '75%' }]} /></View>
          <Text style={styles.goalDetail}>Faltam 5kg para sua meta de 20kg!</Text>
        </View>

        {/* Grid de Atalhos (Hub) */}
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

      {/* Botão Mestre (CTA) Flutuante */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="scan" size={30} color="white" />
        <Text style={styles.fabText}>ESCANEAR ESTAÇÃO</Text>
      </TouchableOpacity>
    </View>
  );
}

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