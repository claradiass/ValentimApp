// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Button,
//   Modal,
//   StatusBar,
// } from 'react-native';
// import { Feather } from '@expo/vector-icons';

// import Wind from '../assets/Wind2.png';
// import bike from '../assets/bike.png';
// import { useNavigation } from '@react-navigation/native';

// const Componente = ({ data }) => {
//   const navigation = useNavigation();

//   const [modalVisible, setModalVisible] = useState(false);

//   const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);

//   const toggleModal = () => {
//     setModalVisible(!modalVisible);
//   };

//   const mostrarMensagemExcluido = () => {
//     setExcluidoModalVisible(true);
//     toggleModal();
//   };

//   const [modalVisible2, setModalVisible2] = useState(false);

//   const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);

//   const toggleModal2 = () => {
//     setModalVisible2(!modalVisible2);
//   };

//   const mostrarMensagemExcluido2 = () => {
//     setExcluidoModalVisible2(true);
//     toggleModal2();
//   };

 
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.text}> {data.aparelho} </Text>
//         <TouchableOpacity activeOpacity={0.7} onPress={toggleModal}>
//           <Feather
//             name="trash-2"
//             color="#F7AD19"
//             size={22}
//             style={{ alignSelf: 'center' }}
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.content}>
//         <View>
//           <Text style={styles.text2}>Cliente: {data.cliente} </Text>
//           <Text style={styles.text2}>Contato: {data.contato} </Text>
//           <Text style={styles.text2}>Endereço: {data.endereco} </Text>
//           <Text style={styles.text2}>Marcado para: {data.data} </Text>
//           <Text style={styles.text2}>Horário: {data.hora} </Text>
//           <Text style={styles.text2}>Descrição da bike: {data.descricaoBike} </Text>
//           <Text style={styles.text2}>Descrição do serviço: {data.tipoM} </Text>
//           <Text style={styles.text2}>Pagamento: {data.pagamento} </Text>
//         </View>
//         <Image source={bike} style={styles.img} />
//       </View>

//       <View style={{flexDirection: 'row', justifyContent: "space-around"}}>
//       <TouchableOpacity
//         style={styles.botao}
//         activeOpacity={0.7}
//         onPress={() => navigation.navigate('Concluir')}>
//         <Text style={styles.textbotao2}>Atualizar</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.botao2}
//         activeOpacity={0.7}
//         onPress={toggleModal2}>
//         <Text style={styles.textbotao}>Concluir</Text>
//       </TouchableOpacity>
//       </View>

//       <View>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible2}
//           onRequestClose={toggleModal2}>
//           <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.textbotao}>Deseja concluir serviço?</Text>
//               <View style={styles.bots}>
//               <TouchableOpacity style={styles.bot} onPress={mostrarMensagemExcluido2}>
//                 <Text style={styles.textbotao2} >Sim</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.bot2} onPress={toggleModal2}>
//                 <Text style={styles.textbotao} >Cancelar</Text>
//               </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={excluidoModalVisible2}
//         onRequestClose={() => setExcluidoModalVisible2(false)}>
//         <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.textbotao}>Serviço concluido com sucesso!</Text>
//             <TouchableOpacity
//               style={styles.bot3}
//               onPress={() => setExcluidoModalVisible2(false)}>
//               <Text style={styles.textbotao2}>Fechar</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>






//       <View>
//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={toggleModal}>
//           <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               <Text style={styles.textbotao}>Deseja excluir esse serviço?</Text>
//               <View style={styles.bots}>
//               <TouchableOpacity style={styles.bot} onPress={mostrarMensagemExcluido}>
//                 <Text style={styles.textbotao2} >Sim</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.bot2} onPress={toggleModal}>
//                 <Text style={styles.textbotao} >Cancelar</Text>
//               </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>
//       </View>

//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={excluidoModalVisible}
//         onRequestClose={() => setExcluidoModalVisible(false)}>
//         <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" translucent={true} />
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.textbotao}>Serviço excluído com sucesso!</Text>
//             <TouchableOpacity
//               style={styles.bot3}
//               onPress={() => setExcluidoModalVisible(false)}>
//               <Text style={styles.textbotao2}>Fechar</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
      
//     </View>
//   );
// };

// export default Componente;

// const styles = StyleSheet.create({
//   container: {
//     margin: 10,
//     backgroundColor: '#fff',
//     borderColor: '#053F5C',
//     marginTop: 10,
//     borderBottomWidth: 3,
//   },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },

//   text: {
//     fontFamily: 'Urbanist_900Black',
//     textAlign: 'center',
//     fontSize: 18,
//     color: '#053F5C',
//   },

//   text2: {
//     fontSize: 14,
//     color: '#053F5C',
//     fontFamily: 'Urbanist_700Bold',
//     maxWidth: 230,
//   },

//   img: {
//     resizeMode: 'contain',
//     width: 70,
//     height: 70,
//   },

//   content: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     alignContent: 'center',
//     marginBottom: 15,
//     marginHorizontal: 25,
//   },

//   botao: {
//     width: 150,
//     height: 44,
//     backgroundColor: '#fff',
//     borderWidth: 3,
//     borderColor: '#053F5C',
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginBottom: 10,
//     elevation: 4,
//   },

//   botao2: {
//     width: 150,
//     height: 44,
//     backgroundColor: '#053F5C',
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginBottom: 10,
//     elevation: 4,
//   },

//   textbotao: {
//     fontSize: 14,
//     color: 'white',
//     fontFamily: 'Urbanist_900Black',
//     textAlign: 'center',
//   },

//   textbotao2: {
//     fontSize: 14,
//     color: '#053F5C',
//     fontFamily: 'Urbanist_900Black',
//     textAlign: 'center',
//   },

//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#053F5C',
//     margin: 20,
//     width: 280,
//     height: 140,
//     borderRadius: 20,
//     padding: 35,
//     elevation: 5,
    
//   },
//   bot:{
//     width: 50,
//     height: 30,
//     backgroundColor: '#F7AD19',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center'
//   },
//   bot2:{
//     width: 80,
//     height: 30,
//     borderWidth: 2,
//     borderRadius: 10,
//     borderColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
    
//   },
//   bot3:{
//     width: 80,
//     height: 30,
//     backgroundColor: '#F7AD19',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//     marginTop: 20
//   },
//   bots:{
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 20,
//     marginTop: 20
//   }
// });


import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Modal } from 'react-native';
import { Feather, MaterialCommunityIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function ItemListaManutencaoPendente ({ data, setData, toggleModal, IconeLixeira }) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [excluidoModalVisible, setExcluidoModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [excluidoModalVisible2, setExcluidoModalVisible2] = useState(false);

  
  const isDataPassada = (data) => {
    const dataAtual = new Date().toISOString().split('T')[0];
    return data < dataAtual;
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

  // const servicosAtrasados = data.servicos.data.filter((item) => {
  //   // Verifica se a dataFinalizado é null
  //   return item.attributes.dataFinalizado === null;
  // });

  function formatarData(dataString) {
    const dataISO = new Date(dataString);
    const dia = dataISO.getDate();
    const diaFormatado = dia < 10 ? `0${dia}` : dia;
    const dataFormatada = `${diaFormatado}/${dataISO.getMonth() + 1}/${dataISO.getFullYear()}`;
    return dataFormatada;
}

  // const figuras = () => {
  //   if (data.attributes.aparelho === 'Geladeira') {
  //     return (
  //       <Image
  //         source={require('./imagens/geladeira.png')} // ou {uri: 'https://caminho.com/imagem.jpg'} para imagens da web
  //         style={{ width: 30, height: 30 }} // ajuste o estilo conforme necessário
  //       />
  //     );
  //   } else if (data.attributes.aparelho === 'Ar-condicionado') {
  //     return (
  //       <Image
  //         source={require('./imagens/arcondicionado.png')} // ou {uri: 'https://caminho.com/imagem.jpg'} para imagens da web
  //         style={{ width: 30, height: 30, marginHorizontal: 5 }} // ajuste o estilo conforme necessário
  //       />
  //     );
  //   } else if (data.attributes.aparelho === 'Freezer') {
  //     return (
  //       <Image
  //         source={require('./imagens/freezer.png')} // ou {uri: 'https://caminho.com/imagem.jpg'} para imagens da web
  //         style={{ width: 30, height: 30, marginHorizontal: 5 }} // ajuste o estilo conforme necessário
  //       />
  //     );
  //   } else {
  //     return (
  //       <Image
  //         source={require('./imagens/outros.png')} // ou {uri: 'https://caminho.com/imagem.jpg'} para imagens da web
  //         style={{ width: 30, height: 30, marginHorizontal: 5 }} // ajuste o estilo conforme necessário
  //       />
  //     );
  //   }
  // };

  
  if(data.attributes.dataFinalizado === null){
    return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}} >
            <Text style={styles.text}>
              {' '}
              {data.attributes.tipo_bike}{' '}
            </Text>
            
          </View>
      
          <TouchableOpacity activeOpacity={0.7} onPress={ () => { setData(data); toggleModal(); }}>
          <IconeLixeira />
          </TouchableOpacity>
          </View>
        
      <View style={styles.content}>
        <View>
          <Text style={styles.text2}>Cliente: {data.attributes.cliente.data.attributes.nome} </Text>
          <Text style={styles.text2}>Contato: {data.attributes.cliente.data.attributes.telefone} </Text>
          <Text style={styles.text2}>Endereço: {data.attributes.cliente.data.attributes.endereco} </Text>
          <Text style={styles.text2}>Iniciado em: {`${formatarData(data.attributes.dataIniciado)} ás ${data.attributes.dataIniciado.split('T')[1].split('.')[0].slice(0, -2).slice(':', -1)}`} </Text>
          <Text style={styles.text2}>Descrição da bike: {data.attributes.descricao_bike} </Text>
          <Text style={styles.text2}>Descrição do serviço: {data.attributes.descricao_servico} </Text>
          <Text style={styles.text2}>Valor do serviço: {data.attributes.valor_total} </Text>
          <Text style={styles.text2}>Status de pagamento: {data.attributes.valorRecebido} </Text>          
          <Text style={styles.text2}>Despesas: {data.attributes.total_despesas} </Text>
      </View>
      <MaterialCommunityIcons name="calendar-alert" size={70} color="#B52D2D" />
      </View>

      <View style={{}}>
      <TouchableOpacity
        style={styles.botao2}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('TelaServicoAtualizar', data)}>
        <Text style={styles.textbotao}>Atualizar</Text>
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
              <TouchableOpacity style={styles.bot} onPress={mostrarMensagemExcluido}>
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
              onPress={() => setExcluidoModalVisible(false)}>
              <Text style={styles.textbotao2}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

       
          
    </View>
  );

  } else {
    return null;
  }
  
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#fff',
    borderColor: '#015C92',
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
    color: '#015C92',
  },

  text2: {
    fontSize: 14,
    color: '#015C92',
    fontFamily: 'Urbanist_700Bold',
    maxWidth: 230,
  },

  img: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 15,
    marginHorizontal: 20,
  },

  botao: {
    width: 150,
    height: 44,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#379BD8',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    elevation: 4,
  },

  botao2: {
    width: '80%',
    height: 44,
    backgroundColor: '#015C92',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 10,
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
    color: '#379BD8',
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
    backgroundColor: '#379BD8',
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
  }
});

