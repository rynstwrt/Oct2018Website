let leftValue = 0;

function moveRight()
{
	const active = $('.active');
	const next = active.next();
	if (!next.hasClass('polaroid-wrapper')) return;
	active.removeClass('active');
	next.addClass('active');

	const width = $(next).width();
	leftValue -= width;
	$.each($('#scroller').children(), (i, v) =>
	{
		$(v).css({'left': leftValue + 'px'});
	});
}

function moveLeft()
{
	const active = $('.active');
	const next = active.prev();
	if (!next.hasClass('polaroid-wrapper')) return;
	active.removeClass('active');
	next.addClass('active');

	const width = $(next).width();
	leftValue += width;
	$.each($('#scroller').children(), (i, v) =>
	{
		$(v).css({'left': leftValue + 'px'});
	});
}

$('#leftarrow').on('click', () =>
{
	moveLeft();
});

$('#rightarrow').on('click', () =>
{
	moveRight();
});
