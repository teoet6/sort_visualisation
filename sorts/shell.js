//shell_pause() / shell_resume() for pausing/resuming
//shell_reset() for resetting (please give parameters)
let shell_stop = false;
let shell_pauses = 1;
async function shell_sort_util(target_array, target_canvas, palette) {
	var increment = Math.floor(target_array.length / 2);
	while (increment > 0) {
		for (i = increment; i < target_array.length; i++) {
			var j = i;
			var temp = target_array[i].value;
	
			while (j >= increment && target_array[j-increment].value > temp) {
				target_array[j].value = target_array[j-increment].value;
				j = j - increment;
				target_array[j].value = temp;
				drawArray(target_canvas, target_array, palette);
				do{
					await sleep(shell_delay);
					if(shell_stop) return shell_stop=false;
				}while(shell_pauses > 0) 
				if(j>0){
					target_array[j-1].id=0;
				}
				target_array[j].id=1;
			}
			
	
		}
	
		if (increment == 2) {
			increment = 1;
		} else {
			increment = parseInt(increment*5 / 11);
		}
	}
	drawArray(target_canvas, target_array, palette);
	do{
		await sleep(shell_delay);
		if(shell_stop) return shell_stop=false;
	}while(shell_pauses > 0) 
	while(!shell_stop)await sleep(shell_delay);
	return shell_stop=false;
}
function shell_sort(target_canvas, n, shell_delay, palette){
	let target_array=[];
	for(let i = 0 ; i < n ; i++){
		target_array[i] = new Pilon(i+1);
	}
	target_array.sort(() => Math.random() - 0.5);
	shell_sort_util(target_array, target_canvas, shell_delay, palette);
}

async function shell_reset(target_canvas, n, shell_delay, palette){
	shell_stop=true;
	while(shell_stop) await sleep(10);
	
	shell_sort(target_canvas, n, shell_delay, palette);
}

function shell_pause(){
	shell_pauses++;
}

function shell_resume(){
	shell_pauses--;
	shell_pauses = Math.max(shell_pauses, 0);
}
