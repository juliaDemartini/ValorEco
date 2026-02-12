import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Modal, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../src/service/firebaseConfig'; // Verifique se o caminho está correto

const TODOS_PREMIOS = [
  { id: '1', titulo: 'Café Grátis', pontos: 50, categoria: 'Vouchers', icon: 'cafe' },
  { id: '2', titulo: 'R$ 10 Crédito', pontos: 100, categoria: 'Crédito', icon: 'phone-portrait' },
  { id: '3', titulo: 'Curso de Excel', pontos: 500, categoria: 'Cursos', icon: 'school' },
  { id: '4', titulo: 'Copo Retrátil', pontos: 200, categoria: 'Produtos', icon: 'leaf' },
  { id: '5', titulo: 'Desconto Cantina', pontos: 80, categoria: 'Vouchers', icon: 'restaurant' },
  { id: '6', titulo: 'Curso Python', pontos: 600, categoria: 'Cursos', icon: 'code-slash' },
];

const CATEGORIAS = ['Todos', 'Vouchers', 'Cursos', 'Crédito', 'Produtos'];

export default function PremiosScreen() {
  const auth = getAuth();
  const [modalVisivel, setModalVisivel] = useState(false);
  const [premioSelecionado, setPremioSelecionado] = useState<any>(null);
  const [processando, setProcessando] = useState(false);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [userData, setUserData] = useState<any>(null);

  // 1. Ouvir dados do usuário em tempo real para ter o saldo atualizado
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "usuarios", user.email!);
      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      });
      return () => unsubscribe();
    }
  }, []);

  // 2. Lógica de Filtro
  const premiosFiltrados = categoriaAtiva === 'Todos'
    ? TODOS_PREMIOS
    : TODOS_PREMIOS.filter(item => item.categoria === categoriaAtiva);

  // 3. Função de abrir o modal
  const abrirConfirmacao = (item: any) => {
    setPremioSelecionado(item);
    setModalVisivel(true);
  };

  // 4. Função de Resgate Final
  const confirmarResgate = async () => {
    if (!premioSelecionado || !userData) return;

    const saldoAtual = userData.saldo || 0;

    if (saldoAtual < premioSelecionado.pontos) {
      Alert.alert("Saldo Insuficiente", "Você precisa de mais EcoValores para este prêmio. 🌿");
      setModalVisivel(false);
      return;
    }

    setProcessando(true);
    try {
      const user = auth.currentUser;
      const userRef = doc(db, "usuarios", user?.email!);

      // Subtrai os pontos do saldo no Firestore
      await updateDoc(userRef, {
        saldo: saldoAtual - premioSelecionado.pontos
      });

      Alert.alert("Sucesso! 🎉", `Você resgatou: ${premioSelecionado.titulo}.\nO voucher foi enviado para seu e-mail.`);
      setModalVisivel(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível processar o resgate.");
    } finally {
      setProcessando(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header com Saldo Real */}
      <View style={styles.header}>
        <Text style={styles.title}>Resgatar Prêmios 🎁</Text>
        <Text style={styles.pointsLabel}>
          Seu saldo: <Text style={styles.pointsValue}>{userData?.saldo || 0} EV</Text>
        </Text>
      </View>

      {/* Filtros */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {CATEGORIAS.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterBtn, categoriaAtiva === cat && styles.filterBtnActive]}
              onPress={() => setCategoriaAtiva(cat)}
            >
              <Text style={[styles.filterText, categoriaAtiva === cat && styles.filterTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Lista de Prêmios */}
      <FlatList
        data={premiosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => abrirConfirmacao(item)}
          >
            <View style={styles.cardIcon}>
              <Ionicons name={item.icon as any} size={28} color="#2E7D32" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardCategory}>{item.categoria}</Text>
            </View>
            <View style={styles.cardPoints}>
              <Text style={styles.pointsText}>{item.pontos} EV</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal de Confirmação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalCentered}>
          <View style={styles.modalView}>
            <Ionicons name="gift-outline" size={50} color="#2E7D32" style={{marginBottom: 10}} />
            <Text style={styles.modalTitle}>Confirmar Resgate?</Text>
            <Text style={styles.modalText}>
              Você deseja trocar <Text style={{color: '#2E7D32', fontWeight: 'bold'}}>{premioSelecionado?.pontos} EV</Text> por:{"\n"}
              <Text style={{fontWeight: 'bold', fontSize: 18}}>{premioSelecionado?.titulo}</Text>
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.btnModal, styles.btnCancelar]}
                onPress={() => setModalVisivel(false)}
                disabled={processando}
              >
                <Text style={styles.textBtn}>Voltar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btnModal, styles.btnConfirmar]}
                onPress={confirmarResgate}
                disabled={processando}
              >
                {processando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.textBtn}>Resgatar</Text>}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 25, paddingTop: 60, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  pointsLabel: { fontSize: 16, color: '#666', marginTop: 5 },
  pointsValue: { color: '#2E7D32', fontWeight: 'bold' },
  filterContainer: { paddingLeft: 20, marginVertical: 15 },
  filterBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#EEE', marginRight: 10, height: 40, justifyContent: 'center' },
  filterBtnActive: { backgroundColor: '#2E7D32' },
  filterText: { color: '#666', fontWeight: '500' },
  filterTextActive: { color: '#FFF' },
  listContent: { padding: 20, paddingBottom: 100 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    padding: 15, borderRadius: 15, marginBottom: 12, elevation: 3,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4
  },
  cardIcon: { width: 50, height: 50, backgroundColor: '#E8F5E9', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cardInfo: { flex: 1, marginLeft: 15 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardCategory: { fontSize: 12, color: '#999' },
  cardPoints: { backgroundColor: '#F0F7F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  pointsText: { color: '#2E7D32', fontWeight: 'bold', fontSize: 14 },

  modalCentered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalView: { backgroundColor: 'white', borderRadius: 25, padding: 30, alignItems: 'center', width: '85%', elevation: 10 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  modalText: { textAlign: 'center', fontSize: 16, marginBottom: 25, color: '#666', lineHeight: 22 },
  modalButtons: { flexDirection: 'row', gap: 15, width: '100%' },
  btnModal: { flex: 1, padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  btnCancelar: { backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#DDD' },
  btnConfirmar: { backgroundColor: '#2E7D32' },
  textBtn: { fontWeight: 'bold', fontSize: 16, color: '#FFF' },
  // Cor do texto do botão cancelar precisa ser escura
  textBtnCancel: { color: '#333' }
});