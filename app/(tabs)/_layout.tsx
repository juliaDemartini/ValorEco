import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#2E7D32',
      headerShown: false,
      tabBarStyle: { height: 60, paddingBottom: 10 }
    }}>
      <Tabs.Screen name="home" options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} />,
      }} />
      <Tabs.Screen name="premios" options={{
        title: 'Prêmios',
        tabBarIcon: ({ color }) => <Ionicons name="gift" size={26} color={color} />,
      }} />
      <Tabs.Screen name="vouchers" options={{
        title: 'Vouchers',
        tabBarIcon: ({ color }) => <Ionicons name="ticket" size={26} color={color} />,
      }} />
      <Tabs.Screen name="sobre" options={{
        title: 'Sobre',
        tabBarIcon: ({ color }) => <Ionicons name="people" size={26} color={color} />,
      }} />
    </Tabs>
  );
}