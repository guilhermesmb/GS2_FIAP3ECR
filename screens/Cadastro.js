import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Button from '../components/button';
import Input from '../components/input';
import axios from 'axios'; // Importe o axios para fazer requisições HTTP

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = async () => {
    try {
      // Envie uma solicitação POST para o endpoint de cadastro
      const response = await axios.post('http://localhost:3000/usuarios', {
        email,
        nome,
        senha,
      });

      // A resposta pode conter informações do usuário recém-criado
      const novoUsuario = response.data;

      // Agora você pode usar as informações do novo usuário conforme necessário
      console.log('Novo usuário cadastrado:', novoUsuario);

      // Navegue para a tela de login ou qualquer outra tela necessária
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/cadastro.jpg')} />
      <Text style={styles.title}>Cadastro de Pacientes</Text>

      <Input placeholder="E-mail" onChangeText={setEmail} value={email} />
      <Input placeholder="Nome" onChangeText={setNome} value={nome} />
      <Input placeholder="Senha" secureTextEntry onChangeText={setSenha} value={senha} />

      <Button onPress={handleCadastro}>Cadastrar</Button>
      <Button onPress={() => navigation.navigate('Login')}>Voltar</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#121A2C',
    fontSize: 28,
    fontWeight: 'bold',
  },

  image: {
    height: 200,
    width: '100%',
    position: 'absolute',
    top: 0,
  },
});
