function createScene(canvas, engine)
{
	/* Scene */
	const scene = new BABYLON.Scene(engine);
	//scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

	/* Camera */
	const camera = new BABYLON.UniversalCamera('cam', new BABYLON.Vector3(0, 7, -15), scene);
	camera.setTarget(BABYLON.Vector3.Zero());
	camera.attachControl(canvas, true);
	// window.requestAnimationFrame(() =>
	// {
	// 	moveCamera(camera);
	// });

	/* Light */
	const light = new BABYLON.PointLight('pl', camera.position, scene);


	const p = getPositions(10);
	const boxes = [];
	p.forEach((pos, i) => {
		const box = new BABYLON.MeshBuilder.CreateBox('box' + i,
		{width: .1, height: 1, depth: .1}, scene);
		box.position = pos;

		const anim = new BABYLON.Animation('anim', 'rotate.x', 30,
		BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

		const keys = [];
		keys.push({
			frame: 0,
			value: 0
		});

		keys.push({
			frame: 100,
			value: Math.PI * 2
		});

		anim.setKeys(keys);

		box.animations = [anim];
		boxes.push(box);

		setTimeout(() =>
		{
			console.log(box);
			scene.beginAnimation(box, 0, 100, true);
		}, i * 100);
	});



	// //ground
	// const ground = BABYLON.MeshBuilder.CreateGround('ground',
	// {width: 20, height: 20}, scene);
	// ground.position.y = -5;
	//
	// const groundMat = new BABYLON.StandardMaterial('groundmat', scene);
	// groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
	// ground.material = groundMat;
	//
	// // Taurus
	// const tk = BABYLON.MeshBuilder.CreateTorusKnot('tk',
	// {
	// 	radialSegments: 100,
	// 	tubularSegments: 100,
	// 	p: 4
	// }, scene);
	//
	// const tkMat = new BABYLON.StandardMaterial('tkmat', scene);
	// tkMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
	// tk.material = tkMat;
	//
	// // shadows
	// const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
	// shadowGenerator.addShadowCaster(tk);
	// ground.receiveShadows = true;



	return scene;
}

function getPositions(rows)
{

	const p = [];
	const margin = .5;
	const max = 10;
	const spacing = 10 / rows;

	for (let i = 0; i < rows; ++i)
	{
		for (let j = 0; j < rows; ++j)
		{
			p.push(new BABYLON.Vector3(i * spacing + (i * margin), j * spacing + (j * margin), 0));
		}
	}

	return p;
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
