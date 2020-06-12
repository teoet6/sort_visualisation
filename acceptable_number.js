function acceptable_number(n){
	n = Number(n);
	if(n==null || n==NaN){
		n.value=30;
		return n;
	}else if(n<3){
		n=3;
	}
	return n;
}
