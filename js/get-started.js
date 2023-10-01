const getStartedButton = document.querySelector("#get-started");
const aboutPage = document.querySelector("#about-page");

getStartedButton.addEventListener("click", () =>
{
    aboutPage.scrollIntoView();
});