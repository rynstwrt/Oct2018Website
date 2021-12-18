const platterAnim = anime({
    targets: "#platter",
    rotate: "360deg",
    autoplay: false,
    easing: "linear",
    duration: 1500,
    loop: true
});


const downArrowAnim = anime({
    targets: "#down-arrow-container",
    opacity: [0, 1],
    autoplay: false,
    easing: "easeOutExpo",
    duration: 700,
});


anime.timeline({ loop: false, autoplay: true })
    .add({
        targets: "#turntable",
        scale: [0, 1],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 750,
        delay: 1000
    }).add({
        targets: "#ryan-stewart-text",
        translateY: [100, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 700,
        endDelay: 500,
        complete: () =>
        {
            platterAnim.play();
            downArrowAnim.play();
        }
    }, "-=300");