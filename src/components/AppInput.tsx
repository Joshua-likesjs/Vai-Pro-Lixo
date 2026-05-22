import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Colors, Radius } from '../theme';

interface AppInputProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
}

export function AppInput({ label, error, isPassword, ...props }: AppInputProps) {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputRow, error ? styles.inputError : null]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.textLightMuted}
          secureTextEntry={isPassword && !show}
          autoCapitalize="none"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShow((s) => !s)} style={styles.eye}>
            <Text style={styles.eyeText}>{show ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: Colors.textLightMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(255,255,255,0.25)',
    paddingBottom: 8,
  },
  inputError: {
    borderBottomColor: '#ff6b6b',
  },
  input: {
    flex: 1,
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
    padding: 0,
  },
  eye: {
    padding: 4,
  },
  eyeText: {
    fontSize: 16,
  },
  errorText: {
    color: '#ff8a80',
    fontSize: 12,
    marginTop: 4,
  },
});
