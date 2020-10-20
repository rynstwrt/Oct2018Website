let line;
let animationframe;
let points;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 130);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const material = new THREE.LineBasicMaterial({color: 0x93ffc1});

const animationStep = .0005;
function animate()
{
	animationframe = requestAnimationFrame(animate);

	line.rotation.y -= animationStep;
	line.rotation.x -= animationStep;

	renderer.render(scene, camera);
}

function getRandomVector3()
{
	const max = 11;
	const min = -11;
	const x = Math.random() * (max - min) + min;
	const y = Math.random() * (max - min) + min;
	const z = Math.random() * (max - min) + min;
	return new THREE.Vector3(x, y, z);
}

function getNetPoints()
{
	points = [];
	for (let i = 0; i < 190; ++i)
	{
		points.push(getRandomVector3());
	}
	points.push(points[0]); // close the shape
}

function drawLines()
{
	scene.remove.apply(scene, scene.children);
	const geometry = new THREE.BufferGeometry().setFromPoints(points);
	line = new THREE.Line(geometry, material);
	scene.add(line);
	renderer.render(scene, camera);
}


window.addEventListener('resize', () =>
{
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight, false);
	renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
}, false);


getNetPoints();
drawLines();
animate();
