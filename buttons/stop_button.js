function stop_button(id, pause, resume){
    if (document.getElementById(id).innerHTML == "Resume Visualisation"){
       document.getElementById(id).innerHTML = "Pause Visualisation"
       resume();
    }else{
       document.getElementById(id).innerHTML = "Resume Visualisation";
       pause();
    }
}
