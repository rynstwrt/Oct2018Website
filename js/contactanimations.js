// const contactAnim = anime.timeline({ loop: true, autoplay: false, easing: "easeOutExpo", duration: 100 })
//     .add({
//         targets: "#contact-page li a",
//         scale: [1, 1.1],
//         delay: anime.stagger(50)
//     })
//     .add({
//         targets: "#contact-page li a",
//         scale: [1.1, 1],
//         delay: anime.stagger(50)
//     });


const contactAnim = anime({
    targets: "#social-list-container a",
    color: ["#111111", "#EF8354"],
    autoplay: false,
    easing: "easeOutExpo",
    duration: 1000,
    delay: anime.stagger(125, { start: 250 })
});