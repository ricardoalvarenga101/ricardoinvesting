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

function composeDescription(classe, ticker, quantity, name, cnpj, coin, pm, valueBuy, cambio = 1) {
    try {
        const composePm = pm; //.split(" ")[1].replace(",",".");
        const composeValueBuy = valueBuy; //.split(" ")[1].replace(",",".");
        if (CLASS_EXTERNAL_LIST.includes(classe)) { // exterior
            return `(${ticker}) - ${quantity} ${getRenderType(classe, quantity)} DE ${name.toUpperCase()}, CÓDIGO DE NEGOCIAÇÃO: ${ticker}. PREÇO MÉDIO DE ${coin} ${composePm} E CUSTO TOTAL DE AQUISIÇÃO DE ${coin} ${composeValueBuy} - (CÂMBIO DE R$ ${cambio.toFixed(4)})`
        } else if (CLASS_FIXED_LIST.includes(classe)) { // renda fixa
            return `APLICAÇÃO EM ${name.toUpperCase()} NO CNPJ: ${cnpj} TOTALIZANDO ${quantity} ${getRenderType(classe, quantity)}, COM CUSTO TOTAL DE AQUISIÇÃO DE ${coin} ${composeValueBuy}`;

        } else { // subscrições e outros tipos de renda variavel
            const number = parseInt(ticker.replace(/\D/g, ''));
            if (SUBSCRICOES_IDS.includes(number)) { // subscrições
                if (quantity <= 1) {
                    return `(${ticker}) - ${quantity} RECIBO DE SUBSCRIÇÃO DE ${name.toUpperCase()}, CNPJ: ${cnpj}, CÓDIGO DE NEGOCIAÇÃO: ${ticker}. PREÇO MÉDIO DE ${coin} ${composePm} E CUSTO TOTAL DE AQUISIÇÃO DE ${coin} ${composeValueBuy}`;
                } else {
                    return `(${ticker}) - ${quantity} RECIBOS DE SUBSCRIÇÕES DE ${name.toUpperCase()}, CNPJ: ${cnpj}, CÓDIGO DE NEGOCIAÇÃO: ${ticker}. PREÇO MÉDIO DE ${coin} ${composePm} E CUSTO TOTAL DE AQUISIÇÃO DE ${coin} ${composeValueBuy}`;
                }
            }
            return `(${ticker}) - ${quantity} ${getRenderType(classe, quantity)} DE ${name.toUpperCase()}, CNPJ: ${cnpj}, CÓDIGO DE NEGOCIAÇÃO: ${ticker}. PREÇO MÉDIO DE ${coin} ${composePm} E CUSTO TOTAL DE AQUISIÇÃO DE ${coin} ${composeValueBuy}`;
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
            let accumulatedTotal = 0;
            let accumulatedInvested = 0;
            let lastYearSales = null;
            let cambio = [];
            dates.forEach(date => {
                dataGroup[date].forEach(item => {
                    const typeOperation = item.typeOperation;
                    const qtd = item.qtd;
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
            totalAmmountOrAccumulated[id] = { "accumulatedTotal": accumulatedTotal, "accumulatedInvested": accumulatedInvested, lastYearSales, cambio, averageCambio: 0, hasDividends }
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
    walletList.forEach((item) => {
        const pm = JSON_IR[item].accumulatedInvested / JSON_IR[item].accumulatedTotal;
        const document_number_principal = item in DATABASE ? DATABASE[item].document_number_principal : "";
        const document_number_admin = item in DATABASE ? DATABASE[item].document_number_admin : "";
        const classe = item in DATABASE ? DATABASE[item].classe : "";
        const name = item in DATABASE ? DATABASE[item].name : "";
        let description = item in DATABASE ? composeDescription(classe, item, JSON_IR[item].accumulatedTotal, name, (document_number_admin ? document_number_admin : document_number_principal), "##", composeCurrency(pm, classe), composeCurrency(JSON_IR[item].accumulatedInvested, classe), JSON_IR[item].averageCambio) : "";
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
            });
    })
    return itemsWalletFiltered;
}

function irReportLoadingData(year = 2023, historyCurrent = false, historyPast = true) {
    const database = getDataBase();
    const sells = composeSells(year, database);
    const jsonIR = calculateAmmountIRPFFull(year, "", historyCurrent);
    const jsonIRPast = calculateAmmountIRPFFull(year - 1, "", historyPast);
    const walletList = getWallet(jsonIR, "");
    const itensWallletFiltered = composeBensEDireitos(walletList, jsonIR, jsonIRPast, database);
    const provents = composeProvents(Number(year), database);
    return { itensWallletFiltered, provents, sells };

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
}