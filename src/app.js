const _ = require('lodash');
const Dracula = require('graphdracula');
const genarateTree = require('./node-genarator');
const uiHelper = require('./ui-helper');

let render = {};

let nodes = genarateTree(10);

let matrix;


function addVertexes(graph){
    const length = nodes.length;
    matrix  = new Array(length);
    for(let i=0; i<length; i++){
        matrix[i] = new Array(length);
        matrix[i].forEach((elem) => {
            elem = 0;
        });
    }
    nodes.forEach((node) => {
        graph.addNode(node.text);
    });
}

function addDefaultEdges(graph){
    let previousNode;
    for(let i = 0; i < nodes.length; i++){
        if(i === 0){
            graph.addEdge(nodes[i].text, nodes[nodes.length - 1].text);
            previousNode = nodes[i];
            matrix[nodes[i].id][nodes[nodes.length - 1].id] = 1;
        }else{
            graph.addEdge(nodes[i].text, previousNode.text);
            matrix[nodes[i].id][previousNode.id] = 1;
            previousNode = nodes[i];
        }
    } 
}

function AddEdgesFromMatrix(graph){
    for(let i=0; i<nodes.length; i++){
        for(let j=0; j<nodes.length; j++){
            if(i !== j){
                if(matrix[i][j] === 1){
                    let source = _.find(graph.nodes, {id: (i+1).toString()});
                    let target = _.find(graph.nodes, {id: (j+1).toString()});
                    //implement rest....
                    graph.addEdge(source.text, target.text);
                }
            }
        }
    }
}

redraw();

let firstSelect = document.getElementById('firstVertex');
let secondSelect = document.getElementById('secondVertex');
let selectToDelete = document.getElementById('deleteVertex');

function refreshSelects(){
    //fastest way to remove child elements
    //God bless Stack Overflow
    while(firstSelect.firstChild){
        firstSelect.removeChild(firstSelect.firstChild);
    }
    while(secondSelect.firstChild){
        secondSelect.removeChild(secondSelect.firstChild);
    }
    while(selectToDelete.firstChild){
        selectToDelete.removeChild(selectToDelete.firstChild);
    }
    nodes.forEach((node) => {
        uiHelper.addOptionToSelect(firstSelect, node);
        uiHelper.addOptionToSelect(secondSelect, node);
        uiHelper.addOptionToSelect(selectToDelete, node);
    });
}

refreshSelects();

let deleteBtn = document.getElementById('deleteVertexBtn');

deleteBtn.onclick = () => {
    let id = selectToDelete.value;
    if(id){
        _.remove(nodes, {text: id});
        redraw();
        refreshSelects();
    }else{
        alert('.|.');
    }
};

function removeCanvas(){
    let canvas = document.getElementById('canvas');
    if(canvas.firstChild){
        canvas.removeChild(canvas.firstChild);
    }
}

function redraw() {
    let newGraph = new Dracula.Graph();
    addVertexes(newGraph);
    addDefaultEdges(newGraph);
    removeCanvas();
    render.layouter = new Dracula.Layout.Spring(newGraph);
    render.renderer = new Dracula.Renderer.Raphael('#canvas', newGraph, 1000, 900);
    render.layouter.layout();
    render.renderer.draw();
};