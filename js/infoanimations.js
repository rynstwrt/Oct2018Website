// fade in welcome to website
// fade in template text "i'm a __, __, and __"
// highlight anim
// fade in "below are some of my projects"
// some emphasis anim
const infoTimeline = anime.timeline({ loop: false, autoplay: false, easing: "easeOutExpo", duration: 400 })
    .add({
        targets: "#info-page h2:first-of-type",
        opacity: [0, 1],
        translateX: ["100vw", 0],
    })
    .add({
        targets: "#info-page h2:nth-child(2)",
        opacity: [0, 1],
        translateX: ["-100vw", 0],
        delay: 500
    })
    .add({
        targets: ".highlight",
        color: ["#111111", "#FFFFFF"],
        duration: 750,
        delay: anime.stagger(750)
    })
    .add({
        targets: "#info-page h2:last-of-type",
        opacity: [0, 1],
        translateX: ["100vw", 0],
        delay: 500
    })
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



