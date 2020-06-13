//bubble_pause() / bubble_resume() for pausing/resuming
//bubble_reset() for resetting (please give parameters)
let bubble_stop = false;
let bubble_pauses = 1;
var bubble_delay = document.getElementById("bubble_delay");
var bubble_n=30;
async function bubble_sort(target_canvas, n, palette){
	let target_array=make_shuffeled_piloni(n);
	for(let t = n-1 ; t >= 0 ; t--){
		let swapped=false;
		for(let i = 0 ; i < t ; i++){
			target_array[t].id = 2;
			target_array[i].id = 1;
			target_array[i+1].id = 1;
			drawArray(target_canvas, target_array, palette);
			do{
				bubble_delay=document.getElementById('bubble_delay');
				await sleep(bubble_delay.value);
				if(bubble_stop) return bubble_stop=false;
			}while(bubble_pauses > 0)
			

			if(target_array[i].value > target_array[i+1].value){
				let buff = clone(target_array[i]);
				target_array[i] = clone(target_array[i+1]);
				target_array[i+1] = buff;
				swapped=true;
			}

			drawArray(target_canvas, target_array, palette);
			do{
				bubble_delay=document.getElementById('bubble_delay');
				await sleep(bubble_delay.value);
				if(bubble_stop) return bubble_stop=false;
			}while(bubble_pauses > 0)
			target_array[t].id = 0;
			target_array[i].id = 0;
			target_array[i+1].id = 0;
		}
		if(!swapped)break;
	}
	while(!bubble_stop)await sleep(bubble_delay.value);
	return bubble_stop=false;
}

async function bubble_reset(target_canvas, n, palette){
	bubble_stop=true;
	while(bubble_stop) await sleep(10);
	
	bubble_sort(target_canvas, n, palette);
}

function bubble_pause(){
	bubble_pauses++;
}

function bubble_resume(){
	bubble_pauses--;
	bubble_pauses = Math.max(bubble_pauses, 0);
}
