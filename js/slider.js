slider();

function sliderMove(arrow, direction){
    var slider = arrow.parentNode;
    var slide = slider.getElementsByClassName("slider-content");

    var sliderPosition = slider.getAttribute("rel");
    var width = slide[0].offsetWidth;
    var left = width*sliderPosition;

    if(direction == "left"){
        left -= width;
        sliderPosition--;
    }else{
        left += width;
        sliderPosition++;
    }

    console.log(sliderPosition);
    if(sliderPosition >= -(slide.length-1) && sliderPosition <= 0){
        slider.setAttribute("rel",sliderPosition);
        for (var i = 0; i < slide.length; i++){
            slide[i].style.left = left+"px";
        }
    }else if(sliderPosition == -slide.length){
        for (var i = 0; i < slide.length; i++){
            slider.setAttribute("rel","0");
            slide[i].removeAttribute("style");
        }
    }
    // else if(sliderPosition == 1){
    //     for (var i = 0; i < slide.length; i++){
    //         slider.setAttribute("rel",-(slide.length-1));
    //         slide[i].style.left = -(width*(slide.length-1))+"px";
    //         console.log(slider.getAttribute("rel"));
    //         slide[i].removeAttribute("style");
    //     }
    // }

}

function slider(){
    var slider = document.getElementsByClassName("slider");
    for (var i = 0; i < slider.length; i++){
        var slide = slider[i].getElementsByClassName("div");
        var arrowLeft = document.createElement("div");
        arrowLeft.classList.add("arrow-left");
        slider[i].appendChild(arrowLeft);
        var arrowRight = document.createElement("div");
        arrowRight.classList.add("arrow-right");
        slider[i].appendChild(arrowRight);

        arrowLeft.onclick = function(e){
            sliderMove(this, "left");
        };
        arrowRight.onclick = function(e){
            sliderMove(this, "right");
        };
    }
}
