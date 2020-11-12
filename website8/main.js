"use strict";
function createScene(canvas, engine) {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 10, 0), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    return scene;
}
window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.querySelector('canvas');
    var engine = new BABYLON.Engine(canvas, true);
    var scene = createScene(canvas, engine);
    engine.runRenderLoop(function () { return scene.render(); });
    window.addEventListener('resize', function () { return engine.resize(); });
});
