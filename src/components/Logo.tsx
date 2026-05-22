import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ size = 'md' }: LogoProps) {
  const scale = size === 'sm' ? 0.7 : size === 'lg' ? 1.3 : 1;

  return (
    <View style={[styles.container, { transform: [{ scale }] }]}>
      {/* Houses row */}
      <View style={styles.housesRow}>
        <HouseIcon small />
        <HouseIcon />
        <HouseIcon small />
      </View>
      {/* Trash bin */}
      <View style={styles.trashWrapper}>
        <View style={styles.trashBin}>
          <View style={styles.trashLid} />
          <View style={styles.trashBody}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={styles.trashLine} />
            ))}
          </View>
        </View>
        {/* Recycle arrows */}
        <View style={styles.arrowsRow}>
          <Text style={styles.arrow}>↺</Text>
        </View>
      </View>
    </View>
  );
}

function HouseIcon({ small }: { small?: boolean }) {
  return (
    <View style={[styles.house, small && styles.houseSmall]}>
      <View style={[styles.houseRoof, small && styles.houseRoofSmall]} />
      <View style={[styles.houseBody, small && styles.houseBodySmall]} />
    </View>
  );
}

const C = Colors.dark;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  housesRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginBottom: 6,
  },
  house: {
    alignItems: 'center',
  },
  houseSmall: {
    marginBottom: 4,
  },
  houseRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 16,
    borderRightWidth: 16,
    borderBottomWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: C,
  },
  houseRoofSmall: {
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 11,
  },
  houseBody: {
    width: 24,
    height: 18,
    backgroundColor: C,
    borderRadius: 2,
  },
  houseBodySmall: {
    width: 18,
    height: 14,
  },
  trashWrapper: {
    alignItems: 'center',
  },
  trashBin: {
    alignItems: 'center',
  },
  trashLid: {
    width: 36,
    height: 6,
    backgroundColor: C,
    borderRadius: 3,
    marginBottom: 2,
  },
  trashBody: {
    width: 30,
    height: 28,
    backgroundColor: C,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 4,
  },
  trashLine: {
    width: 3,
    height: 16,
    backgroundColor: Colors.bg,
    borderRadius: 2,
  },
  arrowsRow: {
    marginTop: 4,
  },
  arrow: {
    fontSize: 22,
    color: C,
    fontWeight: '900',
  },
});
