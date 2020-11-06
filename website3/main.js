const letterDelay = 20;
let h1;
let cursor;
let isTyping = false;

function type(line, time = 0)
{
    if (isTyping)
    {
        const interval = setInterval(() =>
        {
            if (!isTyping)
            {
                type(line, time);
                clearInterval(interval);
            }
        }, 500);
        return;
    }

    isTyping = true;

    line.split('').forEach((char, j) => {
        setTimeout(() =>
        {
            const cursorCopy = cursor.cloneNode();
            h1.textContent += char;
            h1.append(cursorCopy);
        }, letterDelay * j + time);
    });

    setTimeout(() =>
    {
        isTyping = false;
    }, line.length * letterDelay + time);
}

function start()
{
    h1 = document.querySelector('h1');
    cursor = document.querySelector('#cursor');

    type('Hi, ');
    type('so where do I begin with this?', 1000);
    type('\r\n\r\n', 1000);
    type('- My name is Ryan.');
    type('\r\n');
    type('- I like code.');
    type('\r\n');
    type('- I like caffeine.');
    type('\r\n\r\n', 2000);
    type('Also, here are some places you can find me:');
}

window.addEventListener('load', () =>
{
    start();
});
