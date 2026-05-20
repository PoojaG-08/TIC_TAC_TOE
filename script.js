const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (cell.textContent || !gameActive) return;
        cell.textContent = currentPlayer;
        checkWinner();
    });
});

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a,b,c] = pattern;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
            [a,b,c].forEach(i => cells[i].classList.add("win"));
            document.getElementById("winnerImage").style.display = "block";
            launchConfetti();
            gameActive = false;
            return;
        }
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
        statusText.textContent = "😐 Draw Game!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer} Turn`;
}

/* 🎊 Attractive Confetti */
function launchConfetti() {
    const container = document.getElementById("confetti-container");
    const colors = ["#ff0a54","#ffbe0b","#4cc9f0","#80ff72","#c77dff"];

    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";

        confetti.style.backgroundColor =
            colors[Math.floor(Math.random()*colors.length)];

        const size = Math.random()*6 + 6;
        confetti.style.width = size + "px";
        confetti.style.height = size*1.4 + "px";

        confetti.style.left = Math.random()*100 + "vw";
        confetti.style.top = "-10px";
        confetti.style.animationDuration = Math.random()*2 + 2 + "s";

        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}

resetBtn.onclick = () => {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
    document.getElementById("confetti-container").innerHTML = "";
    document.getElementById("winnerImage").style.display = "none";
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X Turn";
};