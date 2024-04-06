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

}