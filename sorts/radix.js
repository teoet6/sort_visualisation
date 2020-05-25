function getMax(array){ // O(n)
	let max = 0;
	for (let num of array) {
		max = (max < num.toString().length) ? num.toString().length : max;
	}
	return max;
}

function getPosition(num,place){
    return Math.floor(num / Math.pow(10,place)) % 10;
}

async function radixSort(array, target_canvas, delay, palette){
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
        await sleep(delay);
		array = [].concat(...buckets);
    }
    
    return array;
}

