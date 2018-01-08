var ligne = 4;
var colone = 4;
var choixPlayer = new Array( 2 );
var grid = new Array( ligne );

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
  initGrid( ( ligne * colone ) );
  logGrid();
  bindEvent();
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
  console.log( card );
  card = shuffleCard( card );
  console.log( card );
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
}

function bindEvent() {
  var td = document.getElementById( "memory" ).getElementsByTagName( "td" );
  for ( var i = 0; i < td.length; i++ ) {
    td[ i ].onclick = function ( e ) {
      jouer( this );
      console.log( this );
    };
  }
}

function jouer( elem ) {
  if ( choixPlayer[ 0 ] == null ) {
    choixPlayer[ 0 ] = elem;
  } else if ( choixPlayer[ 0 ] != elem ) {
    choixPlayer[ 1 ] = elem;
    checkChoix();
  }
}

function checkChoix() {
  var ligne1 = choixPlayer[ 0 ].parentNode.rowIndex;
  var colone1 = choixPlayer[ 0 ].cellIndex;
  var ligne2 = choixPlayer[ 1 ].parentNode.rowIndex;
  var colone2 = choixPlayer[ 1 ].cellIndex;

  // if ( grid[ ligne1 ][ colone1 ] == grid[ ligne2 ][ colone2 ] ) {
  //   return true;
  // } else {
  //   return false;
  // }
}
