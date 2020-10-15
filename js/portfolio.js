let offset = 0;

function moveLeft()
{
	const active = $('.active');
	const next = active.prev();
	active.removeClass('active');
	$(next).addClass('active');

	offset -= next.outerWidth() * 2;
	$('#polaroid-container').children().first().css({'margin-left': `${offset}px`});
}

function moveRight()
{
	const active = $('.active');
	const next = active.next();
	active.removeClass('active');
	$(next).addClass('active');

	offset += next.outerWidth() * 2;
	$('#polaroid-container').children().first().css({'margin-left': `${offset}px`});
}

$('#leftarrow').click(() =>
{
	moveLeft();
});

$('#rightarrow').click(() =>
{
	moveRight();
});
