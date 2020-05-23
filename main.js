let canvas = document.getElementById("canvas-id");
let context = canvas.getContext("2d");

let pilons=[];

for(let i=0;i<100;i++){
	pilons[i]=new Pilon(i+1);
}

pilons.sort(() => Math.random() - 0.5) /* shuffles the array */

window.requestAnimationFrame(() => bubble_sort(canvas, pilons, 0, ["#00ff00", "#0000ff"]));

function draw(){
	
	window.requestAnimationFrame(draw);
}
