let windowNumber = 1;


/* ---------------- WINDOWS ---------------- */

function openWindow(id) {
    let window = document.getElementById(id);

    window.style.display = "block";

    windowNumber++;
    window.style.zIndex = windowNumber;
}

function closeWindow(id) {
    document.getElementById(id).style.display = "none";
}


/* ---------------- DRAGGING ---------------- */

function drag(event) {

    let window = event.target.parentElement;

    windowNumber++;
    window.style.zIndex = windowNumber;

    let mouseX = event.clientX;
    let mouseY = event.clientY;

    let oldLeft = window.offsetLeft;
    let oldTop = window.offsetTop;

    function moveWindow(event) {

        let newLeft =
            oldLeft + event.clientX - mouseX;

        let newTop =
            oldTop + event.clientY - mouseY;

        window.style.left = newLeft + "px";
        window.style.top = newTop + "px";
    }

    function stopDragging() {

        document.removeEventListener(
            "mousemove",
            moveWindow
        );

        document.removeEventListener(
            "mouseup",
            stopDragging
        );
    }

    document.addEventListener(
        "mousemove",
        moveWindow
    );

    document.addEventListener(
        "mouseup",
        stopDragging
    );
}


/* ---------------- CLOCK + DATE ---------------- */

function updateTime() {

    let now = new Date();

    let time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    let date = now.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric"
    });

    document.getElementById("clock").textContent = time;

    document.getElementById("taskbarClock").textContent = time;

    document.getElementById("date").textContent = date;
}

updateTime();

setInterval(updateTime, 1000);


/* ---------------- NOTES ---------------- */

function saveNotes() {

    let notes =
        document.getElementById("notesText").value;

    localStorage.setItem("bodyOSNotes", notes);

    document.getElementById("noteStatus").textContent =
        "Saved!";
}

function clearNotes() {

    document.getElementById("notesText").value = "";

    localStorage.removeItem("bodyOSNotes");

    document.getElementById("noteStatus").textContent =
        "Notes cleared.";
}

let savedNotes =
    localStorage.getItem("bodyOSNotes");

if (savedNotes) {

    document.getElementById("notesText").value =
        savedNotes;
}


/* ---------------- CALCULATOR ---------------- */

let calculator = "";

function calcInput(value) {

    calculator += value;

    document.getElementById("calcDisplay").value =
        calculator;
}

function calculate() {

    try {

        calculator =
            Function("return " + calculator)();

        document.getElementById("calcDisplay").value =
            calculator;

    } catch {

        calculator = "";

        document.getElementById("calcDisplay").value =
            "Error";
    }
}

function clearCalculator() {

    calculator = "";

    document.getElementById("calcDisplay").value =
        "";
}


/* ---------------- MINI GAME ---------------- */

let secretNumber =
    Math.floor(Math.random() * 10) + 1;

function guessNumber() {

    let guess =
        Number(document.getElementById("guessInput").value);

    let result =
        document.getElementById("gameResult");

    if (!guess) {

        result.textContent =
            "Enter a number first.";

        return;
    }

    if (guess === secretNumber) {

        result.textContent =
            "You got it! 🎉";

        secretNumber =
            Math.floor(Math.random() * 10) + 1;

    } else if (guess < secretNumber) {

        result.textContent =
            "Too low 👀";

    } else {

        result.textContent =
            "Too high 👀";
    }
}


/* ---------------- MUSIC ---------------- */

function playSong() {

    document.getElementById("songName").textContent =
        "🎵 body'oS vibes are playing...";
}

function stopSong() {

    document.getElementById("songName").textContent =
        "Nothing playing";
}


/* ---------------- SETTINGS ---------------- */

function changeDesktop(theme) {

    let desktop =
        document.querySelector(".desktop");

    desktop.classList.remove(
        "blue",
        "dark"
    );

    if (theme === "blue") {

        desktop.classList.add("blue");

    } else if (theme === "dark") {

        desktop.classList.add("dark");
    }
}

function resetDesktop() {

    let desktop =
        document.querySelector(".desktop");

    desktop.classList.remove(
        "blue",
        "dark"
    );
}


/* ---------------- TRASH ---------------- */

function emptyTrash() {

    document.getElementById("trashMessage").textContent =
        "Trash is already empty :)";
}
