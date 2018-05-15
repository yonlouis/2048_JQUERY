var board = [[0,0,0,0],
             [0,0,0,0],
             [0,0,0,0],
             [0,0,0,0]];

var score = 0;

$(document).ready(function(){

    createTable();

    init();

    window.addEventListener("keydown", function(e) {
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);


    $(document).on('keydown',function(e){
        if(e.keyCode === 37){
            display(moveLeft());
        }

        if(e.keyCode === 38){
            display(moveUp());

        }
        if(e.keyCode === 39){
            display(moveRight());

        }
        if(e.keyCode === 40){
            display(moveDown());
        }
    });

    $(document).on('keyup',function(e){
        if(e.keyCode === 32){
            init();}})
});


//Place "2" ou "4" dans une case vide aléatoirement:
function placeRandom() {
    var isPlaced = false;
    var value = Math.random() < 0.9 ? 2 : 4;

    while(!isPlaced){
        var i =  Math.floor(Math.random() * 4);
        var j =  Math.floor(Math.random() * 4);

        if(board[i][j] === 0){
            board[i][j] = value;
            isPlaced = true;
        }
    } return isPlaced;
}

function mapBoard() {
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                $('#id' + i + j)[0].innerHTML = board[i][j];
            }
        }
    }
}


function display(parameter){

    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            $('#id' + i + j)[0].innerHTML = null;
        }}

    if(parameter){
        placeRandom();
        mapBoard();
        defineColours();
    }

    else{mapBoard();}

    if(gameover()){
        best_score(parseInt($('#value_display').text()));
        $('#board').addClass('game_over');
        console.log("gameover");
    }
}


function gameover(){

    for(var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return false;
            }
        }
    }

    for(var i = 1; i < 3; i++){
        for(var j = 1; j < 3; j++){
            if(board[i][j] === board[i-1][j] || board[i][j] === board[i][j-1] ||
                board[i][j] === board[i+1][j] || board[i][j] === board[i][j+1] ){
                return false;
            }
        }
    }

    if(    board[0][0]===board[0][1] || board[0][0]===board[1][0]
        || board[3][3]===board[2][3] || board[3][3]===board[3][2]
        || board[0][3]===board[0][2] || board[0][3]===board[1][3]
        || board[3][0]===board[3][1] || board[3][0]===board[2][0]
    ){return false;}


    return true;
}

function moveRight(){
    var moved = false;

    for(var x = 0; x < 4; x++) {
        for (var i = 3; i >= 0; i--) {
            for (var j = 2; j >= 0; j--) {
                if (board[i][j + 1] === 0 && board[i][j] !== 0) {
                    board[i][j + 1] = board[i][j];
                    board[i][j] = 0;
                    moved = true;
                }
            }
        }
    }

    for (var i = 3; i >= 0; i--) {
        for (var j = 2; j >= 0; j--) {
            if(board[i][j] === board[i][j+1] && board[i][j] !== 0){
                board[i][j+1] = board[i][j+1]*2;
                board[i][j] = 0;
                score_display(board[i][j+1]);

                $('#id'+i+(j+1)).addClass("cell_merge")
                    .delay(100).queue(function(next){
                    $(this).removeClass("cell_merge");
                    next();
                });
                moved = true;
            }
        }
    }

    for(var x = 0; x < 4; x++) {
        for (var i = 3; i >= 0; i--) {
            for (var j = 2; j >= 0; j--) {
                if (board[i][j + 1] === 0 && board[i][j] !== 0) {
                    board[i][j + 1] = board[i][j];
                    board[i][j] = 0;
                    moved = true;
                }
            }
        }
    }

    return moved;
}

function moveLeft() {
    var moved = false;

    for (var x = 0; x < 4; x++) {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j - 1] === 0 && board[i][j] !== 0) {
                    board[i][j - 1] = board[i][j];
                    board[i][j] = 0;
                    moved = true;
                }
            }
        }
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] === board[i][j - 1] && board[i][j] !== 0) {
                board[i][j - 1] = board[i][j - 1] * 2;
                board[i][j] = 0;
                score_display(board[i][j - 1]);
                $('#id'+i+(j-1)).addClass("cell_merge")
                    .delay(100).queue(function(next){
                    $(this).removeClass("cell_merge");
                    next();
                });
                moved = true;
            }
        }
    }

    for (var x = 0; x < 4; x++) {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j - 1] === 0 && board[i][j] !== 0) {
                    board[i][j - 1] = board[i][j];
                    board[i][j] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveUp(){
    var moved = false;

    for(var x = 0; x < 4; x++) {
        for (var i = 1; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i - 1][j] === 0 && board[i][j] !== 0) {
                    board[i - 1][j] = board[i][j];
                    board[i][j] = 0;
                    moved = true;
                }
            }
        }
    }

    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] === board[i - 1][j] && board[i - 1][j] !== 0) {
                board[i - 1][j] *= 2;
                board[i][j] = 0;
                score_display(board[i - 1][j]);
                $('#id'+(i-1)+j).addClass("cell_merge")
                    .delay(100).queue(function(next){
                    $(this).removeClass("cell_merge");
                    next();
                });
                moved = true;
            }
        }
    }

    for(var x = 0; x < 4; x++) {
        for (var i = 1; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i - 1][j] === 0 && board[i][j] !== 0) {
                    board[i - 1][j] = board[i][j];
                    board[i][j] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function moveDown(){
    var moved = false;

    for(var x = 0; x < 4; x++) {
        for (var i = 3; i >= 1; i--) {
            for (var j = 3; j >= 0; j--) {
                if (board[i][j] === 0 && board[i - 1][j] !== 0) {
                    board[i][j] = board[i - 1][j];
                    board[i - 1][j] = 0;
                    moved = true;
                }
            }
        }
    }

    for (var i = 3; i >= 1; i--) {
        for (var j = 3; j >= 0; j--) {
            if (board[i - 1][j] === board[i][j] && board[i][j] !== 0) {
                board[i][j] = 2 * board[i][j];
                board[i - 1][j] = 0;
                score_display(board[i][j]);
                $('#id'+i+j).addClass("cell_merge")
                    .delay(100).queue(function(next){
                    $(this).removeClass("cell_merge");
                    next();
                });
                moved = true;
            }
        }
    }

    for(var x = 0; x < 4; x++) {
        for (var i = 3; i >= 1; i--) {
            for (var j = 3; j >= 0; j--) {
                if (board[i][j] === 0 && board[i - 1][j] !== 0) {
                    board[i][j] = board[i - 1][j];
                    board[i - 1][j] = 0;
                    moved = true;
                }
            }
        }
    }
    return moved;
}

function createTable() {

    var $score_display='<div class="game">' +
        '<div class="head">' +
            '<div class="a">2048 ' +
                '<button class="info" onClick=info()>i</button>' +
                '<button id="repeat" class="info repeat" onClick="display(init())">↻</button></div>' +
            '<div class="score">Score<br>' +
                '<span id="value_display">0</span><br>'+
                '<span id="score_addition"></span></div>' +
            '<div class="score">Best score<br>' +
        '<span id="best_score">0</span></div>'+
        '</div>' +
    '<span id="value_display">-</span></div>' +
        '<div class="description" id="description">' +
        'How to play:<br/><br/>' +
        'Use your arrow-keys to slide the tiles. <br/>' +
        'Two tiles with the same value in line can be merged. The goal is to merge the tiles and get the 2048 tile.<br/><br/>' +
        'The score is a sum of the merged tiles.<br><br/>' +
        '<span>_______________________________</span><br/><br/>' +
        '</div>'+'</div>'+'</div>';

    $('#board').append($score_display);


  var $temp = '<table id="createTable">';

  for (var i = 0; i < 4; i++) {
    $temp += '<tr>';
    for (var j = 0; j < 4; j++) {
      $temp += '<td id="id'+i+j+'">';
      $temp += '</td>';
    }
    $temp += '</tr>';
  }
  $temp +='</table>';
  $('#board').append($temp);
}


function resetBoard(){
    for(var x = 0; x < 4; x++){
        for(var y = 0; y < 4; y++){
            board[x][y] = 0;
        }
    }
}

function init(){
    $('#value_display').text('0');
    $('#board').removeClass('game_over');
    resetBoard();
    placeRandom();
    placeRandom();
    mapBoard();
    defineColours();
    return false;
}

function defineColours() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            switch (board[i][j]) {
                case 0:
                    $('#id' + i + j).css({
                      background: 'white',
                      color: 'white'
                  });;
                    break;
                case 2:
                    $('#id' + i + j).css({
                  background: '#eee4da',
                  color: 'black'
              });;
                    break;
                case 4:
                    $('#id' + i + j).css({
                  background: '#ede0C8',
                  color: 'black'
              });
                    break;
                case 8:
                    $('#id' + i + j).css('color', '#f9f6f2');
                    $('#id' + i + j).css('background','#f2b179');
                    break;
                case 16:
                    $('#id' + i + j).css('color','#f9f6f2');
                    $('#id' + i + j).css('background','#f59563');
                    break;
                case 32:
                    $('#id' + i + j).css('color', '#f9f6f2');
                    $('#id' + i + j).css('background','#f67c5f');
                    break;
                case 64:
                    $('#id' + i + j).css('color', '#f9f6f2');
                    $('#id' + i + j).css('background','#f65e3b');
                    break;
                case 128:
                    $('#id' + i + j).css({
                        background: '#edcf72',
                        color: '#f9f6f2',
                        fontSize : '55px',
                        //boxShadow: '0 0 30px 10px rgba(243, 215, 116, 0.2381),inset 0 0 0 1px rgba(255, 255, 255, 0.14286)'
                    });
                    break;
                case 256:
                    $('#id' + i + j).css({
                        color: '#f9f6f2',
                        background: '#edcc61',
                        fontSize: '55px'
                    });
                    break;
                case 512:
                    $('#id' + i + j).css({
                        color: '#f9f6f2',
                        background: '#edc850',
                        fontSize: '55px'
                    });
                    break;
                case 1024:
                    $('#id' + i + j).css({
                        color: '#f9f6f2',
                        background: '#edc53f',
                        fontSize: '49px'
                    });
                    break;
                case 2048:
                    $('#id' + i + j).css(
                        "background-image","url('http://i.imgur.com/wNOhOog.gif')");
                        alert("you win, congratulation!");
                    break;
            }
        }
    }
}

function score_display(value) {

    var previous = parseInt($('#value_display').text());
    var new_value = parseInt(previous + value);
    $('#value_display').text(new_value);

    $('#score_addition').text(value);

    $("#score_addition").addClass("score_addition")
        .delay(900).queue(function(next){
        $(this).text('').removeClass("score_addition");
        next();
    });
}

function best_score(value){
    if(value > ($('#best_score').text())){
        $('#best_score').text(value);
    }
}

function info() {
    setTimeout(function() {
        document.getElementById('description').classList.toggle('show');
    }, 10);
}
