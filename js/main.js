// Ryan Stewart 10/12/2020
const transitionendevents = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
$(window).on('load', () =>
{

	// populate with points
	for (let i = 0; i < 15; ++i)
	{
		const left = Math.random() * 101;
		const top = Math.random() * 101;
		$('#landingcontainer').append(`<div class='point' style='left: ${left}%; top: ${top}%'></div>`);
	}

	// populate points array
	let points = [];
	$.each($('#landingcontainer').children(), (i, v) =>
	{
		if ($(v).hasClass('point'))
		{
			points.push(v);
		}
	});
	points.sort(function(a, b)
	{
		const atop = parseFloat(a.style.left);
		const btop = parseFloat(b.style.left);
		if (atop < btop)
		{
			return -1;
		}

		if (atop > btop)
		{
			return 1;
		}
		return 0;
	});

	// populate with lines
	$.each(points, (i, v) =>
	{
		let next = points[i + 1];
		if (next == undefined) next = points[0];

		const shape = v.getBoundingClientRect();
		const nextShape = next.getBoundingClientRect();

		const diffX = nextShape.left - shape.left;
		const diffY = nextShape.top - shape.top;
		const hypotLength = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

		const theta = Math.atan(diffX / diffY);
		const thetadeg = theta * (180 / Math.PI);
		let rotation = 0;
		if (diffY >= 0)
			rotation = 90 - thetadeg;
		else
			rotation = 270 - thetadeg;

		$('#landingcontainer').append(`<div class='line' finalwidth='${hypotLength}' style='top: ${shape.top}px; left: ${shape.left}px; transform: rotate(${rotation}deg);'></div>`);
	});

	// populate lines array
	let lines = [];
	$.each($('#landingcontainer').children(), (i, v) =>
	{
		if ($(v).hasClass('line'))
		{
			lines.push(v);
		}
	});
	lines.sort(function(a, b)
	{
		const atop = parseFloat(a.style.left);
		const btop = parseFloat(b.style.left);
		if (atop < btop)
		{
			return -1;
		}

		if (atop > btop)
		{
			return 1;
		}
		return 0;
	});

	// resize lines
	const transitionTime = parseFloat($('.line').css('transition-duration'));
	for (let i = 0; i < lines.length; ++i)
	{
		const v = lines[i];
		$(v).css({'width': `${$(v).attr('finalwidth')}px`, 'transition-delay': `${transitionTime * i}s`});
	}
});
