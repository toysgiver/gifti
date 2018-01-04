slider();

//Rotation automatique du slider
function slideAuto(slider){
    //Determine un timer aléatoire sur le défilement automatique
    var rand = 5000 + Math.floor((Math.random() * 10))*100;
    setInterval(function(){
        sliderMove(slider,"right");
    }, rand);
}

//Fait defiler le slider vers direction
function sliderMove(slider, direction){
    var slide = slider.getElementsByClassName("slider-content");

    var sliderPosition = slider.getAttribute("rel");
    var width = slide[0].offsetWidth;
    var left = width*sliderPosition;

    //calcul la nouvelle position des slides
    if(direction == "left"){
        left += width;
        sliderPosition++;
    }else{
        left -= width;
        sliderPosition--;
    }

    //Si l'on est sur la dernière slide on boucle sur la première
    //Si l'on est sur la première on boucle sur la dernière
    if(sliderPosition == -slide.length){
        sliderPosition = 0;
        left = 0;
    }else if(sliderPosition == 1){
        sliderPosition = -Number(slide.length-1);
        left = width*sliderPosition;
    }

    //décallage de tous les slides
    slider.setAttribute("rel",sliderPosition);
    for (var i = 0; i < slide.length; i++){
        slide[i].style.left = left+"px";
    }

}

//Localise, ajoute les flêches de défilement des sliders
function slider(){
    var slider = document.getElementsByClassName("slider");
    for (var i = 0; i < slider.length; i++){
        var slide = slider[i].getElementsByClassName("slider-content");

        //Ajouter les flêches de défilement
        var arrowLeft = document.createElement("div");
        arrowLeft.classList.add("arrow-left");
        slider[i].appendChild(arrowLeft);
        var arrowRight = document.createElement("div");
        arrowRight.classList.add("arrow-right");
        slider[i].appendChild(arrowRight);

        //Applique le défilementautomatique si leslider à la class auto
        if(slider[i].classList.contains("auto")){
            slideAuto(slider[i]);
        }

        //Initialise le slider sur une slide aléatoire
        var rand = Math.floor((Math.random() * slide.length));
        while(slider[i].getAttribute("rel") != -rand){
            sliderMove(slider[i], "left");
        }

        //Affecte la fonction de défilement sur les flêches
        arrowLeft.onclick = function(e){
            sliderMove(this.parentNode, "left");
        };
        arrowRight.onclick = function(e){
            sliderMove(this.parentNode, "right");
        };
    }
}
