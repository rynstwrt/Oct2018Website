let char;
let charHeight;
let animationFrame;

let left = false;
let right = false;
let jump = false;
const jumpTime = 100;
const moveOffset = 1.5;

function checkForCollision(dir)
{
	const char = document.querySelector('#char');
	const charWidth = char.offsetWidth;
	const charHeight = char.offsetHeight;
	const charLeft = char.offsetLeft;
	const charTop = char.offsetTop;

	let collidable = document.querySelectorAll('.collidable');
	collidable = Array.prototype.slice.call(collidable);

	let isColliding = false;

	collidable.forEach((item) =>
	{
		const width = item.offsetWidth;
		const height = item.offsetHeight;
		const left = item.offsetLeft;
		const top = item.offsetTop;

		const isInHeightRange = charTop <= top + height && charTop + charHeight >= top;

		if (dir === 'left')
		{
			if (left + width >= charLeft && charLeft >= left && isInHeightRange)
			{
				isColliding = true;
			}
		}

		if (dir === 'right')
		{
			if (charLeft + charWidth >= left && charLeft + charWidth <= left + width && isInHeightRange)
			{
				isColliding = true;
			}
		}

		if (dir === 'top')
		{
			if (isInHeightRange)
			{
				isColliding = true;
			}
		}

	});

	return isColliding;
}

function animate()
{
	if (left && !checkForCollision('left'))
	{
		const newLeft = (char.style.left) ? parseFloat(char.style.left) - moveOffset : -moveOffset;
		char.style.left = `${newLeft}px`;
	}
	else if (right && !checkForCollision('right'))
	{
		const newLeft = (char.style.left) ? parseFloat(char.style.left) + moveOffset : moveOffset;
		char.style.left = `${newLeft}px`;
	}

	if (jump)
	{
		// jump = false;
		//
		// let amount = 0;
		// while (amount <= charHeight * 2 && !checkForCollision('top'))
		// {
		// 	console.log('asdfds');
		// 	char.style.bottom = `${amount}px`;
		// 	++amount;
		// }
		//
		// setTimeout(() =>
		// {
		// 	char.style.bottom = 0;
		// }, jumpTime);

		char.style.bottom = `${char.style.bottom + 1}px`;

		if (checkForCollision('top'))
		{
			console.log('no');
			jump = false;
		}
	}

	animationFrame = window.requestAnimationFrame(animate);
}

window.addEventListener('load', () => {
	char = document.querySelector('#char');
	charHeight = char.clientHeight;
	animationFrame = window.requestAnimationFrame(animate);
});

document.addEventListener('keydown', e =>
{

	switch(e.which)
	{
		case 32: // space
			jump = true;
			break;

		case 87: // w
		 	jump = true;
			break;

		case 65: // a
			left = true;
			break;

		case 83: // s
			char.style.transform = 'scaleY(.5)';
			break;

		case 68: // d
			right = true;
			break;
	}
});

document.addEventListener('keyup', e =>
{
	switch(e.which || e.keyCode)
	{
		case 65: // a
			left = false;
			break;

		case 83: // s
			char.style.transform = 'scaleY(1)';
			break;

		case 68: // d
			right = false;
			break;
	}
});
