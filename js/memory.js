createGrid(5,5);

function createGrid(ligne, colone){
  var table = document.getElementById("memory");
  for (var i = 0; i < ligne; i++) {
    var tr=document.createElement("tr");
    table.appendChild(tr);
    for (var j = 0; j < colone; j++) {
      var td=document.createElement("td");
      tr.appendChild(td);
    }
  }
}
