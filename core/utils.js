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
}
