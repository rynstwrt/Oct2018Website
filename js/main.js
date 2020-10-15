const browswertransitionevents = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';

$('#artbutton').click(() =>
{


	$('#content-box').on(browswertransitionevents, (e) =>
	{
		if (e.originalEvent.propertyName != 'opacity') return;
		$('#content-box').css({'visibility': 'visible'});
		$('#art').css({'visibility': 'visible'});
		$('#art').css({'opacity': '1'});
	});

	$('#content-box').css({'opacity': '0'});
});
