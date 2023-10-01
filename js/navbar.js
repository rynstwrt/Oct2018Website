const LINK_BORDER_TRANSITION_DURATION = 0.15;

const anchors = document.querySelectorAll("nav a");

for (const a of anchors)
    a.style.transition = `border-bottom-color ${LINK_BORDER_TRANSITION_DURATION}s ease-in-out`;