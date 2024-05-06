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
    const GuiaMeusAtivos = Planilha.getSheetByName(ABAS.MEUS_ATIVOS);
    const variations = GuiaMeusAtivos.getRange("Y2:Y102").getValues()
    const total = sum(variations, 0);
    const Cell = Guia.getRange("A4");
    const days = [1, 2, 3, 4, 5];
    const now = new Date().getHours()

    if (days.includes(new Date().getDay())) {
        if (now == "09" || now === 9 || now === 10) {
            const currentMonth = composeIndiceDate(0)
            const oldMonth = composeIndiceDate(1)
            Cell.setValue(total);
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
                updatePerformance(total, oldMonth);
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
        } else {
            offlineCotations.push([value])
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

function updatePM() {
    const uuid = Utilities.getUuid();

    const Sheet = SpreadsheetApp.getActiveSpreadsheet();
    const GuideDinamicConsolid = Sheet.getSheetByName(ABAS.TABELA_DINAMICA_CONSOLIDADO);
    const firstYear = getFirstYear();
    const limitYear = new Date().getFullYear() - 5;
    const listYears = composeAvaiableYears(firstYear, limitYear);

    const content1 = calcPMFull(uuid);
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
}

function updatePMManual() {

    const outputClose = HtmlService.createHtmlOutput('<script>google.script.host.close();</script>');
    const ui = SpreadsheetApp.getUi();
    ui.showSidebar(HtmlService.createHtmlOutputFromFile("@ricardoinvesting-pm-html")
        .setTitle("Recalculando Preço Médio"));

    updatePM()

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

function getLastRowEvolution(GuidePerformance, shortDate) {
    const rows = GuidePerformance.getRange("A2:A2001").getValues();
    let countRow = 0;
    for (let i = 0; i < rows.length; i++) {
        if (rows[countRow][0] === shortDate) {
            countRow += 1;
            break;
        }
        countRow += 1;
    }
    return countRow + 1;
}

function updatePerformance(value, shortDate) {
    const Sheet = SpreadsheetApp.getActiveSpreadsheet();
    const GuidePerformance = Sheet.getSheetByName(ABAS.EVOLUCAO_PATRIMONIAL);
    const last = getLastRowEvolution(GuidePerformance, shortDate);
    GuidePerformance.getRange(`G${last}`).setValue(value)
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
