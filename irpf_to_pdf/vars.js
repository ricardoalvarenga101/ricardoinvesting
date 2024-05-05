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
 * ############### vars ###############
*/
let loading = false;
let operationsFull = {};
let itensWalletFiltered = [];
let provents = {};
let year = 2022;
let name = "";
let document_number = "";
let _firstYear = new Date().getFullYear();
let operationsFII = {}
let tableOperationsFII = {}
let lossesSalesFii = {};
let pdfDefinition = {}
let _local = false;
let SUM_SWING_TRADE_FREE = {};
let SUM_SWING_TRADE_CRIPTO_FREE = {};
let SUM_SWING_TRADE_FREE_99 = {};
let bonifications = {};
let bonificationsWithFractions = {};
let rentals = {}

/**
* ############### constants ###############
*/
const LIMIT_SWING_TRADE = 20000;
const LIMIT_SWING_TRADE_CRIPTO = 35000;
const LIMIT_SWING_EXTERIOR = 35000;
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
const CNPJ_B3 = "09.346.601/0001-25"
const NAME_B3 = "B3 S.A. – BRASIL, BOLSA, BALCÃO"
