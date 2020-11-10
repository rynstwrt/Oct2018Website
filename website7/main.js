function createScene(canvas, engine)
{
	/* Scene */
	const scene = new BABYLON.Scene(engine);
	//scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

	/* Camera */
	const camera = new BABYLON.UniversalCamera('cam', new BABYLON.Vector3(0, 7, -15), scene);
	camera.setTarget(BABYLON.Vector3.Zero());
	camera.attachControl(canvas, true);
	window.requestAnimationFrame(() =>
	{
		moveCamera(camera);
	});

	/* Light */
	const light = new BABYLON.PointLight('pl', new BABYLON.Vector3(0, 10, 0), scene);

	//ground
	const ground = BABYLON.MeshBuilder.CreateGround('ground',
	{width: 20, height: 20}, scene);
	ground.position.y = -5;

	const groundMat = new BABYLON.StandardMaterial('groundmat', scene);
	groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
	ground.material = groundMat;

	// Taurus
	const tk = BABYLON.MeshBuilder.CreateTorusKnot('tk',
	{
		radialSegments: 100,
		tubularSegments: 100,
		p: 4
	}, scene);

	const tkMat = new BABYLON.StandardMaterial('tkmat', scene);
	tkMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
	tk.material = tkMat;

	// shadows
	const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
	shadowGenerator.addShadowCaster(tk);
	ground.receiveShadows = true;

	return scene;
}

const step = .1;
function moveCamera(camera)
{
	if (w)
	{
		camera.position = camera.getFrontPosition(step);
	}
	else if (s)
	{
		camera.position = camera.getFrontPosition(-step);
	}

	if (a)
	{
		camera.position.x = camera.getFrontPosition(step);
	}
	else if (d)
	{

	}

	window.requestAnimationFrame(() =>
	{
		moveCamera(camera);
	});
}

let w = false;
let a = false;
let s = false;
let d = false;
window.addEventListener('keydown', e =>
{
	//87 65 83 68
	switch (e.which)
	{
		case 87:
			w = true;
			break;
		case 65:
			a = true;
			break;
		case 83:
			s = true;
			break;
		case 68:
			d = true;
			break;
	}
});

window.addEventListener('keyup', e =>
{
	switch (e.which)
	{
		case 87:
			w = false;
			break;
		case 65:
			a = false;
			break;
		case 83:
			s = false;
			break;
		case 68:
			d = false;
			break;
	}
});

window.addEventListener('load', () =>
{
	const canvas = document.querySelector('canvas');
	const engine = new BABYLON.Engine(canvas, false);
	const scene = createScene(canvas, engine);

	engine.runRenderLoop(() =>
	{
		scene.render();
	});

	window.addEventListener('resize', () =>
	{
		engine.resize();
	});
});
