let DELAY = 100;
let GRID_X = 100;
let GRID_Y = 100;
async function gol(terget_canvas){
	/* generates a random two dimensional array with elements ones and zeroes*/
	let grid = Array.from({length : GRID_X}, () => Array.from({length : GRID_Y}, () => Math.round(Math.random())));	

	function get_neigh(x, y){
		let ans = 0;
		if(grid[x+1][y+1] == 1) ans++;
		if(grid[x-1][y+1] == 1) ans++;
		if(grid[x  ][y+1] == 1) ans++;
		if(grid[x+1][y-1] == 1) ans++;
		if(grid[x-1][y-1] == 1) ans++;
		if(grid[x  ][y-1] == 1) ans++;
		if(grid[x+1][y  ] == 1) ans++;
		if(grid[x-1][y  ] == 1) ans++;
		return ans;
	}

	function get_new_state(state, neigh){
		if(state == 1) return (neigh == 2 || neigh == 3) ? 
	}

	while(true){
		for(let i=0;i<GRID_X;i++){
			for(let j=0;j<GRID_Y;j++){
				let neigh = get_neigh(i, j);
				let new_state = get_new_state(grid[i][j], neigh); 
			}
		}
		await sleep(DELAY);
	}
}

function background(target_canvas, palette){
	gol(target_canvas);
}
