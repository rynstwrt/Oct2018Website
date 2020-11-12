function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine)
{
	// Scene
	const scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
	scene.collisionsEnabled = true;
	scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

	// Light
	const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
	light.intensity = .7;

	// Buildings
	const buildingProportions = [
		new BABYLON.Vector3(2, 1, 1),
		new BABYLON.Vector3(1, 4, 1),
		new BABYLON.Vector3(1, 3, 1),
		new BABYLON.Vector3(1, 1, 2),
		new BABYLON.Vector3(2, 2, 1),
		new BABYLON.Vector3(1, 2, 2)
	];

	const buildings = [];
	const buildingUnit = 2;
	const rows = 20;
	const cols = 20;
	const margin = 5;

	let currentXPosition = 0;
	let currentZPosition = 0;
	let maxDepth = 0;

	for (let i = 0; i < rows; ++i)
	{
		for (let j = 0; j < cols; ++j)
		{
			const proportion = buildingProportions[Math.floor(Math.random() * buildingProportions.length)];
			const width = proportion.x * buildingUnit;
			const height = proportion.y * buildingUnit;
			const depth = proportion.z * buildingUnit;
			const building = BABYLON.MeshBuilder.CreateBox('box', { width: width, height: height, depth: depth }, scene);

			building.position.x = currentXPosition + width / 2;
			building.position.y = height / 2;
			building.position.z = currentZPosition + depth / 2;
			building.checkCollisions = true;
			buildings.push(building);

			const plPos = building.position.add(new BABYLON.Vector3(0, 0, depth));
			const pl = new BABYLON.PointLight('pointlight', plPos, scene);
			pl.intensity = .1;

			if (depth > maxDepth) maxDepth = depth;
			currentXPosition += width + margin;
		}
		currentXPosition = 0;
		currentZPosition += maxDepth + margin;
	}

	// Ground
	let groundWidth = 0;
	let groundHeight = 0;

	buildings.forEach(building => {
		groundWidth = Math.max(groundWidth, building.position.x);
		groundHeight = Math.max(groundHeight, building.position.z);
	});

	const ground = BABYLON.MeshBuilder.CreateGround('ground', {
		width: groundWidth,
		height: groundHeight
	}, scene);
	ground.position = new BABYLON.Vector3(groundWidth / 2, 0, groundHeight / 2);
	ground.checkCollisions = true;

	// Camera
	const camSize = 1.1;
	const camOffset =  Math.min(groundWidth, groundHeight) / 2 +  camSize;
	const camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(camOffset, camSize, camOffset), scene);
	camera.speed = .25;
	camera.ellipsoid = new BABYLON.Vector3(camSize, camSize, camSize);
	camera.ellipsoidOffset = new BABYLON.Vector3(0, camSize, 0);
	camera.checkCollisions = true;
	camera.applyGravity = true;
	camera.keysUp.push(87); // w
	camera.keysLeft.push(65) // a
	camera.keysDown.push(83); // s
	camera.keysRight.push(68) // d
	camera.attachControl(canvas, true);

	return scene;
}

window.addEventListener('DOMContentLoaded', () =>
{
	const canvas = document.querySelector('canvas');
	const engine = new BABYLON.Engine(canvas, true);
	const scene = createScene(canvas!, engine);

	engine.runRenderLoop(() => scene.render());
	window.addEventListener('resize', () => engine.resize());
});
