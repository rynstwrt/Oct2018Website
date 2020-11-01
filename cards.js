const transitionend = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
const pages = ['Projects', 'Art', 'Profiles'];

const popup = $('#popup');
const pageHeight = $(window).height();
const t = $('#colorblock2 h1');

let index = 0;
$('#arrow').click(() =>
{
	++index;
	const val = pages[index % pages.length];

	t.css({'transform': 'scale(1.05)'});
	$('a').css({'transform': 'scale(1.05)'});

	t.one(transitionend, () =>
	{
		t.text(val);
		if (val === 'Projects')
		{
			$('#artpage').addClass('hidden');
			$('#profilespage').addClass('hidden');
			$('#projectspage').removeClass('hidden');
		}
		else if (val === 'Art')
		{
			$('#projectspage').addClass('hidden');
			$('#profilespage').addClass('hidden');
			$('#artpage').removeClass('hidden');
		}
		else
		{
			$('#artpage').addClass('hidden');
			$('#projectspage').addClass('hidden');
			$('#profilespage').removeClass('hidden');
		}
		$('a').css({'transform': 'scale(1)'});
		t.css({'transform': 'scale(1)'});
	});
});
