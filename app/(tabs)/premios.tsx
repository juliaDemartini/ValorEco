import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PremiosScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Catálogo de Prêmios 🎁</Text>
        <Text style={styles.subtitle}>Troque seus EcoValores por benefícios na FAETERJ</Text>
      </View>

      <View style={styles.list}>
        {/* Placeholder de um item de prêmio */}
        <TouchableOpacity style={styles.card}>
          <Ionicons name="cafe" size={32} color="#2E7D32" />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Café Grátis - Cantina</Text>
            <Text style={styles.cardCost}>50 EV</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </TouchableOpacity>

        <Text style={styles.warning}>Em breve: A Cindy irá estilizar os cards oficiais!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { padding: 30, paddingTop: 60, backgroundColor: '#F8F9FA' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 5 },
  list: { padding: 20 },
  card: {
    flexDirection: 'row', alignItems: 'center', padding: 20,
    backgroundColor: '#F9F9F9', borderRadius: 15, marginBottom: 15,
    borderWidth: 1, borderColor: '#EEE'
  },
  cardInfo: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  cardCost: { fontSize: 14, color: '#2E7D32', fontWeight: 'bold' },
  warning: { textAlign: 'center', color: '#999', marginTop: 20, fontStyle: 'italic' }
});