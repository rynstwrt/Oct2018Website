function createScene(canvas: HTMLCanvasElement, engine: BABYLON.Engine)
{
	const scene = new BABYLON.Scene(engine);

	const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 10, 0), scene);
	camera.setTarget(BABYLON.Vector3.Zero());
	camera.attachControl(canvas, true);

	new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

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
