// Ryan Stewart 10/15/20
const browswertransitionevents = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
const transitionTime = getComputedStyle(document.documentElement).getPropertyValue('--transitionTime');
const bgcolor = getComputedStyle(document.documentElement).getPropertyValue('--bgcolor');
const bgcolor2 = getComputedStyle(document.documentElement).getPropertyValue('--bgcolor2');

function changeToHome(e)
{
    if (e.originalEvent.propertyName != 'max-height') return;
    $('#contact').css({'display': 'none'});
    $('#home').css({'display': 'flex'});
    $('#content-box').css({'max-height': '100%'});
}

function changeToContact(e)
{
    if (e.originalEvent.propertyName != 'max-height') return;
    $('#home').css({'display': 'none'});
    $('#contact').css({'display': 'flex'});
    $('#content-box').css({'max-height': '100%'});
}

$(document).ready(() =>
{
    $('#landing').css({'box-shadow': '-8px 8px 0 0 rgba(0, 0, 0, .35)'});
    $('body').css({'transition': `background-color ${transitionTime.replace(/[^\d.]/g, '') * 2}s`})

    $('#headertext').click(() =>
    {
        if ($('#home').css('display') == 'flex') return;
        $('#content-box').one(browswertransitionevents, changeToHome);
        $('body').css({'background-color': bgcolor});
        $('#content-box').css({'max-height': '0'});
    });

    $('#contact-button').click(() =>
    {
        $('#content-box').one(browswertransitionevents, changeToContact);
        $('body').css({'background-color': bgcolor2});
        $('#content-box').css({'max-height': '0'});
    });
});
