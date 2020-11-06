const letterDelay = 300;
const lineDelay = 2000;

function type()
{
    const h1 = document.querySelector('h1');
    const lines =
    [
        'Hi! My name is Ryan.',
        'I like web design.',
        'Here are some places you can find me.'
    ];

    lines.forEach((line, i) => {
        setTimeout(() =>
        {
            line.split('').forEach((char, j) => {
                setTimeout(() => { h1.textContent += char; }, letterDelay * j);
            });
        }, 1000 * i);
    });
}

window.addEventListener('load', () =>
{
    type();
});
