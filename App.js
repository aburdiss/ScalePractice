import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, Header } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDarkMode } from 'react-native-dynamic'

import RandomScale from './src/Random/RandomScale';
import RandomArpeggio from './src/Random/RandomArpeggio';
import ScaleResources from './src/Resources/ScaleResources';
import ArpeggioResources from './src/Resources/ArpeggioResources';
import AdvancedScale from './src/Advanced/AdvancedScale';
import AdvancedArpeggio from './src/Advanced/AdvancedArpeggio';
import More from './src/More/More';
import ScaleDetail from './src/Resources/ScaleDetail';

import HeaderButton from './src/Components/HeaderButton';

import { colors } from './src/Model';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


/**
 * @description The stack of screens for the Random Tab of the navigation.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const RandomStack = ({ navigation }) => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Random Scale Practice" 
        component={RandomScale}
        options={{
          headerRight: () => (
            <HeaderButton 
              handler={() => { navigation.navigate("Random Arpeggio Practice")}}
            >
              Arpeggios
            </HeaderButton>
          ),
          headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
          headerTitleStyle: {
            color: DARKMODE ? colors.white : colors.black,
          },
          headerStyle: {
            backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
            borderBottomWidth: 1,
          borderBottomColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          shadowColor: 'transparent',
          }
        }}
      />
      <Stack.Screen 
        name="Random Arpeggio Practice" 
        component={RandomArpeggio}
        options={{
          headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
          headerTitleStyle: {
            color: DARKMODE ? colors.white : colors.black,
          },
          headerStyle: {
            backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          }
        }}
      />
    </Stack.Navigator>
  )
}


/**
 * @description The stack of screens for the resources tab of the navigation.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const ResourcesStack = ({ navigation }) => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          shadowColor: 'transparent',
        }
      }}
    >
      <Stack.Screen 
        name="Scale Resources" 
        component={ScaleResources}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={()=>{navigation.navigate("Arpeggio Resources")}}
            >
              Arpeggios
            </HeaderButton>
          ),
         
        }}
      />
      <Stack.Screen 
        name="Arpeggio Resources" 
        component={ArpeggioResources} 
      />
      <Stack.Screen
        name="Scale Detail"
        component={ScaleDetail}
        options={({ route }) => ({ 
          title: route.params.name,
        })}
      />
    </Stack.Navigator>
  );
}


/**
 * @description The stack of screens for the Advanced tab of the navigation.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const AdvancedStack = ({ navigation }) => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          shadowColor: 'transparent',
        }
      }}
    >
      <Stack.Screen 
        name="Advanced Scale Practice" 
        component={AdvancedScale}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={()=>{navigation.navigate("Advanced Arpeggio Practice")}}
            >
              Arpeggios
            </HeaderButton>
          ),
        }}
      />
      <Stack.Screen 
        name="Advanced Arpeggio Practice" 
        component={AdvancedArpeggio}
      />
    </Stack.Navigator>
  );
}


/**
 * @description The stack of screens for the More tab of the navigation.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const MoreStack = () => {
  const DARKMODE = useDarkMode();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        headerTitleStyle: {
          color: DARKMODE ? colors.white : colors.black,
        },
        headerStyle: {
          backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
          borderBottomWidth: 1,
          borderBottomColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          shadowColor: 'transparent',
        }
      }}
    >
      <Stack.Screen
        name="More"
        component={More}
      />
    </Stack.Navigator>
  )
}


/**
 * @description The main tab navigation of the app.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const App = () => {
  const DARKMODE = useDarkMode();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;
            if (route.name === 'Random') {
              iconName = 'md-cube';
            } else if (route.name === 'Resources') {
              iconName = 'md-book';
            } else if (route.name === 'Advanced') {
              iconName = 'md-create';
            } else if (route.name === 'More') {
              iconName = 'md-settings';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
          inactiveTintColor: colors.systemGray,
          style: {
            backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
            borderTopColor: DARKMODE ? colors.systemGray5Dark : colors.systemGray5Light,
          }
        }}>
        <Tab.Screen
          name="Random"
          component={RandomStack}
          options={{title: 'Random'}}
        />
        <Tab.Screen
          name="Resources"
          component={ResourcesStack}
          options={{title: 'Resources'}}
        />
        <Tab.Screen
          name="Advanced"
          component={AdvancedStack}
          options={{title: 'Advanced'}}
        />
        <Tab.Screen 
          name="More"
          component={MoreStack} 
          options={{title: 'More'}} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
