var G = {
  options: {
    seeds: 40,
    margin: '-50px 0 0 -50px'
  },
  currentGridArray: [],
  cellDataArray: [],
  neighbours: [],
  /**
   * init calculates the width and height of the grid with the given parameters. It then creates the cells and appends then to the grid element
   * @param rows {number} The set number of rows in a grid
   * @param columns {number} The set number of columns in a grid
   * @param cellSize {number} The size of a cell in width and height
   */
  init: function (rows, columns, cellSize) {
    var gridEl = document.getElementById('grid');

    gridEl.style.width = (cellSize * columns) + 'px';
    gridEl.style.height = (cellSize * rows) + 'px';
    gridEl.style.margin = G.options.margin;


    for (var i = 0; i < columns * rows; i++) {
      var divEl = document.createElement('div');
      gridEl.appendChild(divEl);
    }

    var cellNode = gridEl.childNodes;

    for (var j = 0; j < cellNode.length; j++) {
      cellNode[j].classList.add('cell');
      cellNode[j].style.width = cellSize + 'px';
      cellNode[j].style.height = cellSize + 'px';

    }

    G.traverseInterval(columns)

  },

  /**
   * randomSeed is used to generate the first instance of the grid
   * @param seeds {number} The number of planted seeds in the grid
   * @param startIndex {number} The starting index for the for loop
   */
  randomSeed: function (seeds, startIndex) {
    var startIndex = startIndex ? startIndex : 0;
    var cellInfoObj = {};

    for (var i = startIndex; i < seeds; i++) {

      var plantedSeed = Math.floor((Math.random() * 100));
      var isUnique = G.checkDuplication(plantedSeed, i);

      if(isUnique && G.currentGridArray.length < seeds){

        G.currentGridArray.push(plantedSeed);

        document.querySelectorAll('.cell')[G.currentGridArray[i]].classList.add('alive');
      }else {
        break;
      }
    }


    console.log(G.currentGridArray)

  },

  /**
   * checkDuplication checks the current value of the array and checks it against all other values in the array to see if it is already assigned. If it is it returns false
   * @param currentValue {number} is the value that is currently being iterated in the randomSeed for loop
   * @param index is the index {number} of the current value being iterated
   * @returns {boolean} returns true if the values are all unique and false if it detects the same value
   */
  checkDuplication: function(currentValue, index){

    if(G.currentGridArray.length  !== 0 || G.currentGridArray !== undefined) {
      var checkedValue = G.currentGridArray.every(function (element) {
        return currentValue !== element
      });

      if(!checkedValue){
        G.randomSeed(G.options.seeds, index);
      }

      return checkedValue
    }
  },

  traverseGrid: function (columns) {

    for(var i = 0; i < G.currentGridArray.length; i++){
      var cellIndex = G.currentGridArray[i];
      var neighbourObj = {};

      G.neighbours = [];

      if(i === G.options.seeds - 1){
        G.cellDataArray = [];
      }
      G.getNeighbours(cellIndex, columns, neighbourObj);

      // var result = G.neighbours.filter(neighbour => neighbour === G.currentGridArray);

      var result = G.cellDataArray.filter(function(item){

        var gridResult = G.currentGridArray.filter(function(gridItem){
          console.log('item', item.neighbours[0]);
          console.log('gridItem', gridItem);

          // return item === gridItem
        })

        // return gridResult
      });


    }

  },

  getNeighbours: function (cellIndex, columns, neighbourObj){
    var top = cellIndex - (columns + 1);
    var bottom = cellIndex + (columns - 1);
    var left = cellIndex - 1;
    var right = cellIndex + 1;
    var cellInfoObj = {};

    for(var j = 0; j < 3; j++){
      // neighbourObj.top = [top + j];
      // neighbourObj.bottom = [bottom + j]
      G.neighbours.push(top + j);
      G.neighbours.push(bottom + j);
    }

    // neighbourObj.left = left;
    // neighbourObj.right = right;
    G.neighbours.push(left);
    G.neighbours.push(right);

    neighbourObj.value = cellIndex;
    neighbourObj.neighbours =[G.neighbours];

    // console.log(cellIndex);
    console.log(neighbourObj);

    G.cellDataArray.push(neighbourObj);

    console.log('cellDataArray', G.cellDataArray);

    // console.log('resultfgfg', result);
    // console.log('neighbourssssss', G.neighbours);


  },

  traverseInterval: function (columns) {

    setInterval(function () {
      if(G.currentGridArray.length  === 0 || G.currentGridArray === undefined){
        G.randomSeed(G.options.seeds);
      }else {
        G.traverseGrid(columns)
      }
    }, 1000)

  }
};

G.init(10, 10, 20);
