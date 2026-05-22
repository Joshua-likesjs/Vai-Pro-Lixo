import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/context/AuthContext';
import { useForm } from '../../src/hooks/useForm';
import { AppInput } from '../../src/components/AppInput';
import { Logo } from '../../src/components/Logo';
import { Colors, Radius, Shadow } from '../../src/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const { values, errors, handleChange, setError } = useForm({
    email: '',
    senha: '',
  });

  const handleLogin = () => {
    let valid = true;
    if (!values.email.trim()) {
      setError('email', 'Informe seu e-mail');
      valid = false;
    }
    if (!values.senha.trim()) {
      setError('senha', 'Informe sua senha');
      valid = false;
    }
    if (!valid) return;

    setLoading(true);
    setTimeout(() => {
      const ok = login(values.email.trim(), values.senha);
      setLoading(false);
      if (!ok) {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
      }
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoArea}>
            <Logo size="lg" />
            <Text style={styles.appName}>Vai Pro Lixo</Text>
            <Text style={styles.tagline}>Coleta seletiva no seu bolso</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <AppInput
              label="E-mail"
              placeholder="seu@email.com"
              value={values.email}
              onChangeText={(v) => handleChange('email', v)}
              keyboardType="email-address"
              error={errors.email}
            />
            <AppInput
              label="Senha"
              placeholder="••••••••"
              value={values.senha}
              onChangeText={(v) => handleChange('senha', v)}
              isPassword
              error={errors.senha}
            />

            <TouchableOpacity
              style={[styles.btn, loading && styles.btnDisabled]}
              onPress={handleLogin}
              activeOpacity={0.85}
              disabled={loading}
            >
              <Text style={styles.btnText}>{loading ? 'Entrando...' : 'Login'}</Text>
            </TouchableOpacity>
          </View>

          {/* Register link */}
          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.registerText}>
              Não tem conta?{' '}
              <Text style={styles.registerBold}>Criar conta</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  kav: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 40,
    gap: 28,
  },
  logoArea: {
    alignItems: 'center',
    gap: 8,
  },
  appName: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.dark,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: Colors.dark,
    borderRadius: Radius.xl,
    padding: 28,
    ...Shadow.card,
  },
  btn: {
    backgroundColor: Colors.goldBtn,
    borderRadius: Radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    ...Shadow.btn,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  btnText: {
    color: Colors.dark,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  registerLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  registerText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  registerBold: {
    color: Colors.dark,
    fontWeight: '900',
    textDecorationLine: 'underline',
  },
});
