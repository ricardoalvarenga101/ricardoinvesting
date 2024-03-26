/**
* ############### server ###############
*/

function _getFirstYear() {
    document.getElementById("btn_generate").style.display = "none";
    document.getElementById("ir_form").style.display = "none";
    document.getElementById("loading_spinner").style.display = "flex";
    document.getElementById("txt_await").style.display = "none";
    document.getElementById("txt_await_form").style.display = "flex";
    name = (document.getElementById("input_name").value).toUpperCase();
    document_number = document.getElementById("input_cpf").value;
    getFirstYear(2022) // test local
    // google.script.run
    //   .withSuccessHandler(getFirstYear)
    //   .withFailureHandler(errorLoadingData)
    //   .getFirstYear();
}

function _loadingData() {
    document.getElementById("btn_generate").style.display = "none";
    document.getElementById("ir_form").style.display = "none";
    document.getElementById("loading_spinner").style.display = "flex";
    document.getElementById("txt_await").style.display = "flex";
    name = (document.getElementById("input_name").value).toUpperCase();
    document_number = document.getElementById("input_cpf").value;
    getJson(mockFullData) // test local
    // google.script.run
    //   .withSuccessHandler(getJson)
    //   .withFailureHandler(errorLoadingData)
    //   .irReportLoadingData(year, false, true);
}