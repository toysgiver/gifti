function popupProducts(event, elem){
    event.preventDefault();

    var screenMidWidth = window.innerWidth/2;
    var screenMidHeight = window.innerHeight/2;

    var elemMidWidth = elem.offsetWidth/2;
    var elemMidHeight = elem.offsetHeight/2;

    elem.style.position = "fixed";
    elem.style.top = Number(screenMidHeight-elemMidHeight)+"px";
    elem.style.left = Number(screenMidWidth-elemMidWidth)+"px";
    elem.style.backgroundColor = "white";
    elem.style.border = "5px solid #BDBDBD";
    elem.style.borderRadius = "15px";
    elem.style.zIndex = "999";
    elem.getElementsByClassName("description")[0].style.display = "block";

    var backPopup = document.createElement("div");
    backPopup.style.position = "fixed";
    backPopup.style.top = "0px";
    backPopup.style.left = "0px";
    backPopup.style.width = "100%";
    backPopup.style.height = "100%";
    backPopup.style.zIndex = "995";
    backPopup.style.backgroundColor = "rgba(255,255,255,0.5)";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(backPopup);

    backPopup.onclick = function(e){
        elem.removeAttribute('style');
        elem.onclick = function(e){popupProducts(e, this)};
        elem.getElementsByClassName("description")[0].style.display = "none";
        backPopup.remove();
    };

    elem.onclick = function(e){
        e.preventDefault();
        elem.removeAttribute('style');
        elem.onclick = function(e){popupProducts(e, this)};
        elem.getElementsByClassName("description")[0].style.display = "none";
        backPopup.remove();
    };
}

var products = document.getElementById("affichage_produit").getElementsByClassName("produit");
for (var i = 0; i < products.length; i++) {
    products[i].onclick = function(e){popupProducts(e, this)};
}
