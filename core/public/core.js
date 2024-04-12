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
]/**
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
 */
/**
 * UTILS.GS
 */

function getUuid() {
    return Utilities.getUuid();
}

function composeAvaiableYears(firstYear, limitYear) {
    const currentYear = new Date().getFullYear();
    let initiate = limitYear;
    const listYears = []
    if (firstYear === currentYear) {
        return listYears.push(currentYear)
    }
    if (firstYear >= limitYear) {
        initiate = firstYear
    }
    for (let i = initiate; i <= currentYear; i++) {
        listYears.push(i);
    }
    return listYears;

}

function composeNode(node, property, value) {
    if (node.hasOwnProperty(property)) {
        node[property] += value;
    } else {
        node = { ...node, [property]: value };
    }
    return node;
}

function isExternal(classe) {
    return [CLASS.ETF_EUA, CLASS.STOCK, CLASS.REIT].includes(classe);
}

function composeCurrencyReal(value) {
    return value.toLocaleString('pt-br', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
}

function calculateAverage(array) {
    const sum = array.reduce((acc, curr) => acc + curr, 0);
    const average = sum / array.length;
    return average;
}

function getSheetId(ticker, trigger = null) {
    const Planilha = SpreadsheetApp.getActiveSpreadsheet();
    const Dash = Planilha.getSheetByName(ABAS.DASHBOARD_CONSOLIDADO);
    return Dash.getSheetId();
}

// function doGet(request) {
//   return HtmlService.createTemplateFromFile('@ricardoinvesting-showIR')
//       .evaluate();
// }

// function include(filename) {
//   return HtmlService.createHtmlOutputFromFile(filename)
//       .getContent();
// }

function getRenderType(classe, qtd) {
    switch (classe) {
        case "Ação":
        case "ETF":
        case "ETF-EXTERIOR":
        case "STOCK":
        case "REIT":
            return isMany(qtd) ? "AÇÕES" : "AÇÃO";
            break;
        case "FII":
        case "FI-INFRA":
        case "Fiagro":
            return isMany(qtd) ? "COTAS" : "COTA";
            break;
        default:
            return isMany(qtd) ? "UNIDADES" : "UNIDADE";
            break;
    }
}

function isMany(qtd) {
    return qtd > 1
}

/**
 * Retorna todos dados da tabela
 */
function getDataRange(guide, initialColNameForLastRow, initialNumberColForLastRow, initialColName, initialColNameNumber, endColName) {
    const lastRow = guide.getLastRow();
    const range = guide.getRange(initialColNameForLastRow + initialNumberColForLastRow + ":" + initialColNameForLastRow + lastRow);
    const values = range.getValues();

    const lastRowWithData = lastRow - values.reverse().findIndex(c => c[0] != '');
    const dataRows = guide.getRange(initialColName + initialColNameNumber + ":" + endColName + lastRowWithData).getValues();
    return dataRows;
}

/**
 * Retorna dados da tabela até uma linha limite
 */
function getDataRangeLimit(guide, initialColName, initialColNameNumber, endColName, lastRow) {

    const range = guide.getRange(initialColName + initialColNameNumber + ":" + endColName + lastRow);
    return range.getValues();
}

function getLastRowInTable(guide, initialColNameForLastRow, initialNumberColForLastRow) {
    const lastRow = guide.getLastRow();
    const range = guide.getRange(initialColNameForLastRow + initialNumberColForLastRow + ":" + initialColNameForLastRow + lastRow);
    const values = range.getValues();

    const lastRowWithData = lastRow - values.reverse().findIndex(c => c[0] != '');
    return lastRowWithData;
}

function validaValor(valor) {
    let deffault = 0;
    if (valor === '-') {
        return deffault;
    }
    if (typeof valor === "string" && valor.indexOf("R") != -1) { return valor.slice(2, valor.length) };
    return valor;
}

function retornaTickerName(texto, delimitador) {
    let array1 = [{}];
    let ticker = "";
    array1 = texto.split(delimitador);
    ticker = array1[0];
    return ticker.toUpperCase();
}

function closeModal(ui) {
    const message_close = '<!DOCTYPE html><html><head><base target="_top"></head><script>window.onload=()=>{google.script.host.close();}</script><body></body></html>';
    ui.showModelessDialog(HtmlService.createHtmlOutput(message_close), "Importação realizada com sucesso!")
}

function newImportB3() {
    const ui = SpreadsheetApp.getUi();
    const Planilha = SpreadsheetApp.getActiveSpreadsheet();
    const GuiaB3 = Planilha.getSheetByName(ABAS.B3);
    const range = GuiaB3.getRange("A3:H");
    let response = ui.alert(
        `Preparar para novos lançamentos, esteja ciente de que ao confirmar iremos apagar todos os dados na aba "${ABAS.B3}", certifique-se de verificar a ultima data de lançamentos para não ter problemas de duplicidade ou falta de lançamentos, deseja realmente continuar este processo é irreversível?`,
        ui.ButtonSet.YES_NO
    );
    if (response === ui.Button.YES) {
        GuiaB3.getRange("J2").setValue(0);
        range.setBackground("white");
        range.clearContent();
        return Browser.msgBox("Tudo pronto para copiar os dados e seguir com procedimento de importação, bons investimentos!");
    } else {
        return Browser.msgBox("Preparação cancelada!");
    }
}


/**
 * Compõe o id da coluna (YYYYMM)
 */
function composeIndiceDate(variant = 1) {
    let yesterday = new Date(new Date().setDate(new Date().getDate() - variant));
    const days = [1, 2, 3, 4, 5];
    if (variant !== 0 && variant !== -1) {
        for (let i = 1; i <= 5; i++) {
            yesterday = new Date(new Date().setDate(new Date().getDate() - i));
            if (days.includes(yesterday.getDay())) {
                console.log(i)
                break;
            }
        }
    }
    const year = yesterday.getFullYear()
    let month = yesterday.getMonth() + 1

    if (month < 10) {
        month = String(0) + month
    }
    const indice = `${year}${month}`
    return indice
}

/**
 * Retorna o total de registros de uma guia
 */
function getTotalRegisterInGuide(guide) {
    let initialLine = 2;
    let totalRegister = 0;
    let row = 0;
    row = initialLine;
    while (guide.getRange(row, 1).isBlank() == false) {
        totalRegister = totalRegister + 1;
        row = row + 1;
    }
    return totalRegister
}

/**
 * Seta um cache script
 * @key chave do cache
 * @value valor do cache em json
 * @condition condição para inserir no cache
 * @expirationTimeMinutes tempo de expiração do cache em minutos
 * 
 */
function setCache(key, value, condition, expirationTimeMinutes = 5) {
    const cache = CacheService.getScriptCache();
    if (condition) {
        cache.put(key, JSON.stringify(value), expirationTimeMinutes * 60)
    }
}

/**
 * Retorna um cache
 */
function getCache(key, keyValue) {
    const cache = CacheService.getScriptCache();
    // cache.remove(ticker);
    const cached = cache.get(key);
    if (cached !== null) {
        const data = JSON.parse(cached);
        return data[keyValue];
    }
}

function removeCache(key) {
    const cache = CacheService.getScriptCache();
    cache.remove(key);
}/**
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
 */

/**
 * MENU.GS
 */

function onOpen() {
    const uuid = Utilities.getUuid();
    const menu = SpreadsheetApp.getUi().createMenu("[@ricardoinvesting]");
    menu.addSubMenu(SpreadsheetApp.getUi().createMenu("🔹 B3")
        .addItem('Importar Lançamentos da B3', 'importarDadosB3'))
    menu.addSubMenu(SpreadsheetApp.getUi().createMenu("🔹 Acionadores")
        .addItem('Criar Acionadores', 'createTrigger')
        .addSeparator()
        .addItem('⛔ Remover Acionadores', 'deleteTrigger'))
    menu.addSubMenu(SpreadsheetApp.getUi().createMenu("🔹 Automações")
        .addItem('Atualizar Cotação', 'updateCotationManual')
        .addItem('Recalcular Preço Médio', 'updatePMManual')
        .addItem('Exibir/Esconder Valores', 'hidden')
        .addItem('Exibir Apenas Abas Principais', 'onlyTabsDefault')
        .addSeparator()
        .addItem("⛔ Resetar Planilha", "clearAll"))
    menu.addSeparator();
    menu.addItem('🔹 Lançamentos', 'showReleases')
    menu.addItem("🔹 IRPF", "showIR");
    menu.addToUi();

    const Sheet = SpreadsheetApp.getActiveSpreadsheet();
    const GuideTDConsolidado = Sheet.getSheetByName(ABAS.TABELA_DINAMICA_CONSOLIDADO);
    GuideTDConsolidado.getRange("V13").setValue(uuid);

}

function clearAll() {
    const ui = SpreadsheetApp.getUi();
    let response = ui.alert(
        'Atenção! Deseja realmente limpar a planilha? Esta ação é irreversível.',
        ui.ButtonSet.YES_NO
    );
    if (response === ui.Button.YES) {

        const Planilha = SpreadsheetApp.getActiveSpreadsheet();
        const GuiaB3 = Planilha.getSheetByName(ABAS.B3);
        GuiaB3.getRange("I3").clearContent();
        GuiaB3.getRange("J2").setValue(0);

        const GuiaLancamentoB3 = Planilha.getSheetByName(ABAS.LANCAMENTO_B3);
        GuiaLancamentoB3.getRange("C2:E").clearContent()
        GuiaLancamentoB3.getRange("I2:L").clearContent();
        GuiaLancamentoB3.getRange("P2:P").clearContent();
        GuiaLancamentoB3.getRange("R2:R").setValue(false);
        GuiaLancamentoB3.getRange("S2:S").clearContent();

        const GuiaLancamentoManual = Planilha.getSheetByName(ABAS.LANCAMENTO_MANUAL);
        GuiaLancamentoManual.getRange("C2:E").clearContent();
        GuiaLancamentoManual.getRange("I2:L").clearContent();
        GuiaLancamentoManual.getRange("P2:P").clearContent();
        GuiaLancamentoManual.getRange("R2:R").setValue(false);
        GuiaLancamentoManual.getRange("S2:S").clearContent();

        const GuiaProventos = Planilha.getSheetByName(ABAS.PROVENTOS);
        GuiaProventos.getRange("B4:E").clearContent();
        GuiaProventos.getRange("G4:I").clearContent();

        const GuiaEvolucao = Planilha.getSheetByName(ABAS.EVOLUCAO_PATRIMONIAL);
        GuiaEvolucao.getRange("D2:E").clearContent();
        GuiaEvolucao.getRange("G2:G").clearContent();

        const GuiaVendas = Planilha.getSheetByName(ABAS.VENDAS);
        GuiaVendas.getRange("B4:C").clearContent();
        GuiaVendas.getRange("H4:M").clearContent();

        const GuiaCotacao = Planilha.getSheetByName(ABAS.COTACAO);
        GuiaCotacao.getRange("D2:D").clearContent();
        GuiaCotacao.getRange("E2:E").clearContent();

        const GuiaDarf = Planilha.getSheetByName(ABAS.DARF);
        GuiaDarf.getRange("C18:C23").setValue(0);
        GuiaDarf.getRange("K18:K24").setValue(0);

        const GuiaMo = Planilha.getSheetByName(ABAS.MEUS_OBJETIVOS);
        GuiaMo.getRange("B2:B21").setValue('PENDENTE');
        GuiaMo.getRange("E2:E21").setValue('-');

        const GuiaPT = Planilha.getSheetByName(ABAS.PRECO_TETO);
        GuiaPT.getRange("B4:B105").clearContent();
        GuiaPT.getRange("G4:G105").clearContent();
        GuiaPT.getRange("H4:H105").clearContent();

        const GuiaBA = Planilha.getSheetByName(ABAS.BALANCEAMENTO_ATIVO);
        GuiaBA.getRange("B4:B103").clearContent();
        GuiaBA.getRange("G4:G103").clearContent();

        const GuiaBC = Planilha.getSheetByName(ABAS.BALANCEAMENTO);
        GuiaBC.getRange("B4:B103").clearContent();
        GuiaBC.getRange("G4:G103").clearContent();

        const GuiaAM = Planilha.getSheetByName(ABAS.AMORTIZACOES);
        GuiaAM.getRange("A2:A").clearContent();
        GuiaAM.getRange("B4:B").clearContent();
        GuiaAM.getRange("C4:C").clearContent();

        const GuiaSimuladorPm = Planilha.getSheetByName(ABAS.SIMULADOR_PM);
        GuiaSimuladorPm.getRange("J4:L").clearContent();

        const GuiaLancamentoCDB = Planilha.getSheetByName(ABAS.LANCAMENTO_CDB);
        GuiaLancamentoCDB.getRange("C2:J").clearContent();

        const GuiaImport = Planilha.getSheetByName(ABAS.IMPORT);
        GuiaImport.getRange("D5:D20").setValue(false);
        GuiaImport.getRange("E5:E20").clearContent();

        const GuiaIR = Planilha.getSheetByName(ABAS.BENS_DIREITOS);
        GuiaIR.getRange("AC2").clearContent();

        const GuiaAnotation = Planilha.getSheetByName(ABAS.ANOTACOES);
        GuiaAnotation.getRange("B5:B").clearContent();
        GuiaAnotation.getRange("D5:D").clearContent();

        const GuiaTDConsolidado = Planilha.getSheetByName(ABAS.TABELA_DINAMICA_CONSOLIDADO);
        GuiaTDConsolidado.getRange("V3:Z7").clearContent();
        GuiaTDConsolidado.getRange("V10").clearContent();
        GuiaTDConsolidado.getRange("V13").clearContent();

        return Browser.msgBox("Reset realizado com sucesso!");
    }

}

function onlyTabsDefault() {

    const Planilha = SpreadsheetApp.getActiveSpreadsheet();
    //show
    Planilha.getSheetByName(ABAS.INFORMACOES).showSheet();
    Planilha.getSheetByName(ABAS.B3).showSheet();
    Planilha.getSheetByName(ABAS.DASHBOARD).showSheet();
    Planilha.getSheetByName(ABAS.MEUS_ATIVOS).showSheet();
    Planilha.getSheetByName(ABAS.LANCAMENTO_B3).showSheet();
    Planilha.getSheetByName(ABAS.LANCAMENTO_MANUAL).showSheet();
    Planilha.getSheetByName(ABAS.VENDAS).showSheet();
    Planilha.getSheetByName(ABAS.DARF).showSheet();
    Planilha.getSheetByName(ABAS.PROVENTOS).showSheet();
    Planilha.getSheetByName(ABAS.DASHBOARD_CONSOLIDADO).showSheet();
    Planilha.getSheetByName(ABAS.ANOTACOES).showSheet();
    Planilha.getSheetByName(ABAS.BENS_DIREITOS).showSheet();
    //hiden
    Planilha.getSheetByName(ABAS.LANCAMENTO_CDB).hideSheet();
    Planilha.getSheetByName(ABAS.EVOLUCAO_PATRIMONIAL).hideSheet();
    Planilha.getSheetByName(ABAS.AMORTIZACOES).hideSheet();
    Planilha.getSheetByName(ABAS.CALENDARIO).hideSheet();
    Planilha.getSheetByName(ABAS.BALANCEAMENTO).hideSheet();
    Planilha.getSheetByName(ABAS.BALANCEAMENTO_ATIVO).hideSheet();
    Planilha.getSheetByName(ABAS.SIMULADOR_PM).hideSheet();
    Planilha.getSheetByName(ABAS.PRECO_TETO).hideSheet();
    Planilha.getSheetByName(ABAS.MEUS_OBJETIVOS).hideSheet();
    Planilha.getSheetByName(ABAS.BASE_DADOS).hideSheet();
    Planilha.getSheetByName(ABAS.TABELA_DINAMICA).hideSheet();
    Planilha.getSheetByName(ABAS.TABELA_DINAMICA_CONSOLIDADO).hideSheet();
    Planilha.getSheetByName(ABAS.CODIGOS_IRPF).hideSheet();
    Planilha.getSheetByName(ABAS.COTACAO).hideSheet();
    Planilha.getSheetByName(ABAS.ALTAS).hideSheet();
    Planilha.getSheetByName(ABAS.MOVIMENTACOES).hideSheet();
    Planilha.getSheetByName(ABAS.MOVIMENTACOES_CDB).hideSheet();
    Planilha.getSheetByName(ABAS.IMPORT).hideSheet();

}/**
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
 */
/**
 * ACTIONS.GS
 */

function deleteTrigger() {
    // Loop over all triggers.
    const allTriggers = ScriptApp.getProjectTriggers();
    for (let index = 0; index < allTriggers.length; index++) {
        // If the current trigger is the correct one, delete it.
        // if (allTriggers[index].getUniqueId() === triggerId) {
        ScriptApp.deleteTrigger(allTriggers[index]);
        // break;
    }
}

function createTrigger() {
    deleteTrigger()
    ScriptApp.newTrigger('updateCotation')
        .timeBased()
        .everyMinutes(30)
        .create();

    ScriptApp.newTrigger('getEvolutionRentability')
        .timeBased()
        .atHour(9)
        .everyDays(1)
        .create();

    // console.log(triggerUpdateCotationId.getUniqueId(), triggerEvolutionId.getUniqueId());
}

function getEvolutionRentability() {
    const Planilha = SpreadsheetApp.getActiveSpreadsheet();
    const Guia = Planilha.getSheetByName(ABAS.DASHBOARD);
    const Cell = Guia.getRange("A4");
    const days = [1, 2, 3, 4, 5];
    const now = new Date().getHours()

    if (days.includes(new Date().getDay())) {
        if (now === 9 || now === 10) {
            const currentMonth = composeIndiceDate(0)
            const oldMonth = composeIndiceDate(1)
            // Utilities.sleep(120000);// uma pausa de 2min para atualizar os dados antes de capturar as informações
            const value = Guia.getRange('A5').getValue();
            Cell.setValue(value);
            const acoes = Guia.getRange("E9").getValue(); // acoes
            Guia.getRange("A10").setValue(acoes);
            const fiis = Guia.getRange("E11").getValue(); // fiis
            Guia.getRange("A12").setValue(fiis);
            const fiinfra = Guia.getRange("E13").getValue(); // fiinfra
            Guia.getRange("A14").setValue(fiinfra);
            const fiagro = Guia.getRange("E15").getValue(); // fiagro
            Guia.getRange("A16").setValue(fiagro);
            const rendafixa = Guia.getRange("E17").getValue(); // rendafixa
            Guia.getRange("A18").setValue(rendafixa);
            const etf = Guia.getRange("E19").getValue(); // etf
            Guia.getRange("A20").setValue(etf);
            const bdr = Guia.getRange("E21").getValue(); // bdr
            Guia.getRange("A22").setValue(bdr);
            const cripto = Guia.getRange("E23").getValue(); // cripto
            Guia.getRange("A24").setValue(cripto);
            const stocks = Guia.getRange("E26").getValue(); // stocks
            Guia.getRange("A27").setValue(stocks);
            const reits = Guia.getRange("E28").getValue(); // reits
            Guia.getRange("A29").setValue(reits);
            const etfexterior = Guia.getRange("E30").getValue(); // etfexterior
            Guia.getRange("A31").setValue(etfexterior);

            if (currentMonth > oldMonth) {
                updatePerformance(value);
            }
        }
    }
}

function updateCotation() {
    const classStranger = [CLASS.ETF_EUA, CLASS.REIT, CLASS.STOCK]
    const Sheet = SpreadsheetApp.getActiveSpreadsheet();

    let totalRegister = 0;

    const GuideCotation = Sheet.getSheetByName(ABAS.COTACAO);

    totalRegister = getTotalRegisterInGuide(GuideCotation);
    const cotations = GuideCotation.getRange(`A2:C${totalRegister + 1}`).getValues();
    const cambio = GuideCotation.getRange("F2").getValue();
    const offlineCotations = []

    console.log("[🔨] - Iniciando atualização de cotação");
    for (row in cotations) {
        const ticker = cotations[row][0];
        const type = cotations[row][1];
        const value = cotations[row][2];
        if (value !== "-") {
            if (classStranger.includes(type)) { // se exterior
                offlineCotations.push([value * cambio])
            } else {
                offlineCotations.push([value])
            }
        }
        console.log(`[✔] ---- ${type} (${ticker})`);
    }
    console.log(offlineCotations)
    GuideCotation.getRange(`D2:D${offlineCotations.length + 1}`).setValues(offlineCotations);

    const dash = Sheet.getSheetByName(ABAS.DASHBOARD);
    const formatedDate = Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy-HH:mm:ss");
    dash.getRange("N4").setValue("🕔 Data da última cotação: " + formatedDate);
    dash.getRange("A3").setValue(new Date().toTimeString());

}

function updateCotationManual() {

    const outputClose = HtmlService.createHtmlOutput('<script>google.script.host.close();</script>');
    const ui = SpreadsheetApp.getUi();
    ui.showSidebar(HtmlService.createHtmlOutputFromFile("@ricardoinvesting-cotation-html")
        .setTitle("Atualizando cotações"));

    updateCotation();

    ui.showSidebar(outputClose.setTitle("Atualizando cotações"));

}

function updatePMManual() {

    const outputClose = HtmlService.createHtmlOutput('<script>google.script.host.close();</script>');
    const ui = SpreadsheetApp.getUi();
    const uuid = Utilities.getUuid();

    const Sheet = SpreadsheetApp.getActiveSpreadsheet();
    const GuideDinamicConsolid = Sheet.getSheetByName(ABAS.TABELA_DINAMICA_CONSOLIDADO);
    const TbDinamic = Sheet.getSheetByName(ABAS.TABELA_DINAMICA);
    const firstYear = getFirstYear();
    const limitYear = new Date().getFullYear() - 5;
    const listYears = composeAvaiableYears(firstYear, limitYear)


    ui.showSidebar(HtmlService.createHtmlOutputFromFile("@ricardoinvesting-pm-html")
        .setTitle("Recalculando Preço Médio"));

    const content1 = calcPMFull(uuid);
    TbDinamic.getRange("AN2").setValue(content1);
    GuideDinamicConsolid.getRange("V10").setValue(content1);
    const data = [];
    for (let i = 0; i < listYears.length; i++) {
        const yIR = calculateAmmountIRPFFull(listYears[i], uuid, false);
        const yIR_last = calculateAmmountIRPFFull(listYears[i] - 1, uuid, false);
        const yCONSOLID = calculateAmmountIRPFFull(listYears[i], uuid, false);
        const yCONSOLID_last = calculateAmmountIRPFFull(listYears[i] - 1, uuid, false);
        data.push([listYears[i], yIR, yIR_last, yCONSOLID, yCONSOLID_last])
    }
    GuideDinamicConsolid.getRange(`V3:Z${data.length + 2}`).setValues(data)
    const GuideTDConsolidado = Sheet.getSheetByName(ABAS.TABELA_DINAMICA_CONSOLIDADO);
    GuideTDConsolidado.getRange("V13").setValue(uuid);

    ui.showSidebar(outputClose.setTitle("Recalculando Preço Médio"));

}

function formatCNPJ(cnpj) {
    if (cnpj.indexOf("F") !== -1) {
        const cnpj_format = cnpj.substr("F", 20).trim().slice(2, 20);
        return cnpj_format;
    } else {
        return cnpj;
    }
}

function updatePerformance(value) {
    const Sheet = SpreadsheetApp.getActiveSpreadsheet();

    const GuidePerformance = Sheet.getSheetByName(ABAS.EVOLUCAO_PATRIMONIAL);

    const last = GuidePerformance.getRange("Z1").getValue() + 2;
    const CellPerformance = GuidePerformance.getRange(`G${last}`);
    CellPerformance.setValue(value)
}

function hidden() {
    const Sheet = SpreadsheetApp.getActiveSpreadsheet();
    const GuideDashboard = Sheet.getSheetByName(ABAS.DASHBOARD);
    let key = GuideDashboard.getRange("A1").getValue() || -1;
    key = key * -1;
    GuideDashboard.getRange("A1").setValue(key);
}

function getFrases(trigger) {
    const index = Math.floor(Math.random() * FRASES.length);
    return FRASES[index];
}

function checkVersion(version, trigger) {
    try {
        const cachedMessage = getCache(version, "message");
        if (cachedMessage) {
            return cachedMessage;
        }
        const response = UrlFetchApp.fetch("https://bombolao-v2.rj.r.appspot.com/core/api/version/message");
        const message = JSON.parse(response.getContentText());

        if (version !== message.currentVersion) {
            setCache(version, message, true, 60);
            return message.message;
        }
        return getFrases(trigger);
    } catch {
        return getFrases(trigger);
    }
}


/**
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
 */
/**
 * B3.GS
 */
function importarDadosB3() {
    const outputClose = HtmlService.createHtmlOutput('<script>google.script.host.close();</script>');
    const IMPORT_TITLE = "Importando lançamentos da B3";
    const debug = false;
    let cient = debug;
    const ui = debug ? null : SpreadsheetApp.getUi();
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const GuiaB3 = sheet.getSheetByName(ABAS.B3);
    const GuiaMovimentacoes = sheet.getSheetByName(ABAS.LANCAMENTO_B3);
    const GuiaProventos = sheet.getSheetByName(ABAS.PROVENTOS);
    const totalMovimentacoes = GuiaB3.getRange("I2").getValue();
    const loteAtual = GuiaB3.getRange("J2").getValue() || 0;

    debug ? null : ui.showModalDialog(HtmlService.createHtmlOutput(LOADING_IMPORT_B3_MESSAGES.stage1), IMPORT_TITLE);
    const proventoslastRow = GuiaB3.getRange("L2").getValue();
    const movimentacoeslastRow = GuiaB3.getRange("K2").getValue();

    let limit = 250;
    let continued = Number(GuiaB3.getRange("I3").getValue() || 0);

    const B3_COMPRAS = new Array();
    const B3_PROVENTOS = new Array();

    if (!continued) {
        //criando filtros e ordenando por data 
        GuiaB3.getRange('B2:B').activate();
        GuiaB3.getActiveRangeList().setNumberFormat('dd/MM/yyyy');
        const rangeB3Filter = "A2:H"
        let filter = GuiaB3.getRange(rangeB3Filter).getFilter();
        if (!filter) { filter = GuiaB3.getRange(rangeB3Filter).createFilter(); }
        GuiaB3.getRange('B2').activate();
        filter.sort(2, true);
        filter.remove();
    }

    let lotes = totalMovimentacoes / limit;
    const fracao = lotes - parseInt(lotes);
    const lotes_fracao = Math.round(fracao * limit);

    if (loteAtual == lotes) {
        limit = lotes_fracao;
    }
    const finalLine = continued + limit + (continued ? -1 : 3);
    let B3_LIST = getDataRangeLimit(GuiaB3, "A", continued ? continued : continued + 3, "H", finalLine);

    const b3ListSize = B3_LIST.length;

    if (!debug) {
        if (!continued && continued + limit < totalMovimentacoes) {
            const response = ui.alert(
                `Atenção! Existem muitos lançamentos a serem importados, eles serão feitos em lotes de ${limit}. Fique tranquilo, você será avisado de todo andamento e lembre-se:\r\n\r\n - Não serão importados dados de subscrições \r\n - Não serão importados dados de bonificações \r\n - Não serão ajustados alterações de nomeclaturas \r\n - Não serão ajustados agrupamentos e/ou desdobramentos \r\n - Renda fixa, compatibilidade apenas com Tesouro Direto \r\n\n Esta de acordo?`,
                ui.ButtonSet.YES_NO
            );
            if (response === ui.Button.YES) {
            } else {
                ui.showModalDialog(outputClose, IMPORT_TITLE);
                return null;
            }
        }
    }

    if (continued >= totalMovimentacoes) {
        Browser.msgBox("💰 Lançamentos já foram importados!");
        return ui.showModalDialog(outputClose, IMPORT_TITLE);
    }

    debug ? null : ui.showModalDialog(HtmlService.createHtmlOutput(LOADING_IMPORT_B3_MESSAGES.stage3), IMPORT_TITLE);
    for (var i = 0; i <= b3ListSize - 1; i++) {
        //variaveis
        const B3 = new Array();
        B3[0] = retornaTickerName(B3_LIST[i][3], "-").trim();//Ticker
        B3[3] = B3_LIST[i][2];//Movimentação    
        // const number = parseInt(B3[0].slice(B3[0].length - 2, B3[0].length));
        const number = parseInt(B3[0].replace(/\D/g, ''));
        if (!SUBSCRICOES_IDS.includes(number) && !IGNORE_IMPORT_B3.includes(B3[3]) && !IGNORE_TICKERS.includes(B3[0])) {

            B3[1] = B3_LIST[i][0]; //Entrada/Saída
            B3[2] = B3_LIST[i][1];//Data
            B3[4] = B3_LIST[i][4];//Instituição
            B3[5] = validaValor(B3_LIST[i][5]);//Quantidade
            B3[6] = validaValor(B3_LIST[i][6]);//Preço unitário
            B3[7] = validaValor(B3_LIST[i][7]);//Valor da Operação 

            //separação do lote de proventos
            if (FLAG_PROVENTOS.includes(B3[3])) {
                if (B3[3] === "Juros Sobre Capital Próprio") {
                    B3[3] = "JCP"
                }
                B3_PROVENTOS.push(B3);
            } else {
                //caso não seja proventos considera como venda, compra ou bonificacao de ativos
                if (B3[3] !== "Bonificação em Ativos") {
                    if (B3[1] === "Debito") {
                        B3[3] = "Venda";
                    } else if (B3[1] === "Credito") {
                        B3[3] = "Compra";
                    }
                }
                B3_COMPRAS.push(B3);
            }
        }
    }

    //Importação de investimentos (compra/venda)      
    let row = movimentacoeslastRow;
    debug ? null : ui.showModalDialog(HtmlService.createHtmlOutput(LOADING_IMPORT_B3_MESSAGES.stage4), IMPORT_TITLE);
    for (var j = 0; j < B3_COMPRAS.length; j++) {
        GuiaMovimentacoes.getRange(row, 3).setValue(B3_COMPRAS[j][0]); //ticker
        GuiaMovimentacoes.getRange(row, 4).setValue(B3_COMPRAS[j][2]); //data
        GuiaMovimentacoes.getRange(row, 5).setValue(B3_COMPRAS[j][3]); //tipo de operação/movimentação
        GuiaMovimentacoes.getRange(row, 9).setValue(B3_COMPRAS[j][5]); //Quantidade
        GuiaMovimentacoes.getRange(row, 10).setValue(B3_COMPRAS[j][6]); //Preço unitário  
        row = row + 1;
    }


    //Importação de proventos
    let rowProventos = proventoslastRow;

    for (var j = 0; j < B3_PROVENTOS.length; j++) {
        GuiaProventos.getRange(rowProventos, 2).setValue(B3_PROVENTOS[j][0]); //ticker
        GuiaProventos.getRange(rowProventos, 3).setValue(B3_PROVENTOS[j][3]); //tipo
        GuiaProventos.getRange(rowProventos, 4).setValue(B3_PROVENTOS[j][2]); //data
        GuiaProventos.getRange(rowProventos, 5).setValue(B3_PROVENTOS[j][5]); //Quantidade
        // GuiaProventos.getRange(rowProventos,6).setValue(B3_PROVENTOS[j][6]); //Unitário
        GuiaProventos.getRange(rowProventos, 7).setValue(B3_PROVENTOS[j][7]); //Total
        // spreadsheet.getRange("B:B").setNumberFormat("General");      
        rowProventos = rowProventos + 1;
    }

    const processed = continued ? continued + limit : continued + limit + 3;
    GuiaB3.getRange("I3").setValue(processed);
    const lineStoped = processed > totalMovimentacoes ? totalMovimentacoes + 3 : processed
    GuiaB3.getRange("A3:H" + lineStoped).setBackground("yellow");
    GuiaB3.getRange("J2").setValue(Number(loteAtual) + 1);
    // GuiaB3.getRange("D2").setValue(processed - 3);
    if (processed < totalMovimentacoes) {
        let response = ui.alert(
            `(${limit}) Lançamentos processados, ainda restam ${totalMovimentacoes - (processed - 2)} deseja continuar?`,
            ui.ButtonSet.YES_NO
        );
        if (response === ui.Button.YES) {
            Browser.msgBox("Por favor, execute novamente o script para continuar de onde parou.");
            return ui.showModalDialog(outputClose, IMPORT_TITLE);
        } else if (response === ui.Button.NO) {
            Browser.msgBox("Movimentações importadas parcialmente! Por favor, execute novamente o script para continuar de onde parou.");
            return ui.showModalDialog(outputClose, IMPORT_TITLE);
        }
    }
    else {
        debug ? null : ui.showModalDialog(HtmlService.createHtmlOutput(LOADING_IMPORT_B3_MESSAGES.stage5), IMPORT_TITLE);
        GuiaB3.getRange("I3").clearContent();
        debug ? null : ui.showModalDialog(HtmlService.createHtmlOutput(LOADING_IMPORT_B3_MESSAGES.stage6), IMPORT_TITLE);
        updateCotationManual();
        Browser.msgBox("💰 Lançamentos importados com sucesso!");
        return ui.showModalDialog(outputClose, IMPORT_TITLE);
    }

}/**
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
 */
/**
 * IMPORT.GS
 */
function copyData(tabReference, checkBoxKey, fase, row, col, numCol, lineRegisters, externalReference, externalSheet, sheet, keyCol, parcial, currentFase) {

    const limit = Number(tabReference.getRange("M17").getValue());

    let external;
    let lastRow;
    let externalRange;
    let lastRowWithData;
    let totalRegister = 0;
    let lineToContinue = 0;
    let continueRow = 0;
    let lastContinueRow = 0;
    let lastContinueProcess = 0;
    let numRows = 1;
    let countReverse = 0;

    if (tabReference.getRange(checkBoxKey).getValue() === false && fase === currentFase) {
        if (externalReference === ABAS.BASE_DADOS) {
            sheet.getSheetByName(externalReference).getRange("A4:J").clearContent();
        }

        lineToContinue = tabReference.getRange(lineRegisters).getValue();
        external = externalSheet.getSheetByName(externalReference);

        if (!lineToContinue || lineToContinue === "" || lineToContinue === "0") {

            lastRow = external.getLastRow();
            externalRange = external.getRange(row, keyCol, lastRow, 1).getValues();
            countReverse = externalRange.reverse().findIndex(c => c[0] !== "");
            lastRowWithData = lastRow - (countReverse === -1 ? lastRow : countReverse);
            if (lastRowWithData === 0) {
                tabReference.getRange(checkBoxKey).setValue(true);
                tabReference.getRange(lineRegisters).setValue("0/0");
                return null;
            }
            if ((lastRowWithData - row) > limit) {
                externalRange = external.getRange(row, col, limit, numCol).getValues();
                continueRow = limit;
            } else {
                externalRange = external.getRange(row, col, lastRowWithData, numCol).getValues();
                continueRow = lastRowWithData;
            }
            totalRegister = lastRowWithData;
            sheet.getSheetByName(externalReference).getRange(row, col, continueRow, numCol).setValues(externalRange)

        } else {
            continueRow = Number(lineToContinue.split("/")[0]);
            totalRegister = Number(lineToContinue.split("/")[1]);
            lastContinueRow = continueRow + (row - 1) + limit;
            lastContinueProcess = lastContinueRow > totalRegister ? (totalRegister - continueRow) : limit;
            numRows = lastContinueProcess;
            externalRange = external.getRange(continueRow + row, col, numRows, numCol).getValues();
            sheet.getSheetByName(externalReference).getRange(continueRow + row, col, numRows, numCol).setValues(externalRange)
            continueRow = continueRow + numRows;
        }

        if (!parcial && continueRow === totalRegister) {
            tabReference.getRange(checkBoxKey).setValue(true);
            tabReference.getRange(lineRegisters).setValue(`${continueRow}/${totalRegister}`);
        } else if (!parcial && continueRow !== totalRegister) {
            tabReference.getRange(lineRegisters).setValue(`${continueRow}/${totalRegister}`);
        }
    }
}

function importDataOtherVersion(fase = null) {
    // const title = "Migrando dados de outra versão";
    // const outputClose = HtmlService.createHtmlOutput('<script>google.script.host.close();</script>');
    const ui = SpreadsheetApp.getUi();

    const response = ui.alert(
        `Atenção! Você deseja realmente importar dados de outra planilha?\n\nTenha certeza de que a planilha que receberá os dados esteja totalmente limpa. Deseja continuar?`,
        ui.ButtonSet.YES_NO
    );
    if (response === ui.Button.YES) {

        try {
            // const tmp = HtmlService.createHtmlOutputFromFile("@ricardoinvesting-import-html");
            // ui.showSidebar(tmp.setTitle(title));
            const Sheet = SpreadsheetApp.getActiveSpreadsheet();
            const TAB_IMPORT = Sheet.getSheetByName(ABAS.IMPORT);
            const URL_LINK = TAB_IMPORT.getRange("C2").getValue();
            const externalSheet = SpreadsheetApp.openByUrl(URL_LINK);
            let external;
            let externalRange;
            let lastRowWithData;
            let lastRow;
            copyData(TAB_IMPORT, "D5", 1, 4, 1, 10, "E5", ABAS.BASE_DADOS, externalSheet, Sheet, 2, false, fase);

            if (TAB_IMPORT.getRange("D6").getValue() === false && fase === 1) {

                // 0 Dashboard
                external = externalSheet.getSheetByName(ABAS.DASHBOARD);
                externalRange = external.getRange("A4").getValues();
                Sheet.getSheetByName(ABAS.DASHBOARD).getRange("A4").setValues(externalRange);
                externalRange = external.getRange("A10").getValues();
                Sheet.getSheetByName(ABAS.DASHBOARD).getRange("A10").setValues(externalRange);
                externalRange = external.getRange("A12").getValues();
                Sheet.getSheetByName(ABAS.DASHBOARD).getRange("A12").setValues(externalRange);
                externalRange = external.getRange("A14").getValues();
                Sheet.getSheetByName(ABAS.DASHBOARD).getRange("A14").setValues(externalRange);
                externalRange = external.getRange("A16").getValues();
                Sheet.getSheetByName(ABAS.DASHBOARD).getRange("A16").setValues(externalRange);
                externalRange = external.getRange("A18").getValues();
                Sheet.getSheetByName(ABAS.DASHBOARD).getRange("A18").setValues(externalRange);
                externalRange = external.getRange("A20").getValues();
                Sheet.getSheetByName(ABAS.DASHBOARD).getRange("A20").setValues(externalRange);
                externalRange = external.getRange("A22").getValues();
                Sheet.getSheetByName(ABAS.DASHBOARD).getRange("A22").setValues(externalRange);
                externalRange = external.getRange("A24").getValues();
                Sheet.getSheetByName(ABAS.DASHBOARD).getRange("A24").setValues(externalRange);
                externalRange = external.getRange("A27").getValues();
                Sheet.getSheetByName(ABAS.DASHBOARD).getRange("A27").setValues(externalRange);
                externalRange = external.getRange("A29").getValues();
                Sheet.getSheetByName(ABAS.DASHBOARD).getRange("A29").setValues(externalRange);
                externalRange = external.getRange("A31").getValues();
                Sheet.getSheetByName(ABAS.DASHBOARD).getRange("A31").setValues(externalRange);

                // 11 Bens e Direitos
                external = externalSheet.getSheetByName(ABAS.BENS_DIREITOS);
                externalRange = external.getRange("AC2").getValues();
                Sheet.getSheetByName(ABAS.BENS_DIREITOS).getRange("AC2").setValues(externalRange)
                TAB_IMPORT.getRange("D6").setValue(true);
                TAB_IMPORT.getRange("E6").setValue("1/1");

                // 10 Darf 1
                external = externalSheet.getSheetByName(ABAS.DARF);
                externalRange = external.getRange("C18:C23").getValues();
                Sheet.getSheetByName(ABAS.DARF).getRange("C18:C23").setValues(externalRange)

                // 10 Darf 2
                external = externalSheet.getSheetByName(ABAS.DARF);
                externalRange = external.getRange("K18:K24").getValues();
                Sheet.getSheetByName(ABAS.DARF).getRange("k18:k24").setValues(externalRange)
                TAB_IMPORT.getRange("D7").setValue(true);
                TAB_IMPORT.getRange("E7").setValue("7/7");
            }

            copyData(TAB_IMPORT, "D8", 1, 4, 2, 2, "E8", ABAS.VENDAS, externalSheet, Sheet, 2, true, fase);
            copyData(TAB_IMPORT, "D8", 1, 4, 8, 6, "E8", ABAS.VENDAS, externalSheet, Sheet, 2, false, fase);

            copyData(TAB_IMPORT, "D9", 1, 2, 2, 4, "E9", ABAS.MEUS_OBJETIVOS, externalSheet, Sheet, 2, false, fase);

            copyData(TAB_IMPORT, "D10", 1, 4, 2, 1, "E10", ABAS.PRECO_TETO, externalSheet, Sheet, 2, true, fase);
            copyData(TAB_IMPORT, "D10", 1, 4, 7, 2, "E10", ABAS.PRECO_TETO, externalSheet, Sheet, 2, false, fase);

            copyData(TAB_IMPORT, "D11", 2, 4, 8, 3, "E11", ABAS.SIMULADOR_PM, externalSheet, Sheet, 2, false, fase);

            copyData(TAB_IMPORT, "D12", 2, 4, 2, 1, "E12", ABAS.BALANCEAMENTO_ATIVO, externalSheet, Sheet, 2, true, fase);
            copyData(TAB_IMPORT, "D12", 2, 4, 7, 1, "E12", ABAS.BALANCEAMENTO_ATIVO, externalSheet, Sheet, 2, false, fase);

            copyData(TAB_IMPORT, "D13", 2, 4, 2, 1, "E13", ABAS.BALANCEAMENTO, externalSheet, Sheet, 2, true, fase);
            copyData(TAB_IMPORT, "D13", 2, 4, 7, 1, "E13", ABAS.BALANCEAMENTO, externalSheet, Sheet, 2, true, fase);

            if (TAB_IMPORT.getRange("D13").getValue() === false && fase === 2) {

                // 6 Balanceamento carteira 3
                external = externalSheet.getSheetByName(ABAS.BALANCEAMENTO);
                lastRow = external.getLastRow();
                externalRange = external.getRange(4, 2, lastRow, 1).getValues();
                lastRowWithData = lastRow - externalRange.reverse().findIndex(c => c[0] != '');
                external = externalSheet.getSheetByName(ABAS.BALANCEAMENTO);
                lastRow = external.getLastRow();
                externalRange = external.getRange("U18").getValues();
                Sheet.getSheetByName(ABAS.BALANCEAMENTO).getRange("U18").setValues(externalRange);
                TAB_IMPORT.getRange("D13").setValue(true);
                TAB_IMPORT.getRange("E13").setValue(`${lastRowWithData}/${lastRowWithData}`);
            }

            copyData(TAB_IMPORT, "D14", 2, 2, 1, 3, "E14", ABAS.AMORTIZACOES, externalSheet, Sheet, 1, false, fase);

            copyData(TAB_IMPORT, "D15", 2, 4, 2, 4, "E15", ABAS.PROVENTOS, externalSheet, Sheet, 2, true, fase);
            copyData(TAB_IMPORT, "D15", 2, 4, 7, 3, "E15", ABAS.PROVENTOS, externalSheet, Sheet, 2, false, fase);

            copyData(TAB_IMPORT, "D16", 3, 2, 4, 2, "E16", ABAS.EVOLUCAO_PATRIMONIAL, externalSheet, Sheet, 4, true, fase);
            copyData(TAB_IMPORT, "D16", 3, 2, 7, 1, "E16", ABAS.EVOLUCAO_PATRIMONIAL, externalSheet, Sheet, 4, false, fase);

            copyData(TAB_IMPORT, "D17", 3, 2, 3, 9, "E17", ABAS.LANCAMENTO_CDB, externalSheet, Sheet, 3, false, fase);

            copyData(TAB_IMPORT, "D18", 3, 2, 3, 3, "E18", ABAS.LANCAMENTO_MANUAL, externalSheet, Sheet, 3, true, fase);
            copyData(TAB_IMPORT, "D18", 3, 2, 8, 4, "E18", ABAS.LANCAMENTO_MANUAL, externalSheet, Sheet, 3, true, fase);
            copyData(TAB_IMPORT, "D18", 3, 2, 16, 1, "E18", ABAS.LANCAMENTO_MANUAL, externalSheet, Sheet, 3, true, fase);
            copyData(TAB_IMPORT, "D18", 3, 2, 18, 2, "E18", ABAS.LANCAMENTO_MANUAL, externalSheet, Sheet, 3, false, fase);

            copyData(TAB_IMPORT, "D19", 3, 2, 3, 3, "E19", ABAS.LANCAMENTO_B3, externalSheet, Sheet, 3, true, fase);
            copyData(TAB_IMPORT, "D19", 3, 2, 9, 4, "E19", ABAS.LANCAMENTO_B3, externalSheet, Sheet, 3, true, fase);
            copyData(TAB_IMPORT, "D19", 3, 2, 16, 1, "E19", ABAS.LANCAMENTO_B3, externalSheet, Sheet, 3, true, fase);
            copyData(TAB_IMPORT, "D19", 3, 2, 18, 2, "E19", ABAS.LANCAMENTO_B3, externalSheet, Sheet, 3, false, fase);

            if (fase === 3) {

                if (externalSheet.getSheetByName(ABAS.ANOTACOES)) {
                    copyData(TAB_IMPORT, "D20", 3, 5, 2, 1, "E20", ABAS.ANOTACOES, externalSheet, Sheet, 2, true, fase);
                    copyData(TAB_IMPORT, "D20", 3, 5, 4, 1, "E20", ABAS.ANOTACOES, externalSheet, Sheet, 2, false, fase);
                } else {
                    TAB_IMPORT.getRange("D20").setValue(true)
                    TAB_IMPORT.getRange("E20").setValue("0/0")
                }
            }

            if (
                TAB_IMPORT.getRange("D5").getValue() === true &&
                TAB_IMPORT.getRange("D6").getValue() === true &&
                TAB_IMPORT.getRange("D7").getValue() === true &&
                TAB_IMPORT.getRange("D8").getValue() === true &&
                TAB_IMPORT.getRange("D9").getValue() === true &&
                TAB_IMPORT.getRange("D10").getValue() === true &&
                TAB_IMPORT.getRange("D12").getValue() === true &&
                TAB_IMPORT.getRange("D13").getValue() === true &&
                TAB_IMPORT.getRange("D14").getValue() === true &&
                TAB_IMPORT.getRange("D15").getValue() === true &&
                TAB_IMPORT.getRange("D16").getValue() === true &&
                TAB_IMPORT.getRange("D17").getValue() === true &&
                TAB_IMPORT.getRange("D18").getValue() === true &&
                TAB_IMPORT.getRange("D19").getValue() === true &&
                TAB_IMPORT.getRange("D20").getValue() === true
            ) {
                ui.alert("Lançamentos importados com sucesso! O último passo é ir a aba '0. Dashboard' e acionar os botões 'Atualizar Cotação' e 'Recalcular Preço Médio'\n\n Bons investimentos!\n@ricardoinvesting");
            }
            // ui.showSidebar(outputClose.setTitle(title));
        } catch (error) {
            console.error(error);
            // ui.showSidebar(outputClose.setTitle(title));
            throw new Error(`Não foi possível copiar os dados. ::erro!:: ${error}`);

        }

    }

}

function showMigrate() {
    const title = "Migrar dados de outra versão";
    const ui = SpreadsheetApp.getUi();
    const tmp = HtmlService.createTemplateFromFile("@ricardoinvesting-import-html").evaluate();
    ui.showSidebar(tmp.setTitle(title));
    // importDataOtherVersion(1);
}

function getStatusButton() {
    //16
    const Sheet = SpreadsheetApp.getActiveSpreadsheet();
    const TAB_IMPORT = Sheet.getSheetByName(ABAS.IMPORT);
    const fase1 = TAB_IMPORT.getRange("D5:D10").getValues();
    const fase2 = TAB_IMPORT.getRange("D11:D15").getValues();
    const fase3 = TAB_IMPORT.getRange("D16:D20").getValues();
    let status1 = []
    let status2 = []
    let status3 = []

    fase1.map((item) => {
        item.map(node => {
            if (node === true) {
                status1.push(node)
            }
        })
    })

    fase2.map((item) => {
        item.map(node => {
            if (node === true) {
                status2.push(node)
            }
        })
    })
    fase3.map((item) => {
        item.map(node => {
            if (node === true) {
                status3.push(node)
            }
        })
    })

    const result = { status1: status1.length === 6 ? false : true, status2: status2.length === 5 ? false : true, status3: status3.length === 5 ? false : true }
    return result;

}/**
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
 */

/**
 * IR.GS
 */
const CLASS_EXTERNAL_LIST = [
    CLASS.ETF_EUA,
    CLASS.STOCK,
    CLASS.REIT
]
const CLASS_FIXED_LIST = [
    CLASS.RENDA_FIXA
]

const CLASS_ACOES_LIST = [
    CLASS.ACAO,
    CLASS.ETF,
]


function composeDescription(classe, ticker, quantity, name, cnpj, coin, pm, valueBuy, cambio = 1, bonification = 0) {
    try {
        const composePm = pm; //.split(" ")[1].replace(",",".");
        const composeValueBuy = valueBuy; //.split(" ")[1].replace(",",".");
        const messageBonification = bonification ? `(SENDO QUE ${bonification} VIERAM DE BONIFICAÇÕES)` : "";
        if (CLASS_EXTERNAL_LIST.includes(classe)) { // exterior
            return `(${ticker}) - ${quantity} ${getRenderType(classe, quantity)} DE ${name.toUpperCase()}, CÓDIGO DE NEGOCIAÇÃO: ${ticker}. PREÇO MÉDIO DE ${coin} ${composePm} E CUSTO TOTAL DE AQUISIÇÃO DE ${coin} ${composeValueBuy} - (CÂMBIO DE R$ ${cambio.toFixed(4)}) ${messageBonification}`
        } else if (CLASS_FIXED_LIST.includes(classe)) { // renda fixa
            return `APLICAÇÃO EM ${name.toUpperCase()} NO CNPJ: ${cnpj} TOTALIZANDO ${quantity} ${getRenderType(classe, quantity)}, COM CUSTO TOTAL DE AQUISIÇÃO DE ${coin} ${composeValueBuy} ${messageBonification}`;

        } else { // subscrições e outros tipos de renda variavel
            const number = parseInt(ticker.replace(/\D/g, ''));
            if (SUBSCRICOES_IDS.includes(number)) { // subscrições
                if (quantity <= 1) {
                    return `(${ticker}) - ${quantity} RECIBO DE SUBSCRIÇÃO DE ${name.toUpperCase()}, CNPJ: ${cnpj}, CÓDIGO DE NEGOCIAÇÃO: ${ticker}. PREÇO MÉDIO DE ${coin} ${composePm} E CUSTO TOTAL DE AQUISIÇÃO DE ${coin} ${composeValueBuy}`;
                } else {
                    return `(${ticker}) - ${quantity} RECIBOS DE SUBSCRIÇÕES DE ${name.toUpperCase()}, CNPJ: ${cnpj}, CÓDIGO DE NEGOCIAÇÃO: ${ticker}. PREÇO MÉDIO DE ${coin} ${composePm} E CUSTO TOTAL DE AQUISIÇÃO DE ${coin} ${composeValueBuy}`;
                }
            }
            if (classe === CLASS.CRIPTOMOEDA) {
                return `(${ticker}) - ${quantity} ${getRenderType(classe, quantity)} DE ${name.toUpperCase()}, CÓDIGO DE NEGOCIAÇÃO: ${ticker}. PREÇO MÉDIO DE ${coin} ${composePm} E CUSTO TOTAL DE AQUISIÇÃO DE ${coin} ${composeValueBuy} ${messageBonification}`;
            }
            return `(${ticker}) - ${quantity} ${getRenderType(classe, quantity)} DE ${name.toUpperCase()}, CNPJ: ${cnpj}, CÓDIGO DE NEGOCIAÇÃO: ${ticker}. PREÇO MÉDIO DE ${coin} ${composePm} E CUSTO TOTAL DE AQUISIÇÃO DE ${coin} ${composeValueBuy} ${messageBonification}`;
        }
    } catch {
        return "-"
    }

}

function composeSells(year = 2023, database = {}) {

    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const Guia = sheet.getSheetByName(ABAS.VENDAS);
    // function getDataRange(guide,initialColNameForLastRow, initialNumberColForLastRow, initialColName,initialColNameNumber, endColName){  
    const dataRows = getDataRange(Guia, "B", 4, "B", 4, "S");
    const initialLine = 0;
    let years = {};

    for (let i = initialLine; i <= (dataRows.length - 1); i++) {
        const rowTicker = dataRows[i][0];
        if (!rowTicker) {
            return years;
        }
        const yearAnalysis = new Date(dataRows[i][11]).getFullYear();
        const monthAnalysis = (new Date(dataRows[i][11]).getMonth()) + 1;
        if (!years.hasOwnProperty(yearAnalysis)) {
            years[yearAnalysis] = {
                [monthAnalysis]: {
                    "operations": [{
                        operation: dataRows[i][1],
                        transaction: dataRows[i][13],
                        value: dataRows[i][14],
                        ticker: rowTicker,
                        name: dataRows[i][2],
                        classe: dataRows[i][3],
                        type: dataRows[i][5],
                        document_number_principal: database[rowTicker].document_number_principal,
                        document_number_admin: database[rowTicker].document_number_admin,
                    }]
                }
            }
        } else {
            if (monthAnalysis in years[yearAnalysis]) {
                years[yearAnalysis][monthAnalysis]["operations"].push({
                    operation: dataRows[i][1],
                    transaction: dataRows[i][13],
                    value: dataRows[i][14],
                    ticker: rowTicker,
                    name: dataRows[i][2],
                    classe: dataRows[i][3],
                    type: dataRows[i][5],
                    document_number_principal: database[rowTicker].document_number_principal,
                    document_number_admin: database[rowTicker].document_number_admin,
                })
            } else {
                years[yearAnalysis][monthAnalysis] = {
                    "operations": [{
                        operation: dataRows[i][1],
                        transaction: dataRows[i][13],
                        value: dataRows[i][14],
                        ticker: rowTicker,
                        name: dataRows[i][2],
                        classe: dataRows[i][3],
                        type: dataRows[i][5],
                        document_number_principal: database[rowTicker].document_number_principal,
                        document_number_admin: database[rowTicker].document_number_admin,
                    }]
                }
            }
        }
    }
    return years;
}

function hasReceiverDividendsThisYear(year = 2023, dataRows, ticker = "@ricardoinvesting") {
    try {
        const initialLine = 0;
        let hasDividends = false;

        for (let i = initialLine; i <= (dataRows.length - 1); i++) {
            const rowTicker = dataRows[i][1];
            const yearAnalysis = new Date(dataRows[i][3]).getFullYear();
            hasDividends = false;
            if (yearAnalysis === year && rowTicker === ticker) {
                hasDividends = true;
                break;
            }
        }
        return hasDividends;
    } catch (error) {
        return false;
    }
}

function composeProvents(year = 2023, database = {}) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet();
        const GuiaProventos = sheet.getSheetByName(ABAS.PROVENTOS);
        const dataRows = getDataRange(GuiaProventos, "B", 4, "A", 4, "Q");
        const initialLine = 0;
        let tickers = {};

        for (let i = initialLine; i <= (dataRows.length - 1); i++) {
            const rowTicker = dataRows[i][1];
            if (!rowTicker) {
                return tickers;
            }
            const yearAnalysis = new Date(dataRows[i][3]).getFullYear();
            const monthAnalysis = new Date(dataRows[i][14]).getMonth();
            if (yearAnalysis === year) {
                const isExternal = CLASS_EXTERNAL_LIST.includes(dataRows[i][16]);
                if (!tickers.hasOwnProperty(rowTicker)) {
                    if (!isExternal) {
                        tickers[rowTicker] = {
                            dividends: [],
                            amountDividend: 0,
                            jcp: [],
                            amountJcp: 0,
                            rendiments: [],
                            amountRendiment: 0,
                            rendimentJCP: [],
                            amountRendimentJCP: 0,
                            name: database[rowTicker].name,
                            document_number_principal: database[rowTicker].document_number_principal,
                            document_number_admin: database[rowTicker].document_number_admin,
                        };
                    } else {
                        if (tickers.hasOwnProperty("external")) {
                            if (!tickers["external"].hasOwnProperty(rowTicker)) {
                                tickers["external"][rowTicker] = {
                                    dividends: [],
                                    amountDividend: 0,
                                    jcp: [],
                                    amountJcp: 0,
                                    rendiments: [],
                                    amountRendiment: 0,
                                    rendimentJCP: [],
                                    amountRendimentJCP: 0,
                                    name: database[rowTicker].name,
                                    document_number_principal: database[rowTicker].document_number_principal,
                                    document_number_admin: database[rowTicker].document_number_admin,
                                    amountTax: 0,
                                    dividendPerMonth: {},
                                    taxPerMonth: {},
                                    cambioMonth: {},
                                    amountMonth: {}
                                }
                            }
                        } else {
                            tickers["external"] = {
                                [rowTicker]: {
                                    dividends: [],
                                    amountDividend: 0,
                                    jcp: [],
                                    amountJcp: 0,
                                    rendiments: [],
                                    amountRendiment: 0,
                                    rendimentJCP: [],
                                    amountRendimentJCP: 0,
                                    name: database[rowTicker].name,
                                    document_number_principal: database[rowTicker].document_number_principal,
                                    document_number_admin: database[rowTicker].document_number_admin,
                                    amountTax: 0,
                                    dividendPerMonth: {},
                                    taxPerMonth: {},
                                    cambioMonth: {},
                                    amountMonth: {}
                                }
                            }
                        }
                    }
                }
                switch (dataRows[i][2]) {
                    case "Dividendo":
                        if (!isExternal) {
                            tickers[rowTicker].dividends.push(dataRows[i][10]);
                            tickers[rowTicker].amountDividend += dataRows[i][10];
                        } else {
                            tickers["external"][rowTicker].dividends.push(dataRows[i][10]);
                            tickers["external"][rowTicker].amountDividend += dataRows[i][10];
                            tickers["external"][rowTicker].amountTax += dataRows[i][12];
                            tickers["external"][rowTicker]["dividendPerMonth"] = composeNode(tickers["external"][rowTicker]["dividendPerMonth"], monthAnalysis, dataRows[i][11])
                            tickers["external"][rowTicker]["taxPerMonth"] = composeNode(tickers["external"][rowTicker]["taxPerMonth"], monthAnalysis, dataRows[i][12])
                            tickers["external"][rowTicker]["cambioMonth"] = composeNode(tickers["external"][rowTicker]["cambioMonth"], monthAnalysis, dataRows[i][8])
                            tickers["external"][rowTicker]["amountMonth"] = composeNode(tickers["external"][rowTicker]["amountMonth"], monthAnalysis, dataRows[i][9])
                        }
                        break;
                    case "Rendimento":
                        if (CLASS_ACOES_LIST.includes(dataRows[i][16])) {
                            tickers[rowTicker].rendimentJCP.push(dataRows[i][10]);
                            tickers[rowTicker].amountRendimentJCP += dataRows[i][10];

                        } else {
                            if (!isExternal) {
                                tickers[rowTicker].rendiments.push(dataRows[i][10]);
                                tickers[rowTicker].amountRendiment += dataRows[i][10];
                            } else {
                                tickers["external"][rowTicker].rendiments.push(dataRows[i][10]);
                                tickers["external"][rowTicker].amountRendiment += dataRows[i][10];
                                tickers["external"][rowTicker]["dividendPerMonth"] = composeNode(tickers["external"][rowTicker]["dividendPerMonth"], monthAnalysis, dataRows[i][11])
                                tickers["external"][rowTicker]["taxPerMonth"] = composeNode(tickers["external"][rowTicker]["taxPerMonth"], monthAnalysis, dataRows[i][12])
                                tickers["external"][rowTicker]["cambioMonth"] = composeNode(tickers["external"][rowTicker]["cambioMonth"], monthAnalysis, dataRows[i][8])
                                tickers["external"][rowTicker]["amountMonth"] = composeNode(tickers["external"][rowTicker]["amountMonth"], monthAnalysis, dataRows[i][9])
                            }
                        }
                        break;
                    case "JCP":
                        if (!isExternal) {
                            tickers[rowTicker].jcp.push(dataRows[i][10]);
                            tickers[rowTicker].amountJcp += dataRows[i][10];
                        }
                        break;
                }

            }
        }
        return tickers;

    } catch (error) {
        return error
    }
}

function getDataBase() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const GuiaDataBase = sheet.getSheetByName(ABAS.BASE_DADOS);
    const dataRows = getDataRange(GuiaDataBase, "A", 4, "A", 1, "J");
    let database = {}
    const tickers = [];
    for (let i = 3; i <= (dataRows.length - 1); i++) {
        const ticker = dataRows[i][0];
        const classe = dataRows[i][8];
        database[ticker] = {
            name: dataRows[i][1],
            document_number_principal: dataRows[i][3],
            document_number_admin: dataRows[i][4],
            classe: classe
        }
        if (classe !== CLASS.RENDA_FIXA_OUTROS && classe !== CLASS.CRIPTOMOEDA) {
            tickers.push(ticker)
        }
    }
    database = { ...database, tickers }
    return database;
}

function getFirstYear() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const Guia = sheet.getSheetByName(ABAS.MOVIMENTACOES);
    const dataRows = getDataRange(Guia, "D", 2, "D", 2, "D");
    let firstYear = new Date().getFullYear();
    if (dataRows[0][0]) {
        firstYear = dataRows[0][0];
    }
    return new Date(firstYear).getFullYear();
}

function calculateAmmountIRPFFull(year = 2023, trigger = "", history = false) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet();
        const GuiaInvestimento = sheet.getSheetByName(ABAS.MOVIMENTACOES);
        const dataRows = getDataRange(GuiaInvestimento, "C", 2, "A", 2, "V");
        const initialLine = 0;
        const tickersId = [];
        const tickers = {};

        for (let i = initialLine; i <= (dataRows.length - 1); i++) {
            const rowTicker = dataRows[i][2];
            const yearAnalysis = new Date(dataRows[i][3]).getFullYear();
            const date = new Date(dataRows[i][3]).toISOString();
            if (yearAnalysis <= year) {
                let indiceInvestAmmount = history ? 14 : 9;
                if (new Date().getFullYear() > year) { indiceInvestAmmount = 14 }
                if (tickersId.includes(rowTicker)) {
                    tickers[rowTicker].movimentations.push(
                        {
                            data: date,
                            typeOperation: dataRows[i][4],
                            qtd: dataRows[i][5],
                            cambio: dataRows[i][15] === "" || dataRows[i][15] === "-" ? 0 : dataRows[i][15],
                            investedAmount: dataRows[i][indiceInvestAmmount],
                        }
                    );
                } else {
                    tickers[rowTicker] = {
                        "movimentations": [
                            {
                                data: date,
                                typeOperation: dataRows[i][4],
                                qtd: dataRows[i][5],
                                cambio: dataRows[i][15] === "" || dataRows[i][15] === "-" ? 0 : dataRows[i][15],
                                investedAmount: dataRows[i][indiceInvestAmmount],
                            }
                        ]
                    };
                    tickersId.push(rowTicker);
                }
            }
        }

        const _sheet = SpreadsheetApp.getActiveSpreadsheet();
        const _GuiaProventos = _sheet.getSheetByName(ABAS.PROVENTOS);
        const _dataRows = getDataRange(_GuiaProventos, "B", 4, "A", 4, "Q");
        const totalAmmountOrAccumulated = {};
        const tickerLoopIds = Object.keys(tickers);
        tickerLoopIds.forEach(id => {
            const movimentation = tickers[id].movimentations;
            const dataSorted = movimentation.sort((p1, p2) => (p1.data < p2.data) ? -1 : (p1.data > p2.data) ? 1 : 0)
            const dataGroup = {}
            dataSorted.forEach(function (item) {
                const list = dataGroup[item.data];

                if (list) {
                    list.push(item);
                } else {
                    dataGroup[item.data] = [item];
                }
            });

            const dates = Object.keys(dataGroup)
            let accumulatedUnitBonification = 0;
            let accumulatedPriceBonification = 0;
            let accumulatedTotal = 0;
            let accumulatedInvested = 0;
            let lastYearSales = null;
            let cambio = [];
            dates.forEach(date => {
                dataGroup[date].forEach(item => {
                    const typeOperation = item.typeOperation;
                    const qtd = item.qtd;
                    const currentYear = new Date(item.data).getFullYear();
                    if (currentYear == year) {
                        if (typeOperation === OPERATIONS.BONIFICACAO) {
                            accumulatedUnitBonification += qtd;
                            accumulatedPriceBonification += item.investedAmount;
                        }
                    }
                    const investedAmount = item.investedAmount;
                    if (typeOperation === OPERATIONS.BONIFICACAO
                        || typeOperation === OPERATIONS.COMPRA
                        || typeOperation === OPERATIONS.COMPRA_DIREITOS
                        || typeOperation === OPERATIONS.RECIBO_DIREITOS) {
                        accumulatedInvested = accumulatedInvested + investedAmount;
                        accumulatedTotal = accumulatedTotal + qtd;
                        cambio.push(Number(item.cambio === "-" ? 0 : item.cambio));
                    } else if (typeOperation === OPERATIONS.VENDA || typeOperation === OPERATIONS.VENDA_DIREITOS) {
                        const tempPM = accumulatedInvested / accumulatedTotal;
                        const tempTotal = accumulatedTotal - qtd;
                        accumulatedInvested = tempPM * tempTotal;
                        accumulatedTotal = tempTotal;
                        lastYearSales = new Date(item.data).getFullYear();
                    }
                })
            })
            const hasDividends = hasReceiverDividendsThisYear(year, _dataRows, id);
            totalAmmountOrAccumulated[id] = { "accumulatedTotal": accumulatedTotal, "accumulatedInvested": accumulatedInvested, lastYearSales, cambio, averageCambio: 0, hasDividends, accumulatedUnitBonification, accumulatedPriceBonification }
        });
        const snapshotToYear = [];

        Object.keys(totalAmmountOrAccumulated).forEach((i) => {
            if (totalAmmountOrAccumulated[i].lastYearSales === null || totalAmmountOrAccumulated[i].lastYearSales === year || totalAmmountOrAccumulated[i].accumulatedTotal > 0 || totalAmmountOrAccumulated[i].hasDividends) {
                snapshotToYear.push(i);
            }
            totalAmmountOrAccumulated[i].averageCambio = calculateAverage(totalAmmountOrAccumulated[i].cambio);
        })
        return JSON.stringify({ ...totalAmmountOrAccumulated, snapshotToYear });
    } catch {
        return "-";
    }
}

function getAmmount(jsonString, ticker, amount = false, trigger = null) {
    try {
        const data = JSON.parse(jsonString);
        if (ticker in data) {
            const accumulatedInvested = data[ticker].accumulatedInvested;
            if (amount) {
                const accumaltedTotal = data[ticker].accumulatedTotal;
                if (accumaltedTotal < 0) {
                    return 0;
                }
                return accumaltedTotal;
            }
            if (accumulatedInvested < 0) {
                return 0;
            }
            return Number(accumulatedInvested.toFixed(2));
        } else {
            return 0;
        }
    } catch {
        return 0;
    }
}

function getWallet(jsonString, jsonOld, trigger = null) {
    try {
        const data = JSON.parse(jsonString);
        let snap = [];
        const result = [];

        if (data) {
            data["snapshotToYear"].forEach((item) => {
                const accumulatedTotal = data[item].accumulatedTotal;
                const hasDividends = data[item].hasDividends;
                if (accumulatedTotal > 0 || hasDividends) {
                    snap.push(item)
                }
            })
            snap = snap.sort();
            snap.forEach(item => {
                result.push([item, getAmmount(jsonString, item, false), getAmmount(jsonOld, item, false)]);
            })
            return result;
        } else {
            return [];
        }
    } catch {
        return [];
    }
}

function getWalletReport(jsonString, jsonOld, trigger = null) {
    try {
        const data = JSON.parse(jsonString);
        let snap = [];
        const result = [];

        if (data) {
            data["snapshotToYear"].forEach((item) => {
                const accumulatedTotal = data[item].accumulatedTotal;
                const hasDividends = data[item].hasDividends;
                if (accumulatedTotal > 0 || hasDividends) {
                    snap.push(item)
                }
            })
            snap = snap.sort();
            return snap;
        } else {
            return [];
        }
    } catch {
        return [];
    }

}

function calculateIRPFProgressive(days, value, trigger) {
    try {
        let percent = 22.5;
        const d = Number(days);
        if (d < 180) {
            percent = 22.5;
        } else if (d >= 181 && d <= 360) {
            percent = 20;
        } else if (d >= 361 && d <= 720) {
            percent = 17.5;
        } else {
            percent = 15;
        }
        return value * (percent / 100)
    } catch {
        return 0;
    }
}

function composeCurrency(value, classe, digits = 2) {
    const locale = isExternal(classe) ? "en" : "pt-br";
    if (locale === "en") {
        return value.toLocaleString(locale, { minimumFractionDigits: digits, style: 'currency', currency: 'USD' });
    } else {
        return value.toLocaleString(locale, { minimumFractionDigits: digits, style: 'currency', currency: 'BRL' });
    }
}

/**
 * Compoe ir
 * @param {array} [walletList] lista de tickers ativos
 * @param {str} [jsonIR] stringfy ir ano selecioando
 * @param {str} [jsonIRPast] stringfy ir ano anterior
 */
function composeBensEDireitos(walletList, jsonIR, jsonIRPast, database) {
    const JSON_IR = JSON.parse(jsonIR);
    const JSON_IR_PAST = JSON.parse(jsonIRPast)
    const DATABASE = database;
    const itemsWalletFiltered = [];
    let unitBonificationToYear = 0;
    walletList.forEach((item) => {
        const pm = JSON_IR[item].accumulatedInvested / JSON_IR[item].accumulatedTotal;
        unitBonificationToYear = JSON_IR[item].accumulatedUnitBonification || 0;
        const document_number_principal = item in DATABASE ? DATABASE[item].document_number_principal : "";
        const document_number_admin = item in DATABASE ? DATABASE[item].document_number_admin : "";
        const classe = item in DATABASE ? DATABASE[item].classe : "";
        const name = item in DATABASE ? DATABASE[item].name : "";
        let description = item in DATABASE ? composeDescription(classe, item, JSON_IR[item].accumulatedTotal, name, (document_number_admin ? document_number_admin : document_number_principal), "##", composeCurrency(pm, classe), composeCurrency(JSON_IR[item].accumulatedInvested, classe), JSON_IR[item].averageCambio, unitBonificationToYear) : "";
        description = description.replaceAll("## ", "");
        itemsWalletFiltered.push(
            {
                ticker: item,
                classe,
                name,
                document_number_principal,
                document_number_admin,
                qtd: JSON_IR[item].accumulatedTotal,
                pm: composeCurrency(pm, JSON_IR[item].classe),
                investiment: composeCurrency(JSON_IR[item].accumulatedInvested, JSON_IR[item].classe),
                past_year: item in JSON_IR_PAST ? composeCurrencyReal(JSON_IR_PAST[item].accumulatedInvested * (JSON_IR_PAST[item].averageCambio || 1)) : composeCurrencyReal(0),
                this_year: composeCurrencyReal(JSON_IR[item].accumulatedInvested * (JSON_IR[item].averageCambio || 1)),
                description,
                averageCambio: composeCurrency(JSON_IR[item].averageCambio, JSON_IR[item].classe),
                unitBonificationToYear
            });
    })
    return itemsWalletFiltered;
}

function irReportLoadingData(year = 2024, historyCurrent = false, historyPast = true) {
    const database = getDataBase();
    const sells = composeSells(year, database);
    const jsonIR = calculateAmmountIRPFFull(year, "", historyCurrent);
    const jsonIRPast = calculateAmmountIRPFFull(year - 1, "", historyPast);
    const walletList = getWalletReport(jsonIR, jsonIRPast);
    const itensWallletFiltered = composeBensEDireitos(walletList, jsonIR, jsonIRPast, database);
    const bonifications = composeBonificationToYear(jsonIR, database);
    const provents = composeProvents(Number(year), database);
    return { itensWallletFiltered, provents, sells, bonifications };

}

function composeBonificationToYear(jsonIR, database) {
    const bonifications = {}
    const json = JSON.parse(jsonIR)
    const tickerList = Object.keys(json)
    // accumulatedUnitBonification, accumulatedPriceBonification
    tickerList.forEach(item => {
        if (item !== "snapshotToYear") {
            if (json[item].accumulatedUnitBonification && json[item].accumulatedPriceBonification) {
                bonifications[item] = {
                    amount: json[item].accumulatedPriceBonification,
                    cnpj: database[item].document_number_principal || database[item].document_number_admin,
                    name: database[item].name
                }
            }
        }
    })
    return bonifications
}

function showIR() {
    try {
        const title = "IRPF - RELATÓRIO ANUAL";
        const ui = SpreadsheetApp.getUi();
        const tmp = HtmlService.createTemplateFromFile("@ricardoinvesting-showIR").evaluate();
        ui.showSidebar(tmp.setTitle(title));

    } catch (error) {
        throw new Error(`Não foi possível gerar o relatório. ::erro!:: ${error}`);
    }
}/**
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
 */

/**
 * LANCAMENTOS.GS
 */
function showReleases() {
    try {
        const title = "LANÇAMENTOS";
        const ui = SpreadsheetApp.getUi();
        const tmp = HtmlService.createTemplateFromFile("@ricardoinvesting-lancamentos").evaluate();
        ui.showSidebar(tmp.setTitle(title));
    } catch (error) {
        throw new Error(`Não foi possível carregar o formulário. ::erro!:: ${error}`);
    }
}

function saveInput(ticker = "MXRF11", data = "01/01/2024", type = "Compra", typeNegociation = null, quantity = 0, price = 0, price_pm_sale = 0, price_sale = 0, tax = 0, irrf = 0, database = null) {
    try {
        if (!database || !database.hasOwnProperty("classe")) {
            throw new Error("Detalhe do ticker não informado");
        }
        const sheet = SpreadsheetApp.getActiveSpreadsheet();
        const operationExternalsList = [...CLASS_EXTERNAL_LIST, CLASS.CRIPTOMOEDA]
        const dateFormated = `${data.split("-")[2]}/${data.split("-")[1]}/${data.split("-")[0]}`

        if (type === OPERATIONS.VENDA || type === OPERATIONS.VENDA_DIREITOS) { // se venda
            const sheet = SpreadsheetApp.getActiveSpreadsheet();
            const sheetSales = sheet.getSheetByName(ABAS.VENDAS);
            const lastRowSales = getLastRowInTable(sheetSales, "B", 4) + 1;

            sheetSales.getRange(`B${lastRowSales}`).setValue(ticker);
            sheetSales.getRange(`C${lastRowSales}`).setValue(typeNegociation);
            sheetSales.getRange(`H${lastRowSales}`).setValue(quantity)
            sheetSales.getRange(`I${lastRowSales}`).setValue(price_pm_sale)
            sheetSales.getRange(`J${lastRowSales}`).setValue(price_sale)
            sheetSales.getRange(`K${lastRowSales}`).setValue(tax)
            sheetSales.getRange(`L${lastRowSales}`).setValue(irrf)
            sheetSales.getRange(`M${lastRowSales}`).setValue(dateFormated)
        }

        if (!operationExternalsList.includes(database.classe)) { // se nacional
            const sheetB3 = sheet.getSheetByName(ABAS.LANCAMENTO_B3);
            const lastRowB3 = getLastRowInTable(sheetB3, "C", 2) + 1;

            sheetB3.getRange(`C${lastRowB3}`).setValue(ticker);
            sheetB3.getRange(`D${lastRowB3}`).setValue(dateFormated);
            sheetB3.getRange(`E${lastRowB3}`).setValue(type);
            sheetB3.getRange(`I${lastRowB3}`).setValue(quantity);
            if (type === OPERATIONS.VENDA || type === OPERATIONS.VENDA_DIREITOS) {
                sheetB3.getRange(`J${lastRowB3}`).setValue(price_sale);
            } else {
                sheetB3.getRange(`J${lastRowB3}`).setValue(price);
            }
            sheetB3.getRange(`K${lastRowB3}`).setValue(tax);
            sheetB3.getRange(`L${lastRowB3}`).setValue(irrf);
        }
        return true;
    } catch (error) {
        throw new Error(`Não foi possível enviar os lançamentos. ::erro!:: ${error}`)
    }
}

function saveProvent(ticker = "MXRF11", data = "01/01/2024", type = "Rendimento", quantity = 0, value = 0, irrf = 0, ptax = 0, database = null) {
    try {
        if (!database || !database.hasOwnProperty("classe")) {
            throw new Error("Detalhe do ticker não informado");
        }
        const sheet = SpreadsheetApp.getActiveSpreadsheet();
        const operationExternalsList = [...CLASS_EXTERNAL_LIST, CLASS.CRIPTOMOEDA]
        const dateFormated = `${data.split("-")[2]}/${data.split("-")[1]}/${data.split("-")[0]}`

        const sheetProvent = sheet.getSheetByName(ABAS.PROVENTOS);
        const lastRowProvent = getLastRowInTable(sheetProvent, "B", 4) + 1;

        sheetProvent.getRange(`B${lastRowProvent}`).setValue(ticker);
        sheetProvent.getRange(`C${lastRowProvent}`).setValue(type);
        sheetProvent.getRange(`D${lastRowProvent}`).setValue(dateFormated);
        sheetProvent.getRange(`E${lastRowProvent}`).setValue(quantity);
        sheetProvent.getRange(`G${lastRowProvent}`).setValue(value);
        sheetProvent.getRange(`H${lastRowProvent}`).setValue(irrf);

        if (operationExternalsList.includes(database.classe)) { // se exterior
            sheetProvent.getRange(`I${lastRowProvent}`).setValue(ptax);
        }
        return true
    } catch (error) {
        throw new Error(`Não foi possível enviar os lançamentos. ::erro!:: ${error}`)
    }
}
/**
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
 */

/**
 * PM.GS
 */
function calcPMFull(trigger = "") {
    try {
        const initialLine = 0;
        const sheet = SpreadsheetApp.getActiveSpreadsheet();
        const GuiaInvestimento = sheet.getSheetByName(ABAS.MOVIMENTACOES);
        const dataRows = getDataRange(GuiaInvestimento, "C", 2, "A", 2, "V");

        const tickersId = [];
        const tickers = {};

        for (let i = initialLine; i <= dataRows.length - 1; i++) {
            const rowTicker = dataRows[i][2];
            const date = new Date(dataRows[i][3]).toISOString();
            if (tickersId.includes(rowTicker)) {
                tickers[rowTicker].movimentations.push(
                    {
                        data: date,
                        typeOperation: dataRows[i][4],
                        qtd: dataRows[i][5],
                        investedAmount: dataRows[i][9],
                    }
                );
            } else {
                tickers[rowTicker] = {
                    "movimentations": [
                        {
                            data: date,
                            typeOperation: dataRows[i][4],
                            qtd: dataRows[i][5],
                            investedAmount: dataRows[i][9],
                        }
                    ]
                };
                tickersId.push(rowTicker);
            }

        }

        const pm = { "extension": {} };
        const tickerLoopIds = Object.keys(tickers);
        tickerLoopIds.forEach(id => {
            const movimentation = tickers[id].movimentations;
            const dataSorted = movimentation.sort((p1, p2) => (p1.data < p2.data) ? -1 : (p1.data > p2.data) ? 1 : 0);
            const dataGroup = {};
            dataSorted.forEach(function (item) {
                const list = dataGroup[item.data];

                if (list) {
                    list.push(item);
                } else {
                    dataGroup[item.data] = [item];
                }
            });

            const dates = Object.keys(dataGroup)
            let accumulatedTotal = 0;
            let accumulatedInvested = 0;
            let lastDateFinishPosition = null;
            dates.forEach(date => {
                dataGroup[date].forEach(item => {
                    const typeOperation = item.typeOperation;
                    const qtd = item.qtd;
                    const investedAmount = item.investedAmount;
                    if (typeOperation === OPERATIONS.BONIFICACAO || typeOperation === OPERATIONS.COMPRA || typeOperation === OPERATIONS.COMPRA_DIREITOS) {
                        accumulatedInvested = accumulatedInvested + investedAmount;
                        accumulatedTotal = accumulatedTotal + qtd;
                    } else if (typeOperation === OPERATIONS.VENDA || typeOperation === OPERATIONS.VENDA_DIREITOS) {
                        const tempPM = accumulatedInvested / accumulatedTotal;
                        const tempTotal = accumulatedTotal - qtd;
                        if (tempTotal === 0) {
                            const year = new Date(item.data).getFullYear();
                            let month = new Date(item.data).getMonth();
                            month = month > 8 ? month + 1 : `0${month + 1}`;
                            lastDateFinishPosition = `${year}${month}`;
                        }
                        accumulatedInvested = tempPM * tempTotal;
                        accumulatedTotal = tempTotal;
                    }
                })
            });
            pm["extension"][id] = {
                "lastDateFinishPosition": lastDateFinishPosition
            }
            if (accumulatedInvested && accumulatedTotal) {
                pm[id] = accumulatedInvested / accumulatedTotal;
            } else {
                pm[id] = 0;
            }

        });

        return JSON.stringify(pm);

    } catch (error) {
        console.log(error)
        return "-";
    }
}

function getPM(jsonString, ticker, trigger = null) {
    try {
        const data = JSON.parse(jsonString);
        if (ticker in data) {
            return data[ticker];
        }
    } catch {
        return "-";
    }
}

function getExtensionData(jsonString, ticker, key) {
    try {
        const data = JSON.parse(jsonString);
        if (ticker in data["extension"]) {
            return data["extension"][ticker][key];
        }
    } catch {
        return "-";
    }
}

/**
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
 */

/**
 * PRINT.GS
 */
const PRINT_OPTIONS = {
    'size': 7,               // paper size. 0=letter, 1=tabloid, 2=Legal, 3=statement, 4=executive, 5=folio, 6=A3, 7=A4, 8=A5, 9=B4, 10=B
    'fzr': false,            // repeat row headers
    'portrait': false,        // false=landscape
    'fitw': true,            // fit window or actual size
    'gridlines': false,      // show gridlines
    'printtitle': false,
    'sheetnames': false,
    'pagenum': 'UNDEFINED',  // CENTER = show page numbers / UNDEFINED = do not show
    'attachment': false
}

const PDF_OPTS = objectToQueryString(PRINT_OPTIONS);

// function onOpen(e) {
//   SpreadsheetApp.getUi().createMenu('Print...').addItem('Print selected range', 'printSelectedRange').addToUi();
// }

function printSelectedRange() {
    SpreadsheetApp.flush();
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();

    const Planilha = SpreadsheetApp.getActiveSpreadsheet();
    const IR = Planilha.getSheetByName(ABAS.BENS_DIREITOS);

    const range = sheet.getRange(`F3:W103`);

    const gid = IR.getSheetId();
    const printRange = objectToQueryString({
        'c1': range.getColumn() - 1,
        'r1': range.getRow() - 1,
        'c2': range.getColumn() + range.getWidth() - 1,
        'r2': range.getRow() + range.getHeight() - 1
    });
    const url = ss.getUrl().replace(/edit$/, '') + 'export?format=pdf' + PDF_OPTS + printRange + "&gid=" + gid;

    const htmlTemplate = HtmlService.createTemplateFromFile('@ricardoinvesting-html');
    htmlTemplate.url = url;
    SpreadsheetApp.getUi().showModalDialog(htmlTemplate.evaluate().setHeight(10).setWidth(100), 'Preparando impressão...');
}

function objectToQueryString(obj) {
    return Object.keys(obj).map(function (key) {
        return Utilities.formatString('&%s=%s', key, obj[key]);
    }).join('');
}/**
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
 */
/**
 * TESOURO.GS
 */
function TESOURODIRETO(trigger = 1) {
    try {
        let srcURL = "https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json";
        let jsonData = UrlFetchApp.fetch(srcURL);
        let parsedData = JSON.parse(jsonData.getContentText()).response;
        let tesouros = {};
        parsedData.TrsrBdTradgList.forEach((bond) => {
            const currBondName = bond.TrsrBd.nm;
            // tesouros[currBondName.toUpperCase()] = bond.TrsrBd.untrRedVal;      
            tesouros[currBondName.toUpperCase()] = bond.TrsrBd.untrInvstmtVal;
        })

        return JSON.stringify(tesouros);
    } catch (error) {
        console.log(error)
    }
}

function getTesouro(ticker = "TESOURO PREFIXADO 2025") {
    // const code = ticker.toUpperCase();
    // const data = JSON.parse(json);
    const cotation = getTesouroService(ticker);
    if (cotation) {
        return cotation
        // return data[code];
    } else {
        throw new Error("Not Found");
    }

}

function getTesouroService(ticker, trigger = null) {
    try {
        const cached = getCache(ticker, "value");
        if (cached) {
            return cached;
        }
        const response = UrlFetchApp.fetch(`https://bombolao-v2.rj.r.appspot.com/core/api/cotation?ticker=${ticker}`);
        const cotation = JSON.parse(response.getContentText());
        setCache(ticker, cotation, cotation && "value" in cotation, 25);
        return cotation.value;

    } catch {
        throw new Error("Not Found");
    }
}

