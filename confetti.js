
// let isAnimating = false;
//
// let shapes = [];
// const square = $('<div class="confetti"></div>');
// const triangle = $('<div class="confetti triangle"></div>');
// const circle = $('<div class="confetti circle"></div>');
// shapes.push(square);
// shapes.push(triangle);
// shapes.push(circle);
//
// const numElements = 20;
// const confettiButton = $('#confettibutton');
//
// confettiButton.css({'transition': 'box-shadow 1s, top 1s'});
//
// confettiButton.click(() =>
// {
//
// 	if (isAnimating) return;
//
// 	isAnimating = true;
//
// 	$('.confetti').remove();
// 	const originalBoxShadow = confettiButton.css('box-shadow');
// 	const travelDistance = 4 * (confettiButton.outerHeight() - confettiButton.innerHeight());
// 	confettiButton.css({'box-shadow': 'none'});
// 	confettiButton.css({'top': travelDistance});
//
// 	// left square
// 	for (let i = 0; i < numElements / 2; ++i)
// 	{
// 		const shapeIndex = Math.floor(Math.random() * shapes.length);
// 		const shape = shapes[shapeIndex].clone();
//
// 		const shapeWidth = shape.width();
// 		const pageWidth = $(document).width();
// 		const pageHeight = $(document).height();
//
// 		shape.css({'left': `${(pageWidth / 2 - (shapeWidth / 2))}px`})
// 		shape.css({'top': `100%`});
// 		shape.css({'background-color': 'white'});
//
// 		$('#left').append(shape);
//
// 		shape.css({'transition': `left 1s, top 1s`});
// 	}
//
// 	// right square
// 	for (let i = 0; i < numElements / 2; ++i)
// 	{
// 		const shapeIndex = Math.floor(Math.random() * shapes.length);
// 		const shape = shapes[shapeIndex].clone();
//
// 		const shapeWidth = shape.width();
// 		const pageWidth = $(document).width();
// 		const pageHeight = $(document).height();
//
// 		shape.css({'left': `${(pageWidth / 2 - (shapeWidth / 2))}px`})
// 		shape.css({'top': `0`});
// 		shape.css({'background-color': '#ffb19d'});
//
// 		$('#right').append(shape);
//
// 		shape.css({'transition': `left 1s, top 1s`});
// 	}
//
// 	const confetti = $('.confetti');
// 	for (let i = 0; i < confetti.length; ++i)
// 	{
// 		const shape = $(confetti[i]);
// 		const docWidth = $(document).width();
// 		const docHeight = $(document).height();
// 		const shapeWidth = shape.width();
//
// 		// left
// 		let left;
// 		if (Math.floor(Math.random() * 2) === 0)
// 		{
// 			const min = -docWidth * 2;
// 			const max = -shapeWidth;
// 			left = Math.random() * (max - min) + min;
// 		}
// 		else
// 		{
// 			const min = docWidth;
// 			const max = docWidth * 2;
// 			left = Math.random() * (max - min) + min;
// 		}
//
// 		// top
// 		let top;
// 		if (shape.parent().attr('id') === 'left')
// 		{
// 			const min = -docHeight * 2;
// 			const max = -shapeWidth;
// 			top = Math.random() * (max - min) + min;
// 		}
// 		else
// 		{
// 			const min = docHeight;
// 			const max = docHeight * 2;
// 			top = Math.random() * (max - min) + min;
// 		}
//
// 		shape.css({'left': left});
// 		shape.css({'top': top});
// 	}
//
// 	setTimeout(() =>
// 	{
// 		confettiButton.css({'box-shadow': originalBoxShadow});
// 		confettiButton.css({'top': 0});
// 		setTimeout(() =>
// 		{
// 			isAnimating = false;
// 		}, 1000);
// 	}, 500);
// });
