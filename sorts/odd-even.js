//oddEven_pause() / oddEven_resume() for pausing/resuming
//oddEven_reset() for resetting (please give parameters)
let oddEven_stop = false;
let oddEven_pauses = 1;
var oddEven_delay = document.getElementById("oddEven_delay");
async function oddEven_sort_util(target_array, target_canvas, palette) {
	var sorted = false;
	while (!sorted) {
	 sorted = true;
	 for (var i = 1; i < target_array.length - 1; i += 2) {
		if (target_array[i].value > target_array[i + 1].value) {
			let buff = clone(target_array[i]);
			target_array[i] = clone(target_array[i+1]);
			target_array[i+1] = buff;
			sorted = false;
			if(i>0){
				target_array[i-1].id=0;
				target_array[i+1].id=0;
			}
			target_array[i].id=1;
			
			drawArray(target_canvas, target_array, palette);
			do{
				oddEven_delay = document.getElementById("oddEven_delay");
				await sleep(oddEven_delay.value);
				if(oddEven_stop) return oddEven_stop=false;
			}while(oddEven_pauses > 0) 
			
		}
	 }
	 for (var i = 0; i < target_array.length - 1; i += 2) {
		if (target_array[i].value > target_array[i + 1].value) {
			let buff = clone(target_array[i]);
			target_array[i] = clone(target_array[i+1]);
			target_array[i+1] = buff;
			drawArray(target_canvas, target_array, palette);
			do{
				oddEven_delay = document.getElementById("oddEven_delay");
				await sleep(oddEven_delay.value);
				if(oddEven_stop) return oddEven_stop=false;
			}while(oddEven_pauses > 0) 
			sorted = false;
		}
	 }
	}
	while(!oddEven_stop)await sleep(oddEven_delay.value);
	return oddEven_stop=false;
}

function oddEven_sort(target_canvas, n, palette){
	let target_array=make_shuffeled_piloni(n);
	oddEven_sort_util(target_array, target_canvas, palette);
}

async function oddEven_reset(target_canvas, n, palette){
	oddEven_stop=true;
	while(oddEven_stop) await sleep(10);
	
	oddEven_sort(target_canvas, n, palette);
}

function oddEven_pause(){
	oddEven_pauses++;
}

function oddEven_resume(){
	oddEven_pauses--;
	oddEven_pauses = Math.max(oddEven_pauses, 0);
}
