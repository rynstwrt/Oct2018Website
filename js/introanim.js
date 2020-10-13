const blueSky = getComputedStyle(document.documentElement).getPropertyValue('--skycolor');
const greenGrass = getComputedStyle(document.documentElement).getPropertyValue('--grasscolor');

$(window).on('load', () =>
{
	$('#introanimation').css({'display': 'block'});
	// first horizontal bar
	$('#bar').css({'width': '100%'}).on(transitionendevents, () =>
	{
		// horizontal bar moves up
		$('#bar').attr('style', function(i,s) { return (s||'') + `top: ${$('#box1').css('height')} !important;`}).on(transitionendevents, () =>
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
						$('#overlay').css({'opacity': '1'}).on(transitionendevents, () =>
						{
							// scroll in path
							$('#path').css({'width': '100%', 'height': '100%'}).on(transitionendevents, () =>
							{
								// scroll in trees
								$('.tree').css({'height': `${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--unitwidth')) * 2}px`}).on(transitionendevents, () =>
								{
									// scroll in fence
									$('#fence').css({'height': `${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--unitwidth'))}px`}).on(transitionendevents, () =>
									{
										// fade in sun
										$('#sun').css({'opacity': '1'}).on(transitionendevents, () =>
										{
											// scroll in box shadows
											$('#box2').css({'box-shadow': '0px -10px 10px rgba(0, 0, 0, .07)'});
											$('.tree').css({'filter': 'drop-shadow(0 -10px 5px rgba(0, 0, 0, .1))'});
											$('#fence').css({'filter': 'drop-shadow(0 -10px 5px rgba(0, 0, 0, .1))'}).on(transitionendevents, () =>
											{
												// circle take over screen
												setTimeout(() =>
												{
													$('#circle').attr('style', function(i,s) { return (s||'') + `clip-path: circle(100vmax) !important;`}).on(transitionendevents, () =>
													{
														$('#introanimation').css({'display': 'none'});
														setTimeout(() =>
														{
															$('#circle').css({'clip-path': 'circle(0vmin)'});
														}, 500);
													});
												}, 500);
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
});
