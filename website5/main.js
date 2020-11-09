function start(container, hex)
{

	let color = new Color(hex);

	const colors = [
		color.getHSL(),
		color.darken(50).getHSL(),
		color.lighten(50).getHSL(),
		color.rotateHue(10).getHSL(),
		color.addHue(180).getHSL(),
		color.subtractHue(180).getHSL()
	];

	const boxes = getBoxes(container, colors.length);
	boxes.forEach((box, i) =>
	{
		box.style.backgroundColor = colors[i];
	});
}

function getBoxes(container, amount)
{
	const currentBoxes = document.querySelectorAll('.color-box');

	if (currentBoxes.length === amount) return currentBoxes;

	while (container.firstChild) container.firstChild.remove();

	let boxes = [];
	for (let i = 0; i < amount; ++i)
	{
		const box = document.createElement('div');
		box.classList.add('color-box');
		boxes.push(box);
		container.append(box);
	}

	return boxes;
}

window.addEventListener('load', () =>
{
	const input = document.querySelector('#color-input');
	const colorContainer = document.querySelector('#color-container');

	start(colorContainer, input.value);
	input.addEventListener('input', () => start(colorContainer, input.value));
});
