
function genarateTree(length){
    const list = [];
    for(let i=0; i<length; i++){
        list.push({id: i, text: (i + 1).toString()});
    }
    
    return list;

    // let map = {}, node;
    // const roots = [];

    // for(let i=0; i < length; i++){
    //     map[list[i].id] = i;
    //     list[i].children = [];
    // }
    // let lastParent;
    // for(let i=0; i < length; i++){
    //     node = list[i];
    //     if(i == 0){
    //         node.parentId = -1;
    //     }
    //     for(let j = i+1; j< parseInt(length / 3) && j < length; j++){
    //         list[j].parentId = node.id;
    //         node.children.push(list[j]);
    //     }
    //     lastParent = i;
    // }

}

module.exports = genarateTree;