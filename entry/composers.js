// composers
function composeTicker(selectName = "", data = [], isProvent = false) {
    const select = document.getElementById(selectName);
    let options_str = "";
    for (let i = 0; i < data.length; i++) {  
        if(!isProvent) {      
            if (!CLASS_EXTERNAL.includes(data[i])) {
                options_str = options_str + `<option value='${data[i]}'>${data[i]}</option>`;
            }
        } else {
            options_str = options_str + `<option value='${data[i]}'>${data[i]}</option>`;
        }
    }
    select.innerHTML = options_str;
}