const accessKey = (ACCESS_KEY || secrets.ACCESS_KEY || ${{secrets.ACCESS_KEY}});
const url = 'https://api.unsplash.com/users/rynstwrt/photos?client_id=' + accessKey;

async function fetchAsync(url)
{
	const resp = await fetch(url);
	const data = await resp.json();
	return data;
}

async function createElement(url, outerUrl, alt)
{
	const div = await document.createElement('div');
	await div.setAttribute('class', 'image-container');
	const img = await document.createElement('img');
	await img.setAttribute('src', url);
	await div.appendChild(img);

	await div.addEventListener('click', () =>
	{
		window.open(outerUrl, '_blank');
	});

	await document.querySelector('body').appendChild(div);
}

(async() =>
{
	const images = await document.querySelectorAll('img');
	for (let i = 0; i < images.length; ++i)
	{
		images[i].parentNode.addEventListener('click', () =>
		{
			window.open(images[i].src, '_blank');
		});
	}

	const data = await fetchAsync(url);
	for(let i = 0; i < data.length; ++i)
	{
		const photo = data[i];
		await createElement(photo.urls.raw, photo.links.html, photo.name);
	}
})();
