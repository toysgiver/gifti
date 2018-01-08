

var tmp = document.createElement("div");
tmp.style.position = "absolute";
tmp.style.top = "0px";
tmp.style.left = "0px";
tmp.style.height = "30px";
tmp.style.width = "30px";
tmp.style.backgroundColor = "red";
document.getElementsByTagName("body")[0].appendChild(tmp)
tmp.onclick = function(){ls();};

function ls(){
    var tab = new Array();
    tab[0] = new Array();
    tab[1] = new Array();
    tab[2] = new Array();
    tab[0][0] = "id1";
    tab[0][1] = "img1";
    tab[0][2] = "produit1";
    tab[0][3] = "prix1";
    tab[1][0] = "id2";
    tab[1][1] = "img2";
    tab[1][2] = "produit2";
    tab[1][3] = "prix2";
    tab[2][0] = "id3";
    tab[2][1] = "img3";
    tab[2][2] = "produit3";
    tab[2][3] = "prix3";
    console.log("------------------");
    console.log("Tab");
    console.log(tab);
    tab.splice(0, 1);
    console.log("Tab splice");
    console.log(tab);
    console.log("Tab json");
    console.log(JSON.stringify(tab));
    localStorage.setItem("panier", JSON.stringify(tab));
    console.log("From LS");
    console.log(localStorage.getItem("panier"));
    console.log("LS to array");
    var obj = localStorage.getItem("panier");
    var arr = JSON.parse(obj);
    console.log(arr);
    console.log("------------------");
}

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

}

function getBasket(){
    if (localStorage.panier) {
        return JSON.parse(localStorage.getItem("panier"));
    }else{
        return new Array();
    }
}

function addBasket(elem){
    var panier = getBasket();

    var tmp = new Array();
    var item = new Array();
    item["id"] = "id";
    item["produit"] = "prd";
    item["prix"] = "px";
    item["img"] = "img";
    tmp.push(item);
    console.log(item);
    console.log(JSON.stringify(item));
    var item2 = new Array();
    item2[0] = "id";
    item2[1] = "prd";
    item2[2] = "px";
    item2[3] = "img";
    tmp.push(item2);
    console.log(item2);
    console.log(JSON.stringify(item2));
    var basket = document.getElementById("basket");
    var titre = elem.getElementsByTagName("h2")[0].textContent;
    var prix = elem.getElementsByClassName("prix")[0].textContent;
    var img = elem.getElementsByTagName("img")[0].getAttribute("src");
    var li = document.createElement("li");
    li.innerHTML = '<img src="'+img+'" alt="'+titre+'"><span class="titre">'+titre+'</span><span class="prix">'+prix+'</span>';

    basket.appendChild(li);
}
