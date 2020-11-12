function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine)
{
	// Scene
	const scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

	// Light
	new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

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
	const buildingUnit = 5;
	const rows = 10;
	const cols = 10;
	const margin = 5;

	let currentXPosition = 0;
	let currentZPosition = 0;
	let maxDepth = 0;
	let middlePos = BABYLON.Vector3.Zero();

	// const buildingMat = new BABYLON.StandardMaterial('buildingmat', scene);
	// buildingMat.diffuseColor = BABYLON.Color3.FromHexString('#1e1e1e');

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

			//building.material = buildingMat;

			buildings.push(building);

			if (depth > maxDepth) maxDepth = depth;

			if (i === Math.floor(rows / 2) && j === Math.floor(cols / 2)) middlePos = building.position;

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

	const groundMat = new BABYLON.StandardMaterial('groundmat', scene);
	groundMat.diffuseColor = BABYLON.Color3.FromHexString('#3c3c3c');
	ground.material = groundMat;

	// Camera
	const camera = new BABYLON.ArcRotateCamera('camera',
	-3 * Math.PI / 4,
	Math.PI / 4,
	300,
	middlePos,
	scene);
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
