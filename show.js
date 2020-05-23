function show(id_button, id_div) {
    let x = document.getElementById(id_div);
    if (x.style.display === "none") {
      x.style.display = "block";
      document.getElementById(id_button).innerHTML = "hide visualisation";
    } else {
      x.style.display = "none";
      document.getElementById(id_button).innerHTML = "show visualisation";
    }
  }
}