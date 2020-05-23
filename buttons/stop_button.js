function stop_button(id, show){
    if (show){
       document.getElementById(id).innerHTML = "stop visualisation"
       
    }else document.getElementById(id).innerHTML = "resume visualisation";     
}