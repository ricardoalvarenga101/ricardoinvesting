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
