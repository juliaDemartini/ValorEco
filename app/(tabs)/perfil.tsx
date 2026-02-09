import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header do Perfil */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color="#2E7D32" />
          <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="pencil" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>Julia</Text>
        <Text style={styles.userBio}>Engenharia de Software | FAETERJ</Text>
      </View>

      {/* Cards de Estatísticas */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="leaf" size={24} color="#2E7D32" />
          <Text style={styles.statValue}>12kg</Text>
          <Text style={styles.statLabel}>Plástico</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="water" size={24} color="#0047AB" />
          <Text style={styles.statValue}>45L</Text>
          <Text style={styles.statLabel}>Água Salva</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="flash" size={24} color="#FFD700" />
          <Text style={styles.statValue}>8kWh</Text>
          <Text style={styles.statLabel}>Energia</Text>
        </View>
      </View>

      {/* Lista de Opções */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={22} color="#444" />
          <Text style={styles.menuText}>Dados Acadêmicos</Text>
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={22} color="#444" />
          <Text style={styles.menuText}>Notificações</Text>
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="shield-checkmark-outline" size={22} color="#444" />
          <Text style={styles.menuText}>Privacidade e Segurança</Text>
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </TouchableOpacity>

        {/* Botão de Logout */}
        <TouchableOpacity
          style={[styles.menuItem, { marginTop: 20 }]}
          onPress={() => router.replace('/login')}
        >
          <Ionicons name="log-out-outline" size={22} color="#D32F2F" />
          <Text style={[styles.menuText, { color: '#D32F2F' }]}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { alignItems: 'center', paddingVertical: 40, backgroundColor: '#F8F9FA' },
  avatarContainer: { position: 'relative' },
  editIcon: {
    position: 'absolute', bottom: 5, right: 5,
    backgroundColor: '#2E7D32', padding: 8, borderRadius: 20
  },
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