function createScene(canvas, engine)
{
	const scene = new BABYLON.Scene(engine);
	const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(-10, 10, 30), scene);
	camera.setTarget(BABYLON.Vector3.Zero());
	camera.attachControl(canvas, false);
	//camera.inputs.clear();

	const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(-10, 10, 30), scene);

	const boxSize = 3;
	const points = getPoints(50, boxSize);
	for (let i = 0; i < points.length; ++i)
	{
		const point = points[i];

		const box = BABYLON.MeshBuilder.CreateBox('box', { width: boxSize, height: boxSize, depth: boxSize }, scene);
		box.position = point;

		// const material = new BABYLON.StandardMaterial(scene);
		// material.alpha = 1;
		// material.diffuseColor = new BABYLON.Color3(1, .2, .7);
		box.material = material;
	}

	return scene;
}

function getPoints(amount, cubeSize)
{
	const points = [];
	const margin = 0;

	for (let i = -amount / 2; i < amount / 2; ++i)
	{
		for (let j = -amount / 2; j < amount / 2; ++j)
		{
			const z = Math.random() * cubeSize;
			points.push(new BABYLON.Vector3(i * (cubeSize + margin), j * (cubeSize + margin), z));
		}
	}

	return points;
}

window.addEventListener('load', () =>
{
	const canvas = document.querySelector('canvas');
	const engine = new BABYLON.Engine(canvas, true);
	const scene = createScene(canvas, engine);

	engine.runRenderLoop(() =>
	{
		scene.render();
	});
});

window.addEventListener('resize', () =>
{
	engine.resize();
});
