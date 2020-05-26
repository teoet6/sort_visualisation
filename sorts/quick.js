//quick_pause() / quick_resume() for pausing/resuming
//quick_reset() for resetting (please give parameters)
let quick_stop = false;
let quick_pauses = 1;
function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i].value < pivot.value) {
            i++;
        }
        while (items[j].value > pivot.value) {
            j--;
        }
        if (i <= j) {
            let buff = clone(items[i]);
            items[i] = clone(items[j]);
            items[j] = buff;
            i++;
            j--;
        }
    }
    return i;
}

async function quick_sort_util(items, left, right, target_canvas, delay, palette) {
    var index;
    if (items.length > 1){
        index = partition(items, left, right);
        if (left < index - 1){
            if(index>0){
                items[index-1].id=0
            }
            items[index].id=1
            
            if(left>0){
                items[left-1].id=0
            }
            items[left].id=1
            quick_sort_util(items, left, index - 1, target_canvas, delay, palette);
            ////
            drawArray(target_canvas, items, palette);
            do{
                await sleep(delay);
                if(quick_stop) return quick_stop=false;
            }while(quick_pauses > 0)
        }
        if (index < right){
            if(index>0){
                items[index-1].id=0
            }
            items[index].id=1
            
            if(right>0){
                items[right-1].id=0
            }
            items[right].id=1
    		quick_sort_util(items, index, right, target_canvas, delay, palette);
            ////
            drawArray(target_canvas, items, palette);
			do{
                await sleep(delay);
                if(quick_stop) return quick_stop=false;
            }while(quick_pauses > 0)
        }
    }
    while(!quick_stop)await sleep(delay);
	return quick_stop=false;
}
function quick_sort(target_canvas, n, delay, palette){
    let target_array=[];
    for(let i = 0 ; i < n ; i++){
        target_array[i] = new Pilon(i+1);
    }
    target_array.sort(() => Math.random() - 0.5);
    quick_sort_util(target_array, 0, n-1, target_canvas, delay, palette);
}
async function quick_reset(target_canvas, n, delay, palette){
	quick_stop=true;
	while(quick_stop) await sleep(10);
	
	quick_sort(target_canvas, n, delay, palette);
}

function quick_pause(){
	quick_pauses++;
}

function quick_resume(){
	quick_pauses--;
	quick_pauses = Math.max(quick_pauses, 0);
}