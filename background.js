let DELAY = 100;
let GRID_X = 70;
let GRID_Y = 70;

function draw_cell(target_canvas, palette, cell, x, y, w, h){
	let ctx = target_canvas.getContext("2d");

	ctx.fillStyle = palette[cell];
	ctx.fillRect(x * w, y * h, w, h);	
}

function draw_grid(target_canvas, palette, grid, max_x, max_y){
	let cell_x = target_canvas.width / max_x;
	let cell_y = target_canvas.height / max_y;

	for(let i=0;i<grid.length;i++){
		for(let j=0;j<grid[i].length;j++){
			draw_cell(target_canvas, palette, grid[i][j], i, j, cell_x, cell_y)
		}
	}
}

function get_2d_array(arr, x, y){
	if(x < 0 || x >= GRID_X)return undefined;
	return arr[x][y];
}

async function gol(target_canvas, palette){
	/* generates a random two dimensional array with elements ones and zeroes*/
	let grid = Array.from({length : GRID_X}, () => Array.from({length : GRID_Y}, () => Math.round(Math.random())));	
	//let grid = Array.from({length : GRID_X}, () => Array.from({length : GRID_Y}, () => 0));	

	//console.log(get_2d_array(grid, 0, 1));

	let buff = clone(grid);
	
	//grid[0][0]=1;
	//console.log(buff[0][0]);

	function get_neigh(x, y){
		let ans = 0;
		if(get_2d_array(grid, x+1, y+1) == 1) ans++;
		if(get_2d_array(grid, x-1, y+1) == 1) ans++;
		if(get_2d_array(grid, x  , y+1) == 1) ans++;
		if(get_2d_array(grid, x+1, y-1) == 1) ans++;
		if(get_2d_array(grid, x-1, y-1) == 1) ans++;
		if(get_2d_array(grid, x  , y-1) == 1) ans++;
		if(get_2d_array(grid, x+1, y  ) == 1) ans++;
		if(get_2d_array(grid, x-1, y  ) == 1) ans++;
		return ans;
	}

	function get_new_state(state, neigh){
		switch(state){
			case 1 : return (neigh == 2 || neigh == 3) ? 1 : 0; 
			case 0 : return neigh == 3 ? 1 : 0; 
		}
	}

	while(true){
		draw_grid(target_canvas, palette, grid, GRID_X, GRID_Y);
		for(let i=0;i<GRID_X;i++){
			for(let j=0;j<GRID_Y;j++){
				//console.log(i, j, grid[0][1]);
				let neigh = get_neigh(i, j);
				//console.log(i, j, grid[0][1]);
				let new_state = get_new_state(grid[i][j], neigh); 
				//console.log(i, j, grid[0][1]);
				buff[i][j] = new_state;

				//console.log(i, j);
				//console.log(grid[i][j]);
				//console.log(neigh);
				//console.log(new_state);
				//console.log(buff[i][j]);

			}
		}
		grid = clone(buff);
		await sleep(DELAY);
	}
}

async function brain(target_canvas, palette){
	/* generates a random two dimensional array with elements ones and zeroes*/
	let grid = Array.from({length : GRID_X}, () => Array.from({length : GRID_Y}, () => Math.floor(Math.random()*3)));	
	//let grid = Array.from({length : GRID_X}, () => Array.from({length : GRID_Y}, () => 0));	

	//console.log(get_2d_array(grid, 0, 1));

	let buff = clone(grid);
	
	//grid[0][0]=1;
	//console.log(buff[0][0]);

	function get_neigh(x, y){
		let ans = 0;
		if(get_2d_array(grid, x+1, y+1) == 2) ans++;
		if(get_2d_array(grid, x-1, y+1) == 2) ans++;
		if(get_2d_array(grid, x  , y+1) == 2) ans++;
		if(get_2d_array(grid, x+1, y-1) == 2) ans++;
		if(get_2d_array(grid, x-1, y-1) == 2) ans++;
		if(get_2d_array(grid, x  , y-1) == 2) ans++;
		if(get_2d_array(grid, x+1, y  ) == 2) ans++;
		if(get_2d_array(grid, x-1, y  ) == 2) ans++;
		return ans;
	}

	function get_new_state(state, neigh){
		switch(state){
			case 2 : return 1;
			case 1 : return 0; 
			case 0 : return neigh == 2 ? 2 : 0; 
		}
	}

	while(true){
		draw_grid(target_canvas, palette, grid, GRID_X, GRID_Y);
		for(let i=0;i<GRID_X;i++){
			for(let j=0;j<GRID_Y;j++){
				//console.log(i, j, grid[0][1]);
				let neigh = get_neigh(i, j);
				//console.log(i, j, grid[0][1]);
				let new_state = get_new_state(grid[i][j], neigh); 
				//console.log(i, j, grid[0][1]);
				buff[i][j] = new_state;

				//console.log(i, j);
				//console.log(grid[i][j]);
				//console.log(neigh);
				//console.log(new_state);
				//console.log(buff[i][j]);

			}
		}
		grid = clone(buff);
		await sleep(DELAY);
	}
}

let MANDELBROT_DELAY = 0;
let MANDELBROT_ITER = 100;
let MANDELBROT_X = 100;
let MANDELBROT_Y = 100;

async function flex(target_canvas, palette){
	let grid = Array.from({length : MANDELBROT_X}, () => Array.from({length : MANDELBROT_Y}, () => Math.floor(Math.random()*3)));	

	function f(c){
		let z = new Complex(0, 0);
		for(let i=0;i<MANDELBROT_ITER;i++){
			z = complex.add(complex.square(z), c);
			if(complex.abs(z)>2)return i;
		}
		return -1;
	}

	for(let i=0;i<MANDELBROT_X;i++){
		for(let j=0;j<MANDELBROT_Y;j++){
			let c = new Complex((4/MANDELBROT_X)*i-2, (4/MANDELBROT_Y)*j-2);
			let color = f(c);
			if(color == -1){
				grid[i][j]=palette.length-1;
			}else{
				grid[i][j]=color%(palette.length-1);
			}
			//draw_cell(target_canvas, palette, grid[i][j], i, j, target_canvas.width/MANDELBROT_X, target_canvas.height/MANDELBROT_Y);
			draw_grid(target_canvas, palette, grid, MANDELBROT_X, MANDELBROT_Y);
				await sleep(MANDELBROT_DELAY);
			}
	}
	//draw_grid(target_canvas, palette, grid, MANDELBROT_X, MANDELBROT_Y);
}

function background(target_canvas, palette){
	switch(Math.floor(Math.random()*2)){
		case 0: gol(target_canvas, palette);break;
		case 1: brain(target_canvas, palette);break;
		default : flex(target_canvas, palette);
	}
}
