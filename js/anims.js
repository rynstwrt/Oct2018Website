const socialAnim = anime({
    autoplay: false,
    targets: ".social-icon",
    //easing: 'spring(1, 80, 10, 0)',
    easing: "easeOutExpo",
    duration: 800,
    scale: [0, 1],
    delay: anime.stagger(50, {start: 100})
});

anime({
    targets: "#name-container",
    scale: [0, 1],
    rotate: [-180, 0],
    easing: "easeOutExpo",
    duration: 800,
    opacity: [0, 1],
    complete: () =>
    {
        socialAnim.play();
    }
});
