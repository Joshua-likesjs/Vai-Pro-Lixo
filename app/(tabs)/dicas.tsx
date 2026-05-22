import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TIPS } from '../../src/data/appData';
import { Colors, Radius, Shadow } from '../../src/theme';
import { useAuth } from '../../src/context/AuthContext';

const CATEGORIES = ['Todas', 'Reciclagem', 'Segurança', 'Boas práticas'];

export default function DicasScreen() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('Todas');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dicas de coleta</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.nome?.charAt(0).toUpperCase() ?? 'U'}
          </Text>
        </View>
      </View>

      {/* Category pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.pillsScroll}
        contentContainerStyle={styles.pillsContent}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.pill, activeCategory === cat && styles.pillActive]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[styles.pillText, activeCategory === cat && styles.pillTextActive]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {TIPS.map((tip, i) => (
          <View key={tip.id} style={styles.card}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>{tip.icon}</Text>
            </View>
            <Text style={styles.tipText}>{tip.text}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.dark,
    letterSpacing: -0.3,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.goldLight,
  },
  pillsScroll: {
    maxHeight: 50,
    marginBottom: 8,
  },
  pillsContent: {
    paddingHorizontal: 22,
    gap: 8,
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.cardBg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  pillActive: {
    backgroundColor: Colors.dark,
    borderColor: Colors.dark,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  pillTextActive: {
    color: Colors.goldLight,
  },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 22,
    paddingBottom: 100,
    gap: 12,
  },
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.lg,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    ...Shadow.card,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconText: {
    fontSize: 20,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
    lineHeight: 21,
  },
});
