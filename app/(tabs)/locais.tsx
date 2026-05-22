import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLLECTION_POINTS } from '../../src/data/appData';
import { Colors, Radius, Shadow } from '../../src/theme';
import { useAuth } from '../../src/context/AuthContext';

export default function LocaisScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Locais de coleta</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.nome?.charAt(0).toUpperCase() ?? 'U'}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>
          {COLLECTION_POINTS.length} pontos disponíveis perto de você
        </Text>

        {COLLECTION_POINTS.map((point, i) => (
          <TouchableOpacity
            key={point.id}
            style={styles.card}
            activeOpacity={0.85}
          >
            <View style={styles.cardLeft}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberText}>{i + 1}</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{point.name}</Text>
                <Text style={styles.cardAddress}>{point.address}</Text>
              </View>
            </View>
            {point.distance && (
              <View style={styles.distanceBadge}>
                <Text style={styles.distanceText}>{point.distance}</Text>
              </View>
            )}
          </TouchableOpacity>
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
    paddingBottom: 16,
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
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 22,
    paddingBottom: 100,
    gap: 12,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMuted,
    marginBottom: 4,
  },
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadow.card,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.goldLight,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.dark,
    marginBottom: 2,
  },
  cardAddress: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  distanceBadge: {
    backgroundColor: Colors.dark,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  distanceText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.goldLight,
  },
});
