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
        .everyHours(1)
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

    let initialLine = 2;
    let totalRegister = 0;

    const GuideCotation = Sheet.getSheetByName(ABAS.COTACAO);
    Utilities.sleep(1000);

    totalRegister = getTotalRegisterInGuide(GuideCotation);
    let outputClose = null;
    let ui = null;
    console.log("[🔨] - Iniciando atualização de cotação");
    for (var i = initialLine; i <= totalRegister + 1; i++) {
        const id = GuideCotation.getRange(i, 1).getValue();
        const type = GuideCotation.getRange(i, 2).getValue();
        let value = GuideCotation.getRange(i, 3).getValue(); // coluna cotacao (online)    
        // const valuePvp = GuideCotation.getRange(i, 12).getValue(); // coluna pvp (online)
        const reference = String("D") + i;
        const referencePvpOffline = String("E") + i;
        const CellPerformance = GuideCotation.getRange(reference);
        // const CellReferencePvpOffline = GuideCotation.getRange(referencePvpOffline);
        if (value !== "-") {
            if (classStranger.includes(type)) {
                const dolar = GuideCotation.getRange("F2").getValue();
                CellPerformance.setValue(value * dolar);
                // CellReferencePvpOffline.setValue("-");

            } else {
                CellPerformance.setValue(value);
                // CellReferencePvpOffline.setValue("-");
            }
        }
        console.log(`[✔] ---- ${type} (${id})`);
    }

    const dash = Sheet.getSheetByName(ABAS.DASHBOARD);
    const formatedDate = Utilities.formatDate(new Date(), "GMT-3", "dd/MM/yyyy-HH:mm:ss");
    dash.getRange("N4").setValue("🕔 Data da última cotação: " + formatedDate);
    dash.getRange("a3").setValue(new Date().toTimeString());

    // const TD = Sheet.getSheetByName(ABAS.TABELA_DINAMICA);
    // const date = new Date();
    // TD.getRange("AP2").setValue(date.getMilliseconds() + date.getSeconds() + date.getMinutes());

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
    const GuideIR = Sheet.getSheetByName(ABAS.BENS_DIREITOS);
    const GuideConsolid = Sheet.getSheetByName(ABAS.DASHBOARD_CONSOLIDADO);
    const TbDinamic = Sheet.getSheetByName(ABAS.TABELA_DINAMICA);
    const yearIR = GuideIR.getRange("F2").getValue();
    const yearConsolidIR = GuideConsolid.getRange("C26").getValue();


    ui.showSidebar(HtmlService.createHtmlOutputFromFile("@ricardoinvesting-pm-html")
        .setTitle("Atualizando Preço Médio"));

    const content1 = calcPMFull(uuid);
    const content2 = calculateAmmountIRPFFull(yearIR, uuid, false);
    const content3 = calculateAmmountIRPFFull(yearIR - 1, uuid, true);
    const content4 = calculateAmmountIRPFFull(yearConsolidIR, uuid, false);
    const content5 = calculateAmmountIRPFFull(yearConsolidIR - 1, uuid, true);

    TbDinamic.getRange("AN2").setValue(content1);
    TbDinamic.getRange("AN3").setValue(content2);
    TbDinamic.getRange("AN4").setValue(content3);
    TbDinamic.getRange("AN5").setValue(content4);
    TbDinamic.getRange("AN6").setValue(content5);

    ui.showSidebar(outputClose.setTitle("Atualizando Preço Médio"));

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


