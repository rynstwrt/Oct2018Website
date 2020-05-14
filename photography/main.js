const ACCESS_KEY = ACCESS_KEY;
const REQ_URL = "https://api.unsplash.com/users/rynstwrt/statistics/?client_id=" + ACCESS_KEY;

const http = new XMLHttpRequest();
http.open("GET", REQ_URL, true);
http.send();

http.onreadystatechange = (e) =>
{
	if (http.readyState != 4 || http.status != 200)
		return;

	const data = JSON.parse(http.responseText);
	document.getElementById("views").textContent = data.views.total;
	document.getElementById("downloads").textContent = data.downloads.total;
}
