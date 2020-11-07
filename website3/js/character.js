let char;
let charHeight;
let animationFrame;

let left = false;
let right = false;
let isJumping = false;

const moveOffset = 1.5;

function jump()
{
	if (isJumping) return;
	char.style.bottom = `${charHeight}px`;

	char.addEventListener('transitionend', () =>
	{
		isJumping = false;
		char.style.bottom = 0;
	}, { once: true });
}

function animate()
{
	if (left)
	{
		const newLeft = (char.style.left) ? parseFloat(char.style.left) - moveOffset : -moveOffset;
		char.style.left = `${newLeft}px`;
	}
	else if (right)
	{
		const newLeft = (char.style.left) ? parseFloat(char.style.left) + moveOffset : moveOffset;
		char.style.left = `${newLeft}px`;
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
	if (document.querySelector('#intro')) return;

	switch(e.which)
	{
		case 32: // space

			jump();
			isJumping = true;
			break;

		case 87: // w

		 	jump();
			isJumping = true;
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
