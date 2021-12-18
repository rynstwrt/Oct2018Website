const someEmphasisTimeline = anime.timeline({ loop: true, autoplay: false })
    .add({
        targets: "#some-emphasis-line",
        width: [0, "100%"],
        easing: "easeInOutExpo",
        duration: 1000
    })
    .add({
        targets: "#some-emphasis-line",
        scaleX: [1, 0],
        easing: "easeInOutExpo",
        duration: 1000
    });



const scrollPaddingPixels = 200;
let hasPlayedAnim = false;

window.addEventListener("scroll", () =>
{
    if (hasPlayedAnim || window.scrollY + scrollPaddingPixels < window.innerHeight) return;

    hasPlayedAnim = true;

    anime({
        targets: ".highlight",
        color: ["#111111", "#FFFFFF"],
        easing: "easeInOutExpo",
        duration: 750,
        delay: anime.stagger(750),
        complete: () =>
        {
            someEmphasisTimeline.play();
        }
    });
});