// diffuse: basic color of object
// groundColor: light in opposite direction color
// specular: highlight color of object
function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine, rows: number, cols: number)
{
	// Scene
	const scene = new BABYLON.Scene(engine);
	scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

	// Camera
	const camera = new BABYLON.ArcRotateCamera('camera', 0, Math.PI / 2, 300, BABYLON.Vector3.Zero(), scene);

	// Lights
	const light = new BABYLON.PointLight('light', camera.position, scene);
	light.intensity = 1;

	// Return
	return scene;
}

window.addEventListener('DOMContentLoaded', () =>
{
	const canvas = document.querySelector('canvas');
	const engine = new BABYLON.Engine(canvas, true);
	const scene = createScene(canvas!, engine, 10, 10);

	engine.runRenderLoop(() => scene.render());
	window.addEventListener('resize', () => {
		engine.resize();
	});
});
