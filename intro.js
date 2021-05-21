const skipIntro = true;

const intro = document.getElementById("intro");
const screw = document.getElementById("screw-round");

if (skipIntro)
{
    intro.style.display = "none";
    showSections();
}
else
{
    let degree = 90;
    const interval = setInterval(() =>
    {
        if (degree === 360)
        {
            clearInterval(interval);
            showSections();
            intro.style.transition = "opacity .25s ease-in-out";
            intro.style.opacity = "0";
            setTimeout(() =>
            {
                intro.style.display = "none";
            }, 250);
            return;
        }

        screw.style.transform = `rotateZ(${degree}deg)`;
        degree += 90;
    }, 750);
}

function showSections()
{
    const sections = document.getElementsByClassName("section");
    for (let i = 0; i < sections.length; ++i)
    {
        sections[i].style.display = "flex";
    }
}