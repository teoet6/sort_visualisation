async function selection(target_canvas, n, delay, palette){
    let target_array=[];
	for(let i = 0 ; i < n ; i++){
		target_array[i] = new Pilon(i+1);
	}
    target_array.sort(() => Math.random() - 0.5);

    let len = target_array.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (target_array[min].value > target_array[j].value) {
                min = j;
            }
        }
        if (min !== i) {
            let tmp = target_array[i].value;
            target_array[i].value = target_array[min].value;
            target_array[min].value = tmp;
        }
        drawArray(target_canvas, target_array, palette);
		await sleep(delay);
    }
}
