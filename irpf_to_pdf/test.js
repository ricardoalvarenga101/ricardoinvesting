/**
 * ############### test ###############
*/

function log(v) {    
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
}


function serverTest() {
    google.script.run
        .withSuccessHandler(log)
        .withFailureHandler(errorLoadingData)
        .serverTest(year);
}
// serverTest(); // initiate test