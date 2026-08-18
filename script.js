let topWindow = 1;

function openWindow(id) {
    const window = document.getElementById(id);

    window.style.display = "block";
    window.style.zIndex = ++topWindow;
}

function closeWindow(id) {
    document.getElementById(id).style.display = "none";
}

function drag(event) {
    const window = event.target.parentElement;

    window.style.zIndex = ++topWindow;

    let startX = event.clientX;
    let startY = event.clientY;

    let startLeft = window.offsetLeft;
    let startTop = window.offsetTop;

    function move(event) {
        window.style.left =
            startLeft + event.clientX - startX + "px";

        window.style.top =
            startTop + event.clientY - startY + "px";
    }

    function stop() {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", stop);
    }

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
}

function updateClock() {
    document.getElementById("clock").textContent =
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
}

updateClock();
setInterval(updateClock, 1000);