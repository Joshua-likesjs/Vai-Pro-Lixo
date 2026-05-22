import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/context/AuthContext';
import { Colors, Radius, Shadow } from '../../src/theme';

export default function PerfilScreen() {
  const { user, logout, updateUser } = useAuth();
  const [tipoUso, setTipoUso] = useState<'empresa' | 'casa' | ''>(user?.tipoUso ?? '');

  const handleTipoUso = (tipo: 'empresa' | 'casa') => {
    setTipoUso(tipo);
    updateUser({ tipoUso: tipo });
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {user?.nome?.charAt(0).toUpperCase() ?? 'U'}
            </Text>
          </View>
          <Text style={styles.avatarName}>{user?.nome}</Text>
          <Text style={styles.avatarEmail}>{user?.email}</Text>
        </View>

        {/* Info card */}
        <View style={styles.card}>
          <InfoRow label="Nome" value={user?.nome ?? ''} />
          <View style={styles.divider} />
          <InfoRow label="E-mail" value={user?.email ?? ''} />
          <View style={styles.divider} />
          <InfoRow label="Idade" value={`${user?.idade ?? ''} anos`} />
        </View>

        {/* Tipo de uso */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tipo de uso</Text>
          <View style={styles.tipoRow}>
            <TouchableOpacity
              style={[styles.tipoBtn, tipoUso === 'empresa' && styles.tipoBtnActive]}
              onPress={() => handleTipoUso('empresa')}
              activeOpacity={0.8}
            >
              <Text style={styles.tipoIcon}>🏢</Text>
              <Text
                style={[styles.tipoBtnText, tipoUso === 'empresa' && styles.tipoBtnTextActive]}
              >
                Empresa
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tipoBtn, tipoUso === 'casa' && styles.tipoBtnActive]}
              onPress={() => handleTipoUso('casa')}
              activeOpacity={0.8}
            >
              <Text style={styles.tipoIcon}>🏠</Text>
              <Text
                style={[styles.tipoBtnText, tipoUso === 'casa' && styles.tipoBtnTextActive]}
              >
                Casa
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Coletas registradas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Locais favoritos</Text>
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <Text style={styles.logoutText}>🚪 Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
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
    paddingBottom: 110,
    paddingTop: 12,
    gap: 20,
  },
  avatarSection: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  avatarText: {
    fontSize: 38,
    fontWeight: '900',
    color: Colors.goldLight,
  },
  avatarName: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.dark,
    letterSpacing: -0.3,
  },
  avatarEmail: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.lg,
    padding: 18,
    ...Shadow.card,
  },
  infoRow: {
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: Colors.textMuted,
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(26,60,52,0.15)',
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
  tipoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  tipoBtn: {
    flex: 1,
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 6,
    borderWidth: 2,
    borderColor: 'transparent',
    ...Shadow.card,
  },
  tipoBtnActive: {
    backgroundColor: Colors.dark,
    borderColor: Colors.goldLight,
  },
  tipoIcon: {
    fontSize: 26,
  },
  tipoBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.dark,
  },
  tipoBtnTextActive: {
    color: Colors.goldLight,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.dark,
    borderRadius: Radius.lg,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.goldLight,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textLightMuted,
    textAlign: 'center',
  },
  logoutBtn: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(26,60,52,0.2)',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.dark,
  },
});
