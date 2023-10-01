const resumeButton = document.querySelector("#resume-button");

resumeButton.addEventListener("click", () =>
{
    window.open("/assets/resume.pdf", "_blank");
});