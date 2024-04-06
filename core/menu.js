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
 * MENU.GS
 */
function onOpen() {
    const menu = SpreadsheetApp.getUi().createMenu("[@ricardoinvesting]");
    menu.addSubMenu(SpreadsheetApp.getUi().createMenu("🔹 B3")
        .addItem('Importar Lançamentos da B3', 'importarDadosB3'))
    menu.addSubMenu(SpreadsheetApp.getUi().createMenu("🔹 Acionadores")
        .addItem('Criar Acionadores', 'createTrigger')
        .addSeparator()
        .addItem('⛔ Remover Acionadores', 'createTrigger'))
    menu.addItem('🔹 Lançamentos', 'showReleases')
    menu.addSubMenu(SpreadsheetApp.getUi().createMenu("🔹 Automações")
        .addItem('Atualizar Cotação', 'updateCotationManual')
        .addItem('Atualizar Preço Médio', 'updatePMManual')
        .addItem('Exibir/Esconder Valores', 'hidden')
        .addItem('Exibir Apenas Abas Principais', 'onlyTabsDefault')
        .addSeparator()
        .addItem("⛔ Resetar Planilha", "clearAll"))
    menu.addSeparator();
    menu.addItem("🔹 IRPF", "showIR");
    menu.addToUi();
}

function clearAll() {
    const ui = SpreadsheetApp.getUi();
    let response = ui.alert(
        'Atenção! Deseja realmente limpar a planilha? Esta ação é irreversível.',
        ui.ButtonSet.YES_NO
    );
    if (response === ui.Button.YES) {

        const Planilha = SpreadsheetApp.getActiveSpreadsheet();
        const GuiaB3 = Planilha.getSheetByName(ABAS.B3);
        GuiaB3.getRange("I3").clearContent();
        GuiaB3.getRange("J2").setValue(0);

        const GuiaLancamentoB3 = Planilha.getSheetByName(ABAS.LANCAMENTO_B3);
        GuiaLancamentoB3.getRange("C2:E").clearContent()
        GuiaLancamentoB3.getRange("I2:L").clearContent();
        GuiaLancamentoB3.getRange("P2:P").clearContent();
        GuiaLancamentoB3.getRange("R2:R").setValue(false);
        GuiaLancamentoB3.getRange("S2:S").clearContent();

        const GuiaLancamentoManual = Planilha.getSheetByName(ABAS.LANCAMENTO_MANUAL);
        GuiaLancamentoManual.getRange("C2:E").clearContent();
        GuiaLancamentoManual.getRange("I2:L").clearContent();
        GuiaLancamentoManual.getRange("P2:P").clearContent();
        GuiaLancamentoManual.getRange("R2:R").setValue(false);
        GuiaLancamentoManual.getRange("S2:S").clearContent();

        const GuiaProventos = Planilha.getSheetByName(ABAS.PROVENTOS);
        GuiaProventos.getRange("B4:E").clearContent();
        GuiaProventos.getRange("G4:I").clearContent();

        const GuiaEvolucao = Planilha.getSheetByName(ABAS.EVOLUCAO_PATRIMONIAL);
        GuiaEvolucao.getRange("D2:E").clearContent();
        GuiaEvolucao.getRange("G2:G").clearContent();

        const GuiaVendas = Planilha.getSheetByName(ABAS.VENDAS);
        GuiaVendas.getRange("B4:C").clearContent();
        GuiaVendas.getRange("H4:M").clearContent();

        const GuiaCotacao = Planilha.getSheetByName(ABAS.COTACAO);
        GuiaCotacao.getRange("D2:D").clearContent();
        GuiaCotacao.getRange("E2:E").clearContent();

        const GuiaDarf = Planilha.getSheetByName(ABAS.DARF);
        GuiaDarf.getRange("C18:C23").setValue(0);
        GuiaDarf.getRange("K18:K24").setValue(0);

        const GuiaMo = Planilha.getSheetByName(ABAS.MEUS_OBJETIVOS);
        GuiaMo.getRange("B2:B21").setValue('PENDENTE');
        GuiaMo.getRange("E2:E21").setValue('-');

        const GuiaPT = Planilha.getSheetByName(ABAS.PRECO_TETO);
        GuiaPT.getRange("B4:B105").clearContent();
        GuiaPT.getRange("G4:G105").clearContent();
        GuiaPT.getRange("H4:H105").clearContent();

        const GuiaBA = Planilha.getSheetByName(ABAS.BALANCEAMENTO_ATIVO);
        GuiaBA.getRange("B4:B103").clearContent();
        GuiaBA.getRange("G4:G103").clearContent();

        const GuiaBC = Planilha.getSheetByName(ABAS.BALANCEAMENTO);
        GuiaBC.getRange("B4:B103").clearContent();
        GuiaBC.getRange("G4:G103").clearContent();

        const GuiaAM = Planilha.getSheetByName(ABAS.AMORTIZACOES);
        GuiaAM.getRange("A2:A").clearContent();
        GuiaAM.getRange("B4:B").clearContent();
        GuiaAM.getRange("C4:C").clearContent();

        const GuiaSimuladorPm = Planilha.getSheetByName(ABAS.SIMULADOR_PM);
        GuiaSimuladorPm.getRange("J4:L").clearContent();

        const GuiaLancamentoCDB = Planilha.getSheetByName(ABAS.LANCAMENTO_CDB);
        GuiaLancamentoCDB.getRange("C2:J").clearContent();

        const GuiaImport = Planilha.getSheetByName(ABAS.IMPORT);
        GuiaImport.getRange("D5:D19").setValue(false);

        const GuiaIR = Planilha.getSheetByName(ABAS.BENS_DIREITOS);
        GuiaIR.getRange("AC2").clearContent();

        return Browser.msgBox("Reset realizado com sucesso!");
    }

}

function onlyTabsDefault() {

    const Planilha = SpreadsheetApp.getActiveSpreadsheet();
    //show
    Planilha.getSheetByName(ABAS.INFORMACOES).showSheet();
    Planilha.getSheetByName(ABAS.B3).showSheet();
    Planilha.getSheetByName(ABAS.DASHBOARD).showSheet();
    Planilha.getSheetByName(ABAS.MEUS_ATIVOS).showSheet();
    Planilha.getSheetByName(ABAS.LANCAMENTO_B3).showSheet();
    Planilha.getSheetByName(ABAS.LANCAMENTO_MANUAL).showSheet();
    Planilha.getSheetByName(ABAS.VENDAS).showSheet();
    Planilha.getSheetByName(ABAS.DARF).showSheet();
    Planilha.getSheetByName(ABAS.PROVENTOS).showSheet();
    Planilha.getSheetByName(ABAS.DASHBOARD_CONSOLIDADO).showSheet();
    //hiden
    Planilha.getSheetByName(ABAS.LANCAMENTO_CDB).hideSheet();
    Planilha.getSheetByName(ABAS.EVOLUCAO_PATRIMONIAL).hideSheet();
    Planilha.getSheetByName(ABAS.AMORTIZACOES).hideSheet();
    Planilha.getSheetByName(ABAS.CALENDARIO).hideSheet();
    Planilha.getSheetByName(ABAS.BALANCEAMENTO).hideSheet();
    Planilha.getSheetByName(ABAS.BALANCEAMENTO_ATIVO).hideSheet();
    Planilha.getSheetByName(ABAS.SIMULADOR_PM).hideSheet();
    Planilha.getSheetByName(ABAS.PRECO_TETO).hideSheet();
    Planilha.getSheetByName(ABAS.MEUS_OBJETIVOS).hideSheet();
    Planilha.getSheetByName(ABAS.BENS_DIREITOS).hideSheet();
    Planilha.getSheetByName(ABAS.BASE_DADOS).hideSheet();
    Planilha.getSheetByName(ABAS.TABELA_DINAMICA).hideSheet();
    Planilha.getSheetByName(ABAS.TABELA_DINAMICA_CONSOLIDADO).hideSheet();
    Planilha.getSheetByName(ABAS.CODIGOS_IRPF).hideSheet();
    Planilha.getSheetByName(ABAS.COTACAO).hideSheet();
    Planilha.getSheetByName(ABAS.ALTAS).hideSheet();
    Planilha.getSheetByName(ABAS.MOVIMENTACOES).hideSheet();
    Planilha.getSheetByName(ABAS.MOVIMENTACOES_CDB).hideSheet();
    Planilha.getSheetByName(ABAS.IMPORT).hideSheet();

}