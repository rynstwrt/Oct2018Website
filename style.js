const square3 = document.querySelector('#square3');

window.addEventListener('resize', (e) =>
{
    const pb = square3.style.paddingBottom;
    const h = square3.style.height;
    console.log(pb, h);

});
