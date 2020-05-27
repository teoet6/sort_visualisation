//radix_pause() / radix_resume() for pausing/resuming
//radix_reset() for resetting (please give parameters)
let radix_stop = false;
let radix_pauses = 1;
function getMax(array){
	let max = 0;
	for (let num of array) {
		max = (max < num.toString().length) ? num.toString().length : max;
	}
	return max;
}

function getPosition(num,place){
	return Math.floor(num / Math.pow(10,place)) % 10;
}

async function radix_sort_util(array, target_canvas, delay, palette){
	var max = getMax(array);
	for (let i = 0; i < max; i++) {
		let buckets = Array.from({length:10}, () => []);
		for (let j = 0; j < array.length; j++){
			buckets[getPosition(array[j].value, i)].push(array[j]);
			if(j>0){
				array[j-1].id=0;
			}
			array[j].id=1;
		}
		drawArray(target_canvas, array, palette);
		do{
			await sleep(delay);
			if(radix_stop) return radix_stop=false;
		}while(radix_pauses > 0)
		array = [].concat(...buckets);
	}
	while(!radix_stop)await sleep(delay);
	return radix_stop=false;
}
function radix_sort(target_canvas, n, delay, palette){
	let target_array=[];
	for(let i = 0 ; i < n ; i++){
		target_array[i] = new Pilon(i+1);
	}
	target_array.sort(() => Math.random() - 0.5);
	radix_sort_util(target_array, target_canvas, delay, palette);
}
async function radix_reset(target_canvas, n, delay, palette){
	radix_stop=true;
	while(radix_stop) await sleep(10);
	
	radix_sort(target_canvas, n, delay, palette);
}

function radix_pause(){
	radix_pauses++;
}

function radix_resume(){
	radix_pauses--;
	radix_pauses = Math.max(radix_pauses, 0);
}
