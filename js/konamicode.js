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


}
