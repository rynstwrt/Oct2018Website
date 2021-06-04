const icon = document.getElementById("hamburger");
const menu = document.getElementById("left");

let isClosed = true;

icon.addEventListener("click", () =>
{
    if (menu.style.transition === "") menu.style.transition = "all .15s ease-in-out";

    menu.style.width = (isClosed) ? "300px" : "0px";
    isClosed = !isClosed;
});