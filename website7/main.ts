function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine)
{
	/* Scene */
	const scene = new BABYLON.Scene(engine);

	/* Camera */
	const camera = new BABYLON.ArcRotateCamera('cam', Math.PI / 4, Math.PI / 3, 300, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, true);

	/* Lights */
	//const pointLight = new BABYLON.PointLight('pl', camera.position, scene);
	const hemiLight =  new BABYLON.HemisphericLight("hemilight", new BABYLON.Vector3(0, 1, -.5), scene);

	/* Ground */
	const groundWidth = 100;
	const groundHeight = groundWidth;
	const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: groundWidth, height: groundHeight }, scene);

	// const groundMat = new BABYLON.StandardMaterial('groundmat', scene);
	// groundMat.diffuseColor = BABYLON.Color3.FromHexString('#52433c');
	// ground.material = groundMat;

	/* SolidParticleSystem */
	const sps = new BABYLON.SolidParticleSystem('sps', scene, {updatable: false});
	const particle = BABYLON.MeshBuilder.CreateBox('particle', {}, scene);
	const numParticles = 100;
	const particleWidth = 10;
	const minParticleHeight = particleWidth / 2;
	const maxParticleHeight = particleWidth * 5;

	sps.addShape(particle, numParticles, { positionFunction: (p: BABYLON.SolidParticle, i: number) =>
	{
		const height = Math.random() * (maxParticleHeight - minParticleHeight) + minParticleHeight;
		p.scaling = new BABYLON.Vector3(particleWidth, height, particleWidth);

		const xMin = -groundWidth / 2 + particleWidth / 2;
		const xMax = groundWidth / 2 - particleWidth / 2;
		const zMin = -groundHeight / 2 + particleWidth / 2;
		const zMax = groundHeight / 2 - particleWidth / 2;

		p.position = new BABYLON.Vector3(
			Math.random() * (xMax - xMin) + xMin,
			height / 2,
			Math.random() * (zMax - zMin) + zMin);

		const particleColor3 = BABYLON.Color3.FromHexString('#ff6b6b');
		const particleColor4 = BABYLON.Color4.FromColor3(particleColor3);
		p.color = particleColor4;
	}});

	sps.buildMesh();
	particle.dispose();

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
