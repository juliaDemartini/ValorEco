# 🌿 ValorEco | Sustentabilidade Digital e Economia Circular (Em Desenvolvimento)

[![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Arduino](https://img.shields.io/badge/-Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white)](https://www.arduino.cc/)

O **ValorEco** é uma solução Full Stack que integra **IoT (Internet das Coisas)** e **Mobile** para transformar o descarte de resíduos em uma experiência de valor. Através de uma lixeira inteligente e um aplicativo gamificado, incentivamos a reciclagem recompensando usuários com **EcoValores** por suas ações sustentáveis.

---

## 🌟 Impactos Positivos

*   **Educação Ambiental na Prática:** Transforma a percepção do "lixo" em "recurso" através de gratificação instantânea.
*   **Redução de Resíduos:** Estimula o descarte correto em comunidades e instituições, diminuindo o impacto ambiental local.
*   **Fortalecimento da Economia Circular:** Conecta usuários a benefícios reais (vouchers, produtos, cursos) em troca de material reciclado validado.
*   **Métricas de Impacto:** Gera dados precisos sobre o volume de reciclagem (plástico, vidro, alumínio) via sensores de hardware.

---

## 🛠️ Stack Tecnológica

*   **App:** React Native (Expo) com TypeScript.
*   **Backend & Auth:** Firebase (Cloud Firestore & Authentication).
*   **Hardware (IoT):** Arduino com Sensores de Carga (Células de Peso) para validação física do descarte.
*   **Navegação:** Expo Router (File-based routing).

---

## ✨ Funcionalidades Principais

*   ✅ **Lixeira Inteligente (IoT):** Integração com sensores para validar o peso real do resíduo descartado.
*   ✅ **Carteira Digital:** Saldo de EcoValores atualizado em tempo real via *listeners* do Firestore.
*   ✅ **Marketplace de Resgate:** Sistema de transações seguras para troca de pontos por recompensas.
*   ✅ **Painel Administrativo:** Área restrita para gestão de usuários, monitoramento de impacto e aprovação de novos perfis.

---

## 📥 Como ter uma cópia do projeto (Instalação)

Siga os passos abaixo para rodar o **ValorEco** localmente:

### 1. Pré-requisitos
*   [Node.js](https://nodejs.org/) instalado.
*   [Expo Go](https://expo.dev/client) no seu celular ou um emulador configurado.
*   Conta no [Firebase](https://console.firebase.google.com/).

### 2. Clonar o Repositório
```bash
git clone [https://github.com/seu-usuario/valoreco.git](https://github.com/seu-usuario/valoreco.git)
cd valoreco
```

### 3. Instalar Dependências
```bash
npm install
```

### 4. Configurar o Firebase
Crie um projeto no Firebase, ative o **Firestore** e o **Authentication**, e adicione suas credenciais em `src/service/firebaseConfig.js`:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "seu-id",
  appId: "seu-app-id"
};
```

### 5. Rodar o App
```bash
npx expo start
```
*Escaneie o QR Code com o app Expo Go para visualizar no seu dispositivo.*

---

## 👩‍💻 Sobre a Desenvolvedora

**Julia Martini**  
*Desenvolvedora de Software apaixonada por tecnologia e impacto social.*

---

> "Transformando a tecnologia em uma ferramenta poderosa para um planeta mais verde e consciente." 🌍🚀
```
