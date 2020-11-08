function start(container, color)
{
	let colors = [
		...color.getShades(6),
		...color.getTints(6),
		color.getComplimentary(),
		...color.getSplitComplementary(30),
		...color.getDoubleSplitComplementary(30),
		...color.getAnalagous(30, 6),
		...color.getTriadic()
	];

	colors.forEach((c, i) => {
		const box = document.createElement('div');
		box.classList.add('color-box');
		box.style.backgroundColor = `hsl(${c[0]}, ${c[1]}%, ${c[2]}%)`;
		container.append(box);
	});
}

function hexToHSL(hex)
{
	const r = parseInt(hex.substr(1, 2), 16) / 255;
	const g = parseInt(hex.substr(3, 2), 16) / 255;
	const b = parseInt(hex.substr(5, 2), 16) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h, s, l = (min + max) / 2;

	if (min === max)
	{
		h = 0;
		s = 0;
	}
	else
	{
		const d = max - min;
		s = l > .5 ? d / (2 - min - max) : d / (min + max);

		switch(max)
		{
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;

			case g:
				h = (b - r) / d + 2;
				break;

			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return [h * 360, s * 100, l * 10];
}

window.addEventListener('load', () =>
{
	const input = document.querySelector('#color-input');
	const colorContainer = document.querySelector('#color-container');

	let [h, s, l] = hexToHSL(input.value);

	const color = new Color(h, s, l);

	start(colorContainer, color);

	input.addEventListener('input', () =>
	{
		while (colorContainer.firstChild)
			colorContainer.firstChild.remove();
		start(colorContainer, color);
	});
});
