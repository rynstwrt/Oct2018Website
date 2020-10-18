const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const material = new THREE.MeshBasicMaterial({color: 0xffc3b6});

let points = [];
for (let i = 0; i < 1000; ++i)
{
	points.push(getRandomVector3());
}

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);
scene.add(line);

const animationStep = .0005;
function animate()
{
	requestAnimationFrame(animate);

	line.rotation.y -= animationStep;
	line.rotation.x -= animationStep;

	renderer.render(scene, camera);
}
animate();

function getRandomVector3()
{
	const max = 10;
	const min = -10;
	const x = Math.random() * (max - min) + min;
	const y = Math.random() * (max - min) + min;
	const z = Math.random() * (max - min) + min;
	return new THREE.Vector3(x, y, z);
}
