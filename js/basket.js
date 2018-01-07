var basket = document.createElement("ul");
var showBasket = document.getElementById("showBasket");

basket.setAttribute("id","basket");
basket.style.top = Number(basket.offsetHeight+60)+"px";
document.getElementById("content").appendChild(basket);

var left = document.getElementById("content").offsetLeft + document.getElementById("content").offsetWidth - basket.offsetWidth;
basket.style.left=left+"px";


showBasket.parentNode.onclick = function(){
    var height = basket.getElementsByTagName("li").length*55;
    basket.style.height = height+"px";
    showBasket.onmouseout = function(e){
        basket.style.height = "0px";
    }
    basket.onmouseenter = function(e){
        basket.style.height =  height+"px";
    }
    basket.onmouseout = function(e){
        basket.style.height = "0px";
        basket.onmouseenter = function(e){return false;};
    }
}

function addBasket(elem){
    var basket = document.getElementById("basket");
    var titre = elem.getElementsByTagName("h2")[0].textContent;
    var prix = elem.getElementsByClassName("prix")[0].textContent;
    var img = elem.getElementsByTagName("img")[0].getAttribute("src");
    var li = document.createElement("li");
    li.innerHTML = '<img src="'+img+'" alt="'+titre+'"><span class="titre">'+titre+'</span><span class="prix">'+prix+'</span>';

    basket.appendChild(li);
}
