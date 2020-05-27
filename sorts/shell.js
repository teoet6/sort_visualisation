//shell_pause() / shell_resume() for pausing/resuming
//shell_reset() for resetting (please give parameters)
let shell_stop = false;
let shell_pauses = 1;
async function shell_sort_util(target_array, target_canvas, delay, palette) {
	var increment = Math.floor(target_array.length / 2);
	while (increment > 0) {
		for (i = increment; i < target_array.length; i++) {
			var j = i;
			var temp = target_array[i].value;
	
			while (j >= increment && target_array[j-increment].value > temp) {
				target_array[j].value = target_array[j-increment].value;
				j = j - increment;
				
				drawArray(target_canvas, target_array, palette);
				do{
					await sleep(delay);
					if(shell_stop) return shell_stop=false;
				}while(shell_pauses > 0) 
			}
	
			target_array[j].value = temp;
		}
	
		if (increment == 2) {
			increment = 1;
		} else {
			increment = parseInt(increment*5 / 11);
		}
	}
	drawArray(target_canvas, target_array, palette);
	do{
		await sleep(delay);
		if(shell_stop) return shell_stop=false;
	}while(shell_pauses > 0) 
	while(!shell_stop)await sleep(delay);
	return shell_stop=false;
}
function shell_sort(target_canvas, n, delay, palette){
	let target_array=[];
	for(let i = 0 ; i < n ; i++){
		target_array[i] = new Pilon(i+1);
	}
	target_array.sort(() => Math.random() - 0.5);
	shell_sort_util(target_array, target_canvas, delay, palette);
}

async function shell_reset(target_canvas, n, delay, palette){
	shell_stop=true;
	while(shell_stop) await sleep(10);
	
	shell_sort(target_canvas, n, delay, palette);
}

function shell_pause(){
	shell_pauses++;
}

function shell_resume(){
	shell_pauses--;
	shell_pauses = Math.max(shell_pauses, 0);
}
