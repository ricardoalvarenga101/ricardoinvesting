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
function startAnimation(t,a,i="right"){$(`#${a}`).hide(),$(`#${t}`).show("slide",{direction:i},350)}function closeWindows(){google.script.host.close()}function success(t){_getStatus()}function errorLoadingData(t){$("#txt_await").hide(),startAnimation("view_menu","view_loading")}function getStatusSuccess(t){t.status1||$("#btn_fase1").attr("disabled","disabled"),t.status1&&$("#btn_fase1").removeAttr("disabled"),t.status2||$("#btn_fase2").attr("disabled","disabled"),t.status2&&$("#btn_fase2").removeAttr("disabled"),t.status3||$("#btn_fase3").attr("disabled","disabled"),t.status3&&$("#btn_fase3").removeAttr("disabled"),startAnimation("view_menu","view_loading"),$("#txt_loading_data").hide()}function _importData(t){startAnimation("view_loading","view_menu"),$("#view_like").show(),$("#txt_await").show(),google.script.run.withSuccessHandler(success).withFailureHandler(errorLoadingData).importDataOtherVersion(t)}function _getStatus(){$("#txt_loading_data").show(),$("#txt_await").hide(),$("#view_like").hide(),startAnimation("view_loading","view_menu"),google.script.run.withSuccessHandler(getStatusSuccess).withFailureHandler(errorLoadingData).getStatusButton()}