function createScene(canvas, engine)
{
	/* Scene */
	const scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

	/* Camera */
	const camera = new BABYLON.UniversalCamera('cam', new BABYLON.Vector3(0, 0, -30), scene);
	camera.setTarget(BABYLON.Vector3.Zero());
	camera.attachControl(canvas, true);

	/* Light */
	const light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);

	/* Lines */
	const path = getPoints(100);
	const lines = BABYLON.MeshBuilder.CreateLines('lines',
	{ points: path }, scene);
	lines.color = BABYLON.Color3.Blue();

	return scene;
}

function getPoints(amount)
{
	const points = [];


	const range = Math.floor(amount / 2);

	for (let i = -range; i < range; ++i)
	{
		points.push(new BABYLON.Vector3(i, Math.sin(i), 0));
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
