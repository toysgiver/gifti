function popupProducts(event, elem){
    if(!event.target.classList.contains("addBasket")){

        var screenMidWidth = window.innerWidth/2;
        var screenMidHeight = window.innerHeight/2;
        var elem2 =  elem.cloneNode(2);
        elem2.setAttribute("id","produitPopup");
        document.getElementsByTagName("body")[0].appendChild(elem2);

        var elemMidWidth = elem2.offsetWidth/2;
        var elemMidHeight = elem2.offsetHeight/2;
        elem2.style.top = Number(screenMidHeight-elemMidHeight)+"px";
        elem2.style.left = Number(screenMidWidth-elemMidWidth)+"px";

        elem2.getElementsByClassName("addBasket")[0].onclick = function(e){
            addToBasket(this.parentNode);
            elem2.remove();
            document.getElementById("backPopup").remove();
        };

        var backPopup = document.createElement("div");
        backPopup.setAttribute("id","backPopup");

        var body = document.getElementsByTagName("body")[0];
        body.appendChild(backPopup);

        backPopup.onclick = function(e){
            elem2.remove();
            //elem2.onclick = function(e){popupProducts(e, this)};
            backPopup.remove();
        };

        elem2.onclick = function(e){
            if(!e.target.classList.contains("addBasket")){
                elem2.remove();
                backPopup.remove();
                //elem2.onclick = function(e){popupProducts(e, this)};
            }
        };
    }
}

var products = document.getElementsByClassName("produit");
for (var i = 0; i < products.length; i++){
    products[i].onclick = function(e){
        popupProducts(e, this);
    };
    products[i].getElementsByClassName("addBasket")[0].onclick = function(e){
        addToBasket(this.parentNode);
    };
}
