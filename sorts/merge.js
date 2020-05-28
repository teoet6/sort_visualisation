//merge_pause() / merge_resume() for pausing/resuming
//merge_reset() for resetting (please give parameters)
let merge_stop = false;
let merge_pauses = 1;
var merge_target_array=[];
var merge_buffer_array=[];
var merge_delay = document.getElementById("merge_delay");
async function merge_sort_util(target_canvas, palette, l, r){
	//////////////////////////////
	merge_target_array[l].id=2;
	merge_target_array[r].id=2;
	drawArray(target_canvas, merge_target_array, palette);
	do{
		merge_delay = document.getElementById("merge_delay");
		if(merge_stop){
			if(r-l+1 == merge_target_array.length)merge_stop=false;
			merge_target_array[l].id=0;
			merge_target_array[r].id=0;
			return;
		}
		await sleep(merge_delay.value);
	}while(merge_pauses > 0)
	////////////////////////////////
	if(l>=r-1){
		merge_target_array[l].id=0;
		merge_target_array[r].id=0;
		return;
	}
	if(l==r-2){
		if(merge_target_array[l].value > merge_target_array[l+1].value){
			let buff = clone(merge_target_array[l]);
			merge_target_array[l] = clone(merge_target_array[l+1]);
			merge_target_array[l+1] = buff;
		}
		merge_target_array[l].id=0;
		merge_target_array[r].id=0;
		return;
	}

	let m = Math.floor( (l+r)/2 );
	await merge_sort_util(target_canvas, palette, l, m);
	await merge_sort_util(target_canvas, palette, m, r);
	let p1 = l;
	let p2 = m;
	for(let i=0;p1<m || p2<r;i++){
		//////////////////////////////
		merge_target_array[p1].id=1;
		merge_target_array[p2].id=1;
		drawArray(target_canvas, merge_target_array, palette);
		do{
			merge_target_array[p1].id=0;
			merge_target_array[p2].id=0;
			if(merge_stop){
				if(r-l+1 == merge_target_array.length)merge_stop=false;
				merge_target_array[l].id=0;
				merge_target_array[r].id=0;
				return;
			}
			await sleep(merge_delay.value);
		}while(merge_pauses > 0)
		////////////////////////////////
		if(p1 == m){
			merge_buffer_array[l+i]=clone(merge_target_array[p2++]);
			continue;
		}
		if(p2 == r){
			merge_buffer_array[l+i]=clone(merge_target_array[p1++]);
			continue;
		}
		if(merge_target_array[p1].value < merge_target_array[p2].value){
			merge_buffer_array[l+i]=clone(merge_target_array[p1++]);
		}else if(merge_target_array[p1].value >= merge_target_array[p2].value){
			merge_buffer_array[l+i]=clone(merge_target_array[p2++]);
		}
	}
	for(let i=l;i<r;i++){
		merge_target_array[i]=clone(merge_buffer_array[i]);
		//////////////////////////////
		merge_target_array[i].id=1;
		drawArray(target_canvas, merge_target_array, palette);
		do{
			merge_target_array[i].id=0;
			if(merge_stop){
				if(r-l+1 == merge_target_array.length)merge_stop=false;
				merge_target_array[l].id=0;
				merge_target_array[r].id=0;
				return;
			}
			await sleep(merge_delay.value);
		}while(merge_pauses > 0)
		////////////////////////////////
	}
	merge_target_array[l].id=0;
	merge_target_array[r].id=0;
	if(r-l+1 == merge_target_array.length){
		while(!merge_stop)await sleep(merge_delay.value);
		return merge_stop=false;
	}
}

async function merge_sort(target_canvas, n, palette){
	merge_target_array=[];
	for(let i = 0 ; i < n ; i++){
		merge_target_array[i] = new Pilon(i+1);
	}
	merge_target_array.sort(() => Math.random() - 0.5);
	merge_target_array[n]=new Pilon(n+1);
	merge_sort_util(target_canvas, palette, 0, n);
	
}

async function merge_reset(target_canvas, n, palette){
	if(merge_stop)return;
	merge_stop=true;
	while(merge_stop) await sleep(1);
	
	merge_sort(target_canvas, n, palette);
}

function merge_pause(){
	merge_pauses++;
}

function merge_resume(){
	merge_pauses--;
	merge_pauses = Math.max(merge_pauses, 0);
}
