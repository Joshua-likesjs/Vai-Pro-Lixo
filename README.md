<p align="center">
  <img src="assets/icon.png" alt="Vai Pro Lixo" width="120" height="120" />
</p>

<h1 align="center">Vai Pro Lixo ♻️</h1>

<p align="center">
  <strong>Coleta seletiva no seu bolso</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-SDK%2056-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo SDK 56" />
  <img src="https://img.shields.io/badge/React%20Native-0.85-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Expo%20Router-56-FF6B35?style=for-the-badge" alt="Expo Router" />
</p>

---

## 📖 Sobre o Projeto

**Vai Pro Lixo** é um aplicativo mobile desenvolvido com React Native e Expo que tem como objetivo facilitar o acesso à informação sobre coleta seletiva. O app permite que os usuários encontrem pontos de coleta próximos, acompanhem o calendário semanal de coleta por tipo de resíduo, acessem dicas de reciclagem e boas práticas, e gerenciem seu perfil de uso — seja para residências ou empresas.

A proposta central é colocar a informação sobre descarte correto de resíduos diretamente no bolso do cidadão, promovendo a conscientização ambiental e facilitando o dia a dia de quem deseja contribuir com a sustentabilidade.

---

## ✨ Funcionalidades

### 🔐 Autenticação
- **Login** com e-mail e senha, incluindo validação de campos obrigatórios e feedback visual de erros.
- **Registro** de nova conta com campos de nome, e-mail, senha (mínimo 6 caracteres) e idade, com validação completa (formato de e-mail, campos vazios, etc.).
- Proteção de rotas: usuários não autenticados são redirecionados para a tela de login; usuários autenticados são redirecionados para a home.

### 🏠 Home
- Saudação personalizada com o primeiro nome do usuário.
- Exibição do **ponto de coleta mais próximo** com nome, endereço e distância.
- Destaque da **coleta do dia** — mostra automaticamente quais tipos de resíduo são coletados no dia atual.
- **Calendário semanal** com cards para cada dia da semana, indicando os tipos de resíduo coletados. O dia atual é destacado visualmente.

### 📍 Locais de Coleta
- Lista completa de todos os pontos de coleta disponíveis na região.
- Cada ponto exibe nome, endereço e distância em relação ao usuário.
- Contador dinâmico mostrando o total de pontos disponíveis.

### ♻️ Dicas de Coleta
- Catálogo de dicas educativas sobre reciclagem, segurança e boas práticas de descarte.
- **Filtro por categoria**: Todas, Reciclagem, Segurança e Boas práticas.
- Cada dica possui ícone ilustrativo, texto descritivo e indicação de categoria.
- Estado vazio informativo quando não há dicas para a categoria selecionada.

### 👤 Perfil
- Exibição dos dados do usuário: nome, e-mail e idade.
- Seleção do **tipo de uso** (Empresa 🏢 ou Casa 🏠), com persistência da escolha.
- Estatísticas do usuário (coletas registradas e locais favoritos).
- Botão de **logout** com confirmação via alerta.

---

## 🛠️ Tecnologias e Ferramentas

| Tecnologia | Versão | Uso |
|---|---|---|
| [Expo](https://expo.dev/) | SDK 56 | Plataforma de desenvolvimento |
| [React Native](https://reactnative.dev/) | 0.85.3 | Framework mobile multiplataforma |
| [TypeScript](https://www.typescriptlang.org/) | ~6.0.3 | Tipagem estática |
| [Expo Router](https://docs.expo.dev/router/introduction/) | ^56.2.5 | Navegação baseada em arquivos |
| [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context) | ^5.8.0 | Gerenciamento de áreas seguras |
| [React Native Screens](https://github.com/software-mansion/react-native-screens) | ^4.25.2 | Otimização de telas nativas |
| [React Native Web](https://necolas.github.io/react-native-web/) | ^0.21.2 | Suporte web |

---

## 📁 Estrutura do Projeto

```
Vai-Pro-Lixo/
├── app/                          # Rotas (Expo Router - file-based routing)
│   ├── _layout.tsx               # Layout raiz + proteção de rotas
│   ├── index.tsx                 # Redirecionamento inicial → login
│   ├── (auth)/                   # Grupo de rotas de autenticação
│   │   ├── _layout.tsx           # Layout do grupo auth (Stack + slide animation)
│   │   ├── login.tsx             # Tela de login
│   │   └── register.tsx          # Tela de registro
│   └── (tabs)/                   # Grupo de rotas autenticadas (Tabs)
│       ├── _layout.tsx           # Layout de navegação por abas
│       ├── home.tsx              # Tela principal (home)
│       ├── locais.tsx            # Tela de pontos de coleta
│       ├── dicas.tsx             # Tela de dicas de coleta
│       └── perfil.tsx            # Tela de perfil do usuário
├── src/                          # Código-fonte compartilhado
│   ├── components/               # Componentes reutilizáveis
│   │   ├── AppInput.tsx          # Input customizado com label, erro e toggle de senha
│   │   └── Logo.tsx              # Logo ilustrativa do app (casas + lixeira + reciclagem)
│   ├── context/
│   │   └── AuthContext.tsx        # Contexto de autenticação (login, register, logout, updateUser)
│   ├── data/
│   │   ├── appData.ts            # Dados estáticos (pontos de coleta, agenda, dicas)
│   │   └── storage.ts            # Camada de persistência (in-memory, placeholder)
│   ├── hooks/
│   │   └── useForm.ts            # Hook genérico para gerenciamento de formulários
│   └── theme.ts                  # Design tokens (cores, fontes, raios, sombras)
├── assets/                       # Ícones e imagens do app
├── app.json                      # Configuração do Expo
├── metro.config.js               # Configuração do bundler Metro
├── tsconfig.json                 # Configuração do TypeScript
├── package.json                  # Dependências e scripts
└── package-lock.json             # Lockfile
```

---

## 🎨 Design System

O app utiliza um sistema de design consistente definido em `src/theme.ts`:

### Paleta de Cores

| Token | Cor | Uso |
|---|---|---|
| `bg` | `#F0DC7A` | Fundo principal (amarelo dourado) |
| `dark` | `#1A3C34` | Cor primária escura (verde escuro) |
| `goldBtn` | `#C89A15` | Botões de ação (dourado) |
| `goldLight` | `#D4A520` | Textos destacados sobre fundo escuro |
| `cardBg` | `#E8D065` | Fundo de cards (amarelo claro) |
| `textMuted` | `#3A6055` | Textos secundários (verde médio) |
| `white` | `#FFFFFF` | Textos sobre fundo escuro |

### Tipografia

A fonte utilizada é a **Nunito** com variações de peso: Regular (400), SemiBold (600), Bold (700), ExtraBold (800) e Black (900).

### Raios de Borda

| Token | Valor |
|---|---|
| `sm` | 10px |
| `md` | 14px |
| `lg` | 18px |
| `xl` | 24px |
| `full` | 999px (pill) |

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (instalado globalmente)
- [Android Studio](https://developer.android.com/studio) (para emulador Android) ou [Xcode](https://developer.apple.com/xcode/) (para emulador iOS)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Joshua-likesjs/Vai-Pro-Lixo.git

# Entre no diretório do projeto
cd Vai-Pro-Lixo

# Instale as dependências
npm install
```

### Executando

```bash
# Inicie o servidor de desenvolvimento
npm start

# Ou rode diretamente em uma plataforma específica
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
```

Ao executar `npm start`, o Expo Dev Server será iniciado e você poderá:
- Escanear o QR Code com o app **Expo Go** no seu celular
- Pressionar `a` para abrir no emulador Android
- Pressionar `i` para abrir no simulador iOS
- Pressionar `w` para abrir no navegador web

---

## 🧭 Arquitetura e Decisões Técnicas

### Navegação

A navegação é gerenciada pelo **Expo Router** com roteamento baseado em arquivos. A estrutura utiliza dois grupos de rotas:

- **`(auth)`**: Telas de login e registro, acessíveis apenas por usuários não autenticados.
- **`(tabs)`**: Telas principais do app (Home, Locais, Dicas, Perfil), organizadas em navegação por abas.

A proteção de rotas é feita no `_layout.tsx` raiz, que verifica o estado de autenticação e redireciona automaticamente entre os grupos.

### Gerenciamento de Estado

- **AuthContext**: Utiliza a Context API do React para gerenciar o estado de autenticação globalmente. Fornece funções de `login`, `register`, `logout` e `updateUser`.
- **useForm**: Hook customizado e genérico para gerenciamento de formulários, controlando valores e erros de forma tipada.

### Persistência de Dados

Atualmente, o app utiliza um armazenamento **in-memory** simples (`src/data/storage.ts`) como placeholder. Em produção, recomenda-se a substituição por:

- **AsyncStorage** para dados gerais
- **expo-secure-store** para dados sensíveis (como senhas)
- **SQLite** para dados relacionais mais complexos

### Dados Estáticos

Os dados de pontos de coleta, agenda semanal e dicas estão definidos em `src/data/appData.ts` como constantes. Em uma versão futura, esses dados podem ser migrados para uma API REST ou banco de dados local.

---

## 📱 Telas do App

| Tela | Descrição |
|---|---|
| **Login** | Autenticação com e-mail e senha, validação de campos e navegação para registro |
| **Registro** | Criação de conta com nome, e-mail, senha e idade, com validação completa |
| **Home** | Ponto mais próximo, coleta do dia e calendário semanal de coleta |
| **Locais** | Lista de todos os pontos de coleta com distância |
| **Dicas** | Dicas educativas filtráveis por categoria |
| **Perfil** | Dados do usuário, tipo de uso, estatísticas e logout |

---

## 🗺️ Roadmap

Ideias para evolução do projeto:

- [ ] Integração com **AsyncStorage** para persistência real dos dados do usuário
- [ ] Conexão com API de **geolocalização** para calcular distâncias reais
- [ ] **Mapa interativo** com marcadores dos pontos de coleta
- [ ] Sistema de **notificações push** para lembretes de coleta
- [ ] **Gamificação** com pontos e conquistas por descartes corretos
- [ ] Cadastro de **novos pontos de coleta** pela comunidade
- [ ] Internacionalização (i18n) para suporte a múltiplos idiomas
- [ ] Testes unitários e de integração com **Jest** e **React Testing Library**
- [ ] Publicação nas lojas (Google Play e App Store)

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Siga os passos abaixo:

1. **Fork** este repositório
2. Crie uma **branch** para sua feature (`git checkout -b feature/minha-feature`)
3. Faça o **commit** das suas alterações (`git commit -m 'feat: adiciona minha feature'`)
4. Faça o **push** para a branch (`git push origin feature/minha-feature`)
5. Abra um **Pull Request**

### Padrão de Commits

Utilizamos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

| Tipo | Descrição |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Alteração em documentação |
| `style` | Formatação, sem mudança de lógica |
| `refactor` | Refatoração de código |
| `test` | Adição ou alteração de testes |
| `chore` | Tarefas de build, dependências, etc. |

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com ♻️ por <a>Arthur</a>
</p>