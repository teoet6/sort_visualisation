class Complex{
	constructor(r, i){
		this.r = r;
		this.i = i;
	}	
	add(a, b){
		return new Complex(a.r + b.r, a.i + b.i);
	}
	square(a){
		return new Complex(a.r * a.r - a.i * a.i, 2 * a.r * a.i);
	}
	abs(a){
		return Math.sqrt(a.r * a.r + a.i * a.i);
	}
}
var complex = new Complex(0, 0);
