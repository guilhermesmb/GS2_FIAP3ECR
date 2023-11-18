import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, Text, TextInput, View } from 'react-native';

import CardProduto from '../components/card.js';
import { StyleSheet } from 'react-native';
import Button from '../components/button.js';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext.js';

export default function Medicamentos() {
  const [produtos, setProdutos] = useState([])
  const {username} = useContext(AuthContext)

  useEffect(() => {
    axios.get("http://localhost:3000/medicamentos")
    .then(resp => setProdutos(resp.data))
  }, [])
    
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

            { produtos.map(produto => 
                      <CardProduto key={produto.id} produto={produto}/> )}
               
            </ScrollView>

            <Button>finalizar</Button>
            
        </View>

    )
}

const styles = StyleSheet.create({
  header:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
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
  pedidos: {
    width: '100%',
  },
  pedidoData:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pedidoDataTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
  },
  cardProduto: {
    borderColor: '#121A2C55',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginVertical: 5,
  },
  produtoData: {
    flex: 1,
    alignSelf: 'flex-start',
  },  
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  price: {
    color: '#29A035',
    fontSize: 18,
  },
  spinner: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    borderRadius: 999,
  },
  spinnerMinus: {
    textAlign: 'center',
    backgroundColor: '#E9E9E9',
    borderRadius: 999,
    width: 24,
    height: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  spinnerPlus: {
    textAlign: 'center',
    backgroundColor: '#121A2C',
    borderRadius: 999,
    width: 24,
    height: 24,
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#FFF',
  },
  spinnerValue: {
    textAlign: 'center',
    width: 24,
    height: 24,
    lineHeight: 24,
  },
  scroll: {
   width: '100%',
  }

})