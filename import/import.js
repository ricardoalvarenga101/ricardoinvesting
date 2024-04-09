/**
 * @preserve
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
 * @endpreserve
 */

function startAnimation(idShow, idHide, direction = "right") {
    $(`#${idHide}`).hide();
    $(`#${idShow}`).show("slide", { direction }, 350);
}

function closeWindows() {
    google.script.host.close();
}

function success(e) {
    _getStatus()
}

function errorLoadingData(error) {
    $("#txt_await").hide();
    startAnimation('view_menu', 'view_loading');
    console.log(`Erro ao carregar dados`, error);
}

function getStatusSuccess(e) {
    console.log("STATUS", e)
    if (!e.status1) $("#btn_fase1").attr("disabled", "disabled");
    if (e.status1) $("#btn_fase1").removeAttr("disabled");
    if (!e.status2) $("#btn_fase2").attr("disabled", "disabled");
    if (e.status2) $("#btn_fase2").removeAttr("disabled");
    if (!e.status3) $("#btn_fase3").attr("disabled", "disabled");
    if (e.status3) $("#btn_fase3").removeAttr("disabled");
    startAnimation('view_menu', 'view_loading')
    $("#txt_loading_data").hide();

}

function _importData(fase) {
    startAnimation('view_loading', 'view_menu')
    $("#view_like").show();
    $("#txt_await").show();
    google.script.run
        .withSuccessHandler(success)
        .withFailureHandler(errorLoadingData)
        .importDataOtherVersion(fase)
}

function _getStatus() {
    $("#txt_loading_data").show();
    $("#txt_await").hide();
    $("#view_like").hide();
    startAnimation('view_loading', 'view_menu')
    google.script.run
        .withSuccessHandler(getStatusSuccess)
        .withFailureHandler(errorLoadingData)
        .getStatusButton()
}