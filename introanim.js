const transitionendevents = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
const blueSky = '#489afa';
const greenGrass = '#487c4e';

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
					// fade in cloud
					$('#box1 img').css({'opacity' : '.5'}).on(transitionendevents, () =>
					{
						// fade in sun
						$('#sun').css({'opacity': '1'}).on(transitionendevents, () =>
						{
							// shrink bar
							$('#bar').css({'height' : '0'}).on(transitionendevents, () =>
							{
								// add box shadow to grass
								$("#box2").css({'box-shadow': '0px -10px 10px rgba(0, 0, 0, .1)'}).on(transitionendevents, () =>
								{
									//fade in grass
									$('#overlay').css({'opacity': '.1'}).on(transitionendevents, () =>
									{
										// scroll in path
										$('#path').css({'width': '100%', 'height': '100%'}).on(transitionendevents, () =>
										{
											// scroll in trees
											$('.tree img').css({'transform': 'scaleY(1) scaleX(1)'});
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
