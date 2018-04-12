$(function(){
    init();
});

function init() {
    stage = new createjs.Stage("gameCanvas");
    draw_game_table(stage); // Draw the table
}

function init_game_array() {
    for (j=0; j<=18; j++) {
        game_state[j] = new Array();
        for (i=0; i<=22; i++) {
            game_state[j][i] = 0;
        }
    }
}

function polygon_maker(x, y, size, color) {
    // Drawing a polygon
    var polygon = new createjs.Shape();
    polygon.graphics.beginFill(color).drawPolyStar(x, y, size, 6, 0, 30);
    return polygon;
}

function move_click(j, i) {
    return function(event) {
        if (game_log.indexOf(j+" "+i) != -1){
            return
        } else {
            game_log.push(j+" "+i);
        }
        place_move(current_player, j, i);
        current_player = current_player == 1 ? 2 : 1;
        check_game_over();
    }
}

function place_move(player, x, y) {
    game_state[x+4][y+4] = player;
    draw_game_state();
}

function draw_game_table(stage) {
    // Drawing 160 polygon cells
    var polygon;
    for (j=0; j<=5; j++) {
        for (i=1; i<=15; i++) {
            polygon = polygon_maker(40 + 54 * i, 35 + j * 96, 30, "#a98307");
            polygon = polygon_maker(40 + 54 * i, 35 + j * 96, 30, "#a98307");
            polygon.addEventListener("click", move_click(j*2, i-1));
            stage.addChild(polygon);
        }
        if (j != 5) {
            for (i=1; i<=14; i++) {
                polygon = polygon_maker(67 + 54 * i, 83 + j * 96, 30, "#a98307");

                stage.addChild(polygon);
            }
        }
    }
    stage.update();
}