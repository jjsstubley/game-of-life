var G = {
  options: {
    columns: 20,
    rows: 20,
    cellsize: 20,
    seeds: 200,
    cells: '.cell',
  },
  cellDataArray: [],
  neighbours: [],
  checkAliveCellsArray: [],
  firstIteration: true,
  /**
   * init calculates the width and height of the grid with the given parameters. It then creates the cells and appends then to the grid element
   * @param rows {number} The set number of rows in a grid
   * @param columns {number} The set number of columns in a grid
   * @param cellSize {number} The size of a cell in width and height
   */
  init: function( rows, columns, cellSize ) {
    var gridEl = document.getElementById( 'grid' );
    var marginOffset = ( columns * cellSize ) / 2;
    gridEl.style.width = ( cellSize * columns ) + 'px';
    gridEl.style.height = ( cellSize * rows ) + 'px';
    gridEl.style.margin = -marginOffset + 'px 0 0 ' + -marginOffset + 'px'
    for ( var i = 0; i < columns * rows; i++ ) {
      var divEl = document.createElement( 'div' );
      divEl.classList.add( 'cell' );
      divEl.style.width = cellSize + 'px';
      divEl.style.height = cellSize + 'px';
      gridEl.appendChild( divEl );
      G.cellDataArray.push( i )
    }
    G.traverseInterval( columns )
  },
  /**
   * randomSeed is used to generate the first instance of the grid
   * @param seeds {number} The number of planted seeds in the grid
   * @param startIndex {number} The starting index for the for loop
   */
  randomSeed: function( seeds, startIndex ) {
    var startIndex = startIndex ? startIndex : 0;
    var cells = document.querySelectorAll( G.options.cells );
    var cells2 = G.options.cells
    G.firstIteration = false
    for ( var i = startIndex; i < seeds; i++ ) {
      var cellInfoObj = {};
      var plantedSeed = Math.floor( Math.random() * ( G.options.columns * G.options.rows ) );
      var isUnique = G.checkDuplication( plantedSeed, i, G.checkAliveCellsArray );
      if ( isUnique && G.checkAliveCellsArray.length < seeds ) {
        cellInfoObj = plantedSeed;
        G.checkAliveCellsArray.push( cellInfoObj );
        cells[ G.checkAliveCellsArray[ i ] ].classList.add( 'alive' );
      } else {
        break;
      }
    }
  },
  /**
   * checkDuplication checks the current value of the array and checks it against all other values in the array to see if it is already assigned. If it is it returns false
   * @param currentValue {number} is the value that is currently being iterated in the randomSeed for loop
   * @param index is the index {number} of the current value being iterated
   * @returns {boolean} returns true if the values are all unique and false if it detects the same value
   */
  checkDuplication: function( currentValue, index, arrayObj ) {
    if ( arrayObj.length !== 0 || arrayObj !== undefined ) {
      var checkedValue = arrayObj.every( function( element ) {
        return currentValue !== element
      } );
      if ( !checkedValue ) {
        G.randomSeed( G.options.seeds, index );
      }
      return checkedValue
    }
  },
  traverseGrid: function( columns ) {
    var cells = document.querySelectorAll( G.options.cells );
    G.checkAliveCellsArray = [];
    console.log( 'array should be empty', G.checkAliveCellsArray )
    for ( var i = 0; i < G.cellDataArray.length; i++ ) {
      var cellIndex = G.cellDataArray[ i ];
      G.neighbours = [];
      var numberActiveNeighbours = G.getNeighbours( cellIndex, columns ).filter( function( cellItem ) {
        var x = cellItem % G.options.columns;
        var y = cellIndex % G.options.columns;
        if ( cellItem >= 0 && cellItem < G.options.columns * G.options.rows ) {
          if ( ( y === 0 && x === G.options.columns - 1 ) || y === G.options.columns - 1 && x === 0 ) {
            return false
          }
          return ( cells[ cellItem ].classList.contains( 'alive' ) );
        }
      } ).length;
      G.evaluateCurrentData( i, numberActiveNeighbours );
    }
    for ( var i = 0; i < G.cellDataArray.length; i++ ) {
      cells[ i ].classList.remove( 'alive' )
    }
    for ( var j = 0; j < G.checkAliveCellsArray.length; j++ ) {
      cells[ G.checkAliveCellsArray[ j ] ].classList.add( 'alive' );
    }
  },
  getNeighbours: function( cellIndex, columns ) {
    var top = cellIndex - ( columns + 1 );
    var bottom = cellIndex + ( columns - 1 );
    var left = cellIndex - 1;
    var right = cellIndex + 1;
    for ( var j = 0; j < 3; j++ ) {
      G.neighbours.push( top + j );
      G.neighbours.push( bottom + j );
    };
    G.neighbours.push( left );
    G.neighbours.push( right );
    return G.neighbours
  },
  evaluateCurrentData: function( i, numberActiveNeighbours ) {
    var cells = document.querySelectorAll( G.options.cells );
    if ( ( numberActiveNeighbours === 3 ) || ( cells[ i ].classList.contains( 'alive' ) && numberActiveNeighbours === 2 ) ) {
      var cellInfoObj = {};
      cellInfoObj = i;
      G.checkAliveCellsArray.push( cellInfoObj );
      console.log( 'index', i )
    }
  },
  traverseInterval: function( columns ) {
    setInterval( function() {
      if ( G.firstIteration ) {
        G.randomSeed( G.options.seeds );
      } else {
        G.traverseGrid( columns );
      }
    }, 2000 )
  }
};
G.init( G.options.columns, G.options.rows, G.options.cellsize );