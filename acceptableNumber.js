function acceptableNumber(n){
    if(n.value==null || n.value==NaN){
        n.value=30;
        console.log("asdf");
        return n.value;
    }else if(n.value<3){
        n.value=3;
    }
    return n.value;
}