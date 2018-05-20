

function addOptionToSelect(selectElement, node){
    let option = document.createElement("option");
    option.text = node.text || node.id;

    selectElement.add(option);
}

module.exports = {addOptionToSelect: addOptionToSelect};