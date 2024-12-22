import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
const axios = require('axios');

import cliente from '../assets/cliente.png';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons , FontAwesome5, AntDesign  } from '@expo/vector-icons';

const Componente = ({ data, setData, toggleModal, IconePessoa, IconeLixeira }) => {
  
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);

  

  const mostrarMensagemExcluido = () => {
    setExcluidoModalVisible(true);
    toggleModal();
  };

  const [modalVisible2, setModalVisible2] = useState(false);

  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);

  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
  };

  const mostrarMensagemExcluido2 = () => {
    setExcluidoModalVisible2(true);
    toggleModal2();
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>

      <View style= {{flexDirection: 'row', justifyContent: 'flex-start'}} >
        <Text style={styles.text}>Cliente: {data.attributes.nome} </Text>
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('TelaClienteAtualizar', data)}>
              <FontAwesome5 name="user-edit" size={18} color="#053F5C" style= {{marginHorizontal: 5}} />
          </TouchableOpacity>
        </View>
      
          
            <TouchableOpacity activeOpacity={0.7} onPress={() => { setData(data); toggleModal(); }}>
              <IconeLixeira />
            </TouchableOpacity>
          </View>
        
        <View style={styles.content}>
          <View>
            <Text style={styles.text2}>Contato: {data.attributes.telefone} </Text>
            <Text style={styles.text2}>Endereço: {data.attributes.endereco} </Text>
            <Text style={styles.text2}>Observações: {data.attributes.observacoes} </Text>
          </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('TelaClienteServicos', { id: data.id, dados: data.attributes })}>
                <IconePessoa />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

      <TouchableOpacity
            style={styles.botao2}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('TelaAgendaAdicionar', data)}>
              <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignContent:"center", alignItems: "center" }}>
                <MaterialCommunityIcons name="calendar-edit" size={28} color="#FFF" style= {{marginHorizontal: 5}} />
                <Text style={styles.textbotao}>Nova visita</Text>
              </View>
          </TouchableOpacity>

      <TouchableOpacity
            style={styles.botao}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('TelaServicoAdicionar', data)}>
              <View style={{ flexDirection: 'row', justifyContent: "flex-start", alignContent:"center", alignItems: "center" }}>
              <FontAwesome5 name="tools" size={22} color="#053F5C" style= {{marginHorizontal: 5}} />
                <Text style={styles.textbotao2}>Novo serviço</Text>
            </View>
          </TouchableOpacity>
          
          </View>

      




      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={toggleModal2}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>Deseja concluir serviço?</Text>
              <View style={styles.bots}>
              <TouchableOpacity style={styles.bot} onPress={mostrarMensagemExcluido2}>
                <Text style={styles.textbotao2} >Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bot2} onPress={toggleModal2}>
                <Text style={styles.textbotao} >Cancelar</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={excluidoModalVisible2}
        onRequestClose={() => setExcluidoModalVisible2(false)}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textbotao}>Serviço concluido com sucesso!</Text>
            <TouchableOpacity
              style={styles.bot3}
              onPress={() => setExcluidoModalVisible2(false)}>
              <Text style={styles.textbotao2}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>






      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={toggleModal}>
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.textbotao}>Deseja excluir esse serviço?</Text>
              <View style={styles.bots}>
              <TouchableOpacity style={styles.bot} onPress={() => remover()}>
                <Text style={styles.textbotao2} >Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bot2} onPress={toggleModal}>
                <Text style={styles.textbotao} >Cancelar</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={excluidoModalVisible}
        onRequestClose={() => setExcluidoModalVisible(false)}>
        <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textbotao}>Serviço excluído com sucesso!</Text>
            <TouchableOpacity
              style={styles.bot3}
              onPress={() => atualiza()}>
              <Text style={styles.textbotao2}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

       
          
    </View>
  );
};

export default Componente;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#fff',
    borderColor: '#053F5C',
    marginTop: 10,
    borderBottomWidth: 3,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },

  text: {
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
    fontSize: 18,
    color: '#053F5C',
  },

  text2: {
    fontSize: 14,
    color: '#053F5C',
    fontFamily: 'Urbanist_700Bold',
    maxWidth: 230,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 15,
    marginHorizontal: 25,
  },

  botao: {
    width: "49%",
    height: 44,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#053F5C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 4,
  },

  botao2: {
    width: "49%",
    height: 44,
    backgroundColor: '#053F5C',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: 'center',
    marginBottom: 20,
    elevation: 4,
    
    
  
  },

  textbotao: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
  },
  
  textbotao2: {
    fontSize: 14,
    color: '#053F5C',
    fontFamily: 'Urbanist_900Black',
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#053F5C',
    margin: 20,
    width: 280,
    height: 140,
    borderRadius: 20,
    padding: 35,
    elevation: 5,
    
  },
  bot:{
    width: 50,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  bot2:{
    width: 80,
    height: 30,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  bot3:{
    width: 80,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20
  },
  bots:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20
  },
  img: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
  },
});
