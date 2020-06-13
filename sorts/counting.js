//counting_pause() / counting_resume() for pausing/resuming
//counting_reset() for resetting (please give parameters)
let counting_stop = false;
let counting_pauses = 1;
var counting_delay = document.getElementById(" counting_delay");
async function counting_sort_util(arr, min, max, target_canvas, palette){
	let i = min,j = 0,len = arr.length,count = [];
	for (i; i <= max; i++) {
		count[i] = 0;
	}
	for (i = 0; i < len; i++) {
		count[arr[i].value] += 1;
		arr[i].id=1;
		drawArray(target_canvas, arr, palette);
		do{
			 counting_delay = document.getElementById("counting_delay");
			await sleep(counting_delay.value);
			if(counting_stop) return counting_stop=false;
		}while(counting_pauses > 0)
		arr[i].id=0;
	}
	for (i = min; i <= max; i++) {
		while (count[i] > 0) {
			arr[j].value = i;
			arr[j].id=1
			if(j>0){
				arr[j-1].id=0
			}
			j++;
			count[i]--;
			drawArray(target_canvas, arr, palette);
			do{
				 counting_delay = document.getElementById("counting_delay");
				await sleep(counting_delay.value);
				if(counting_stop) return counting_stop=false;
			}while(counting_pauses > 0)
		}
	}
	while(!counting_stop)await sleep(counting_delay.value);
	return counting_stop=false;
};

function counting_sort(target_canvas, n, palette){
	let target_array=make_shuffeled_piloni(n);
	counting_sort_util(target_array, 1, n, target_canvas, palette);
}
async function counting_reset(target_canvas, n, palette){
	counting_stop=true;
	while(counting_stop) await sleep(10);
	
	counting_sort(target_canvas, n, palette);
}

function counting_pause(){
	counting_pauses++;
}

function counting_resume(){
	counting_pauses--;
	counting_pauses = Math.max(counting_pauses, 0);
}
