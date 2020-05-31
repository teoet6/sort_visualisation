function drawArray(targetCanvas, targetArray, palette){
	let targetContext=targetCanvas.getContext("2d");
	let n = targetArray.length;
	let unitW = targetCanvas.width / n;
	let unitH = targetCanvas.height / n;

	targetContext.clearRect(0, 0, targetCanvas.width, targetCanvas.height);

	for(let i = 0 ; i < n ; i++){
		targetContext.fillStyle = palette[targetArray[i].id];
		targetContext.fillRect(i*unitW, targetCanvas.height, unitW*0.9, -targetArray[i].value*unitH);
	}
}
