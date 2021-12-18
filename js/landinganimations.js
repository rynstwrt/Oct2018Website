const platterAnim = anime({
    targets: "#platter",
    rotate: "360deg",
    autoplay: false,
    easing: "linear",
    duration: 3000,
    loop: true
});


anime.timeline({ loop: false, autoplay: true })
    .add({
        targets: "#turntable",
        scale: [0, 1],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 750,
        delay: 1000
    })
    .add({
        targets: "#ryan-stewart-text",
        translateY: [100, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 500
    }, "-=300")
    .add({
        targets: "#down-arrow-container",
        opacity: [0, 1],
        easing: "linear",
        duration: 300,
        endDelay: 200,
        complete: platterAnim.play
    });