const contactAnim = anime({
    targets: "#social-list-container a",
    color: ["#111111", "#EF8354"],
    autoplay: false,
    easing: "easeOutExpo",
    duration: 1000,
    delay: anime.stagger(125, { start: 250 })
});