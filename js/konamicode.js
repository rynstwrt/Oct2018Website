const konamiCode = ["ArrowUp", "ArrowDown", "ArrowUp", "ArrowDown",
                    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
                    "b", "a"];
const lastTenKeys = [];
const hasDoneKonami = false;


document.addEventListener("keydown", e =>
{
    lastTenKeys.push(e.key);
    if (lastTenKeys.length > 10)
        lastTenKeys.shift();

    if (JSON.stringify(lastTenKeys) === JSON.stringify(konamiCode))
        onKonamiCode();
});


function onKonamiCode()
{
    if (hasDoneKonami) return;

    console.log("KONAMI");
}
