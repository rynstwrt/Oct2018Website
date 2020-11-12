"use strict";
function createScene(canvas, engine) {
    // Scene
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    scene.collisionsEnabled = true;
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    // Light
    var light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = .7;
    // Buildings
    var buildingProportions = [
        new BABYLON.Vector3(2, 1, 1),
        new BABYLON.Vector3(1, 4, 1),
        new BABYLON.Vector3(1, 3, 1),
        new BABYLON.Vector3(1, 1, 2),
        new BABYLON.Vector3(2, 2, 1),
        new BABYLON.Vector3(1, 2, 2)
    ];
    var buildings = [];
    var buildingUnit = 2;
    var rows = 20;
    var cols = 20;
    var margin = 5;
    var currentXPosition = 0;
    var currentZPosition = 0;
    var maxDepth = 0;
    for (var i = 0; i < rows; ++i) {
        for (var j = 0; j < cols; ++j) {
            var proportion = buildingProportions[Math.floor(Math.random() * buildingProportions.length)];
            var width = proportion.x * buildingUnit;
            var height = proportion.y * buildingUnit;
            var depth = proportion.z * buildingUnit;
            var building = BABYLON.MeshBuilder.CreateBox('box', { width: width, height: height, depth: depth }, scene);
            building.position.x = currentXPosition + width / 2;
            building.position.y = height / 2;
            building.position.z = currentZPosition + depth / 2;
            building.checkCollisions = true;
            buildings.push(building);
            var plPos = building.position.add(new BABYLON.Vector3(0, 0, depth));
            var pl = new BABYLON.PointLight('pointlight', plPos, scene);
            pl.intensity = .1;
            if (depth > maxDepth)
                maxDepth = depth;
            currentXPosition += width + margin;
        }
        currentXPosition = 0;
        currentZPosition += maxDepth + margin;
    }
    // Ground
    var groundWidth = 0;
    var groundHeight = 0;
    buildings.forEach(function (building) {
        groundWidth = Math.max(groundWidth, building.position.x);
        groundHeight = Math.max(groundHeight, building.position.z);
    });
    var ground = BABYLON.MeshBuilder.CreateGround('ground', {
        width: groundWidth,
        height: groundHeight
    }, scene);
    ground.position = new BABYLON.Vector3(groundWidth / 2, 0, groundHeight / 2);
    ground.checkCollisions = true;
    // Camera
    var camSize = 1.1;
    var camOffset = Math.min(groundWidth, groundHeight) / 2 + camSize;
    var camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(camOffset, camSize, camOffset), scene);
    camera.speed = .25;
    camera.ellipsoid = new BABYLON.Vector3(camSize, camSize, camSize);
    camera.ellipsoidOffset = new BABYLON.Vector3(0, camSize, 0);
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.keysUp.push(87); // w
    camera.keysLeft.push(65); // a
    camera.keysDown.push(83); // s
    camera.keysRight.push(68); // d
    camera.attachControl(canvas, true);
    return scene;
}
window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.querySelector('canvas');
    var engine = new BABYLON.Engine(canvas, true);
    var scene = createScene(canvas, engine);
    engine.runRenderLoop(function () { return scene.render(); });
    window.addEventListener('resize', function () { return engine.resize(); });
});
