"use strict";
function createScene(canvas, engine) {
    // Scene
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    // Light
    new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
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
    var buildingUnit = 5;
    var rows = 10;
    var cols = 10;
    var margin = 5;
    var currentXPosition = 0;
    var currentZPosition = 0;
    var maxDepth = 0;
    var middlePos = BABYLON.Vector3.Zero();
    // const buildingMat = new BABYLON.StandardMaterial('buildingmat', scene);
    // buildingMat.diffuseColor = BABYLON.Color3.FromHexString('#1e1e1e');
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
            //building.material = buildingMat;
            buildings.push(building);
            if (depth > maxDepth)
                maxDepth = depth;
            if (i === Math.floor(rows / 2) && j === Math.floor(cols / 2))
                middlePos = building.position;
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
    var groundMat = new BABYLON.StandardMaterial('groundmat', scene);
    groundMat.diffuseColor = BABYLON.Color3.FromHexString('#3c3c3c');
    ground.material = groundMat;
    // Camera
    var camera = new BABYLON.ArcRotateCamera('camera', -3 * Math.PI / 4, Math.PI / 4, 300, middlePos, scene);
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
