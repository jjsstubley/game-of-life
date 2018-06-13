# The Game of Life: Development steps

1. **Create a grid:** The grid should accept dynamic rows, columns and grid size. The grid should center vertically in the viewport.
    * `init` method to accept 3 parameters (rows, columns, cellSize)
      * rows -  number of rows to be rendered
      * columns - number of columns to be rendered
      * cellsize - size of each cell in pixels
    * create a `div` grid element and calculate grid width, height and margin
    * create the cells for the grid
    * append grid  `div` to dom
2. **Generate random seed:** Scatter random alive cells on the generated grid.
    * predetermine a set array of cell indexes that will have `alive` state for the first state of the game
3. **Grid traversal:** Create logic and utilities for iterating through the grid collection.
    * `traversal` method to get the number of cells in the grid and iterate through. It accepts 1 parameter (columns) to calculate it's neightbours
      * columns - numbers of columns rendered
    * the iteration will get the current state and position of the cell
    * the iteration will see the current state and position of the cells neighbours
    * push the cell and cells neighbours that state is `alive` into an array for the next iteration to check
4. **Game of Life logic:** Create a method to be used to check the `alive` state of each cell
    * `gameRules` method will get the array during the iteratation process the game rules will be checked on each cell
    *  A switch statement with the rules will be used to check each cell
5. **Lifecycle interval:** Invoke the iteration method into an interval. See how fast the interval can be executed.
    * `iteration` method will invoke the `traversal` with setInterval
6. **Performance:** Identify aspects of the logic that can be improved.
    * Refactor init method to try an minimise setting the elements to the dom and identify what does not need to be in the iteration.
    * Use map/filter instead of a for loopto get neighbours
    * Use less arrays/objects - 1 should be enough
