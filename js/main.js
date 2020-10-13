// Ryan Stewart 10/12/2020
const startDelay = .5;
$(window).on('load', () =>
{

	// const startingPoints =
	// [
	// 	'0px 0px',
	// 	'300px 0px',
	// 	'300px 300px',
	// 	'0px 300px'
	// ];
	//
	// // populate with points
	// $.each(startingPoints, (i, v) =>
	// {
	// 	const dimensions = v.split(' ');
	// 	$('#landingcontainer').append(`<div class='point' style='left: ${dimensions[0]}; top: ${dimensions[1]}'></div>`);
	// });
	//
	// // populate points array
	// let points = [];
	// $.each($('#landingcontainer').children(), (i, v) =>
	// {
	// 	if ($(v).hasClass('point'))
	// 	{
	// 		points.push(v);
	// 	}
	// });
	//
	// // populate with lines
	// $.each(points, (i, v) =>
	// {
	// 	let next = points[i + 1];
	// 	if (next == undefined) next = points[0];
	//
	// 	const shape = v.getBoundingClientRect();
	// 	const nextShape = next.getBoundingClientRect();
	//
	// 	const diffX = nextShape.left - shape.left;
	// 	const diffY = nextShape.top - shape.top;
	// 	const hypotLength = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
	//
	// 	const theta = Math.atan(diffX / diffY);
	// 	const thetadeg = theta * (180 / Math.PI);
	// 	let rotation = 0;
	// 	if (diffY >= 0)
	// 		rotation = 90 - thetadeg;
	// 	else
	// 		rotation = 270 - thetadeg;
	//
	// 	$('#landingcontainer').append(`<div class='line' finalwidth='${hypotLength}' style='top: ${shape.top}px; left: ${shape.left}px; transform: rotate(${rotation}deg);'></div>`);
	// });
	//
	// // populate lines array
	// let lines = [];
	// $.each($('#landingcontainer').children(), (i, v) =>
	// {
	// 	if ($(v).hasClass('line'))
	// 	{
	// 		lines.push(v);
	// 	}
	// });
	//
	// // resize lines
	// const transitionTime = parseFloat($('.line').css('transition-duration'));
	// for (let i = 0; i < lines.length; ++i)
	// {
	// 	const v = lines[i];
	//
	// 	$(v).css({'transition-delay': `${startDelay + (transitionTime * i)}s`});
	// 	if ($(v).css('transition-delay') != 0)
	// 		$(v).css({'width': `${$(v).attr('finalwidth')}px`});
	// }

	
});
