/**
 * @preserve
 * Desenvolvimento: Ricardo Alvarenga
 * Contato: ricardoinvesting10@gmail.com
 * Youtube: https://www.youtube.com/@ricardoinvesting
 * PIX: ricardoinvesting10@gmail.com
 *             _                   _       _                     _   _             
    ____      (_)                 | |     (_)                   | | (_)            
   / __ \ _ __ _  ___ __ _ _ __ __| | ___  _ _ ____   _____  ___| |_ _ _ __   __ _ 
  / / _` | '__| |/ __/ _` | '__/ _` |/ _ \| | '_ \ \ / / _ \/ __| __| | '_ \ / _` |
 | | (_| | |  | | (_| (_| | | | (_| | (_) | | | | \ V /  __/\__ \ |_| | | | | (_| |
  \ \__,_|_|  |_|\___\__,_|_|  \__,_|\___/|_|_| |_|\_/ \___||___/\__|_|_| |_|\__, |
   \____/                                                                     __/ |
                                                                             |___/ 
 * @endpreserve
 */

/**
 * CONSTANTS.GS
 */
const OPERATIONS = {
    VENDA: "Venda",
    VENDA_DIREITOS: "Venda Direitos de Subscrição",
    BONIFICACAO: "Bonificação em Ativos",
    COMPRA: "Compra",
    COMPRA_DIREITOS: "Compra Direitos de Subscrição",
    RECIBO_DIREITOS: "Recibo de Subscrição em Andamento"
}

const IGNORE_TICKERS = [
    "Opção de Compra",
    "Opção de Venda",
    "Futuro"
]

const CLASS = {
    "ACAO": "Ação",
    "FII": "FII",
    "FIAGRO": "Fiagro",
    "FI_INFRA": "FI-INFRA",
    "BDR": "BDR",
    "ETF": "ETF",
    "STOCK": "STOCK",
    "REIT": "REIT",
    "ETF_EUA": "ETF-EXTERIOR",
    "RENDA_FIXA": "Renda Fixa",
    "CRIPTOMOEDA": "Criptomoeda",
    "RENDA_FIXA_OUTROS": "Renda Fixa - Outros",
}

const IGNORE_IMPORT_B3 = [
    "Direito de Subscrição",
    "Direitos de Subscrição - Não Exercido",
    "Direitos de Subscrição - Exercida",
    "Direitos de Subscrição - Exercido",
    "Cessão de Direitos",
    "Cessão de Direitos - Solicitada",
    "Leilão de Fração",
    "Fração em Ativos",
    "Bonificação em Ativos"
];

const FLAG_PROVENTOS = ["Dividendo", "Juros Sobre Capital Próprio", "Rendimento"];

const SUBSCRICOES_IDS = [12, 13, 14, 15];

const LOADING_IMPORT_B3_MESSAGES = {
    "stage1": "1 - Preparando dados...",
    "stage2": "1 - Preparando dados.</br>1.1 - Continuando de onde parou...",
    "stage3": "1 - Preparando dados.</br>2 - Copiando dados...",
    "stage4": "1 - Preparando dados.</br>2 - Copiando dados.</br>3 - Escrevendo dados na planilha...",
    "stage5": "1 - Preparando dados.</br>2 - Copiando dados.</br>3 - Escrevendo dados na planilha</br>4 - Atualizando cotação...",
    "stage6": "1 - Preparando dados.</br>2 - Copiando dados.</br>3 - Escrevendo dados na planilha</br>4 - Atualizando cotação.</br>5 - Por favor, aguarde...",
}

const ABAS = {
    "INFORMACOES": "A. Informações",
    "B3": "B. B3",
    "IMPORT": "C. Importar de Outra Versão",
    "DASHBOARD": "0. Dashboard",
    "DASHBOARD_CONSOLIDADO": "0.1. Dashboard Consolidado",
    "MEUS_ATIVOS": "1. Meus Ativos",
    "LANCAMENTO_B3": "2. Lançamentos (B3)",
    "LANCAMENTO_MANUAL": "2.1. Lançamentos (Manual)",
    "LANCAMENTO_CDB": "2.2. Lançamentos (CDB/LCI/LCA/LC/RDB/DEBÊNTURES)",
    "EVOLUCAO_PATRIMONIAL": "2.3. Evolução Patrimonial",
    "PROVENTOS": "3. Proventos",
    "AMORTIZACOES": "4. Amortizações",
    "CALENDARIO": "5. Calendário de Dividendos",
    "BALANCEAMENTO": "6. Balanceamento da Carteira",
    "BALANCEAMENTO_ATIVO": "6.1. Balanceamento da Carteira por Ativo",
    "SIMULADOR_PM": "6.2. Simulador de Novo Preço Médio",
    "PRECO_TETO": "7. Preço Teto",
    "MEUS_OBJETIVOS": "8. Meus Objetivos",
    "VENDAS": "9. Vendas",
    "DARF": "10. DARF",
    "BENS_DIREITOS": "11. IR Bens e Direitos",
    "ANOTACOES": "11.1. Anotações",
    "BASE_DADOS": "12. Base de Dados",
    "TABELA_DINAMICA": "99. Tabela Dinamica",
    "TABELA_DINAMICA_CONSOLIDADO": "99. Tabela Dinamica Consolidado",
    "CODIGOS_IRPF": "12.1. Códigos IRPF",
    "COTACAO": "99. Cotação",
    "ALTAS": "99. Altas e Baixas",
    "MOVIMENTACOES_CDB": "99. Movimentações (CDB/LCI/LCA/LC/RDB)",
    "MOVIMENTACOES": "99. Movimentações",
}

const FRASES = [
    "Todo processo acontece fora da zona de conforto.",
    "Aprender a controlar seu orçamento é o modo mais prático de cortar gastos e começar a investir.",
    "Investir em conhecimento rende sempre os melhores juros.",
    "Evitar erros catastróficos é mais importante do que construir o portfólio perfeito.",
    "Invista pensando no longo prazo, não especule, mas, não ignore as flutuações do mercado.",
    "Em vez de se preocupar com o que as pessoas dizem sobre você, por que não investir tempo tentando fazer algo que elas admirem?",
    "Depois que você tem uma base sólida de conhecimento, fica muito mais fácil aprender a investir e lidar com dinheiro.",
    "Você precisa conquistar aquilo que o dinheiro não compra. Caso contrário, será um miserável, ainda que seja um milionário.",
    "Se você almeja ser rico, pense em poupar assim como você pensa em ganhar dinheiro.",
    "Risco vem de você não saber o que está fazendo. Controle o seu dinheiro.",
    "Jamais gaste seu dinheiro antes de você possuí-lo.",
    "Sucesso é a soma de pequenos esforços, repetidos o tempo todo.",
    "Sucesso parece ser, em grande parte, uma questão de continuar depois que outros desistiram.",
    "Eu sei o preço do sucesso: dedicação, trabalho duro, e uma incessante devoção às coisas que você quer ver acontecer.",
    "Motivação é aquilo que te faz começar. Hábito é aquilo que te faz continuar.",
    "A riqueza é o resultado dos seus hábitos diários.",
    "O que sabemos aprendemos fazendo.",
    "Um homem criativo é motivado pelo desejo de alcançar, não pelo desejo de vencer os outros.",
    "Tente mover o mundo – o primeiro passo será mover a si mesmo.",
    "O insucesso é uma oportunidade para recomeçar com mais inteligência.",
    "Ter problemas na vida é inevitável, ser derrotado por eles é opcional.",
    "A diferença entre o inteligente e o sábio, é que o sábio pensa a longo prazo.",
    "A verdadeira riqueza não consiste em ter grandes posses, mas em ter poucas necessidades."
]