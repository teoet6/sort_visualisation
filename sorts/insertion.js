//insertion_pause() / insertion_resume() for pausing/resuming
//insertion_reset() for resetting (please give parameters)
let insertion_stop = false;
let insertion_pauses = 1;
var insertion_delay = document.getElementById("insertion_delay");
var insertion_n=30;
async function insertion_sort(target_canvas, n, palette){
	let target_array=[];
	for(let i = 0 ; i < n ; i++){
		target_array[i] = new Pilon(i+1);
	}
	target_array.sort(() => Math.random() - 0.5);

	for(let t = 0 ; t < n ; t++){
		for(let i = t ; i > 0 ; i--){
			target_array[t].id = 2;
			target_array[i].id = 1;
			target_array[i-1].id = 1;
			drawArray(target_canvas, target_array, palette);
			do{
				insertion_delay = document.getElementById("insertion_delay");
				await sleep(insertion_delay.value);
				if(insertion_stop) return insertion_stop=false;
			}while(insertion_pauses > 0)

			if(target_array[i].value < target_array[i-1].value){
				let buff = clone(target_array[i]);
				target_array[i] = clone(target_array[i-1]);
				target_array[i-1] = buff;
			}

			drawArray(target_canvas, target_array, palette);
			do{
				insertion_delay = document.getElementById("insertion_delay");
				await sleep(insertion_delay.value);
				if(insertion_stop) return insertion_stop=false;
			}while(insertion_pauses > 0)
			target_array[t].id = 0;
			target_array[i].id = 0;
			target_array[i-1].id = 0;
		}
	}
	while(!insertion_stop)await sleep(insertion_delay.value);
	return insertion_stop=false;
}

async function insertion_reset(target_canvas, n, palette){
	insertion_stop=true;
	while(insertion_stop) await sleep(10);
	
	insertion_sort(target_canvas, n, palette);
}

function insertion_pause(){
	insertion_pauses++;
}

function insertion_resume(){
	insertion_pauses--;
	insertion_pauses = Math.max(insertion_pauses, 0);
}
