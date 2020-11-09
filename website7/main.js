function createScene(canvas, engine)
{
	const scene = new BABYLON.Scene(engine);


	const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(-1, -1, 0), scene);
	// light.intensity = 3;

	const colors = ['#ffa372', '#ed6663', '#43658b', '#4e89ae'];
	const boxSize = 3;
	const points = getPoints(20, boxSize);
	for (let i = 0; i < points.length; ++i)
	{
		const point = points[i];

		const box = BABYLON.MeshBuilder.CreateBox('box', { width: boxSize, height: boxSize, depth: boxSize }, scene);
		box.position = point;

		const material = new BABYLON.StandardMaterial(scene);
		material.diffuseColor = BABYLON.Color3.FromHexString(colors[Math.floor(Math.random() * colors.length)]);
		box.material = material;
	}

	const camera = new BABYLON.ArcRotateCamera('camera', 90 * (Math.PI / 180), 90 * (Math.PI / 180), 100, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, false);
	//camera.inputs.clear();

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
