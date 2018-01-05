var basket = document.createElement("div");
var showBasket = document.getElementById("showBasket");

basket.setAttribute("id","basket");
basket.style.top = Number(basket.offsetHeight+60)+"px";
showBasket.parentNode.appendChild(basket);

showBasket.parentNode.onclick = function(){
    basket.style.height = "300px";
    showBasket.onmouseout = function(e){
        basket.style.height = "0px";
    }
    basket.onmouseenter = function(e){
        basket.style.height = "300px";
    }
    basket.onmouseout = function(e){
        basket.style.height = "0px";
        basket.onmouseenter = function(e){return false;};
    }
}
