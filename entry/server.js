
// server

function getDabaseSuccess(data) {
    $("#loading_spinner").hide();
    $("#view_menu").show();
    $("#txt_await_form").hide();
    _database = data;
    composeTicker("ticker_select", data.tickers);
    composeTicker("ticker_select_provent", data.tickers, true);
}

function _getTickers() {
    $("#loading_spinner").show();
    $("#view_menu").hide();
    $("#txt_await_form").show();
    if (_local) {
        getDabaseSuccess(MOCK_DATABASE)
    } else {
        google.script.run
            .withSuccessHandler(getDabaseSuccess)
            .withFailureHandler(errorLoadingData)
            .getDataBase();
    }
}

function savedEntry(res = null) {
    console.log("REGISTO SALVO COM SUCESSO", res)
    $("#la_quantity").val(0);
    $("#la_price").val(0);
    $("#la_price_pm_sale").val(0);
    $("#la_price_sale").val(0);
    $("#la_tax").val(0);
    $("#la_irrf").val(0);
    $("#txt_await_save_form").hide();
    $("#loading_spinner").hide();
    $("#view_alert_success").show();
    $("#txt_await_form").hide();

}

function _saveEntry() {
    $("#loading_spinner").show();
    $("#view_menu").hide();
    $("#txt_await_save_form").show();
    const ticker = $("#ticker_select :selected").text();
    const data = $("#la_data").val();
    const type = $("#type_select :selected").text()
    const typeNegociation = $("#type_negociation_select :selected").text()
    const quantity = $("#la_quantity").val();
    const price = $("#la_price").val();
    const price_pm_sale = $("#la_price_pm_sale").val();
    const price_sale = $("#la_price_sale").val();
    const tax = $("#la_tax").val();
    const irrf = $("#la_irrf").val();

    google.script.run
        .withSuccessHandler(savedEntry)
        .withFailureHandler(errorLoadingData)
        .saveInput(
            ticker,
            data,
            type,
            typeNegociation,
            quantity,
            price,
            price_pm_sale,
            price_sale,
            tax,
            irrf,
            _database[ticker])
}

function savedProvent(res = null) {
    console.log("PROVENTO SALVO COM SUCESSO", res)
    $("#la_quantity_provent").val(0);
    $("#la_value_provent").val(0);
    $("#la_irrf_provent").val(0);
    $("#la_ptax").val(0);
    $("#txt_await_save_form").hide();
    $("#loading_spinner").hide();
    $("#view_alert_success").show();
    $("#txt_await_form").hide();

}

function _saveProvent() {
    if (_local) {
        const delay = new Promise((res) => setTimeout(() => {
            $("#loading_spinner").show();
            $("#view_menu").hide();
            $("#txt_await_save_form").show();
            const ticker = $("#ticker_select_provent :selected").text();
            const data = $("#la_data_provent").val();
            const type = $("#type_select_provent :selected").text()
            const quantity = $("#la_quantity_provent").val();
            const value = $("#la_value_provent").val();
            const irrf = $("#la_irrf_provent").val();
            const ptax = $("#la_ptax").val();
            savedProvent({ ticker, data, type, quantity, value, irrf, ptax })

        }, 3000));
    } else {

        $("#loading_spinner").show();
        $("#view_menu").hide();
        $("#txt_await_save_form").show();
        const ticker = $("#ticker_select_provent :selected").text();
        const data = $("#la_data_provent").val();
        const type = $("#type_select_provent :selected").text()
        const quantity = $("#la_quantity_provent").val();
        const value = $("#la_value_provent").val();
        const irrf = $("#la_irrf_provent").val();
        const ptax = $("#la_ptax").val();

        google.script.run
            .withSuccessHandler(savedProvent)
            .withFailureHandler(errorLoadingData)
            .saveProvent(
                ticker,
                data,
                type,
                quantity,
                value,
                irrf,
                ptax)
    }
}