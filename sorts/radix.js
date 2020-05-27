//radix_pause() / radix_resume() for pausing/resuming
//radix_reset() for resetting (please give parameters)
let radix_stop = false;
let radix_pauses = 1;
async function getMax(array, target_canvas, delay, palette){
	let max = 0;
	let maxInd = 0;
	for (let i in array) {
		num = array[i];
		maxInd = (max < num.toString().length) ? i : maxInd;
		max = (max < num.toString().length) ? num.toString().length : max;
		array[i].id=1;
		array[maxInd].id=2;
		drawArray(target_canvas, array, palette);
		do{
			await sleep(delay);
			if(radix_stop) return radix_stop=false;
		}while(radix_pauses > 0)
		array[i].id=0;
		array[maxInd].id=0;
	}
	return max;
}

function getPosition(num,place){
	return Math.floor(num / Math.pow(10,place)) % 10;
}

async function radix_sort_util(array, target_canvas, delay, palette){
	var max = await getMax(array, target_canvas, delay, palette);
	for (let i = 0; i < max; i++) {
		let buckets = Array.from({length:10}, () => []);
		for (let j = 0; j < array.length; j++){
			buckets[getPosition(array[j].value, i)].push(array[j]);
			array[j].id=1;
			drawArray(target_canvas, array, palette);
			do{
				await sleep(delay);
				if(radix_stop) return radix_stop=false;
			}while(radix_pauses > 0)
			array[j].id=0;
		}
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
