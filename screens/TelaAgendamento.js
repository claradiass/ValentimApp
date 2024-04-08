import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { Calendar, LocaleConfig } from 'react-native-calendars';

import { AntDesign, Entypo } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import resultados from '../dados/Resultados'; 

export default function TelaAgendamento() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const markedDatesObj = {};

    const dotColors = ['#F7AD19'];

    resultados.forEach((item, index) => {
      const formattedDate = item.data;

      if (!markedDatesObj[formattedDate]) {
        markedDatesObj[formattedDate] = {
          dots: [{ color: dotColors[index % dotColors.length] }], 
        };
      } else {
        markedDatesObj[formattedDate].dots.push({
          color: dotColors[index % dotColors.length],
        });
      }
    });

    setMarkedDates(markedDatesObj);
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.detalhe}>
          <Text style={styles.text1}>Marcar para:</Text>
        </View>

        <View style={{ marginTop: '20%' }}>
        <Text style={styles.text2}>Veja como está a sua agenda</Text>
          <Calendar
            onDayPress={() => navigation.navigate('adicionar')}
            markingType="multi-dot"
            markedDates={markedDates}
            theme={{
              calendarBackground: '#053F5C',
              dayTextColor: '#FFF',
              todayTextColor: '#FFF',
              selectedDayBackgroundColor: '#F7AD19',
              selectedDayTextColor: '#FFF',
              textSectionTitleColor: '#F7AD19',
              monthTextColor: '#FFF',
              todayBackgroundColor: '#F7AD19',
              arrowColor: '#FFF',
              dotSize: 200,
            }}
            style={{borderRadius: 10, margin: 20}}
          />
        </View>
      </SafeAreaView>

      <View style={[styles.button, styles.menu]}>
        <TouchableOpacity onPress={() => navigation.navigate('Adicionar')}>
          <AntDesign name="plus" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  detalhe: {
    backgroundColor: '#053F5C',
    top: 0, // Posicione o detalhe na parte superior
    left: 0,
    right: 0,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 20,
    height: 100,
  },
  text1: {
    fontSize: 30,
    fontFamily: 'Urbanist_900Black',
    color: '#F7AD19',
    marginTop: 25,
  },

  text2: {
    fontSize: 26,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Urbanist_900Black',
    color: '#053F5C',
    marginTop: 25,
    marginBottom: 15,
  },

  button: {
    right: 20,
    bottom: 30,
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
});
