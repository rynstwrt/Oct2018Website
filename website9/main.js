"use strict";
// diffuse: basic color of object
// groundColor: light in opposite direction color
// specular: highlight color of object
function createScene(canvas, engine, rows, cols) {
    // Scene
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    // Camera
    var camera = new BABYLON.ArcRotateCamera('camera', 0, Math.PI / 2, 300, BABYLON.Vector3.Zero(), scene);
    // Lights
    var light = new BABYLON.PointLight('light', camera.position, scene);
    light.intensity = 1;
    // Return
    return scene;
}
window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.querySelector('canvas');
    var engine = new BABYLON.Engine(canvas, true);
    var scene = createScene(canvas, engine, 10, 10);
    engine.runRenderLoop(function () { return scene.render(); });
    window.addEventListener('resize', function () {
        engine.resize();
    });
});
