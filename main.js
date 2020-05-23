let canvas1 = document.getElementById("canvas1");
let canvas2 = document.getElementById("canvas2");

let pilons=[];

for(let i = 0 ; i < 50 ; i++){
	pilons[i]=new Pilon(i+1);
}

pilons.sort(() => Math.random() - 0.5) /* shuffles the array */

window.requestAnimationFrame(() => bubble_sort(canvas, pilons, 0, ["#00ff00", "#0000ff", "#ff0000"]));
window.requestAnimationFrame(() => coctail_sort(canvas, pilons, 0, ["#00ff00", "#0000ff", "#ff0000"]));

function draw(){
	window.requestAnimationFrame(draw);
}
