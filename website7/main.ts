function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine)
{
	/* Scene */
	const scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

	/* Light */
	const light = new BABYLON.HemisphericLight("hemilight1", new BABYLON.Vector3(-1, 1, 0), scene);
	light.groundColor = BABYLON.Color3.Red();

	/* SolidParticleSystem */
	const sps = new BABYLON.SolidParticleSystem('sps', scene);
	const particle = BABYLON.MeshBuilder.CreateBox('particle', {}, scene);
	const numParticles = Math.pow(100, 2);
	const numRows = Math.floor(Math.sqrt(numParticles));
	const particleWidth = 5;

	let camTarget: BABYLON.Vector3;
	sps.addShape(particle, numParticles, { positionFunction: (p: BABYLON.SolidParticle, i: number) =>
	{
		const row = Math.floor(i / numRows);
		const col = i % numRows;

		const heightFactor = 5;
		const height = Math.sin(i) * heightFactor + heightFactor;

		const x = col * particleWidth;
		const z = row * particleWidth;

		p.position = new BABYLON.Vector3(x, 0, z);
		p.scaling = new BABYLON.Vector3(particleWidth, height, particleWidth);

		const particleColor3 = (i % 2 === 0) ? BABYLON.Color3.FromHexString('#35a23a') : BABYLON.Color3.FromHexString('#236d27');
		const particleColor4 = BABYLON.Color4.FromColor3(particleColor3);
		p.color = particleColor4;

		if (row === Math.floor(numRows / 2) && col === Math.floor(numRows / 2))
			camTarget = new BABYLON.Vector3(x, 0, z);
	}});

	sps.buildMesh();
	particle.dispose();

	/* Camera */
	const camera = new BABYLON.ArcRotateCamera('cam',
	Math.PI / 4, Math.PI / 3, 1000,
	camTarget!, scene);
	camera.attachControl(canvas, true);

	return scene;
}

window.addEventListener('load', () =>
{
	const canvas = document.querySelector('canvas')!;
	const engine = new BABYLON.Engine(canvas, true);
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
