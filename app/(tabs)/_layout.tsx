import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '../../src/theme';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    home: '🏠',
    locais: '📍',
    dicas: '♻️',
    perfil: '👤',
  };

  return (
    <View style={[styles.iconWrapper, focused && styles.iconActive]}>
      <Text style={styles.iconEmoji}>{icons[name] ?? '●'}</Text>
      <Text style={[styles.iconLabel, focused && styles.iconLabelActive]}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="locais"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="locais" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="dicas"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="dicas" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="perfil" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.dark,
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 82 : 68,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    opacity: 0.5,
  },
  iconActive: {
    opacity: 1,
  },
  iconEmoji: {
    fontSize: 20,
  },
  iconLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
  },
  iconLabelActive: {
    color: Colors.goldLight,
  },
});
