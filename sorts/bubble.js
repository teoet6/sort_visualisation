//bubble_show for pausing
//bubble_reset() for resetting (please give parameters)
async function bubble_sort(target_canvas, n, delay, palette){
	let target_array=[];
	for(let i = 0 ; i < n ; i++){
		target_array[i] = new Pilon(i+1);
	}
	target_array.sort(() => Math.random() - 0.5);
	console.log(target_array);
	for(let t = n-1 ; t >= 0 ; t--){
		let swapped=false;
		for(let i = 0 ; i < t ; i++){
			target_array[t].id = 2;
			target_array[i].id = 1;
			target_array[i+1].id = 1;
			drawArray(target_canvas, target_array, palette);
			do await sleep(delay); while(!bubble_show)
			if(bubble_stop) return bubble_stop=false;
			

			if(target_array[i].value > target_array[i+1].value){
				let buff = clone(target_array[i]);
				target_array[i] = clone(target_array[i+1]);
				target_array[i+1] = buff;
				swapped=true;
			}

			drawArray(target_canvas, target_array, palette);
			do await sleep(delay); while(!bubble_show)
			if(bubble_stop) return bubble_stop=false;
			target_array[t].id = 0;
			target_array[i].id = 0;
			target_array[i+1].id = 0;
		}
		if(!swapped)break;
	}
	bubble_sort(target_canvas, n, delay, palette);
}

async function bubble_reset(target_canvas, n, delay, palette){
	console.log("reseted");
	if(bubble_stop==true){
		console.log("was true");
		bubble_stop=false;
		bubble_sort(target_canvas, n, delay, palette);
		return;
	}

	bubble_stop=true;
	while(bubble_stop) await sleep(10);
	
	bubble_sort(target_canvas, n, delay, palette);
}
