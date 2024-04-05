// events
function onChangeTypeProvent() {
  console.log('helo')
}

function onChangeType() {
  const operation_selected = $("#type_select :selected").text();
  if (SELLS_OPERATIONS.includes(operation_selected)) {
    if (operation_selected === SELLS_OPERATIONS[1]) { // venda de direito
      showFieldsSellWithSubscriber(true, true)
      $("#view_la_price_entry").hide();
      $("#view_la_price_sale").show();
    } else {
      showFieldsSellWithSubscriber(true, false)
      $("#view_la_price_entry").hide();
      $("#view_la_price_sale").show();
    }
  } else {
    showFieldsSellWithSubscriber(false, false)
    $("#view_la_price_entry").show();
    $("#view_la_price_sale").hide();
  }
} 