async function bubble_sort(target_canvas, target_array, delay, palette){
	let n = target_array.length;
	for(let t = 0 ; t < n ; t++){
		for(let i = 0 ; i < n-1 ; i++){
			target_array[i].id = 1;
			target_array[i+1].id = 1;
			drawArray(target_canvas, target_array, palette);
			await sleep(delay);

			if(target_array[i].value > target_array[i+1].value){
				let buff = clone(target_array[i]);
				target_array[i] = clone(target_array[i+1]);
				target_array[i+1] = buff;
			}

			drawArray(target_canvas, target_array, palette);
			await sleep(delay);
			target_array[i].id = 0;
			target_array[i+1].id = 0;
		}
	}
}
