const transitionendevents = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
const blueSky = '#489afa';
const greenGrass = '#487c4e';
let finished = false;

$(document).ready(() =>
{
	$('#bar').css({'width': '100%'}).on(transitionendevents, () =>
	{
		if (finished) return;
		$('#bar').attr('style', function(i,s) { return (s||'') + 'top: 55% !important;'}).on(transitionendevents, () =>
		{
			if (finished) return;
			$('#box2').css({'background-color': greenGrass}).on(transitionendevents, () =>
			{
				if (finished) return;
				$('#box1').css({'background-color': blueSky}).on(transitionendevents, () =>
				{
					if (finished) return;
					$('#sun').attr('style', function(i,s) { return (s||'') + 'clip-path: circle(50px at center);'}).on(transitionendevents, () =>
					{
						if (finished) return;
						$('#path').css({'height': '100%'}).on(transitionendevents, () =>
						{
							if (finished) return;
							$('#bar2').css({'height': '100%'}).on(transitionendevents, () =>
							{
								if (finished) return;
								$('#bar2').css({'top': '0'});
								$('#bar2').css({'height': '0'});
								$('#bar').addClass('align-self-end');
								$('#bar').css({'width': '0'});
								$('#sun').attr('style', function(i,s) { return (s||'') + 'clip-path: circle(0px at center);'});
								$('#bar-wrapper').css({'height': '0'});
								finished = true;
							});
						});
					});
				});
			});
		});
	});
});
