import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  StatusBar,
  Image
} from 'react-native';

import { configAxios, baseUrlClientes } from '../util/constantes';
import axios from 'axios';
import IconePessoa from '../assets/cliente.png';


import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';import ItemListaCliente from '../components/ItemListaClientes';

export default function TelaClientesLista({route, navigation}) {
  const [clientes, setClientes] = useState([]);
  const [atualizaLista, setAtualizaLista] = useState(0);
  const [data, setData] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const mostrarMensagemExcluido = () => {
    setExcluidoModalVisible(true);
    toggleModal();
  };

  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
  };

  const mostrarMensagemExcluido2 = () => {
    setExcluidoModalVisible2(true);
    toggleModal2();
  };

  const iconePessoa = () => {
    return <Image source={IconePessoa} style={styles.img} />;
  };
  const iconeLixeira = () => {
    return (
      <Feather
        name="trash-2"
        color="#053F5C"
        size={22}
        style={{ alignSelf: 'center' }}
      />
    );
  };

  useEffect( () => {
    navigation.navigate('Login')
  }, [])


  useEffect(() => {
    axios
      .get(baseUrlClientes + '?populate=*', configAxios)
      .then( function (response) {
        if (response.status == 200) {
          console.log("Lista: ", response.data.data)
          setList(response.data.data);
          setClientes(response.data.data);
          setAtualizaLista(false);
        } else {
          console.log("Falha nas consultados dos clientes.");
        }         
      })
      .catch( (error) => {
        console.log(error);
      } )
  }, [atualizaLista, route.params]);

  function remover() {
    // console.log(data)
    axios
      .delete(baseUrlClientes + data.id, configAxios)
      .then(function (response) {
        if (response.status == 200) {
          setAtualizaLista(atualizaLista + 1);
          mostrarMensagemExcluido();
        } else {
          Alert.alert('Erro', 'Houve um erro na comunicação com o servidor!');
        }
      })
      .catch((error) => {
        Alert.alert('Erro', 'Houve um erro na comunicação com o servidor!');
        console.log(error);
      });
  }

  function atualiza() {
    
    axios
      .get(baseUrlClientes + '?populate=*', configAxios)
      .then(function (response) {
        if (response.status == 200) {
          setList(response.data.data);
          setClientes(response.data.data);
          setExcluidoModalVisible(false);
        }
      })
      .catch((error) => {
        Alert.alert('Erro', 'Houve um erro na comunicação com o servidor!');
        console.log(error);
      });
  }

  useEffect(() => {
    atualiza();
  }, [atualizaLista, route.params]);

  

  const renderItem = ({ item }) => (
    <ItemListaCliente
      data={item}
      setData={setData}
      toggleModal={toggleModal}
      IconePessoa={iconePessoa}
      IconeLixeira={iconeLixeira}
    />
  );
  const renderEmptyItem = () => <View style={styles.emptyItem} />;


  useEffect(() => {
    if (searchText === '') {
      setList(clientes);
    } else {
      setList(
        clientes.filter(
          (item) =>
            item.attributes.nome.toLowerCase().indexOf(searchText.toLowerCase()) > -1 
        )
      );
    }
  }, [searchText]);

  const ordenar = () => {
    let newList = [...list];

    newList.sort((a, b) => {
      const nomeA = a.attributes.nome.toLowerCase();
      const nomeB = b.attributes.nome.toLowerCase();

      return ascendingOrder
        ? nomeA > nomeB
          ? 1
          : nomeB > nomeA
          ? -1
          : 0
        : nomeA > nomeB
        ? -1
        : nomeB > nomeA
        ? 1
        : 0;
    });

    setList(newList);
    setAscendingOrder(!ascendingOrder);
  };

  console.log(clientes)

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.detalhe}>
          <Text style={styles.text1}>Clientes:</Text>
          <View>
            <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <TextInput
              style={styles.input}
              placeholder="Busque aqui o cliente"
              placeholderTextColor="#FFF"
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={ordenar}>
              <MaterialCommunityIcons
                name="order-alphabetical-ascending"
                size={28}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        </View>
        </View>

        {/* {list.length > 0 ? (
          <FlatList
            data={list} 
            keyExtractor={(item) => item.id.toString()} // Certifique-se de converter o ID para uma string
            renderItem={renderItem}
            ListFooterComponent={renderEmptyItem}
          />
        ) : (
          <Text>Nenhum resultado encontrado</Text>
        )} */}

        <View style={[styles.button, styles.menu]}>
          <TouchableOpacity onPress={() => navigation.navigate('TelaClienteAdicionar')}>
            <Ionicons name="ios-person-add-outline" size={28} color="#FFF" />
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
              <Text style={styles.textbotao}>Deseja concluir cliente?</Text>
              <View style={styles.bots}>
                <TouchableOpacity
                  style={styles.bot}
                  onPress={mostrarMensagemExcluido2}>
                  <Text style={styles.textbotao2}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bot2} onPress={toggleModal2}>
                  <Text style={styles.textbotao}>Cancelar</Text>
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
            <Text style={styles.textbotao}>cliente concluido com sucesso!</Text>
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
              <Text style={styles.textbotao}>Deseja excluir esse cliente?</Text>
              <View style={styles.bots}>
                <TouchableOpacity style={styles.bot} onPress={() => remover()}>
                  <Text style={styles.textbotao2}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bot2} onPress={toggleModal}>
                  <Text style={styles.textbotao}>Cancelar</Text>
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
            <Text style={styles.textbotao}>cliente excluído com sucesso!</Text>
            <TouchableOpacity style={styles.bot3} onPress={() => atualiza()}>
              <Text style={styles.textbotao2}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  detalhe: {
    backgroundColor: '#053F5C',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#F7AD19',
    marginTop: 20,
  },
  input: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#FFF',
    margin: 10,
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: '#FFF',
    width: '85%',
  },
  emptyItem: {
    height: 200,
  },
  button: {
    right: 20,
    bottom: 80,
    zIndex: 1,
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#053F5C',
    shadowRadius: 10,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10,
    },
  },
  menu: {
    backgroundColor: '#053F5C',
  },
  img: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
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
});
