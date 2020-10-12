// Ryan Stewart 10/12/2020
$(window).on('load', () =>
{
	// get points
	let points = [];
	$.each($('#graphic').children(), (i, v) =>
	{
		points.push(v);
	});

	$.each(points, (i) =>
	{
		const v = points[i];
		const l = v.style.left;
		const r = v.style.right;
		const t = v.style.top;
		const b = v.style.bottom;

		// positioning
		const horiz = (l != '') ? 'left' : 'right';
		const vert = (t != '') ? 'top' : 'bottom';
		const x = (l != '') ? l : r;
		const y = (t != '') ? t : b;

		const next = (points[i + 1] == undefined) ? points[0] : points[i + 1];

		// sizing
		const diffX = Math.abs(next.getBoundingClientRect().left - v.getBoundingClientRect().left);
		const diffY = Math.abs(next.getBoundingClientRect().top - v.getBoundingClientRect().top);
		const longest = Math.max(diffX, diffY);

		//rotation
		const rotation = (longest == diffY) ? 90 : 0;

		const a = `<div class='line position-absolute' style='width: ${longest}px; ${horiz}: ${x}; ${vert}: ${y};' style='transform: rotate(${rotation}deg);'></div>`;
		console.log(a);
		$('#graphic').append(a);
	});
});
