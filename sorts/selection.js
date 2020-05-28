//selection_pause() / selection_resume() for pausing/resuming
//selection_reset() for resetting (please give parameters)
let selection_stop = false;
let selection_pauses = 1;
var selection_delay = document.getElementById("selection_delay");
async function selection_sort(target_canvas, n, palette){
    let target_array=[];
	for(let i = 0 ; i < n ; i++){
		target_array[i] = new Pilon(i+1);
	}
    target_array.sort(() => Math.random() - 0.5);

    let len = target_array.length;
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
	    target_array[j].id=1;
            if (target_array[min].value > target_array[j].value) {
		target_array[min].id=0;	
                min = j;
                target_array[min].id=2;
            }
	    drawArray(target_canvas, target_array, palette);
	    do{
            selection_delay = document.getElementById("selection_delay");
	        await sleep(selection_delay.value);
	        if(selection_stop) return selection_stop=false;
	    }while(selection_pauses > 0)
            if(target_array[j].id==1){target_array[j].id=0;}
        }
	target_array[min].id=0;
        if (min !== i) {
            let tmp = target_array[i].value;
            target_array[i].value = target_array[min].value;
            target_array[min].value = tmp;
        }
        if(i>0){
            target_array[i-1].id=0
        }
        target_array[i].id=1
        drawArray(target_canvas, target_array, palette);
	do{
        selection_delay = document.getElementById("selection_delay");
	    await sleep(selection_delay.value);
	    if(selection_stop) return selection_stop=false;
	}while(selection_pauses > 0)
    }
    while(!selection_stop)await sleep(selection_delay.value);
    return selection_stop=false;
}

async function selection_reset(target_canvas, n, palette){
	selection_stop=true;
	while(selection_stop) await sleep(10);
	
	selection_sort(target_canvas, n, palette);
}

function selection_pause(){
	selection_pauses++;
}

function selection_resume(){
	selection_pauses--;
	selection_pauses = Math.max(selection_pauses, 0);
}
