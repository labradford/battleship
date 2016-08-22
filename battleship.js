// ********** START OF CONTROLLER **********
$(document).ready(function(){

  //calls makeBoard function to create the game board grid
  makeBoard();

  //calls the placeShips function to place ships on the board
  placeShips();
  //call a function to set the game up upon reset
  //setUpGame();
  //create a function to set the game up
//function setUpGame(){
  //when click a grid space
  $("td").on("click",
  //run a function
  function(){
    //checks to see if there are torpedos left
    if (torpedosLeft > 0) {
      //get the #id of the td that has been clicked
      var clickedBox = $(this).attr("id");
      //prints clicked to the console for testing purposes
      console.log(clickedBox);
      //checks to see if the td that has been clicked has a ship
      if (board[clickedBox[0]][clickedBox[1]] === aShipIsHere) {
        //adds a class of hit to the td
        $(this).addClass("hit");
        $(this).html('<i class="fa fa-bomb fa-3x"></i>');
        //Calls the incrementShipsHit function that increments the count of ships that have been hit
        incrementShipsHit();
        //displays the count of ships hit in the view
        $("#hits").text(shipsHit);
        //checks to see if 5 ships have been hit
        if (shipsHit === 24 && torpedosLeft >= 0) {
          //add winning message to the dom
          $("#winner").text("You WIN!");
          //reset topedo count when game is over
          //torpedosLeft = 0;
        }
      }
      //add the class of grey to the squares
      $(this).addClass("grey");
      //turns space off after it has been clicked
      $(this).off("click");
        //call the function to decrease the number of torpedoes 
        decrementTorpedos();
      //printing number of torpedos left to the dom
      $("#torpedos").text(torpedosLeft);
      if (torpedosLeft === 0 && shipsHit < 24) {
        $("#loser").text("You Lose!");
        //reset torpedos left at end of game
        //torpedosLeft = 0
        //calls a function to reveal the ships at the end of the game
        revealShips();
      }
    }
  });
//}
/*
//clicking the torpedo to restart the game
$("#restart").on("click", function(){
  $("td").removeClass("grey");
  $("td").removeClass("hit");
  $("td").removeClass("hereTheyAre");
  $("#torpedos").text(torpedosLeft);
  board=[[0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]];
  torpedosLeft = 25;
  shipsHit = 0;
  placeShips();
  setUpGame();
  $("#winner").text("");
  $("#loser").text("");
});
*/
});//end of document.ready

// ********** START OF MODEL **********
//create variable for torpedos left and set it to 0
var torpedosLeft = 50;
//create the array for the board
var board = [];
//create variable for ships that have been hit
var shipsHit = 0;
//create a variable for where a ship has been placed and set the value to -1
var aShipIsHere = -1;
//create a variable that sets the value of the surrounding spaces to -2
var noShip = -2;
//create variable for ships
var countOfShips = 0;

//Purpose: create a function to place five ships randomly on the board
//Signature: nothing ---> return 2 numbers that correspond to positions on the board
//Example: placeShips() ----> [0,3],[1,4],[2,6],[7,5],[1,8]
function placeShips() {
  //checks ships is less than five
  while (countOfShips < 8 ) {
    //call place a 5 ship
    if (countOfShips == 0) {
    placeAShipHorizontal(5);
    }
    if (countOfShips == 1) {
      placeAShipHorizontal(4);
    }
    if (countOfShips == 2) {
      placeAShipVertical(4);
    }
    if (countOfShips == 3) {
      placeAShipHorizontal(3);
    }
    if (countOfShips == 4) {
      placeAShipVertical(3);
    }
    if (countOfShips == 5) {
      placeAShipHorizontal(2);
    }
    if (countOfShips == 6) {
      placeAShipVertical(2);
    }
    if (countOfShips == 7) {
      placeAShipHorizontal(1);
    }
  }
}

// Purpose: to place a ship that takes up 5 spaces on the board vertically
//Signature: nothing --> return 5 row and column markers for each square of the ship and places a -1 in those spots
//Example: placeAShipVertical() --> ([1,2],[1,3],[1,4],[1,5],[1,6])
function placeAShipVertical(length) {
  //finds a random number for the row
    var row = Math.floor((Math.random()*10));
    //finds a random number for the column
    var column = Math.floor((Math.random()*(11-length)));
    //checks to see if the random board space can have a ship
    if (isAValidBoardSpaceToPlaceAShipVertical(row, column, length)) {
      //assigns the row and column to a ship position
      for (var i = 0; i < length; i++) {
        board[row][column + i] = aShipIsHere;
      }
      //increment the count of ships
      countOfShips++;
      //run markAdjacentSpaces function for each of the squares where a ship is placed
      for (var i = 0; i < length; i++) {
        markAdjacentSpaces(column + i, row);
      } 
    }
  }
// Purpose: to place a ship that takes up 5 spaces on the board horizontally
//Signature: nothing --> return 5 row and column markers for each square of the ship and places a -1 in those spots
//Example: placeAShipHorizontal() --> ([2,1],[3,1],[4,1],[5,1],[6,1])  
function placeAShipHorizontal(length) {
  //finds a random number for the row
  var row = Math.floor((Math.random()*(11-length)));
  //finds a random number for the column
  var column = Math.floor((Math.random()*10));
  //checks to see if the random board space can have a ship
  if (isAValidBoardSpaceToPlaceAShipHorizontal(row, column, length)) {
    //assigns the row and column to a ship position
    for (var i = 0; i < length; i++) {
      board[row + i][column] = aShipIsHere;
    }
    //increment the count of ships
    countOfShips++;
    //run markAdjacentSpaces function for each of the squares where a ship is placed
    for (var i = 0; i < length; i++) {
      markAdjacentSpaces(column, row + i);
    }   
  }
}

//Purpose: to check to see if a board space is not a ship and is not a noShip, therefore seeing if a spot is valid
//Signature: row, col -> Bool (representing the outcome of the check)
//Ex: isAValidBoardSpaceToPlaceAShip(0, 0) -> true (as long as there is not ships next to or already on that space)
function isAValidBoardSpaceToPlaceAShipHorizontal(row, column, length) {
  //create a variable for the return value and sets default to true
  var result = true;
  for (var i = 0; i < length; i ++) {
    //checks to see if space is on the grid and is not a ship and is not a noShip, else returns false
    if (!(isOnGridAndNotAShip(row + i, column) && board[row + i][column] !== noShip)) {
      //returns false if the above condition is met
      result = false;
    }
  }
  //returns result
  return result;
}
//Purpose: to check to see if a board space is not a ship and is not a noShip, therefore seeing if a spot is valid
//Signature: row, col -> Bool (representing the outcome of the check)
//Ex: isAValidBoardSpaceToPlaceAShip(0, 0) -> true (as long as there is not ships next to or already on that space)
function isAValidBoardSpaceToPlaceAShipVertical(row, column, length) {
  //create a variable for the return value and sets default to true
  var result = true;
  for (var i = 0; i < length; i ++) {
    //checks to see if space is on the grid and is not a ship and is not a noShip, else returns false
    if (!(isOnGridAndNotAShip(row, column + i) && board[row][column + i] !== noShip)) {
      //returns false if the above condition is met
      result = false;
    }
  }
  //returns result
  return result;
}

//Purpose: to create a function that finds the four spaces around the ship
//Signature:col,row -> [row][column][row][column] [row][column][row][column]
//Example: markAdjacentSpaces(1,1) -> 0,1 2,1 1,0 1,2
function markAdjacentSpaces(col, row) {
  if (isOnGridAndNotAShip(row - 1, col))
    board[row - 1][col] = noShip;
  if (isOnGridAndNotAShip(row + 1, col))
    board[row + 1][col] = noShip;
  if (isOnGridAndNotAShip(row, col - 1))
    board[row][col - 1] = noShip;
  if (isOnGridAndNotAShip(row, col + 1))
    board[row][col + 1] = noShip;
  if (isOnGridAndNotAShip(row - 1, col - 1))
    board[row - 1][col - 1] = noShip;
  if (isOnGridAndNotAShip(row + 1, col + 1))
    board[row + 1][col + 1] = noShip;
  if (isOnGridAndNotAShip(row + 1, col - 1))
    board[row + 1][col - 1] = noShip;
  if (isOnGridAndNotAShip(row - 1, col + 1))
    board[row - 1][col + 1] = noShip;
}

//Purpose: to check to see if a specified row and column are on the grid and not a ship
//Signature row, col -> bool
//Ex: isOnGridAndNotAShip(-1, 5) -> false
function isOnGridAndNotAShip(row, col) {
  if (row < 0 || row > 9)
    return false;
  if (col < 0 || col > 9)
    return false;
  return board[row][col] !== aShipIsHere;
}

// Purpose: to create gameBoard using loops
// Signature: nothing ->
// Examples: gameBoard() -> table
function makeBoard() {
  //set the board js uses to default state
  setDefaultBoard();
  //create a for loop for the tr
  for (var row=0; row<10; row++) {
    //create and append 10 tables rows to the table
    $("#gameBoard").append("<tr></tr>");
    //create a for loop for the tds
    for (var column=0; column<10; column++) {
      //create and append 10 table datas to the last row in loop
      $("tr").last().append('<td id = "' + column + row + '" class = "text-center"></td>');
    }
  }
}

//Purpose: set board to default state (nothing filled)
//Signature: Nothing -> set board to default state
//Ex: setDefaultBoard() -> [[0,0,0...],[0,0,0...]...]
function setDefaultBoard() {
  board = [];
  for (var i = 0; i < 10; i++)
    board.push([]);

  for (var r = 0; r < 10; r++)
    for (var c = 0; c < 10; c++)
      board[r][c] = 0;
}

// Purpose: to find the location/coordinates of the placed ships and add a class to the td
// Signature: nothing --> string
// Example: revealShips() --> $('#' + x + y).addClass("hereTheyAre")
function revealShips() {
  //create a for loop for the tr
  for (var row = 0; row < 10; row ++) {
    //create a for loop for the columns
    for ( var col = 0; col < 10; col ++) {
      //check to see of the is a ship in the square
      if (board[row][col] === aShipIsHere) {
        //add the class of hereTheyAre to the squares with ships
        $("#" + row + col).addClass("hereTheyAre");
        //add a ship icon to the squares
        $("#" + row + col).html('<i class="fa fa-anchor fa-3x"></i>');
      }
    }
  }
}

//Purpose: Decrease the count of torpedoes by one
//Signature: nothing --> number
//Example: decrementTorpedos --> 24
function decrementTorpedos() {
  //decrement the variable torpedosLeft by one and return the result
  return torpedosLeft --;
}

//Purpose: Increase the count of ships hit by one
//Signature: nothing --> number
//Example: incrementShipsHit --> 2
function incrementShipsHit() {
  //decrement the variable torpedosLeft by one and return the result
  return shipsHit ++;
}