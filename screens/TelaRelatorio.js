// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   ScrollView,
// } from 'react-native';

// import Grafico from './components/Grafico';

// export default function Mes() {
//   return (
//     <ScrollView style={styles.container}>
//       <SafeAreaView style={styles.content}>
//         <View style={styles.detalhe}>
//           <Text style={styles.text1}>Resumo mensal!</Text>
//         </View>

//         <Grafico />

//         <View style={{ marginTop: 30 }}>
//           <View style={styles.inf}>
//             <View style={styles.quadrado1} />
//             <Text style={styles.text5}>Despesas</Text>
//           </View>

//           <View style={styles.inf}>
//             <View style={styles.quadrado2} />
//             <Text style={styles.text5}>Lucro</Text>
//           </View>
//         </View>

//         <View style={{ marginTop: 30 }}>
//           <Text style={styles.text4}>Total do valor recebido: </Text>
//           <Text style={styles.text4}>Despesas: </Text>
//           <Text style={styles.text4}>Lucro: </Text>
//         </View>
//       </SafeAreaView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   content: {
//     marginBottom: 90,
//   },
//   detalhe: {
//     posistion: 'absolute',
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: '#053F5C',
//     borderBottomRightRadius: 40,
//     borderBottomLeftRadius: 40,
//     paddingLeft: 20,
//     paddingBottom: 30,
//     paddingTop: 10,
//     paddingRight: 20,
//   },
//   text1: {
//     fontSize: 30,
//     fontFamily: 'Urbanist_900Black',
//     color: '#F7AD19',
//     textAlign: 'center',
//     marginTop: 20,
//   },

//   text4: {
//     textAlign: 'center',
//     fontFamily: 'Urbanist_900Black',
//     color: '#053F5C',
//     fontSize: 16,
//     marginTop: 10,
//   },

//   text5: {
//     textAlign: 'center',
//     fontFamily: 'Urbanist_900Black',
//     color: '#053F5C',
//     fontSize: 16,
//     marginLeft: 10,
//   },

//   quadrado1: {
//     height: 25,
//     width: 25,
//     backgroundColor: '#F7AD19',
//     borderRadius: 50,
//     alignSelf: 'center',
//   },

//   quadrado2: {
//     height: 25,
//     width: 25,
//     backgroundColor: '#053F5C',
//     borderRadius: 50,
//     alignSelf: 'center',
//   },
//   inf: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });








import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {View, Text, StyleSheet} from 'react-native';



import TabTop from "../navegadores/NavegadorRelatorios"
export default function TelaRelatorio() {
  return (
    
        <View style={styles.container}>
        <View style={styles.detalhe}>
          <Text style={styles.text1}>Relatório</Text>
        </View>
        <TabTop/>
          
        </View>
    

  );
};


const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#F7AD19',
    marginTop: 20,
  },
  detalhe: {
    backgroundColor: '#053F5C',
    posistion: 'absolute',
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 20,
  },
})