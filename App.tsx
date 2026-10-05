import React from 'react';
import { Pressable, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RegistrationScreen from './src/screens/RegistrationScreen';
import UsersScreen from './src/screens/UsersScreen';
import { COLORS } from './src/constants';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator>
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={({ navigation }) => ({
              title: 'Реєстрація',
              headerRight: () => (
                <Pressable onPress={() => navigation.navigate('Users')}>
                  <Text style={{ color: COLORS.primary, fontSize: 16 }}>Список</Text>
                </Pressable>
              ),
            })}
          />
          <Stack.Screen
            name="Users"
            component={UsersScreen}
            options={{ title: 'Збережені дані', headerBackTitle: 'Форма' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
