let maze1;
let maze2;

let shiftSpeed;

let canvasWidth = 800;
let canvasHeight = 450;
let Scale = 50;

let xPos1;
let xPos2;
let score;
let highscore;
let fps;
let moveCounter;

let currentCell;

let obstacles = [
    {
        mTop: 3,
        mBottom: 0,
        layout: [
            [1, 1, 1, 0],
            [1, 0, 1, 0],
            [1, 0, 1, 0],
            [1, 0, 1, 1]
        ]
    },
    {
        mTop: 3,
        mBottom: 0,
        layout: [
            [1, 1, 1, 0],
            [1, 0, 1, 0],
            [1, 1, 1, 0],
            [1, 0, 1, 1]
        ]
    },
    {
        mTop: 3,
        mBottom: 0,
        layout: [
            [1, 1],
            [1, 0],
            [1, 0],
            [1, 0]
        ]
    },
    {
        mTop: 2,
        mBottom: 0,
        layout: [
            [1, 1, 1],
            [1, 0, 0],
            [1, 0, 0]
        ]
    },
    {
        mTop: 1,
        mBottom: 0,
        layout: [
            [1, 1, 1],
            [1, 0, 0]
        ]
    },
    {
        mTop: 3,
        mBottom: 0,
        layout: [
            [1, 1, 1, 0],
            [1, 0, 1, 1],
            [1, 0, 0, 0],
            [1, 0, 0, 0]
        ]
    },
    {
        mTop: 4,
        mBottom: 0,
        layout: [
            [0, 0, 1, 1],
            [0, 0, 1, 0],
            [1, 1, 1, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0]
        ]
    },
    {
        mTop: 2,
        mBottom: 0,
        layout: [
            [0, 1, 1],
            [1, 1, 0],
            [1, 0, 0]
        ]
    },
    {
        mTop: 4,
        mBottom: 0,
        layout: [
            [1, 1, 1, 1],
            [1, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 1, 0],
            [1, 1, 1, 0]
        ]
    },
    {
        mTop: 2,
        mBottom: 2,
        layout: [
            [1, 1, 1, 1],
            [1, 0, 1, 0],
            [1, 0, 1, 0],
            [1, 0, 1, 0],
            [1, 1, 1, 0]
        ]
    },
    {
        mTop: 2,
        mBottom: 0,
        layout: [
            [1, 1, 1, 1],
            [1, 0, 1, 0],
            [1, 1, 1, 0]
        ]
    },
    {
        mTop: 4,
        mBottom: 0,
        layout: [
            [1, 1, 1],
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]
    },
    {
        mTop: 1,
        mBottom: 0,
        layout: [
            [1, 1, 1, 0],
            [1, 0, 1, 1]
        ]
    },
    {
        mTop: 1,
        mBottom: 1,
        layout: [
            [0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 0]
        ]
    },
    {
        mTop: 3,
        mBottom: 1,
        layout: [
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 1, 0],
            [1, 1, 0, 0, 0, 1, 0],
            [1, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 1, 1, 0, 0]
        ]
    },
    {
        mTop: 2,
        mBottom: 2,
        layout: [
            [0, 1, 1, 1, 1, 1, 1, 0, 0],
            [1, 1, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0],
            [1, 1, 1, 0, 0, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0, 0]
        ]
    },
    {
        mTop: 2,
        mBottom: 2,
        layout: [
            [1, 1, 1, 1, 1, 1, 1, 0, 0],
            [1, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 1, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0]
        ]
    },
    {
        mTop: 2,
        mBottom: 2,
        layout: [
            [1, 1, 1, 0, 0, 0],
            [1, 0, 1, 0, 0, 0],
            [1, 0, 1, 0, 1, 1],
            [0, 0, 1, 0, 1, 0],
            [0, 0, 1, 1, 1, 0]
        ]
    },
    {
        mTop: 1,
        mBottom: 1,
        layout: [
            [1, 1, 1, 0, 0, 0],
            [1, 0, 1, 0, 1, 1],
            [0, 0, 1, 1, 1, 0]
        ]
    }
];

function resetValues() {
    let w = window.innerWidth;
    canvasWidth = (w > 1000) ? w * 0.9 : w;
    score = 0;
    shiftSpeed = 5;
    xPos1 = 0;
    xPos2 = canvasWidth * 2;
    snakeSpeed = 5;
    direction = 'right';
    fps = 60;
    moveCounter = fps;
}

let initialized = false;
function init() {
    createCanvas(canvasWidth, canvasHeight).parent("game");
    document.getElementById('game').setAttribute("style", `width:${canvasWidth}px !important; height:${canvasHeight}px !important;`);
    frameRate(fps);
    noStroke();

    initialized = true;
}

function setup() {
    if (localStorage.getItem('highscore') !== undefined) {
        highscore = (+localStorage.getItem('highscore'));
    } else {
        highscore = 0;
        localStorage.setItem('highscore', '0');
    }

    if (score > highscore) {
        highscore = score;
        localStorage.setItem('highscore', '' + score);
    }

    resetValues();
    if (!initialized) init();
    if (maze1) maze1.remove();
    if (maze2) maze2.remove();

    maze1 = createGraphics(canvasWidth * 2, canvasHeight);
    maze2 = createGraphics(canvasWidth * 2, canvasHeight);

    maze1.mazeID = 1;
    maze2.mazeID = 2;

    path = Math.floor((height / Scale) / 2);
    endPath = path;

    let temp = path;

    createMaze(maze1, true);

    for (let y = 0; y < maze1.cells.length; y++) {
        for (let x = 0; x < 4; x++) {
            let cell = maze1.cells[y][x];

            if (cell.row === temp) {
                cell.snake = true;
                cell.filled = false;
                cell.draw(maze1);

                currentCell = cell;
            }
        }
    }

    createMaze(maze2);
}

let oldPosition = 0;

function draw() {
    background('#533f2f');
    xPos1 -= shiftSpeed;
    xPos2 -= shiftSpeed;

    if (xPos1 <= -maze1.width) {
        createMaze(maze1);
        xPos1 += maze1.width * 2;
    }
    if (xPos2 <= -maze2.width) {
        createMaze(maze2);
        xPos2 += maze2.width * 2;
    }

    let xPosition = (currentCell.mazeID === 1) ? xPos1 : xPos2;

    if (xPosition + currentCell.x < -canvasHeight / 2) {
        setup();
    } else {
        moveCounter += (moveCounter === fps) ? -fps : 1;
        if (moveCounter === 0) {
            shiftSpeed += 0.05;
            // snakeSpeed -= shiftSpeed % 1 ? 1 : 0;
        }
        if (Math.abs(xPosition - oldPosition) > 25 - snakeSpeed) {
            score++;
            if (!moveSnake()) {
                moveSnake(true);
            }
            oldPosition = xPosition;
        }
    }

    image(maze1, xPos1, 0);
    image(maze2, xPos2, 0);

    fill('#cdcdcd');
    textSize(40);
    textAlign(RIGHT, CENTER);
    text("" + score, width - 20, 40);

    if (highscore !== undefined) {
        fill('#707070');
        textSize(20);
        textAlign(LEFT, CENTER);
        text("HI " + highscore, 20, 30);
    }
}

let oldDirection = 'right';
let direction = 'right';

function keyPressed() {
    if (keyCode === LEFT_ARROW || keyCode === 65) {
        direction = 'left';
    } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
        direction = 'right';
    } else if (keyCode === UP_ARROW || keyCode === 87) {
        direction = 'up';
    } else if (keyCode === DOWN_ARROW || keyCode === 83) {
        direction = 'down';
    }
}

function moveSnake(slide = false) {
    let col = currentCell.col;
    let row = currentCell.row;

    let dir = slide ? oldDirection : direction;

    if (dir === 'right') {
        if (col < maze1.width / Scale) col += 1;
    } else if (dir === 'up') {
        if (row > 0) row -= 1;
    } else if (dir === 'down') {
        if (row < maze1.height / Scale) row += 1;
    } else {
        if (col > 0) col -= 1;
    }
    
    let maze = (currentCell.mazeID === 1) ? maze1 : maze2;
    if (col > maze.cells[0].length - 1) {
        maze = (maze.mazeID === 1) ? maze2 : maze1;
        col = 0;
    }

    if (!maze || !maze.cells) { return; }
    let selectedCell = getCell(row, col, maze);

    if (selectedCell && selectedCell.filled) {
        selectedCell.snake = true;
        selectedCell.filled = false;
        selectedCell.draw(maze);

        currentCell = selectedCell;
        oldDirection = direction;
        return true;
    }
    return false;
}

function getCell(row, col, maze) {
    if (col > maze.cells[0].length - 1) {
        maze = (maze.mazeID === 1) ? maze2 : maze1;
        col = 0;
    }
    for (let x = 0; x < maze.cells.length; x++) { // x -> row
        for (let y = 0; y < maze.cells[0].length; y++) { // y -> column
            let cell = maze.cells[x][y];
            if (cell && cell.col === col && cell.row === row) {
                return cell;
            }
        }
    }
    return null;
}

let path = 4;
let endPath = 3;

function createMaze(maze, start = false) {
    maze.cells = []; //Cursed that you can just add a parameter like this
    for (let i = 0; i < maze.height / Scale; i++) {
        maze.cells.push([]);
    }

    maze.noStroke();
    maze.clear();
    let mazeID = maze.mazeID;

    for (let x = 0; x < maze.width / Scale; x++) { // x -> row
        for (let y = 0; y < maze.height / Scale; y++) { // y -> column
            let row = maze.cells[y]; //Grab row
            if (x % 15 === 0 && x < maze.width / Scale - 10 && !(start && x === 0)) {
                let obs = getPlaceableObs(path);
                if (obs) {
                    insertObstacle(x, obs, maze);
                    x += obs.layout[0].length;
                }

                let cell = new Cell(x, y, mazeID, Scale, (y === path));
                cell.draw(maze);
                row.push(cell);
            } else {
                let cell = new Cell(x, y, mazeID, Scale, (y === path));
                cell.draw(maze);
                row.push(cell);
            }
        }
    }
}

function insertObstacle(xPos, obs, maze) {
    let layout = obs.layout;
    let topMargin = path - obs.mTop;
    let mazeID = maze.mazeID;

    for (let y = 0; y < topMargin; y++) {
        for (let x = 0; x < layout[0].length; x++) {
            let cell = new Cell((xPos + x), y, mazeID, Scale, false);
            cell.draw(maze);
            maze.cells[y].push(cell);
        }
    }

    for (let y = 0; y < layout.length; y++) {
        let row = layout[y];

        for (let x = 0; x < row.length; x++) {
            let cell = new Cell((xPos + x), (y + topMargin), mazeID, Scale, (row[x] === 1));
            cell.draw(maze);
            maze.cells[y + topMargin].push(cell);

            if (x === row.length - 1 && row[x] === 1) {
                endPath = y + topMargin;
            }
        }
    }

    for (let y = 0; y < (maze.height / Scale) - topMargin - layout.length; y++) {
        for (let x = 0; x < layout[0].length; x++) {
            let cell = new Cell((xPos + x), (y + topMargin + layout.length), mazeID, Scale, false);
            cell.draw(maze);
            maze.cells[y + topMargin + layout.length].push(cell);
        }
    }
    path = endPath;
}

let triesLeft = obstacles.length * 2;
let lastObs;

function getPlaceableObs(pathNum) {
    let index = Math.floor(Math.random() * obstacles.length);
    if (index === lastObs && triesLeft-- > 0) {
        return getPlaceableObs(pathNum);
    } else {
        lastObs = index;
    }

    let obs = obstacles[index];
    let reversed = flipObs(obs);

    let obsValid = isObsValid(obs, pathNum);
    let revValid = isObsValid(reversed, pathNum);

    if (obsValid && revValid) {
        return (Math.round(Math.random()) === 1) ? obs : reversed;
    } else if (obsValid || revValid) {
        return (obsValid) ? obs : reversed;
    } else {
        if (triesLeft-- > 0) {
            return getPlaceableObs(pathNum);
        } else {
            triesLeft = obstacles.length * 2;
            return null;
        }
        
    }
}

function flipObs(obs) {
    let rLayout = obs.layout.slice(0).reverse();
    let result = {
        mTop: obs.mBottom,
        mBottom: obs.mTop,
        layout: rLayout
    };
    return result;
}

function isObsValid(obs, pathNum) {
    let obsValid = true;

    let mTop = pathNum - obs.mTop;
    let mBottom = pathNum + obs.mBottom;

    if (mTop <= 0 || mTop > (canvasHeight / Scale) - 1 || mTop <= 0 || mBottom > (canvasHeight / Scale) - 1) {
        obsValid = false;
    }

    return obsValid;
}

class Cell {
    constructor(xp, yp, mazeID, size, filled, snake = false) {
        this.x = xp * size;
        this.y = yp * size;
        this.col = xp;
        this.row = yp;
        this.size = size;
        this.filled = filled;
        this.snake = snake;
        this.mazeID = mazeID;
    }

    draw(canvas) {
        canvas.noStroke();
        if (this.snake) {
            canvas.fill('#3ada58');
            canvas.rect(this.x, this.y, this.size, this.size);
        } else if (this.filled) {
            canvas.fill('#70543e');
            canvas.rect(this.x, this.y, this.size, this.size);
        }
    }
}