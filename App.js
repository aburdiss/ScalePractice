import 'react-native-gesture-handler';
import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RandomScale from './Screens/RandomScale';
import RandomArpeggio from './Screens/RandomArpeggio';
import ScaleResources from './Screens/ScaleResources';
import ArpeggioResources from './Screens/ArpeggioResources';
import AdvancedScale from './Screens/AdvancedScale';
import AdvancedArpeggio from './Screens/AdvancedArpeggio';
import More from './Screens/More';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RandomStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Random Scale Practice" 
        component={RandomScale}
        options={{
          headerRight: () => (
            <Button
              onPress={()=>{navigation.navigate("Random Arpeggio Practice")}}
              title="Arpeggios"
              color="purple" 
            />
          ),
        }}
      />
      <Stack.Screen 
        name="Random Arpeggio Practice" 
        component={RandomArpeggio}
        options={{
          headerRight: () => (
            <Button
              onPress={()=>{navigation.navigate("Random Scale Practice")}}
              title="Scales"
              color="purple" 
            />
          ),
        }}
      />
    </Stack.Navigator>
  )
}


const ResourcesStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Scale Resources" 
        component={ScaleResources}
        options={{
          headerRight: () => (
            <Button
              onPress={()=>{navigation.navigate("Arpeggio Resources")}}
              title="Arpeggios"
              color="purple" 
            />
          ),
        }}
      />
      <Stack.Screen 
        name="Arpeggio Resources" 
        component={ArpeggioResources} 
        options={{
          headerRight: () => (
            <Button
              onPress={()=>{navigation.navigate("Scale Resources")}}
              title="Scales"
              color="purple" 
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}


const AdvancedStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Advanced Scale Practice" 
        component={AdvancedScale}
        options={{
          headerRight: () => (
            <Button
              onPress={()=>{navigation.navigate("Advanced Arpeggio Practice")}}
              title="Arpeggios"
              color="purple"
            />
          ),
        }}
      />
      <Stack.Screen 
        name="Advanced Arpeggio Practice" 
        component={AdvancedArpeggio}
        options={{
          headerRight: () => (
            <Button
              onPress={()=>{navigation.navigate("Advanced Scale Practice")}}
              title="Scales"
              color="purple"
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}


const MoreStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="More" component={More} />
    </Stack.Navigator>
  )
}


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
