slider();

function slideAuto(slider){
    var rand = 5000 + Math.floor((Math.random() * 10))*100;
    setInterval(function(){
        sliderMove(slider,"right");
    }, rand);
}

function sliderMove(slider, direction){
    var slide = slider.getElementsByClassName("slider-content");

    var sliderPosition = slider.getAttribute("rel");
    var width = slide[0].offsetWidth;
    var left = width*sliderPosition;

    if(direction == "left"){
        left += width;
        sliderPosition++;
    }else{
        left -= width;
        sliderPosition--;
    }

    var transition = true;
    if(sliderPosition == -slide.length){
        sliderPosition = 0;
        left = 0;
    }else if(sliderPosition == 1){
        sliderPosition = -Number(slide.length-1);
        left = width*sliderPosition;
    }

    slider.setAttribute("rel",sliderPosition);
    for (var i = 0; i < slide.length; i++){
        slide[i].style.left = left+"px";
    }

}

function slider(){
    var slider = document.getElementsByClassName("slider");
    for (var i = 0; i < slider.length; i++){
        var slide = slider[i].getElementsByClassName("slider-content");

        var arrowLeft = document.createElement("div");
        arrowLeft.classList.add("arrow-left");
        slider[i].appendChild(arrowLeft);
        var arrowRight = document.createElement("div");
        arrowRight.classList.add("arrow-right");
        slider[i].appendChild(arrowRight);

        slideAuto(slider[i]);

        var rand = Math.floor((Math.random() * slide.length));
        while(slider[i].getAttribute("rel") != -rand){
            sliderMove(slider[i], "left");
        }

        arrowLeft.onclick = function(e){
            sliderMove(this.parentNode, "left");
        };
        arrowRight.onclick = function(e){
            sliderMove(this.parentNode, "right");
        };
    }
}
