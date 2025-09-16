import {Tabs} from 'expo-router';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

export default function TabsSLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 8,
        },
      }}>
      <Tabs.Screen
        name='map/index'
        options={{
          title: 'Map',
          tabBarIcon: ({focused, size}) => <Ionicons name={focused ? 'map' : 'map-outline'} size={size} />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name='objects/index'
        options={{
          title: 'Objects',
          tabBarIcon: ({focused, size}) => <Ionicons name={focused ? 'pin' : 'pin-outline'} size={size} />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name='news/index'
        options={{
          title: 'News',
          tabBarIcon: ({focused, size}) => (
            <Ionicons name={focused ? 'newspaper' : 'newspaper-outline'} size={size} />
          ),
          headerTitle: 'News',
        }}
      />

      <Tabs.Screen
        name='routs/index'
        options={{
          title: 'Routs',
          tabBarIcon: ({focused, size}) => (
            <Ionicons name={focused ? 'navigate' : 'navigate-outline'} size={size} />
          ),
          headerTitle: 'Routs',
        }}
      />

      <Tabs.Screen
        name='account/index'
        options={{
          title: 'Account',
          tabBarIcon: ({focused, size}) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={size} />
          ),
          headerTitle: 'Account',
        }}
      />
    </Tabs>
  );
}
