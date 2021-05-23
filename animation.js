const canvas = document.getElementById("babylon-canvas");
const engine = new BABYLON.Engine(canvas, true);

function createScene()
{
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    const shape = BABYLON.MeshBuilder.CreatePolyhedron("shape", {type: 3, size: 5}, scene);
    const shapeMat = new BABYLON.StandardMaterial("shapemat");
    shape.material = shapeMat;
    shapeMat.wireframe = true;

    const camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 20, BABYLON.Vector3.Zero());
    // camera.attachControl(canvas, true);

    return scene;
}

const scene = createScene();

const inc = .005;
engine.runRenderLoop(() =>
{
    scene.render();
    const shape = scene.getMeshByName("shape");
    shape.rotation.x += inc;
    shape.rotation.y += inc;
    shape.rotation.z += inc;
});

window.addEventListener("resize", () => { engine.resize(); });