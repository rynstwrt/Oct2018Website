// const projectsAnim = anime({
//     targets: "#projects-page li",
//     opacity: [0, 1],
//     translateX: ["-100vw", 0],
//     autoplay: false,
//     easing: "easeInOutExpo",
//     duration: 1250,
//     delay: anime.stagger(50)
// });

const projectsAnim = anime.timeline({ loop: false, autoplay: false, easing: "easeOutExpo", duration: 1000 })
    .add({
        targets: "#projects-page div:first-of-type li",
        opacity: [0, 1],
        translateX: ["-100vw", 0],
        delay: anime.stagger(30)
    })
    .add({
        targets: "#projects-page div:nth-of-type(2) li",
        opacity: [0, 1],
        translateX: ["-100vw", 0],
        delay: anime.stagger(30)
    })
    .add({
        targets: "#projects-page div:last-of-type li",
        opacity: [0, 1],
        translateX: ["-100vw", 0],
        delay: anime.stagger(30)
    });