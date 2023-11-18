import React from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function CardProduto({ produto, onExcluirMedicamento }) {
  return (
    <View style={styles.pedidos}>
      <View style={styles.cardProduto}>

        <View style={styles.produtoData}>
          <Text>{produto.nome}</Text>
          <Text style={styles.price}>{produto.hora}</Text>
        </View>

        <View>
          <Text>{produto.quant} Comprimidos</Text>
        </View>

        <TouchableOpacity onPress={onExcluirMedicamento}>
          <Text style={styles.lixeira}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lixeira: {
    fontSize: 20,
    color: 'red',
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