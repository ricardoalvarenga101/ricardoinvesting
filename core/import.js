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

            copyData(TAB_IMPORT, "D17", 3, 2, 3, 9, "E17", ABAS.LANCAMENTO_CDB, externalSheet, Sheet, 2, false, fase);

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
                    copyData(TAB_IMPORT, "D20", 3, 5, 2, 1, "E19", ABAS.ANOTACOES, externalSheet, Sheet, 1, true, fase);
                    copyData(TAB_IMPORT, "D20", 3, 5, 4, 1, "E19", ABAS.ANOTACOES, externalSheet, Sheet, 1, false, fase);
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

}