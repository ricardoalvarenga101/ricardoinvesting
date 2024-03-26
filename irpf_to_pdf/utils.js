/**
* ############### utils ###############
*/
function subtractionLosses(valueA, valueB) {
    debugger;
    if (valueA >= valueB) {
        return 0
    }
    return valueB - valueA;

}

function getNode(object, key) {
    if (object.hasOwnProperty(key)) {
        return object[key]
    } else {
        return 0
    }
}

function taxCal(value, percent) {
    if (value > 0) {
        return convertCurrencyReal(value * percent);
    }
    return convertCurrencyReal(0);
}

function convertCurrencyReal(value) {
    return value.toLocaleString('pt-br', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
}
function convertCurrencyRealWithoutCoin(value) {
    return value.toLocaleString('pt-br', { minimumFractionDigits: 2 });
}

function errorLoadingData(error) {
    console.log(`erro ao carregar dados`, error);
}

function getCodes(classe) {

    let group = "-";
    let cod = "-";
    let locale = "105 - Brasil";

    switch (classe) {
        case "Ação":
            group = "03";
            cod = "01";
            break;
        case "FI-INFRA":
            group = "07";
            cod = "99";
            break;
        case "FII":
            group = "07";
            cod = "03";
            break;
        case "Fiagro":
            group = "07";
            cod = "02";
            break;
        case "STOCK":
            group = "03";
            cod = "01";
            locale = "249 - Estados Unidos";
            break;
        case "REIT":
            group = "03";
            cod = "01";
            locale = "249 - Estados Unidos";
        case "ETF-EXTERIOR":
            group = "07";
            cod = "09";
            locale = "249 - Estados Unidos";
            break;
        case "Renda Fixa":
            group = "04";
            cod = "02";
            break;
        case "Renda Fixa - Outros":
            group = "04";
            cod = "02";
            break;
    }

    return {
        group,
        cod,
        locale
    }
}