"use strict";
// diffuse: basic color of object
// groundColor: light in opposite direction color
// specular: highlight color of object
function createScene(canvas, engine, rows, cols) {
    // Scene
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    scene.collisionsEnabled = true;
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
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
    var buildingMat = new BABYLON.StandardMaterial('buildingmat', scene);
    var buildingTexture = new BABYLON.Texture('assets/building.jpg', scene);
    buildingTexture.uScale = 1;
    buildingTexture.vScale = 1;
    buildingTexture.uAng = Math.PI / 2;
    buildingMat.diffuseTexture = buildingTexture;
    var spacing = 5;
    var margin = 0;
    var currentXPosition = 0;
    var currentZPosition = 0;
    buildingProportions.forEach(function (proportion) {
        var prop = Math.max(proportion.x, proportion.z);
        if (prop * buildingUnit + spacing > margin)
            margin = prop * buildingUnit + spacing;
    });
    for (var i = 0; i < rows; ++i) {
        for (var j = 0; j < cols; ++j) {
            var proportion = buildingProportions[Math.floor(Math.random() * buildingProportions.length)];
            var width = proportion.x * buildingUnit;
            var height = proportion.y * buildingUnit;
            var depth = proportion.z * buildingUnit;
            var building = BABYLON.MeshBuilder.CreateBox('box', { width: width, height: height, depth: depth }, scene);
            building.position.x = currentXPosition;
            building.position.y = height / 2;
            building.position.z = currentZPosition;
            building.checkCollisions = true;
            //building.material = buildingMat;
            buildings.push(building);
            currentXPosition += margin;
        }
        currentXPosition = 0;
        currentZPosition += margin;
    }
    // Ground
    var groundOffset = new BABYLON.Vector3(buildingUnit / 2 + margin / 2, 0, buildingUnit / 2 + margin / 2);
    var groundWidth = rows * margin;
    var groundHeight = cols * margin;
    var ground = BABYLON.MeshBuilder.CreateGround('ground', {
        width: groundWidth,
        height: groundHeight
    }, scene);
    var groundMat = new BABYLON.StandardMaterial('groundmat', scene);
    var groundTexture = new BABYLON.Texture('assets/grass.jpg', scene);
    groundMat.diffuseTexture = groundTexture;
    groundTexture.uScale = groundWidth * .6;
    groundTexture.vScale = groundHeight * .6;
    ground.material = groundMat;
    ground.position = new BABYLON.Vector3(groundWidth / 2, 0, groundHeight / 2).subtract(groundOffset);
    ground.checkCollisions = true;
    // Roads
    var roads = [];
    var roadWidth = buildingUnit / 1.25;
    for (var i = 0; i < rows - 1; ++i) {
        var road = BABYLON.MeshBuilder.CreateGround('road', { width: roadWidth, height: groundHeight }, scene);
        road.position = new BABYLON.Vector3(buildingUnit / 2, .001, groundHeight / 2).subtract(groundOffset);
        road.position = road.position.add(new BABYLON.Vector3(i * margin, 0, 0));
        roads.push(road);
    }
    for (var i = 0; i < rows - 1; ++i) {
        var road = BABYLON.MeshBuilder.CreateGround('road', { width: groundWidth, height: roadWidth }, scene);
        road.position = new BABYLON.Vector3(groundWidth / 2, .0011, buildingUnit / 2).subtract(groundOffset);
        road.position = road.position.add(new BABYLON.Vector3(0, 0, i * margin));
        roads.push(road);
    }
    // Camera
    var camSize = 1.1;
    var camPos = roads[Math.floor(Math.random() * (roads.length - 1))].position.add(new BABYLON.Vector3(0, camSize, 0));
    var camera = new BABYLON.UniversalCamera('camera', camPos, scene);
    camera.speed = .25;
    camera.fov = Math.PI / 3;
    camera.ellipsoid = new BABYLON.Vector3(camSize, camSize, camSize);
    camera.ellipsoidOffset = new BABYLON.Vector3(0, camSize, 0);
    camera.checkCollisions = true;
    camera.applyGravity = true;
    camera.keysUp.push(87); // w
    camera.keysLeft.push(65); // a
    camera.keysDown.push(83); // s
    camera.keysRight.push(68); // d
    camera.attachControl(canvas, true);
    // Lights
    var pl1 = new BABYLON.PointLight('pl1', ground.position.add(new BABYLON.Vector3(-groundWidth / 2, Math.max(groundWidth, groundHeight), -groundHeight / 2)), scene);
    var pl2 = new BABYLON.PointLight('pl2', ground.position.add(new BABYLON.Vector3(groundWidth / 2, Math.max(groundWidth, groundHeight), groundHeight / 2)), scene);
    pl1.intensity = pl2.intensity = .7;
    // Return
    return scene;
}
window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.querySelector('canvas');
    var engine = new BABYLON.Engine(canvas, true);
    var scene = createScene(canvas, engine, 10, 10);
    var lineContainer = document.querySelector('#line-container');
    for (var i = 0; i < 200; ++i) {
        var line = document.createElement('div');
        line.classList.add('line');
        lineContainer.append(line);
    }
    engine.runRenderLoop(function () { return scene.render(); });
    window.addEventListener('resize', function () { return engine.resize(); });
});
