import React, { useState } from 'react';
import { useRouter } from 'expo-router';
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
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Todas');

  // ← FILTRO: quando "Todas" está selecionado, mostra tudo; senão filtra por categoria
  const filteredTips = activeCategory === 'Todas'
    ? TIPS
    : TIPS.filter((tip) => tip.category === activeCategory);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dicas de coleta</Text>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => router.push('/(tabs)/perfil')}
          activeOpacity={0.85}
        >
          <Text style={styles.avatarText}>
            {user?.nome?.charAt(0).toUpperCase() ?? 'U'}
          </Text>
        </TouchableOpacity>
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
        {filteredTips.length > 0 ? (
          filteredTips.map((tip) => (
            <View key={tip.id} style={styles.card}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>{tip.icon}</Text>
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipText}>{tip.text}</Text>
                <Text style={styles.tipCategory}>{tip.category}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>
              Nenhuma dica encontrada para "{activeCategory}"
            </Text>
          </View>
        )}
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
  tipContent: {
    flex: 1,
    gap: 4,
  },
  tipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark,
    lineHeight: 21,
  },
  tipCategory: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 40,
    gap: 8,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
