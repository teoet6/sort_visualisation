//quick_pause() / quick_resume() for pausing/resuming
//quick_reset() for resetting (please give parameters)
let quick_stop = false;
let quick_pauses = 1;
var quick_target_array=[];
var quick_delay = document.getElementById("quick_delay");

async function quick_partition(target_canvas, palette, l, r){
	//let pivot = quick_target_array[Math.floor((l + r) / 2)].value;
	let pivot = quick_target_array[r].value;
	let i = l;
	for (let j = l;j<=r;j++){
		if(quick_target_array[j].value < pivot){
			let buff = clone(quick_target_array[i]);
			quick_target_array[i] = clone(quick_target_array[j]);
			quick_target_array[j] = clone(buff);
			i++;
		}
		////////////////////////////////////////
		quick_target_array[l].id=2;
		quick_target_array[r].id=2;
		quick_target_array[i].id=1;
		quick_target_array[j].id=1;
		drawArray(target_canvas, quick_target_array, palette);
		do{
			quick_delay = document.getElementById("quick_delay");
			if(quick_stop){
				//if(r-l+1 == quick_target_array.length)quick_stop=false;
				quick_target_array[l].id=0;
				quick_target_array[r].id=0;
				return -1;
			}
			await sleep(quick_delay.value);
		}while(quick_pauses > 0)
		quick_target_array[i].id=0;
		quick_target_array[j].id=0;
		quick_target_array[l].id=0;
		quick_target_array[r].id=0;
		////////////////////////////////////////
	}
	let buff = clone(quick_target_array[i]);
	quick_target_array[i] = clone(quick_target_array[r]);
	quick_target_array[r] = clone(buff);
	return i;
}

async function quick_sort_util(target_canvas, palette, l, r){
	if(l <= r){
		if(quick_stop) return;
		//console.log(l, r);
		let m = await quick_partition(target_canvas, palette, l, r);
		await quick_sort_util(target_canvas, palette, l, m-1);
		await quick_sort_util(target_canvas, palette, m+1, r);
	}

}

async function quick_sort(target_canvas, n, palette){
	quick_target_array=[];
	for(let i = 0 ; i < n ; i++){
		quick_target_array[i] = new Pilon(i+1);
	}
	quick_target_array.sort(() => Math.random() - 0.5);
	quick_sort_util(target_canvas, palette, 0, n-1);
	while(!quick_stop)await sleep(quick_delay.value);
	return quick_stop=false;
}

async function quick_reset(target_canvas, n, palette){
	if(quick_stop)return;
	quick_stop=true;
	while(quick_stop) await sleep(1);
	
	quick_sort(target_canvas, n, palette);
}

function quick_pause(){
	quick_pauses++;
}

function quick_resume(){
	quick_pauses--;
	quick_pauses = Math.max(quick_pauses, 0);
}
