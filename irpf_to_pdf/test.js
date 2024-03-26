/**
 * ############### test ###############
*/

function log(v) {
    // console.log(v);
    // operation: dataRows[i][1],
    // transaction: dataRows[i][13],
    // value: dataRows[i][17],
    // ticker: rowTicker,
    // name: dataRows[i][2],
    // classe: dataRows[i][3],
    // type: dataRows[i][5]      
    let operations = {};
    const t = _.map(v, (year, indexYear) => _.map(year, (month, indexMonth) => {
        const filterOperations = _.groupBy(month.operations, (x) => x.operation);
        _.map(filterOperations, (ops, indexOp) => {
            _.map(ops, (op) => {
                composeOperations(operations, indexMonth, indexYear, op);
            })
        })
    }))
    composeSwingTradeFree(operations);
    console.log(operations);
}


function serverTest() {
    google.script.run
        .withSuccessHandler(log)
        .withFailureHandler(errorLoadingData)
        .serverTest(year);
}
// serverTest(); // initiate test