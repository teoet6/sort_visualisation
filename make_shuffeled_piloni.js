function make_shuffeled_piloni(n){
	let arr = [];
	for(let i=0;i<n;i++){
		arr[i] = new Pilon(i+1);	
	}
	arr.sort(() => Math.random()-0.5);
	return arr;
}
