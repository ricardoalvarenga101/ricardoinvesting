// utils
function showFieldsSellWithSubscriber(show = false, withSubscription = false) {
    if (show) {
        $("#view_input_negociation").show();
        $("#type_negociation_select").removeAttr('disabled');
        if (withSubscription) {
            $("#type_negociation_select").attr('disabled', 'disabled');
            $("#type_negociation_select").val("DIREITOS DE SUBSCRIÇÃO").change();
        }
    } else {
        $("#view_input_negociation").hide();
        $("#type_negociation_select").removeAttr('disabled');
    }
}

function errorLoadingData(error) {
    console.log(`erro ao carregar dados`, error);
}

function closeReleases() {
    google.script.host.close();
}

function getDateNow() {
    const dt = `${compose2Decimal(new Date().getFullYear())}-${compose2Decimal(new Date().getMonth() + 1)}-${compose2Decimal(new Date().getDay())}`
    return dt;
}

function compose2Decimal(value) {
    if (value < 9) {
        return `0${value}`;
    }
    return value;
}
function callback(id) {
    setTimeout(function () {
        $(`#${id}:visible`).removeAttr("style").fadeOut();
    }, 1000);
};

// animacoes
function startAnimation(idShow, idHide, direction = "right") {
    $(`#${idHide}`).hide();
    $(`#${idShow}`).show("slide", { direction }, 350);
}