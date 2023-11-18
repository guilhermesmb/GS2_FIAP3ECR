import { Text, View, Image } from 'react-native';
import Input from '../components/input.js';
import { StyleSheet } from 'react-native';
import Button from '../components/button.js';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.js';

export default function CadastroMed({ navigation }) {
  const { user_id } = useContext(AuthContext);
  const [medicamento, setMedicamento] = useState({
    nome: '',
    hora: '',
    quant: '',
    user_id: user_id,
  });

  const handleCadastroMed = async () => {
    try {
      const response = await axios.post('http://localhost:3000/medicamentos', medicamento);

      if (response.status !== 201) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      // Após o cadastro bem-sucedido, atualiza a lista de medicamentos
      navigation.navigate('Medicamentos');
    } catch (error) {
      console.error('Erro ao cadastrar medicamento:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/cadastro.jpg')} />

      <Input
        placeholder='Medicamento'
        onChangeText={(text) => setMedicamento({ ...medicamento, nome: text })}
      />
      <Input
        placeholder='Hora'
        onChangeText={(text) => setMedicamento({ ...medicamento, hora: text })}
      />
      <Input
        placeholder='Dose Comprimidos'
        onChangeText={(text) => setMedicamento({ ...medicamento, quant: text })}
      />

      <Button onPress={handleCadastroMed}>Cadastrar Medicamento</Button>
      <Button onPress={() => navigation.navigate('Medicamentos')}>Voltar</Button>
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
    top: 35,
  },

  image: {
    height: 200,
    width: '100%',
    position: 'absolute',
    top: 0,
  },
});
