const projectsAnim = anime({
    autoplay: false,
    targets: ".item",
    easing: "easeOutExpo",
    duration: 500,
    opacity: [0, 1],
    scale: [0, 1],
    delay: anime.stagger(100)
});


const socialAnim = anime({
    autoplay: false,
    targets: ".social-icon",
    //easing: 'spring(1, 80, 10, 0)',
    easing: "easeOutExpo",
    duration: 800,
    scale: [0, 1],
    delay: anime.stagger(50, {start: 100}),
    complete: () =>
    {
        projectsAnim.play();
    }
});


anime({
    targets: "#name-container",
    scale: [0, 1],
    rotate: [-180, 0],
    easing: "easeOutExpo",
    duration: 800,
    opacity: [0, 1],
    delay: 1000,
    complete: () =>
    {
        socialAnim.play();
    }
});
