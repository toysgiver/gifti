var ligne = 4;
var colone = 4;
var player = 1;
var choixPlayer = new Array( 2 );
var score = new Array( 2 );
var grid = new Array( ligne );
var cardImg = new Array( 28 );


init( ligne, colone );

//Affichage de la grille mélanger dans la console
function logGrid() {
  for ( var i = 0; i < grid.length; i++ ) {
    var line = "";
    for ( var j = 0; j < grid[ i ].length; j++ ) {
      line += "| " + grid[ i ][ j ] + " |";
    }
    console.log( line );
  }
}

// Initialisation de la grille de jeu et des variables relative
function init( ligne, colone ) {
  createGrid( ligne, colone ); // creation de la grille html
  for ( var i = 0; i < grid.length; i++ ) { //initialisation de la grille javascript
    grid[ i ] = new Array( colone );
  }
  for ( var i = 0; i < grid.length; i++ ) {
    for ( var j = 0; j < grid[ i ].length; j++ ) {
      grid[ i ][ j ] = null;
    }
  }
  for ( var i = 0; i < score.length; i++ ) { // initialisation du tableau des scores
    score[ i ] = 0;
  }
  initGrid( ( ligne * colone ) ); // Remplissage de la grille avec les cartes
  //logGrid();
  bindEvent(); // lier les cases du tableau a l'event onclick
  for ( var i = 0; i < cardImg.length; i++ ) { // initialisation du tableau carte => image
    cardImg[ i ] = "../img/cards/" + i + ".jpg";
  }
  cardImg = shuffleCard( cardImg );
  document.getElementById("memoryPlayer").innerHTML = "Joueur "+player+" &agrave; toi de jouer.";
}

function initGrid( nbCard ) { //  Remplissage de la grille avec les cartes
  var card = new Array( nbCard );
  var cmp = 1;
  for ( var i = 0; i < card.length; i++ ) { // on ajoute 2 cartes de chaques type dans le jeu
    card[ i ] = cmp;
    if ( i % 2 != 0 ) {
      cmp++;
    }
  }
  card = shuffleCard( card ); // on mélange le tableau de carte à insérer dans la grille
  var cmp = 0;
  for ( var i = 0; i < grid.length; i++ ) { // on met les cartes dans la grille de jeu
    for ( var j = 0; j < grid[ i ].length; j++ ) {
      grid[ i ][ j ] = card[ cmp ];
      cmp++;
    }
  }
}

function shuffleCard( card ) { //melange le tableau card
  for ( var i = 0; i < card.length; i++ ) { // on parcours le tableau
    var rand = Math.floor( ( Math.random() * ( card.length - 1 ) ) ); // on selectionne un nombre aléatoire entre 0 et taille du tableau -1 (un index au hazar)
    var tmp = card[ rand ]; // on stocke dans une variable la valeur comprise dans la case card[rand]
    card[ rand ] = card[ i ]; // on la remplace par celle stocké dans card[i]
    card[ i ] = tmp; // on remplace card[i] par la valeur stocké précédement
  }
  return card;
}

function createGrid( ligne, colone ) {
  var table = document.getElementById( "memory" );
  for ( var i = 0; i < ligne; i++ ) {
    var tr = document.createElement( "tr" );
    table.appendChild( tr );
    for ( var j = 0; j < colone; j++ ) {
      var td = document.createElement( "td" );
      tr.appendChild( td );
    }
  }

  //var td = table.getElementsByTagName("td");
  var style = document.createElement("style");
  style.innerHTML = "#memory td{width:"+table.offsetWidth/colone+"px; height:"+table.offsetWidth/ligne+"px}";
  document.getElementsByTagName("head")[0].appendChild(style);
}

function bindEvent() { // à chaque éléments td du tableau on ajoute un evenement onclick
  var td = document.getElementById( "memory" ).getElementsByTagName( "td" );
  for ( var i = 0; i < td.length; i++ ) {
    td[ i ].onclick = function ( e ) {
      jouer( this );
    };
  }
}

function jouer( elem ) {
    if(choixPlayer[1] != null){ // si c'est un nouveau tour
        if ( !checkChoix() ) {// si les cartes ne sont pas identique on les remets face caché
          choixPlayer[ 0 ].removeAttribute( "style" );
          choixPlayer[ 1 ].removeAttribute( "style" );
        }
        choixPlayer[ 0 ] = null; // on efface les choix effectué
        choixPlayer[ 1 ] = null;
    }

    if ( choixPlayer[ 0 ] == null ) { // si c'est la premiere carte retourné par le joueur
        choixPlayer[ 0 ] = elem;
        elem.style.backgroundImage = "url(" + getImg( elem ) + ")";
        elem.style.backgroundSize = "100% 100%";
        document.getElementById("memoryPlayer").innerHTML = "Joueur "+player+" selectionne une seconde carte.";
    } else if ( choixPlayer[ 0 ] != elem ) { // si c'est la seconde carte
        choixPlayer[ 1 ] = elem;
        elem.style.backgroundImage = "url(" + getImg( elem ) + ")";
        elem.style.backgroundSize = "100% 100%";
        if ( !checkChoix() ) { // si les carte sont différent
            player = ( player == 1 ) ? 2 : 1; // on change de joueur
            document.getElementById("memoryPlayer").innerHTML = "Joueur "+player+" &agrave; toi de jouer.";
        }else{
            document.getElementById("memoryPlayer").innerHTML = "Joueur "+player+" tu peux rejouer.";
            choixPlayer[ 0 ].onclick = function () {return false;}; // on supprime les onclick des cartes
            choixPlayer[ 1 ].onclick = function () {return false;};
            score[ player - 1 ]++;
            refreshScore(); // on actualise le tableau de score
            checkVictory(); // on verifie si la partie est fini
        }
    }
}

function refreshScore(){
    var scoreTab = document.getElementById("memoryScore").getElementsByTagName("td");
    scoreTab[2].innerHTML = score[0];
    scoreTab[3].innerHTML = score[1];
}

function getImg( elem ) {// retourne l'url de l'image pour la carte
  var ligne = elem.parentNode.rowIndex;
  var colone = elem.cellIndex;
  var card = grid[ ligne ][ colone ];
  return cardImg[ card ];
}

function checkChoix() { // verifie si les cartes sont identiques
  var ligne1 = choixPlayer[ 0 ].parentNode.rowIndex;
  var colone1 = choixPlayer[ 0 ].cellIndex;
  var ligne2 = choixPlayer[ 1 ].parentNode.rowIndex;
  var colone2 = choixPlayer[ 1 ].cellIndex;

  if ( grid[ ligne1 ][ colone1 ] == grid[ ligne2 ][ colone2 ] ) {
    return true;
  } else {
    return false;
  }
}

function checkVictory() { // si toutes les cartes sont retourné le joueur actuel gagne
  if ( score[ 0 ] + score[ 1 ] == ( ligne * colone ) / 2 ) {
      document.getElementById("memoryPlayer").innerHTML = "";
      var pop = document.createElement("div");
      pop.classList.add("memoryVictory");
      pop.innerHTML = "Félicitation Joueur "+player+".<br/>Voici votre code promo : <br/>"+getCoupon();
      document.getElementById("content").appendChild(pop);
  }
}

function chaineAleatoire() { // generation d'une chaine de 4 caractère aléatoire
    var length = '';
    var charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < 4; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        length += charSet[randomPoz];
	}
    return length;
}

function getCoupon(){ //generation du coupon de réduction
	var coupon = chaineAleatoire()+'-'+chaineAleatoire()+'-'+chaineAleatoire()+'-2018';
	return coupon;
}
