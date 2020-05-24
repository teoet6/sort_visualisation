function stop_button(id, pause, resume){
    if (document.getElementById(id).innerHTML == "Resume visualisation"){
       document.getElementById(id).innerHTML = "Pause visualisation"
       resume();
    }else{
       document.getElementById(id).innerHTML = "Resume visualisation";
       pause();
    }
}
