//cocktail_show for pausin
//cocktail_reset() for resetting
async function cocktail_sort(target_canvas, n, delay, palette){
	let target_array=[];
	for(let i = 0 ; i < n ; i++){
		target_array[i] = new Pilon(i+1);
	}

	target_array.sort(() => Math.random() - 0.5);
	let l=0, r=n-1;
	for(let t = 0 ; t < n ; t+=2){
		let swapped=false;
		for(let i = l ; i < r ; i++){
			target_array[l].id = 2;
			target_array[r].id = 2;
			target_array[i].id = 1;
			target_array[i+1].id = 1;
			drawArray(target_canvas, target_array, palette);
			do await sleep(delay); while(!cocktail_show)
			if(cocktail_stop) return cocktail_stop=false;


			if(target_array[i].value > target_array[i+1].value){
				let buff = clone(target_array[i]);
				target_array[i] = clone(target_array[i+1]);
				target_array[i+1] = buff;
				swapped=true;
			}

			drawArray(target_canvas, target_array, palette);
			do await sleep(delay); while(!cocktail_show)
			if(cocktail_stop) return cocktail_stop=false;
			target_array[l].id = 0;
			target_array[r].id = 0;
			target_array[i].id = 0;
			target_array[i+1].id = 0;
		}
		r--;
		if(!swapped)return;
		swapped=false;
		for(let i = r ; i > l ; i--){
			target_array[l].id = 2;
			target_array[r].id = 2;
			target_array[i].id = 1;
			target_array[i-1].id = 1;
			drawArray(target_canvas, target_array, palette);
			do await sleep(delay); while(!cocktail_show)
			if(cocktail_stop) return cocktail_stop=false;
			if(target_array[i].value < target_array[i-1].value){
				let buff = clone(target_array[i]);
				target_array[i] = clone(target_array[i-1]);
				target_array[i-1] = buff;
				swapped=true;
			}

			drawArray(target_canvas, target_array, palette);
			do await sleep(delay); while(!cocktail_show)
			if(cocktail_stop) return cocktail_stop=false;

			target_array[l].id = 0;
			target_array[r].id = 0;
			target_array[i].id = 0;
			target_array[i-1].id = 0;
		}
		l++;
		if(!swapped)return;
	}
}

async function cocktail_reset(target_canvas, n, delay, palette){
	console.log("reseted");
	if(cocktail_stop==true){
		console.log("was true");
		cocktail_stop=false;
		cocktail_sort(target_canvas, n, delay, palette);
		return;
	}

	cocktail_stop=true;
	while(cocktail_stop) await sleep(10);
	cocktail_sort(target_canvas, n, delay, palette);
}
