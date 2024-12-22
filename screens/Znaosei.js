import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import Componente from './components/Componente';
import results from './components/Resultados';

import { useNavigation } from '@react-navigation/native';

import { Linking } from 'react-native';


import {
  useFonts,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  Urbanist_800ExtraBold,
  Urbanist_900Black,
} from '@expo-google-fonts/urbanist';

export default function Home() {

  const NumeroWhatsApp = '55083993923869'

  const handleWhatsAppPress = () => {
  const url = `whatsapp://send?phone=${NumeroWhatsApp}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("O WhatsApp não está instalado no dispositivo.");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('Erro ao abrir o WhatsApp:', err));
};


  const renderItem = ({ item }) => <Text>{item.title}</Text>;

  const renderEmptyItem = () => <View style={styles.emptyItem} />;

  const navigation = useNavigation();

  const [list, setList] = useState(results);

  

  const [fontLoaded] = useFonts({
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
    Urbanist_800ExtraBold,
    Urbanist_900Black,
  });

  if (!fontLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.detalhe}>
          <Text style={styles.text1}>Resumo de suas atividades</Text>
        </View>

        <Text style={styles.text3}>Ana Dias</Text>

        <View style={{borderBottomWidth: 2, borderColor:'#053F5C'}}>
        <Text style={styles.text4}>Semanal</Text>
        <View style={{marginBottom: 15}}>
          <View style={styles.header}>
            <Text style={styles.text2}>Atividades: </Text>
            <Text style={styles.text2}> 4 </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.text2}>Horas de duração: </Text>
            <Text style={styles.text2}> 3h 46min </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.text2}>Distância total: </Text>
            <Text style={styles.text2}> 178,6km </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.text2}>Maior distância da semana: </Text>
            <Text style={styles.text2}> 57,9km </Text>
          </View>
          </View>
        </View>

        <View style={{borderBottomWidth: 2, borderColor:'#053F5C'}}>
        <Text style={styles.text4}>Mensal</Text>
        <View style={{marginBottom: 15}}>
          <View style={styles.header}>
            <Text style={styles.text2}>Atividades: </Text>
            <Text style={styles.text2}> 16 </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.text2}>Horas de duração: </Text>
            <Text style={styles.text2}> 20h 46min </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.text2}>Distância total: </Text>
            <Text style={styles.text2}> 458,6km </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.text2}>Maior distância da semana: </Text>
            <Text style={styles.text2}> 89,0km </Text>
          </View>
          </View>
        </View>

        <View style={{borderBottomWidth: 2, borderColor:'#053F5C'}}>
        <Text style={styles.text4}>Anual</Text>
        <View style={{marginBottom: 15}}>
          <View style={styles.header}>
            <Text style={styles.text2}>Atividades: </Text>
            <Text style={styles.text2}> 100 </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.text2}>Horas de duração: </Text>
            <Text style={styles.text2}> 134h 23min </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.text2}>Distância total: </Text>
            <Text style={styles.text2}> 3,800km </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.text2}>Maior distância da semana: </Text>
            <Text style={styles.text2}> 96,3km </Text>
          </View>
          </View>
        </View>
        
        <Text style={styles.text5}>Sua bike necessita de uma manuntenção!</Text>
        <TouchableOpacity onPress={handleWhatsAppPress}>
  <Text style={styles.text6}>Agende aqui</Text>
</TouchableOpacity>

      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

    // paddingBottom: 100
  },
  content: {
    marginBottom: 90,
  },
  detalhe: {
    backgroundColor: '#053F5C',
    posistion: 'absolute',

    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
  },
  text1: {
    fontSize: 25,
    fontFamily: 'Urbanist_900Black',
    color: '#F7AD19',
    marginTop: 24,
    alignSelf: "center",
    marginBottom: 15,
  },
  input: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#fff',
    margin: 10,
    padding: 5,
    paddingLeft: 15,
    fontFamily: 'Urbanist_700Bold',
    color: '#fff',
  },
  emptyItem: {
    height: 200, 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    marginHorizontal: 20,
    marginTop: 5,
  },
  text2: {
    fontSize: 14,
    color: '#053F5C',
    fontFamily: 'Urbanist_700Bold',
    maxWidth: 300,
  },
  text3: {
    fontSize: 18,
    fontFamily: 'Urbanist_900Black',
    color: '#053F5C',
    marginTop: 10,
    alignSelf: "center",
    marginBottom: 10
  },
  text4: {
    fontSize: 16,
    fontFamily: 'Urbanist_900Black',
    color: '#053F5C',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10
  },
  text5: {
    fontSize: 18,
    fontFamily: 'Urbanist_900Black',
    color: '#053F5C',
    marginTop: 40,
    alignSelf: "center",
    marginBottom: 10,
    textAlign: "center"
  },
  text6: {
    fontSize: 18,
    fontFamily: 'Urbanist_900Black',
    color: '#053F5C',
    alignSelf: "center",
    marginBottom: 10,
    textAlign: "center"
  },
 
});
