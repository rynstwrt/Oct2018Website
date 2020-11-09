let container;
let width;
let height;
let camera;

function init()
{
	container = document.querySelector('#content-box');
	width = container.offsetWidth;
	height = container.offsetHeight;

	const scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
	const renderer = new THREE.WebGLRenderer( { alpha: true } );

	const points = getPoints(50, 10);
	const material = new THREE.LineBasicMaterial( { color: 0xff7866 } );

	for (let i = 0; i < points.length - 1; ++i)
	{
		const thisAndNext = [points[i], points[i + 1]];
		const geo = new THREE.BufferGeometry().setFromPoints(thisAndNext);
		const line = new THREE.Line(geo, material);
		scene.add(line);
	}

	const thisAndNext = [points[points.length - 1], points[0]];
	const geo = new THREE.BufferGeometry().setFromPoints(thisAndNext);
	const line = new THREE.Line(geo, material);
	scene.add(line);

	camera.position.z = 25;
	camera.position.x = 0;
	camera.position.y = 0;

	camera.lookAt(new THREE.Vector3(0, 0, 0));

	renderer.setSize(width, height);
	container.appendChild(renderer.domElement);
	renderer.render(scene, camera);

	window.requestAnimationFrame(() =>
	{
		update(renderer, scene);
	});
}

function getPoints(amount, range)
{
	const points = [];

	for (let i = 0; i < amount; ++i)
	{
		const min = -range;
		const max = range;
		const x = Math.random() * (max - min) + min;
		const y = Math.random() * (max - min) + min;
		const z = Math.random() * (max - min) + min;
		points.push(new THREE.Vector3(x, y, z));
	}

	return points;
}

const radius = 35;
let angle = 0;
function update(renderer, scene)
{
	camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
	camera.position.x = radius * Math.sin(angle);
	camera.position.z = radius * Math.cos(angle);
	angle += .001;

	camera.lookAt(scene.position);

	renderer.setSize(width, height);
	renderer.render(scene, camera);

	window.requestAnimationFrame(() =>
	{
		update(renderer, scene, camera);
	});
}

window.addEventListener('load', () =>
{
	init();
});

window.addEventListener('resize', () =>
{
	width = container.offsetWidth;
	height = container.offsetHeight;
});
