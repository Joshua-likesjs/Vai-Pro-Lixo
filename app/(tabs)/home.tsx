import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/context/AuthContext';
import { COLLECTION_POINTS, COLLECTION_SCHEDULE } from '../../src/data/appData';
import { Colors, Radius, Shadow } from '../../src/theme';

const DAY_NAMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const todayIndex = new Date().getDay();
  const nearest = COLLECTION_POINTS[0];

  // Show Mon-Thu schedule (4 cards like mockup)
  const scheduleCards = COLLECTION_SCHEDULE.slice(0, 4);

  const todaySchedule = useMemo(() => {
    const todayName = DAY_NAMES[todayIndex];
    return COLLECTION_SCHEDULE.find((s) =>
      s.shortDay.toLowerCase() === todayName.toLowerCase()
    );
  }, [todayIndex]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá,</Text>
            <Text style={styles.userName}>{user?.nome?.split(' ')[0] ?? 'Usuário'} 👋</Text>
          </View>
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

        {/* Nearest point */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>📍 Ponto de coleta mais próximo</Text>
          <View style={styles.nearestCard}>
            <Text style={styles.nearestName}>{nearest.name}</Text>
            <Text style={styles.nearestAddress}>{nearest.address}</Text>
            <View style={styles.distanceBadge}>
              <Text style={styles.distanceText}>{nearest.distance}</Text>
            </View>
          </View>
        </View>

        {/* Today highlight */}
        {todaySchedule && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>📅 Coleta de hoje</Text>
            <View style={styles.todayCard}>
              <Text style={styles.todayDay}>{todaySchedule.shortDay}</Text>
              <View style={styles.todayTypes}>
                {todaySchedule.types.map((t) => (
                  <View key={t} style={styles.typePill}>
                    <Text style={styles.typePillText}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Weekly schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>🗓️ Calendário semanal</Text>
          <View style={styles.scheduleGrid}>
            {scheduleCards.map((item, i) => {
              const isToday = item.shortDay === DAY_NAMES[todayIndex];
              return (
                <View
                  key={item.day}
                  style={[styles.scheduleCard, isToday && styles.scheduleCardActive]}
                >
                  <Text
                    style={[styles.scheduleDayName, isToday && styles.scheduleDayNameActive]}
                  >
                    {item.shortDay}
                  </Text>
                  {item.types.map((t) => (
                    <Text
                      key={t}
                      style={[styles.scheduleType, isToday && styles.scheduleTypeActive]}
                    >
                      {t}
                    </Text>
                  ))}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 22,
    paddingBottom: 100,
    paddingTop: 8,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  userName: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.dark,
    letterSpacing: -0.5,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.goldLight,
  },
  section: {
    gap: 10,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nearestCard: {
    backgroundColor: Colors.dark,
    borderRadius: Radius.lg,
    padding: 18,
    ...Shadow.card,
  },
  nearestName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
  },
  nearestAddress: {
    fontSize: 13,
    color: Colors.textLightMuted,
    fontWeight: '500',
  },
  distanceBadge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: Colors.goldBtn,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.dark,
  },
  todayCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.lg,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  todayDay: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.dark,
  },
  todayTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  typePill: {
    backgroundColor: Colors.dark,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  typePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.goldLight,
  },
  scheduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  scheduleCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.md,
    padding: 14,
    flex: 1,
    minWidth: '45%',
    gap: 4,
  },
  scheduleCardActive: {
    backgroundColor: Colors.dark,
  },
  scheduleDayName: {
    fontSize: 15,
    fontWeight: '900',
    color: Colors.dark,
    marginBottom: 2,
  },
  scheduleDayNameActive: {
    color: Colors.goldLight,
  },
  scheduleType: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  scheduleTypeActive: {
    color: Colors.textLightMuted,
  },
});
