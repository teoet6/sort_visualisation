//cocktail_pause() / cocktail_resume() for pausing/resuming
//cocktail_reset() for resetting (please give parameters)
let cocktail_stop = false;
let cocktail_pauses = 1;
var cocktail_delay = document.getElementById("cocktail_delay");
async function cocktail_sort(target_canvas, n, palette){
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
			do{
				cocktail_delay = document.getElementById("cocktail_delay");
				await sleep(cocktail_delay.value);
				if(cocktail_stop) return cocktail_stop=false;
			}while(cocktail_pauses > 0)


			if(target_array[i].value > target_array[i+1].value){
				let buff = clone(target_array[i]);
				target_array[i] = clone(target_array[i+1]);
				target_array[i+1] = buff;
				swapped=true;
			}

			drawArray(target_canvas, target_array, palette);
			do{
				cocktail_delay = document.getElementById("cocktail_delay");
				await sleep(cocktail_delay.value);
				if(cocktail_stop) return cocktail_stop=false;
			}while(cocktail_pauses > 0)
			target_array[l].id = 0;
			target_array[r].id = 0;
			target_array[i].id = 0;
			target_array[i+1].id = 0;
		}
		r--;
		if(!swapped)break;
		swapped=false;
		for(let i = r ; i > l ; i--){
			target_array[l].id = 2;
			target_array[r].id = 2;
			target_array[i].id = 1;
			target_array[i-1].id = 1;
			drawArray(target_canvas, target_array, palette);
			do{
				cocktail_delay = document.getElementById("cocktail_delay");
				await sleep(cocktail_delay.value);
				if(cocktail_stop) return cocktail_stop=false;
			}while(cocktail_pauses > 0)

			if(target_array[i].value < target_array[i-1].value){
				let buff = clone(target_array[i]);
				target_array[i] = clone(target_array[i-1]);
				target_array[i-1] = buff;
				swapped=true;
			}

			drawArray(target_canvas, target_array, palette);
			do{
				await sleep(cocktail_delay.value);
				if(cocktail_stop) return cocktail_stop=false;
			}while(cocktail_pauses > 0)

			target_array[l].id = 0;
			target_array[r].id = 0;
			target_array[i].id = 0;
			target_array[i-1].id = 0;
		}
		l++;
		if(!swapped)break;
	}
	while(!cocktail_stop)await sleep(cocktail_delay.value);
	return cocktail_stop=false;
}

async function cocktail_reset(target_canvas, n, palette){
	cocktail_stop=true;
	while(cocktail_stop) await sleep(10);
	
	cocktail_sort(target_canvas, n, palette);
}

function cocktail_pause(){
	cocktail_pauses++;
}

function cocktail_resume(){
	cocktail_pauses--;
	cocktail_pauses = Math.max(cocktail_pauses, 0);
}
