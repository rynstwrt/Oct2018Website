const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
                    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
                    "b", "a"];
const lastTenKeys = [];
let hasDoneKonami = false;


document.addEventListener("keydown", e =>
{
    lastTenKeys.push(e.key);
    if (lastTenKeys.length > 10)
        lastTenKeys.shift();

    if (JSON.stringify(lastTenKeys) === JSON.stringify(konamiCode) && !hasDoneKonami)
    {
        hasDoneKonami = true;
        onKonamiCode();
    }
});


function onKonamiCode()
{
    console.log("KONAMI CODE ENTERED! A winner is you!");

    const container = document.createElement("div");
    container.id = "konami-container";
    document.body.appendChild(container);
    document.body.style.overflowY = "hidden";

    const flashingText = document.createElement("h3");
    flashingText.id = "konami-text";
    flashingText.textContent = "A WINNER IS YOU";
    container.appendChild(flashingText);

    // create "Y'all mind if I praise the lord?" gif
    const danceGif = document.createElement("img");
    danceGif.src = "assets/dance.gif";
    container.appendChild(danceGif);

    // create left shark gif
    const sharkGif = document.createElement("img");
    sharkGif.src = "assets/leftshark.gif";
    container.appendChild(sharkGif);
}
