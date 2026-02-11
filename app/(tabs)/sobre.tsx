import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logoPlaceholder}>ValorEco 🌿</Text>
      <Text style={styles.version}>Versão 1.0.0 (Provisória)</Text>

      <View style={styles.content}>
        <Text style={styles.description}>
          O ValorEco é um projeto desenvolvido para o Desafio Globo LED, focado em
          sustentabilidade e gamificação na FAETERJ.
        </Text>

        <Text style={styles.team}>Desenvolvido por: Júlia & Cindy</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Software Engineering Project</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', padding: 30 },
  logoPlaceholder: { fontSize: 32, fontWeight: 'bold', color: '#2E7D32', marginBottom: 5 },
  version: { fontSize: 12, color: '#AAA', marginBottom: 40 },
  content: { width: '100%', backgroundColor: '#F0F7F0', padding: 25, borderRadius: 20 },
  description: { fontSize: 16, color: '#444', textAlign: 'center', lineHeight: 24 },
  team: { marginTop: 20, fontWeight: 'bold', color: '#2E7D32', textAlign: 'center' },
  footer: { position: 'absolute', bottom: 40 },
  footerText: { color: '#CCC', fontSize: 12, letterSpacing: 1 }
});