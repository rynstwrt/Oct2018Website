function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine)
{
	/* Scene */
	const scene = new BABYLON.Scene(engine);

	/* Lights */
	new BABYLON.PointLight('pl', new BABYLON.Vector3(100, 200, 0), scene);
	new BABYLON.HemisphericLight("hemilight1", new BABYLON.Vector3(0, 1, 0), scene);
	//new BABYLON.HemisphericLight("hemilight2", new BABYLON.Vector3(0, -1, 0), scene);

	/* SolidParticleSystem */
	const sps = new BABYLON.SolidParticleSystem('sps', scene, {updatable: false});
	const particle = BABYLON.MeshBuilder.CreateBox('particle', {}, scene);
	const numParticles = 1000;
	const rowCount = Math.floor(Math.sqrt(numParticles));
	const particleWidth = 2;

	const particles = [];
	sps.addShape(particle, numParticles, { positionFunction: (p: BABYLON.SolidParticle, i: number) =>
	{
		const row = Math.floor(i / rowCount);
		const col = i % rowCount;
		const height = Math.sin(i) * 25;

		const x = col * particleWidth;
		const z = row * particleWidth
		p.position = new BABYLON.Vector3(x, 0, z);

		p.scaling = new BABYLON.Vector3(particleWidth, height, particleWidth);

		const particleColor3 = BABYLON.Color3.FromHexString('#ff6b6b');
		const particleColor4 = BABYLON.Color4.FromColor3(particleColor3);
		p.color = particleColor4;

		particles.push(p);
	}});

	sps.buildMesh();
	particle.dispose();

	const camTarget = particles[Math.floor((particles.length - 1) / 2)].position;

	/* Camera */
	const camera = new BABYLON.ArcRotateCamera('cam',
	Math.PI / 4, Math.PI / 3, 300,
	camTarget, scene);
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
