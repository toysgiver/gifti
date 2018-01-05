function backTop() {
  //window.pageYOffset => Retourne le decallage (Offset)
  //sur la hauteur (pageY) de la fenetre (window)
  var scrollActuel = window.pageYOffset;

  /*
  setInterval(
    function(){
      ce qu'on veut faire
    }, interval en ms
  )
  */
  var boucle = setInterval(
    function(){
      if(scrollActuel <= 0){
        clearInterval(boucle);
      }
      scrollActuel = scrollActuel - 10;
      window.scroll(0,scrollActuel);
    }, 1
  );
}
