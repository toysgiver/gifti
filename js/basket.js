createBasket();

function createBasket(){ // creation du panier
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

function showHideBasket(){ // affiche et cache le panier sur mouseover
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

function populateBasket(){ // remplit le panier a partir du sessionStorage
    var page = window.location.pathname.split("/");
    page = page[page.length-1];
    var basket = document.getElementById("basket");
    basket.innerHTML = "";

    var panier = getBasket();
    var prix = 0;

    for (var i = 0; i < panier.length; i++) {
        prix += Number(panier[i][1]);
        var li = document.createElement("li");
        var img = panier[i][2];
        if(page == "index.html"){
            img = img.substr(1);
        }
        li.setAttribute("rel",i);
        li.innerHTML = ' \
            <img src="'+img+'" alt="'+panier[i][0]+'"> \
            <div class="titre">'+panier[i][0]+'</div> \
            <div class="prix">'+panier[i][1]+' &euro;</div> \
            <div class="fa fa-trash-o trash" aria-hidden="true"></div>';
        basket.appendChild(li);

        li.getElementsByClassName("trash")[0].onclick = function(e){
            removeFromBasket(this.parentNode.getAttribute("rel"));
        };
    }
    var li = document.createElement("li");
    //li.setAttribute("rel",i);
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

function addToBasket(elem){// ajoute l'élément au panier
    var panier = getBasket();

    var basket = document.getElementById("basket");
    var titre = elem.getElementsByTagName("h2")[0].textContent;
    var prix = elem.getElementsByClassName("prix")[0].textContent;
    prix = prix.substring(0, prix.length-1);
    var img = elem.getElementsByTagName("img")[0].getAttribute("src");
    var page = window.location.pathname.split("/");
    page = page[page.length-1];

    var item = new Array(3);
    item[0] = titre;
    item[1] = prix;
    if(page == "index.html"){
        item[2] = "."+img;
    }else{
        item[2] = img;
    }
    panier.push(item);
    console.log(panier);
    console.log(JSON.stringify(panier));
    sessionStorage.setItem("panier", JSON.stringify(panier));

    populateBasket();
}

function removeFromBasket(id){ //retire l'élément du panier
    var panier = getBasket();
    panier.splice(id, 1);
    sessionStorage.setItem("panier", JSON.stringify(panier));

    populateBasket();
}
