// diffuse: basic color of object
// groundColor: light in opposite direction color
// specular: highlight color of object
function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine)
{
	// Scene
	const scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

	const box = BABYLON.MeshBuilder.CreateBox('box', { size: 10 }, scene);
	box.position = BABYLON.Vector3.Zero();

	// Light
	const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

	// Camera
	const camera = new BABYLON.ArcRotateCamera('camera', 0, Math.PI / 2, 300, BABYLON.Vector3.Zero(), scene);
	camera.attachControl(canvas, false);

	const cameraAnim = new BABYLON.Animation('cameraanim', 'alpha', 60,
	BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
	const keys = [];
	keys.push({
		frame: 0,
		value: 0
	});
	keys.push({
		frame: 120,
		value: Math.PI / 2
	});
	cameraAnim.setKeys(keys);
	camera.animations.push(cameraAnim);
	scene.beginAnimation(camera, 0, 120, true);

	// Return
	return scene;
}

window.addEventListener('DOMContentLoaded', () =>
{
	const canvas = document.querySelector('canvas');
	const engine = new BABYLON.Engine(canvas, true);
	const scene = createScene(canvas!, engine);

	engine.runRenderLoop(() => scene.render());
	window.addEventListener('resize', () => {
		engine.resize();
	});
});
