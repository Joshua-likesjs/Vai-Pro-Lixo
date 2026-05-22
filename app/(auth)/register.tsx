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

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const { values, errors, handleChange, setError } = useForm({
    nome: '',
    email: '',
    senha: '',
    idade: '',
  });

  const handleRegister = () => {
    let valid = true;

    if (!values.nome.trim()) { setError('nome', 'Informe seu nome'); valid = false; }
    if (!values.email.trim()) { setError('email', 'Informe seu e-mail'); valid = false; }
    if (!/\S+@\S+\.\S+/.test(values.email)) { setError('email', 'E-mail inválido'); valid = false; }
    if (!values.senha || values.senha.length < 6) { setError('senha', 'Mínimo 6 caracteres'); valid = false; }
    if (!values.idade.trim() || isNaN(Number(values.idade))) { setError('idade', 'Informe uma idade válida'); valid = false; }

    if (!valid) return;

    setLoading(true);
    setTimeout(() => {
      const ok = register({
        nome: values.nome.trim(),
        email: values.email.trim(),
        senha: values.senha,
        idade: values.idade.trim(),
      });
      setLoading(false);
      if (!ok) {
        Alert.alert('Erro', 'Este e-mail já está cadastrado.');
      }
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoArea}>
            <Logo size="md" />
            <Text style={styles.appName}>Criar Conta</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <AppInput
              label="Nome completo"
              placeholder="Seu nome"
              value={values.nome}
              onChangeText={(v) => handleChange('nome', v)}
              error={errors.nome}
              autoCapitalize="words"
            />
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
              placeholder="Mínimo 6 caracteres"
              value={values.senha}
              onChangeText={(v) => handleChange('senha', v)}
              isPassword
              error={errors.senha}
            />
            <AppInput
              label="Idade"
              placeholder="Ex: 25"
              value={values.idade}
              onChangeText={(v) => handleChange('idade', v)}
              keyboardType="number-pad"
              error={errors.idade}
            />

            <TouchableOpacity
              style={[styles.btn, loading && styles.btnDisabled]}
              onPress={handleRegister}
              activeOpacity={0.85}
              disabled={loading}
            >
              <Text style={styles.btnText}>
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Back to login */}
          <TouchableOpacity
            style={styles.backLink}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>
              Já tem conta? <Text style={styles.backBold}>Fazer login</Text>
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
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 40,
    gap: 24,
  },
  logoArea: {
    alignItems: 'center',
    gap: 10,
  },
  appName: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.dark,
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
  btnDisabled: { opacity: 0.7 },
  btnText: {
    color: Colors.dark,
    fontSize: 17,
    fontWeight: '800',
  },
  backLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  backText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  backBold: {
    color: Colors.dark,
    fontWeight: '900',
    textDecorationLine: 'underline',
  },
});
