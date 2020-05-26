//oddEven_pause() / oddEven_resume() for pausing/resuming
//oddEven_reset() for resetting (please give parameters)
let oddEven_stop = false;
let oddEven_pauses = 1;
async function oddEven_sort_util(target_array, target_canvas, delay, palette) {
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
            }
            target_array[i].id=1;
            
            drawArray(target_canvas, target_array, palette);
            do{
                await sleep(delay);
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
                await sleep(delay);
                if(oddEven_stop) return oddEven_stop=false;
            }while(oddEven_pauses > 0) 
            sorted = false;
        }
      }
    }
    while(!oddEven_stop)await sleep(delay);
	return oddEven_stop=false;
}

function oddEven_sort(target_canvas, n, delay, palette){
    let target_array=[];
	for(let i = 0 ; i < n ; i++){
		target_array[i] = new Pilon(i+1);
	}
	target_array.sort(() => Math.random() - 0.5);
    oddEven_sort_util(target_array, target_canvas, delay, palette);
}

async function oddEven_reset(target_canvas, n, delay, palette){
	oddEven_stop=true;
	while(oddEven_stop) await sleep(10);
	
	oddEven_sort(target_canvas, n, delay, palette);
}

function oddEven_pause(){
	oddEven_pauses++;
}

function oddEven_resume(){
	oddEven_pauses--;
	oddEven_pauses = Math.max(oddEven_pauses, 0);
}
