import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { db } from '../src/service/firebaseConfig';
import { collection, query, where, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminPanel() {
  const router = useRouter();
  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Ouvir as solicitações pendentes em tempo real
  useEffect(() => {
    const q = query(collection(db, "solicitacoes"), where("status", "==", "pendente"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSolicitacoes(lista);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar solicitações:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Função Mágica: Aprovar e Criar Usuário
  const handleAprovar = async (item: any) => {
    Alert.alert(
      "Confirmar Aprovação",
      `Deseja liberar o acesso para ${item.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Aprovar",
          onPress: async () => {
            try {
              // Cria o documento oficial na coleção 'usuarios' usando o e-mail como ID
              await setDoc(doc(db, "usuarios", item.email), {
                nome: item.nome,
                email: item.email,
                matricula: item.matricula,
                curso: item.curso || "Não informado",
                saldo: 0, // Garante que a Home não quebre
                totalReciclado: 0, // Garante que a Home não quebre
                role: "aluno",
                dataAprovacao: new Date()
              });

              // Atualiza o status na coleção de solicitações para sumir da lista
              await updateDoc(doc(db, "solicitacoes", item.id), {
                status: "aprovado"
              });

              Alert.alert("Sucesso! ✅", `${item.nome} agora é um membro do ValorEco.`);
            } catch (error) {
              Alert.alert("Erro", "Não foi possível processar a aprovação.");
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Painel de Controle 🔐</Text>
      </View>

      <Text style={styles.sectionTitle}>Solicitações Pendentes ({solicitacoes.length})</Text>

      <FlatList
        data={solicitacoes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.curso}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.approveBtn}
              onPress={() => handleAprovar(item)}
            >
              <Ionicons name="checkmark-circle" size={40} color="#2E7D32" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="happy-outline" size={60} color="#CCC" />
            <Text style={styles.emptyText}>Tudo em dia! Nenhum pedido novo.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 15, color: '#333' },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#666', margin: 20, textTransform: 'uppercase' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#FFF', marginHorizontal: 20, marginBottom: 15, borderRadius: 15, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 3 },
  cardInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  email: { fontSize: 14, color: '#666', marginTop: 2 },
  badge: { backgroundColor: '#E8F5E9', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginTop: 8 },
  badgeText: { color: '#2E7D32', fontSize: 12, fontWeight: 'bold' },
  approveBtn: { marginLeft: 10 },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#999', marginTop: 15, fontSize: 16 }
});