import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, Header } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RandomScale from './Screens/RandomScale';
import RandomArpeggio from './Screens/RandomArpeggio';
import ScaleResources from './Screens/ScaleResources';
import ArpeggioResources from './Screens/ArpeggioResources';
import AdvancedScale from './Screens/AdvancedScale';
import AdvancedArpeggio from './Screens/AdvancedArpeggio';
import More from './Screens/More';
import ScaleDetail from './Screens/ScaleDetail';

import HeaderButton from './Components/HeaderButton';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


/**
 * @description The stack of screens for the Random Tab of the navigation.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const RandomStack = ({ navigation }) => {
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
        }}
      />
      <Stack.Screen 
        name="Random Arpeggio Practice" 
        component={RandomArpeggio}
        options={{
          headerRight: () => (
            <HeaderButton
              handler={()=>{navigation.navigate("Random Scale Practice")}} 
            >
              Scales
            </HeaderButton>
          ),
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
  return (
    <Stack.Navigator>
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
        options={{
          headerRight: () => (
            <HeaderButton
              handler={()=>{navigation.navigate("Scale Resources")}}
            >
              Scales
            </HeaderButton>
          ),
        }}
      />
      <Stack.Screen
        name="Scale Detail"
        component={ScaleDetail}
        options={({ route }) => ({ title: route.params.name })}
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
  return (
    <Stack.Navigator>
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
        options={{
          headerRight: () => (
            <HeaderButton
              handler={()=>{navigation.navigate("Advanced Scale Practice")}}
            >
              Scales
            </HeaderButton>
          ),
        }}
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
  return (
    <Stack.Navigator>
      <Stack.Screen name="More" component={More} />
    </Stack.Navigator>
  )
}


/**
 * @description The main tab navigation of the app.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const App = () => {
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
          activeTintColor: 'purple',
          inactiveTintColor: 'gray',
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
