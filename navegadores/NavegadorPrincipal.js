import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import TelaServicoVisualizar from '../screens/TelaServicoVisualizar';
import TelaServicoListaConcluidos from '../screens/TelaServicoListaConcluidos'
import Proximos from '../screens/Znaosei2'
import TelaServicoAtualizar from '../screens/TelaServicoAtualizar'
import TelaLogin from '../screens/TelaLogin'
import TelaServicoListaPendentes from '../screens/TelaServicoListaPendentes'
import TelaClienteAdicionar from '../screens/TelaClienteAdicionar'
import TelaClienteAtualizar from '../screens/TelaClienteAtualizar'
import TelaAgendamento from '../screens/TelaAgendamento'
import TelaServicoAdicionar from '../screens/TelaServicoAdicionar'
import TelaAgendaAdicionar from '../screens/TelaAgendaAdicionar';
import TelaAgendaAtualizar from '../screens/TelaAgendaAtualizar';
import TelaClienteServicos from '../screens/TelaClienteServicos'
import TelaClienteServicosConcluidos from '../screens/TelaClienteServicosConcluidos'
import TelaClienteServicosPendentes from '../screens/TelaClienteServicosPendentes'




import TabRoutes from './NavegadorBottomTab';

const Stack = createNativeStackNavigator();

export default function NavegadorPrincipal({navigation}){
  return (
    <>
      <StatusBar backgroundColor="#053F5C" barStyle="light-content" />
      <Stack.Navigator>

        <Stack.Screen
          name="TelaLogin"
          component={TelaLogin}
          options={{
            headerShown: false,
          }}
        />

        
        <Stack.Screen
          name="Principal"
          component={TabRoutes}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TelaServicoListaConcluidos"
          component={TelaServicoListaConcluidos}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Proximos"
          component={Proximos}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TelaServicoVisualizar"
          component={TelaServicoVisualizar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TelaServicoListaPendentes"
          component={TelaServicoListaPendentes}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TelaServicoAtualizar"
          component={TelaServicoAtualizar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TelaClienteAdicionar"
          component={TelaClienteAdicionar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TelaClienteAtualizar"
          component={TelaClienteAtualizar}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TelaAgendamento"
          component={TelaAgendamento}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="TelaServicoAdicionar"
          component={TelaServicoAdicionar}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TelaAgendaAdicionar"
          component={TelaAgendaAdicionar}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TelaAgendaAtualizar"
          component={TelaAgendaAtualizar}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TelaClienteServicos"
          component={TelaClienteServicos}
          options={{
            headerShown: false,
            statusBarColor: "#053F5C"

          }}
        />

<Stack.Screen
          name="TelaClienteServicosConcluidos"
          component={TelaClienteServicosConcluidos}
          options={{
            headerShown: false,
            statusBarColor: "#053F5C"

          }}
        />

        <Stack.Screen
          name="TelaClienteServicosPendentes"
          component={TelaClienteServicosPendentes}
          options={{
            headerShown: false,
            statusBarColor: "#053F5C"

          }}
        />

        

      </Stack.Navigator>
      </>
  );
}
