import React, { useContext, useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Button from '../components/button';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CardProduto from '../components/card';

const Medicamentos = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);
  const { username, user_id } = useContext(AuthContext);

  const fetchMedicamentos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/medicamentos');
      const produtosFiltrados = response.data.filter((produto) => produto.user_id === user_id);
      setProdutos(produtosFiltrados);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  const onExcluirMedicamento = async (medicamentoId) => {
    try {
      await axios.delete(`http://localhost:3000/medicamentos/${medicamentoId}`);
      fetchMedicamentos();
    } catch (error) {
      console.error('Erro ao excluir medicamento:', error);
    }
  };

  useEffect(() => {
    const onFocus = () => {
      fetchMedicamentos();
    };

    const unsubscribeFocus = navigation.addListener('focus', onFocus);

    fetchMedicamentos();

    return () => {
      unsubscribeFocus();
    };
  }, [user_id, navigation]);

  return (
    <View style={styles.containerBetween}>
      <View style={styles.header}>
      <TouchableOpacity>
        <MaterialIcons onPress={() => navigation.navigate('Login')} name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
        <View style={styles.box}>
          <Text>Paciente :</Text>
          <Text style={styles.title}>{username}</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Medicamentos</Text>

      <ScrollView style={styles.scroll}>
        {produtos.map((produto) => (
          <CardProduto
            key={produto.id}
            produto={produto}
            onExcluirMedicamento={() => onExcluirMedicamento(produto.id)}
          />
        ))}
      </ScrollView>

      <Button onPress={() => navigation.navigate('CadastroMed')}>Cadastrar Medicamentos</Button>
    </View>
  );
};

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

export default Medicamentos;
