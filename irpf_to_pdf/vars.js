/**
 * ############### vars ###############
*/
let loading = false;
let operationsFull = {};
let itensWalletFiltered = [];
let provents = {};
let year = 2023;
let name = "";
let document_number = "";
let firstYear = new Date().getFullYear();
let operationsFII = {}
let tableOperationsFII = {}
let lossesSalesFii = {};
let LOCAL = true;

/**
* ############### constants ###############
*/
const LIMIT_SWING_TRADE = 20000;
const LIMIT_SWING_EXTERIOR = 35000;
const SUM_SWING_TRADE_FREE = {};
const TYPE_OPERATIONS_SELL = {
    "VENDA_DE_FII": "VENDA DE FII/FIAGRO", //
    "DAY_TRADE": "DAY TRADE DE AÇÃO", //
    "SWING_TRADE": "SWING TRADE DE AÇÃO", //
    "VENDA_DE_ACAO_ESTRANGEIRA": "VENDA DE AÇÃO ESTRANGEIRA",
    "VENDA_DE_BDR": "VENDA DE BDR", //
    "VENDA_DE_ETF": "VENDA DE ETF", //
    "VENDA_DE_FI_INFRA": "VENDA DE FI INFRA", //
    "VENDA_DE_CRIPTOMOEDA": "VENDA DE CRIPTOMOEDA",
    "DIREITOS_DE_SUBSCRICAO": "DIREITOS DE SUBSCRIÇÃO", //
}
const MONTHS_LABEL = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
}