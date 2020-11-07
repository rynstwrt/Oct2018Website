function start(container, inputValue)
{
	let [raw, h, s, l] = inputValue.match(/hsl\((\d+), (\d+%), (\d+%)\)/);
	const color = new Color(h, s, l);
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

window.addEventListener('load', () =>
{
	const input = document.querySelector('#color-input');
	const colorContainer = document.querySelector('#color-container');

	start(colorContainer, input.value);

	input.addEventListener('input', () =>
	{
		while (colorContainer.firstChild)
			colorContainer.firstChild.remove();
		start(colorContainer, input.value);
	});
});
