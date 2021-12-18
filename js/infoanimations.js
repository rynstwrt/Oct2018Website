const scrollPaddingPixels = 100;


const highlightAnim = anime({
    targets: ".highlight",
    color: ["#111111", "#FFFFFF"],
    autoplay: false,
    easing: "easeInOutExpo",
    duration: 750,
    delay: anime.stagger(1000)
});


let hasPlayedAnim = false;
window.addEventListener("scroll", () =>
{
    if (hasPlayedAnim || window.scrollY + scrollPaddingPixels < window.innerHeight) return;

    hasPlayedAnim = true;
    highlightAnim.play();
});