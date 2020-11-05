let container;
let rows = [];

function populateWithShapes()
{
	const width = document.documentElement.scrollWidth;
	const height = document.documentElement.scrollHeight;
	const margin = parseInt(getComputedStyle(document.body).getPropertyValue('--shape-margin'));
	const size = margin * 2 + parseInt(getComputedStyle(document.body).getPropertyValue('--shape-size'));

	const rowAmount = height / size;

	for (let i = 0; i < rowAmount; ++i)
	{
		const row = document.createElement('div');
		row.classList.add('row');

		const shapesPerRow = width / size;
		for (let j = 0; j < shapesPerRow; ++j)
		{
			const shape = document.createElement('div');
			shape.classList.add('shape');
			row.append(shape);
		}

		rows.push(row);
		container.append(row);
	}
}

function wave()
{
	rows.forEach((row, i) => {
		row.childNodes.forEach((shape, j) => {
			shape.style.animation = `wave 2s ${(i + (rows[i].childNodes.length - 1 - j)) / 10}s ease-in-out`;
		});
	});
}

window.addEventListener('load', () =>
{
	container = document.querySelector('#shape-container');
	populateWithShapes();
	wave();
});

window.addEventListener('resize', () =>
{
	while (container.firstChild)
		container.removeChild(container.firstChild);
	populateWithShapes();
});
