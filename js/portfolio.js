let offset = 0;
let isMidTransition = false;

function moveLeft()
{
	if (isMidTransition) return;
	isMidTransition = true;
	const active = $('.active');
	const next = active.prev();
	if (next.length == 0)
	{
		isMidTransition = false;
		return;
	}
	active.removeClass('active');
	$(next).addClass('active');
	offset += next.outerWidth();
	$('#polaroid-container').css({'left': `${offset}px`});
	isMidTransition = false;
}

function moveRight()
{
	if (isMidTransition) return;
	isMidTransition = true;
	const active = $('.active');
	const next = active.next();
	if (next.length == 0)
	{
		isMidTransition = false;
		return;
	}
	active.removeClass('active');
	$(next).addClass('active');
	offset -= next.outerWidth();
	$('#polaroid-container').css({'left': `${offset}px`});
	isMidTransition = false;
}

$('#leftarrow').click(() =>
{
	moveLeft();
});

$('#rightarrow').click(() =>
{
	moveRight();
});

$(document).keydown((e) =>
{
	switch(e.key)
	{
		case 'ArrowLeft':
			moveLeft();
			break;
		case 'ArrowRight':
			moveRight();
			break;
		default: return;
	}
	e.preventDefault();
});

$(document).bind('mousewheel DOMMouseScroll', (e) =>
{
	e.originalEvent.deltaY > 0 ? moveRight() : moveLeft();
});

$(document).ready(() =>
{
	offset = $('.active').offset().left;
});

$('.polaroid').hover(() =>
{
	$('.picture:before').css({'opacity': '.5'});
});
