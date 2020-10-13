function moveLeft()
{
    let currActive = $('.active');
    let prev = $(currActive.parent().prev().children()[0]);
    if (!prev.hasClass('polaroid')) return;
    currActive.removeClass('active');
    prev.addClass('active');
    const width = parseFloat(currActive.parent().css('width'));
    const marginLeft = parseFloat(currActive.parent().css('marginLeft'));
    const diffX = (width * 2) + marginLeft * 2;
    const alreadyLeft = parseFloat($('#scrollcontainer').css('marginLeft'));
    $('#scrollcontainer').css({'marginLeft': `${alreadyLeft + diffX}px`});
}

function moveRight()
{
    let currActive = $('.active');
    let nextActive = $(currActive.parent().next().children()[0]);
    if (!nextActive.hasClass('polaroid')) return;
    currActive.removeClass('active');
    nextActive.addClass('active');
    const width = parseFloat(currActive.parent().css('width'));
    const marginLeft = parseFloat(currActive.parent().css('marginLeft'));
    const diffX = (width * 2) + marginLeft * 2;
    const alreadyLeft = parseFloat($('#scrollcontainer').css('marginLeft'));
    $('#scrollcontainer').css({'marginLeft': `${alreadyLeft - diffX}px`});
}

$(document).on('keydown', (e) =>
{
    switch(e.which)
    {
        case 37: //left
            moveLeft();
            break;

        case 39:
            moveRight();
            break;

        default: return;
    }
    e.preventDefault();
});

//$('#landing').css({'box-shadow': '-8px 8px 0 0 rgba(0, 0, 0, .35)'});
$(window).on('load', () =>
{
    $('#scrollcontainer').css({'box-shadow': '-8px 8px 0 0 rgba(0, 0, 0, .35)'});
});
