import React, { useState } from 'react';
import { View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import TelaServicoLista from '../screens/TelaServicoLista'
import TelaRelatorio from '../screens/TelaRelatorio'
import TelaAgenda from '../screens/TelaAgenda';
import TelaClientesLista from '../screens/TelaClientesLista'

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#053F5C',
          position: 'absolute',
          borderTopWidth: 0,
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          borderRadius: 8,
          height: 60,
        },
      }}>
       <Tab.Screen
        name="TelaClientesLista"
        component={TelaClientesLista}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    borderRadius: 50,
                    height: 50,
                    backgroundColor: '#F7AD19',
                    width: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    elevation: 10,
                  }}>
                  <MaterialIcons
                    name="directions-bike"
                    color="#053F5C"
                    size={29}
                    style={{ alignSelf: 'center' }}
                  />
                </View>
              );
            }
            return <MaterialIcons name="directions-bike" color="#F7AD19" size={29} />;
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />


      <Tab.Screen
        name="TelaAgenda"
        component={TelaAgenda}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    borderRadius: 50,
                    height: 50,
                    backgroundColor: '#F7AD19',
                    width: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    elevation: 10,
                  }}>
                  <Ionicons
                    name="md-calendar-sharp"
                    color="#053F5C"
                    size={28}
                    style={{ alignSelf: 'center' }}
                  />
                </View>
              );
            }
            return (
              <Ionicons name="md-calendar-sharp" color="#F7AD19" size={28} />
            );
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
      <Tab.Screen
        name="TelaServicoLista"
        component={TelaServicoLista}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    borderRadius: 50,
                    height: 50,
                    backgroundColor: '#F7AD19',
                    width: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    elevation: 10,
                  }}>
                  <FontAwesome5
                    name="tools"
                    color="#053F5C"
                    size={26}
                    style={{ alignSelf: 'center' }}
                  />
                </View>
              );
            }
            return <FontAwesome5 name="tools" color="#F7AD19" size={26} />;
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />
      
      

      <Tab.Screen
        name="TelaRelatorio"
        component={TelaRelatorio}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <View
                  style={{
                    borderRadius: 50,
                    height: 50,
                    backgroundColor: '#F7AD19',
                    width: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    elevation: 10,
                  }}>
                  <Ionicons
                    name="ios-bar-chart"
                    color="#053F5C"
                    size={28}
                    style={{ alignSelf: 'center' }}
                  />
                </View>
              );
            }
            return <Ionicons name="ios-bar-chart" color="#F7AD19" size={28} />;
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        }}
      />




    </Tab.Navigator>
  );
}
