var ligne = 4;
var colone = 4;
var player = 1;
var choixPlayer = new Array( 2 );
var score = new Array( 2 );
var grid = new Array( ligne );
var cardImg = new Array( 28 );

init( ligne, colone );

function logGrid() {
  for ( var i = 0; i < grid.length; i++ ) {
    var line = "";
    for ( var j = 0; j < grid[ i ].length; j++ ) {
      line += "| " + grid[ i ][ j ] + " |";
    }
    console.log( line );
  }
}

function init( ligne, colone ) {
  createGrid( ligne, colone );
  for ( var i = 0; i < grid.length; i++ ) {
    grid[ i ] = new Array( colone );
  }
  for ( var i = 0; i < grid.length; i++ ) {
    for ( var j = 0; j < grid[ i ].length; j++ ) {
      grid[ i ][ j ] = null;
    }
  }
  for ( var i = 0; i < score.length; i++ ) {
    score[ i ] = 0;
  }
  initGrid( ( ligne * colone ) );
  logGrid();
  bindEvent();
  for ( var i = 0; i < cardImg.length; i++ ) {
    cardImg[ i ] = "../img/cards/" + i + ".jpg";
  }
  cardImg = shuffleCard( cardImg );
  document.getElementById("memoryPlayer").innerHTML = "Joueur "+player+" &agrave; toi de jouer.";
}

function initGrid( nbCard ) {
  var card = new Array( nbCard );
  var cmp = 1;
  for ( var i = 0; i < card.length; i++ ) {
    card[ i ] = cmp;
    if ( i % 2 != 0 ) {
      cmp++;
    }
  }
  card = shuffleCard( card );
  var cmp = 0;
  for ( var i = 0; i < grid.length; i++ ) {
    for ( var j = 0; j < grid[ i ].length; j++ ) {
      grid[ i ][ j ] = card[ cmp ];
      cmp++;
    }
  }
}

function shuffleCard( card ) {
  for ( var i = 0; i < card.length; i++ ) {
    var rand = Math.floor( ( Math.random() * ( card.length - 1 ) ) );
    var tmp = card[ rand ];
    card[ rand ] = card[ i ];
    card[ i ] = tmp;
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

  var td = table.getElementsByTagName("td");
  var style = document.createElement("style");
  style.innerHTML = "#memory td{width:"+table.offsetWidth/colone+"px; height:"+table.offsetWidth/ligne+"px}";
  document.getElementsByTagName("head")[0].appendChild(style);
}

function bindEvent() {
  var td = document.getElementById( "memory" ).getElementsByTagName( "td" );
  for ( var i = 0; i < td.length; i++ ) {
    td[ i ].onclick = function ( e ) {
      jouer( this );
    };
  }
}

function jouer( elem ) {
    if(choixPlayer[1] != null){
        if ( !checkChoix() ) {
          choixPlayer[ 0 ].removeAttribute( "style" );
          choixPlayer[ 1 ].removeAttribute( "style" );
        }
        choixPlayer[ 0 ] = null;
        choixPlayer[ 1 ] = null;
    }

    if ( choixPlayer[ 0 ] == null ) {
        choixPlayer[ 0 ] = elem;
        elem.style.backgroundImage = "url(" + getImg( elem ) + ")";
        document.getElementById("memoryPlayer").innerHTML = "Joueur "+player+" selectionne une seconde carte.";
    } else if ( choixPlayer[ 0 ] != elem ) {
        choixPlayer[ 1 ] = elem;
        elem.style.backgroundImage = "url(" + getImg( elem ) + ")";
        if ( !checkChoix() ) {
            player = ( player == 1 ) ? 2 : 1;
            document.getElementById("memoryPlayer").innerHTML = "Joueur "+player+" &agrave; toi de jouer.";
        }else{
            document.getElementById("memoryPlayer").innerHTML = "Joueur "+player+" tu peux rejouer.";
            choixPlayer[ 0 ].onclick = function () {return false;};
            choixPlayer[ 1 ].onclick = function () {return false;};
            score[ player - 1 ]++;
            checkVictory();
        }
    }
}

function getImg( elem ) {
  var ligne = elem.parentNode.rowIndex;
  var colone = elem.cellIndex;
  var card = grid[ ligne ][ colone ];
  return cardImg[ card ];
}

function checkChoix() {
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

function checkVictory() {
  if ( score[ 0 ] + score[ 1 ] == ( ligne * colone ) / 2 ) {
    //TODO AFFICHER VICTOIRE + CODE
    console.log( "victory" );
    console.log(getCoupon());
  }
}

function chaineAleatoire() {
    var length = '';
    var charSet = charSet || '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < 4; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        length += charSet[randomPoz];
	}
    return length;
}

function getCoupon(){
	coupon = chaineAleatoire()+'-'+chaineAleatoire()+'-'+chaineAleatoire()+'-2018';
	return coupon;
}
