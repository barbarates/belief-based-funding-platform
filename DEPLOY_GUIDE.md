# 🚀 Guia Completo de Deploy - PeopleFi

## 📋 Índice
1. [Smart Contract Solana](#1-smart-contract-solana)
2. [Sistema de Autenticação](#2-sistema-de-autenticação)
3. [Deploy do Frontend](#3-deploy-do-frontend)

---

## 1. Smart Contract Solana

### Passo 1: Instalação das Ferramentas

```bash
# 1. Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# 2. Instalar Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"

# 3. Instalar Anchor
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest

# Verificar instalações
rustc --version
solana --version
anchor --version
```

### Passo 2: Configurar Solana

```bash
# Configurar para Devnet
solana config set --url https://api.devnet.solana.com

# Criar keypair (sua carteira de deploy)
solana-keygen new --outfile ~/.config/solana/id.json

# Verificar seu endereço
solana address

# Pegar SOL de teste (2 SOL por vez, máximo 5 vezes)
solana airdrop 2
solana airdrop 2
solana balance
```

### Passo 3: Build e Deploy do Smart Contract

```bash
# Ir para o diretório do programa
cd solana-program

# Build inicial
anchor build

# Pegar o Program ID gerado
solana address -k target/deploy/peoplefi-keypair.json
# Copie este endereço! Exemplo: Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS
```

### Passo 4: Atualizar Program ID

Edite estes 2 arquivos com o Program ID copiado:

**1. solana-program/programs/peoplefi/src/lib.rs** (linha 4):
```rust
declare_id!("SEU_PROGRAM_ID_AQUI");
```

**2. solana-program/Anchor.toml** (linha 8):
```toml
[programs.devnet]
peoplefi = "SEU_PROGRAM_ID_AQUI"
```

### Passo 5: Rebuild e Deploy

```bash
# Rebuild com o Program ID correto
anchor build

# Deploy no Devnet (requer ~5-10 SOL)
anchor deploy

# Se der erro de fundos insuficientes:
solana airdrop 2
# E tente novamente
```

### Passo 6: Atualizar Frontend

Edite **src/config/solana.ts**:
```typescript
programIds: {
  peopleFi: new PublicKey('SEU_PROGRAM_ID_AQUI'), // Cole o Program ID aqui
  // ... resto do código
}
```

### Passo 7: Testar o Smart Contract

```bash
# Rodar testes
cd solana-program
anchor test

# Se os testes passarem, está tudo OK! ✅
```

---

## 2. Sistema de Autenticação

### Configuração Supabase

O sistema já está configurado com Supabase. Você precisa:

1. **Desabilitar confirmação de email (para testes rápidos)**:
   - Acesse: https://supabase.com/dashboard/project/fxkosgidlkrbcesfvzso/auth/providers
   - Vá em "Email" → Desmarque "Confirm email"

2. **Testar o sistema**:
   - Acesse sua aplicação
   - Crie uma nova conta
   - Faça login
   - Complete o KYC

### Funcionalidades Já Implementadas ✅

- ✅ Login/Signup
- ✅ Perfis de usuário
- ✅ Sistema KYC
- ✅ Configurações de segurança
- ✅ Histórico de transações blockchain
- ✅ Audit logs

---

## 3. Deploy do Frontend

### Opção A: Deploy Direto no Lovable (Mais Fácil)

1. Clique no botão **"Publish"** no canto superior direito
2. Seu site estará disponível em: `seusite.lovable.app`
3. Pronto! ✅

### Opção B: Deploy em Vercel

1. **Conectar ao GitHub**:
   - No Lovable: Settings → GitHub → Connect

2. **Deploy na Vercel**:
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Para produção
vercel --prod
```

3. **Configurar variáveis de ambiente na Vercel**:
   - Vá em Project Settings → Environment Variables
   - Adicione:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

### Opção C: Deploy em Netlify

1. **Build da aplicação**:
```bash
npm run build
```

2. **Deploy**:
```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Para produção
netlify deploy --prod
```

---

## 🎯 Checklist Final

### Smart Contract
- [ ] Rust instalado
- [ ] Solana CLI instalado e configurado
- [ ] Anchor instalado
- [ ] SOL suficiente na wallet (~10 SOL)
- [ ] Smart contract deployed com sucesso
- [ ] Program ID atualizado no frontend
- [ ] Testes passando

### Backend/Autenticação
- [ ] Supabase configurado
- [ ] Tabelas criadas (profiles, investments, etc.)
- [ ] RLS policies ativas
- [ ] Email confirmation desabilitado (para testes)

### Frontend
- [ ] Build sem erros
- [ ] Program ID atualizado em `src/config/solana.ts`
- [ ] Testado localmente
- [ ] Deploy realizado

---

## 🔧 Troubleshooting

### "Insufficient funds for deploy"
```bash
# Pegar mais SOL
solana airdrop 2
# Máximo 5 airdrops. Se não for suficiente, use um faucet:
# https://faucet.solana.com/
```

### "Program ID mismatch"
- Certifique-se de atualizar o Program ID em TODOS os lugares após o build
- Sempre faça `anchor build` DEPOIS de atualizar o Program ID

### Erro ao conectar wallet no site
- Certifique-se de ter o Phantom Wallet instalado
- Mude a rede para Devnet no Phantom
- Peça SOL de teste: https://faucet.solana.com/

### Erro no KYC/Login
- Verifique se as tabelas do Supabase foram criadas
- Verifique as RLS policies
- Verifique se o email confirmation está desabilitado

---

## 📞 Próximos Passos

Depois do deploy:

1. **Testar tudo em Devnet**:
   - Criar campanhas
   - Fazer investimentos
   - Votar em milestones
   - Liberar fundos

2. **Quando estiver pronto para produção (Mainnet)**:
   - Mudar configuração em `Anchor.toml`
   - Deploy novamente (CUSTA SOL REAL!)
   - Atualizar configuração em `src/config/solana.ts`
   - Deploy do frontend atualizado

3. **Marketing e Usuários**:
   - Adicionar domínio customizado
   - Criar documentação
   - Tutorial em vídeo
   - Anunciar em redes sociais

---

## 💡 Dicas Importantes

- **Devnet é GRATUITO**: Teste tudo antes de ir para Mainnet
- **Guarde suas keys**: Backup de `~/.config/solana/id.json`
- **Monitore custos**: Deploy na Mainnet custa SOL real
- **Atualizações**: Sempre teste em Devnet primeiro

---

**Sucesso no seu projeto! 🚀**
