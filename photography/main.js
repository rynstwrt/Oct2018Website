// populate section with divs whos bg images are from flickr.
// <div class="picture-wrapper" style="background: url('')"></div>


// TODO: get array from Flickr API.
const arrayOfImages = ["https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg", "https://live.staticflickr.com/65535/49870152143_c0e1935aa3_k.jpg"];
const section = document.body.querySelector("section");


arrayOfImages.forEach(img =>
{
	const nDiv = document.createElement("div");
	nDiv.className = "picture-wrapper";
	nDiv.style.background = "url('" + img + "') center center / cover";
	section.appendChild(nDiv);

	nDiv.addEventListener("click", () =>
	{
		window.open(img, "_blank");
	});
});
