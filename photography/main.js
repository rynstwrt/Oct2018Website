// TODO: get array from Flickr API.
const arrayOfImages = ["https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg"];
const section = document.body.querySelector("section");


//will actually pass a flickr url
arrayOfImages.forEach(img =>
{
	const nDiv = document.createElement("div");
	nDiv.className = "picture-wrapper";

	// get image url from flick url;
	const url = img;
	nDiv.style.background = "url('" + url + "') center center / cover";
	section.appendChild(nDiv);

	nDiv.addEventListener("click", () =>
	{
		window.open(img, "_blank");
	});
});
