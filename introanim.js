const transitionendevents = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
const blueSky = '#489afa';
const greenGrass = '#2BA040';
const cloudopacity = .5;
const grassopacity = 1;
const unitwidth = 45;

$(window).on('load', () =>
{
	// first horizontal bar
	$('#bar').css({'width': '100%'}).on(transitionendevents, () =>
	{
		// horizontal bar moves up
		$('#bar').attr('style', function(i,s) { return (s||'') + 'top: 30% !important;'}).on(transitionendevents, () =>
		{
			// bottom box turns green
			$('#box2').css({'background-color': greenGrass}).on(transitionendevents, () =>
			{
				// top box turns blue
				$('#box1').css({'background-color': blueSky}).on(transitionendevents, () =>
				{
					// shrink bar
					$('#bar').css({'opacity' : '0'}).on(transitionendevents, () =>
					{
						//fade in grass
						$('#overlay').css({'opacity': grassopacity}).on(transitionendevents, () =>
						{
							// scroll in path
							$('#path').css({'width': '100%', 'height': '100%'}).on(transitionendevents, () =>
							{
								// scroll in trees
								$('.tree').css({'height': `${unitwidth * 2}px`}).on(transitionendevents, () =>
								{
									// scroll in fence
									$('#fence').css({'height': `${unitwidth}px`}).on(transitionendevents, () =>
									{
										// fade in sun
										$('#sun').css({'opacity': '1'}).on(transitionendevents, () =>
										{
											// scroll in box shadows
											$('#box2').css({'box-shadow': '0px -10px 10px rgba(0, 0, 0, .07)'});
											$('.tree').css({'filter': 'drop-shadow(0 -10px 5px rgba(0, 0, 0, .1))'});
											$('#fence').css({'filter': 'drop-shadow(0 -10px 5px rgba(0, 0, 0, .1))'});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
});