import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Adicionar() {
  return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.content}>
        <StatusBar backgroundColor="#f8C868" translucent={true} />
          <View style={styles.detalhe}>
            <Text style={styles.text1}>Nome do cliente</Text>
          </View>
          <View style={styles.area}>
            <Text style={styles.text2}>Contato: </Text>

            <Text style={styles.text2}>Local: </Text>
            <Text style={styles.text2}>Bike: </Text>
            <Text style={styles.text2}>Descrição da bike: </Text>

            

            <Text style={styles.text2}>Data: </Text>
            <Text style={styles.text2}>Horário: </Text>

            <Text style={styles.text2}>Descrição do serviço: </Text>

            <Text style={styles.text2}>Pagamento: </Text>

            <Text style={styles.text2}>Despesas:</Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8C868'
  },
  content: {
    marginBottom: 90,
  },
  detalhe: {
    paddingLeft: 20,
    paddingBottom: 25,
    paddingTop: 10,
    paddingRight: 20,
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#053F5C',
  },
  text2: {
    fontSize: 16,
    fontFamily: 'Urbanist_700Bold',
    color: '#053F5C',
    marginBottom: 5,
    marginTop: 10,
    textAlign: 'center',
  },
});
