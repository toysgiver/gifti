createBasket();

function createBasket(){
    var basket = document.createElement("ul");
    var showBasket = document.getElementById("showBasket");

    basket.setAttribute("id","basket");
    basket.style.top = Number(basket.offsetHeight+60)+"px";
    document.getElementById("showBasket").appendChild(basket);

    var left = document.getElementById("content").offsetLeft + document.getElementById("content").offsetWidth - basket.offsetWidth;
    basket.style.left=left+"px";

    showHideBasket();
    populateBasket();
}

function showHideBasket(basket){
    var basket = document.getElementById("basket");
    var showBasket = document.getElementById("showBasket");
    showBasket.onmouseenter = function(e){
        var height = basket.getElementsByTagName("li").length*55;
        basket.style.height =  height+"px";
    };
    showBasket.onmouseleave = function(e){
        basket.style.height =  "0px";
    };

}

function populateBasket(){
    var basket = document.getElementById("basket");
    basket.innerHTML = "";

    var panier = getBasket();
    var prix = 0;

    for (var i = 0; i < panier.length; i++) {
        prix += Number(panier[i][1]);
        var li = document.createElement("li");
        li.setAttribute("rel",i);
        li.innerHTML = ' \
            <img src="'+panier[i][2]+'" alt="'+panier[i][0]+'"> \
            <div class="titre">'+panier[i][0]+'</div> \
            <div class="prix">'+panier[i][1]+' &euro;</div> \
            <div class="fa fa-trash-o trash" aria-hidden="true"></div>';
        basket.appendChild(li);

        li.getElementsByClassName("trash")[0].onclick = function(e){
            removeFromBasket(this.parentNode.getAttribute("rel"));
        };
    }
    var li = document.createElement("li");
    li.setAttribute("rel",i);
    li.innerHTML = ' \
        <div style="margin-left:50px;" class="titre">Total</div> \
        <div class="prix">'+prix+' &euro;</div> \</div>';
    basket.appendChild(li);
}

function getBasket(){
    if (sessionStorage.panier) {
        return JSON.parse(sessionStorage.getItem("panier"));
    }else{
        return new Array();
    }
}

function addToBasket(elem){
    var panier = getBasket();

    var basket = document.getElementById("basket");
    var titre = elem.getElementsByTagName("h2")[0].textContent;
    var prix = elem.getElementsByClassName("prix")[0].textContent;
    prix = prix.substring(0, prix.length-1);
    var img = elem.getElementsByTagName("img")[0].getAttribute("src");

    var item = new Array(3);
    item[0] = titre;
    item[1] = prix;
    item[2] = img;
    panier.push(item);
    sessionStorage.setItem("panier", JSON.stringify(panier));

    populateBasket();
}

function removeFromBasket(id){
    var panier = getBasket();
    panier.splice(id, 1);
    sessionStorage.setItem("panier", JSON.stringify(panier));

    populateBasket();
}
