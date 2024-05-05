/**
* ############### server ###############
*/

function _getFirstYear() {
    document.getElementById("btn_generate").style.display = "none";
    document.getElementById("ir_form").style.display = "none";
    document.getElementById("loading_spinner").style.display = "flex";
    document.getElementById("txt_await").style.display = "none";
    document.getElementById("txt_await_form").style.display = "flex";
    document.getElementById("btn_download").style.display = "none";
    document.getElementById("btn_close1").style.display = "none";
    document.getElementById("btn_close2").style.display = "none";
    document.getElementById("btn_back").style.display = "none"; 

    itensWalletFiltered = [];
    provents = {};       
    bonifications = {};
    bonificationsWithFractions = {};
    rentals = {}
    
    operationsFII = {}
    tableOperationsFII = {}
    lossesSalesFii = {};
    pdfDefinition = {}
    operationsFull={}

    SUM_SWING_TRADE_FREE = {};
    SUM_SWING_TRADE_FREE_99 = {};
    SUM_SWING_TRADE_CRIPTO_FREE = {};

    name = (document.getElementById("input_name").value).toUpperCase();
    document_number = document.getElementById("input_cpf").value;
    if (_local) {
        getFirstYear(2022) // test local
    } else {
        google.script.run
            .withSuccessHandler(getFirstYear)
            .withFailureHandler(errorLoadingData)
            .getFirstYear();
    }
}

function _loadingData() {
    document.getElementById("btn_generate").style.display = "none";
    document.getElementById("ir_form").style.display = "none";
    document.getElementById("loading_spinner").style.display = "flex";
    document.getElementById("txt_await").style.display = "flex";
    document.getElementById("btn_close1").style.display = "none";
    document.getElementById("btn_close2").style.display = "none";
    document.getElementById("btn_back").style.display = "none";
    name = (document.getElementById("input_name").value).toUpperCase();
    document_number = document.getElementById("input_cpf").value;
    if (_local) {
        getJson(mockAluguel2024) // test local
    } else {
        google.script.run
            .withSuccessHandler(getJson)
            .withFailureHandler(errorLoadingData)
            .irReportLoadingData(year, false, true);
    }
}
