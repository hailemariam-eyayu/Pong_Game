// Simple Pong Game Logic
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10, paddleHeight = 100;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 40;

let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballRadius = 10;
let ballSpeedX = 5, ballSpeedY = 5;

let leftScore = 0, rightScore = 0;

function drawPaddle(x, y) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function drawScores() {
    ctx.font = '36px Arial';
    ctx.fillText(leftScore, canvas.width / 4, 50);
    ctx.fillText(rightScore, (canvas.width * 3) / 4, 50);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(0, leftPaddleY);
    drawPaddle(canvas.width - paddleWidth, rightPaddleY);
    drawBall();
    drawScores();
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = (Math.random() - 0.5) * 10;
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Top/bottom wall collision
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Left paddle collision
    if (
        ballX - ballRadius < paddleWidth &&
        ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
        ballX = paddleWidth + ballRadius;
    }
    // Right paddle collision
    if (
        ballX + ballRadius > canvas.width - paddleWidth &&
        ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
        ballX = canvas.width - paddleWidth - ballRadius;
    }

    // Left missed
    if (ballX - ballRadius < 0) {
        rightScore++;
        resetBall();
    }
    // Right missed
    if (ballX + ballRadius > canvas.width) {
        leftScore++;
        resetBall();
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'w' && leftPaddleY > 0) leftPaddleY -= paddleSpeed;
    if (e.key === 's' && leftPaddleY < canvas.height - paddleHeight) leftPaddleY += paddleSpeed;
    if (e.key === 'ArrowUp' && rightPaddleY > 0) rightPaddleY -= paddleSpeed;
    if (e.key === 'ArrowDown' && rightPaddleY < canvas.height - paddleHeight) rightPaddleY += paddleSpeed;
});

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();
