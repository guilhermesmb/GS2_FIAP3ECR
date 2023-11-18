import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import CardProduto from '../components/card.js';
import { StyleSheet } from 'react-native';
import Button from '../components/button.js';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.js';

// Função para buscar medicamentos
const fetchMedicamentos = async (user_id, setProdutos) => {
  try {
    const response = await axios.get('http://localhost:3000/medicamentos');
    const produtosFiltrados = response.data.filter((produto) => produto.user_id === user_id);
    setProdutos(produtosFiltrados);
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
};

export default function Medicamentos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const { username, user_id } = useContext(AuthContext);

  useEffect(() => {
    // Fetch dos medicamentos quando a tela estiver em foco
    const onFocus = () => {
      fetchMedicamentos(user_id, setProdutos);
    };

    const unsubscribeFocus = navigation.addListener('focus', onFocus);

    // Fetch inicial dos medicamentos
    fetchMedicamentos(user_id, setProdutos);

    // Cleanup ao desmontar o componente
    return () => {
      unsubscribeFocus();
    };
  }, [user_id, navigation]);

  return (
    <View style={styles.containerBetween}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={24} color="black" />

        <View style={styles.box}>
          <Text>Paciente :</Text>
          <Text style={styles.title}>{username}</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Medicamentos</Text>

      <ScrollView style={styles.scroll}>
        {produtos.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </ScrollView>

      <Button onPress={() => navigation.navigate('CadastroMed')}>Cadastrar Medicamentos</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  containerBetween: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  box: {
    borderColor: '#121A2C',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scroll: {
    width: '100%',
  },
});

