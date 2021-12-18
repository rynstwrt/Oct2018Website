const scrollPaddingPixels = 250;

let hasPlayedHighlightAnim = false;
let hasPlayedProjectsAnim = false;
let hasPlayedContactAnim = false;

window.addEventListener("scroll", () =>
{
    // word fill and some underline effect
    if (!hasPlayedHighlightAnim && window.scrollY + scrollPaddingPixels >= window.innerHeight)
    {
        hasPlayedHighlightAnim = true;
        infoTimeline.play();
    }


    // projects fade in effect
    if (!hasPlayedProjectsAnim && window.scrollY + scrollPaddingPixels >= window.innerHeight * 2)
    {
        hasPlayedProjectsAnim = true;
        projectsAnim.play();
    }


    // contact page social link wave effect
    if (!hasPlayedContactAnim && window.scrollY + scrollPaddingPixels >= window.innerHeight * 3)
    {
        hasPlayedContactAnim = true;
        contactAnim.play();
    }
});