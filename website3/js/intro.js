const letterDelay = 20;
let intro;
let background;
let h1;
let cursor;
let isTyping = false;
let points = [];
let animationHandler;

/**
 * Types a given line of text with a start delay of 'time'.
 *
 * @param {string} line The line to type.
 * @param {number} time The start delay of the line in milliseconds
*/
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

/**
 * Draws a line between to points in { left: x, top: y } format.
 *
 * @param {object} p1 The first point.
 * @param {object} p2 The second point.
*/
function drawLineBetweenPoints(p1, p2)
{
    const line = document.createElement('div');
    line.classList.add('line');

    const dX = Math.abs(p2.left - p1.left);
    const dY = Math.abs(p2.top - p1.top);

    const width = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
    line.style.width = `${width}px`;

    const bottomMostPoint = (p1.top > p2.top) ? p1 : p2;
    const topMostPoint = (bottomMostPoint === p1) ? p2 : p1;

    line.style.left = `${bottomMostPoint.left}px`;
    line.style.top = `${bottomMostPoint.top}px`;

    let theta = (bottomMostPoint.left < topMostPoint.left) ? -Math.atan(dY / dX) : Math.atan(dY / dX) + Math.PI;

    line.style.transform = `rotate(${theta}rad)`;
    background.append(line);
}

/**
 * Fills the background with random points and draws lines between them.
 *
 * @param {number} amount The amount of points to create.
*/
function fillBackground(amount)
{
    for (let i = 0; i < amount; ++i)
    {
        const xMid = document.documentElement.clientWidth / 2;
        const yMid = document.documentElement.clientHeight / 2;
        const maxOffset = xMid * .6; // 60% of half the window;

        const x = xMid + (Math.random() * (maxOffset * 2) - maxOffset);
        const y = yMid + (Math.random() * (maxOffset * 2) - maxOffset);

        const point = { left: x, top: y };
        points.push(point);
    }

    points.forEach((point, i) => {
        const nextPoint = points[i + 1];
        if (!nextPoint) return;

        drawLineBetweenPoints(point, nextPoint);
    });
    drawLineBetweenPoints(points[points.length - 1], points[0]);
}

/**
 * Animates the background.
*/
let pos = 0;
function animateBackground()
{
    pos += .1;
    background.style.transform = `rotate3d(0, 1, 0, ${pos % 360}deg)`;

    animationHandler = window.requestAnimationFrame(animateBackground);
}

/**
 * Create the starting elements needed for the intro.
*/
function createStartingElements()
{
    intro = document.createElement('div');
    intro.id = 'intro';

    h1 = document.createElement('h1');

    background = document.createElement('div');
    background.id = 'background';

    cursor = document.createElement('span');
    cursor.id = 'cursor';

    h1.append(cursor);
    intro.append(h1);
    intro.append(background);
    document.body.append(intro);
}

/**
 * Start the intro animation.
*/
function start()
{
    createStartingElements();

    fillBackground(50);

    type('Hey... ', 2000);
    type('are you there?', 1000);
    type('\r\n\r\n', 3000);
    type('Do you feel the vibrations of the universe around you?');

    setTimeout(() =>
    {
        background.style.animation = 'fadeIn 1s ease-in-out forwards';
        animationHandler = window.requestAnimationFrame(animateBackground);
        type('\r\n\r\n', 4000);
        type('What do you actually experience? ');
        type('Is it yours to keep? ', 4000)

        setTimeout(() =>
        {
            intro.style.animation = 'fadeOut 3s ease-in-out forwards';
            setTimeout(() =>
            {
                window.cancelAnimationFrame(animationHandler);
                intro.remove();
            }, 3000)
        }, 13 * 1000);


    }, 9 * 1000);
}

window.addEventListener('load', () => start() );
