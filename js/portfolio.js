let leftValue = 0;
let isMoving = false;

function moveRight()
{
	if (isMoving) return;
	isMoving = true;
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
	isMoving = false;
}

function moveLeft()
{
	if (isMoving) return;
	isMoving = true;
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
	isMoving = false;
}

$('#leftarrow').on('click', () =>
{
	moveLeft();
});

$('#rightarrow').on('click', () =>
{
	moveRight();
});

$(window).on('keydown', (e) =>
{
	switch(e.which)
	{
		case 37:
			moveLeft();
			break;

		case 39:
			moveRight();
			break;

		default: return;
	}
	e.preventDefault();
});

$(window).bind('mousewheel DOMMouseScroll', (e) =>
{
	//scroll up : scroll down
	(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) ? moveLeft() : moveRight();
});
