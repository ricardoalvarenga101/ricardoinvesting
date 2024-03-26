/**
* ############### process data ###############
*/

function getFirstYear(data) {
    firstYear = data;
    composeListYears();
    document.getElementById("btn_generate").style.display = "block";
    document.getElementById("ir_form").style.display = "inline";
    document.getElementById("loading_spinner").style.display = "none";
    document.getElementById("txt_await").style.display = "none";
    document.getElementById("txt_await_form").style.display = "none";
    name = (document.getElementById("input_name").value).toUpperCase();
    const e = document.getElementById("year_select");
    year = e.options[e.selectedIndex].value;
    document_number = document.getElementById("input_cpf").value;
}

function getJson(data) {
    console.log("data", data)
    itensWalletFiltered = data.itensWallletFiltered;
    provents = composeProvents(data.provents);

    operations = {};
    const t = _.map(data.sells, (year, indexYear) => _.map(year, (month, indexMonth) => {
        const filterOperations = _.groupBy(month.operations, (x) => x.operation);
        _.map(filterOperations, (ops, indexOp) => {
            _.map(ops, (op) => {
                composeOperations(operationsFull, indexMonth, indexYear, op);
            })
        })
    }))
    composeSwingTradeFree(operationsFull);
    document.getElementById("btn_generate").style.display = "block";
    document.getElementById("loading_spinner").style.display = "none";
    document.getElementById("btn_download").style.display = "block";
    document.getElementById("txt_await").style.display = "none";
    console.log(operationsFull);
}

function onChange() {
    const e = document.getElementById("year_select");
    year = e.options[e.selectedIndex].value;
}