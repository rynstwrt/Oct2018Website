const bubbles = document.querySelectorAll(".bubble");
const projects = document.querySelectorAll(".project");

let bubbleIndex = 0;
bubbles.forEach(bubble =>
{
    if (![0, 1, 2, 3].includes(bubbleIndex))
    {
        bubble.setAttribute("data-aos", "fade-in");

        // bubble.setAttribute("data-aos-delay", "300");
    }
    ++bubbleIndex;
});

projects.forEach(project =>
{
    project.setAttribute("data-aos", "zoom-in");
    // project.setAttribute("data-aos-delay", "100");
});

AOS.init({
    once: true,
    easing: "ease-in-out-quad"
    // duration: 1000
});