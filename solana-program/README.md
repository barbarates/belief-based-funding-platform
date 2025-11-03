# PeopleFi Solana Program

Smart contract para crowdfunding descentralizado na Solana.

## 🚀 Funcionalidades

- ✅ Criar campanhas de crowdfunding
- ✅ Investir em campanhas
- ✅ Sistema de milestones com votação
- ✅ Liberação de fundos baseada em aprovação da comunidade
- ✅ Cancelamento de campanhas

## 📋 Pré-requisitos

1. **Instalar Rust e Solana CLI:**
```bash
# Instalar Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Instalar Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Verificar instalação
solana --version
```

2. **Instalar Anchor:**
```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest

# Verificar instalação
anchor --version
```

3. **Configurar Solana para Devnet:**
```bash
solana config set --url https://api.devnet.solana.com

# Criar keypair (se não tiver)
solana-keygen new

# Pegar SOL de teste
solana airdrop 2
```

## 🔨 Build e Deploy

### 1. Build do programa:
```bash
cd solana-program
anchor build
```

### 2. Pegar o Program ID:
```bash
solana address -k target/deploy/peoplefi-keypair.json
```

### 3. Atualizar Program ID:
- Copie o Program ID gerado
- Atualize em `lib.rs` na linha `declare_id!("SEU_PROGRAM_ID_AQUI")`
- Atualize em `Anchor.toml` na seção `[programs.devnet]`

### 4. Rebuild:
```bash
anchor build
```

### 5. Deploy no Devnet:
```bash
anchor deploy
```

### 6. Atualizar no Frontend:
Atualize o arquivo `src/config/solana.ts`:
```typescript
programIds: {
  peopleFi: new PublicKey('SEU_PROGRAM_ID_AQUI'),
  // ...
}
```

## 🧪 Testes

```bash
anchor test
```

## 📖 Instruções do Programa

### CreateCampaign
Cria uma nova campanha de crowdfunding.

**Parâmetros:**
- `title`: String (max 100 chars)
- `description`: String (max 500 chars)
- `goal_amount`: u64 (em lamports)
- `deadline`: i64 (Unix timestamp)
- `milestones`: Vec<MilestoneData>

### Invest
Investe em uma campanha ativa.

**Parâmetros:**
- `amount`: u64 (em lamports)

### VoteMilestone
Vota em um milestone da campanha.

**Parâmetros:**
- `milestone_index`: u8
- `approve`: bool

### ReleaseMilestoneFunds
Libera fundos de um milestone aprovado.

**Parâmetros:**
- `milestone_index`: u8

### CancelCampaign
Cancela uma campanha (apenas o criador).

## 🏗️ Estrutura de Dados

### Campaign
- `creator`: Pubkey
- `title`: String
- `description`: String
- `goal_amount`: u64
- `raised_amount`: u64
- `deadline`: i64
- `status`: CampaignStatus
- `milestones`: Vec<MilestoneData>

### Investment
- `investor`: Pubkey
- `campaign`: Pubkey
- `amount`: u64
- `invested_at`: i64

### MilestoneData
- `title`: String
- `description`: String
- `amount`: u64
- `status`: MilestoneStatus
- `votes_for`: u64
- `votes_against`: u64
- `voters`: Vec<Pubkey>

## 💰 Custos Estimados

- **Deploy do programa**: ~5-10 SOL
- **Criar campanha**: ~0.01-0.02 SOL
- **Investir**: Taxa de transação (~0.000005 SOL)

## 🔒 Segurança

- Sistema de PDAs (Program Derived Addresses) para contas
- Validação de inputs
- Sistema de votação ponderado por investimento
- Fundos em escrow até aprovação de milestones

## 📚 Recursos

- [Documentação Anchor](https://www.anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Solana Developer Docs](https://docs.solana.com/)

## 🆘 Troubleshooting

### Erro: "Insufficient funds"
```bash
solana airdrop 2
```

### Erro: "Program ID mismatch"
Certifique-se de que o Program ID está atualizado em todos os lugares após o build.

### Erro no deploy
Verifique se tem SOL suficiente:
```bash
solana balance
```
