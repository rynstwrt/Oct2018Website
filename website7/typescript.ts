import * as BABYLON from 'babylonjs';

function createScene(canvas, engine)
{
	// Scene
	const scene = new BABYLON.Scene(engine);

	// Camera
	const camera = new BABYLON.UniversalCamera('camera',
	new BABYLON.Vector3(0, 5, -10), scene);



	return scene;
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

	window.addEventListener('resize', () =>
	{
		engine.resize();
	});
});
