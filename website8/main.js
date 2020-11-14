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
    buildingMat.alpha = .9;
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
            building.material = buildingMat;
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
    groundMat.diffuseColor = BABYLON.Color3.Black();
    ground.material = groundMat;
    ground.position = new BABYLON.Vector3(groundWidth / 2, 0, groundHeight / 2).subtract(groundOffset);
    ground.checkCollisions = true;
    // Windows
    var windowMat = new BABYLON.StandardMaterial('buildingmat', scene);
    windowMat.diffuseColor = BABYLON.Color3.Black();
    var windowWidth = buildingUnit / 4;
    var windowHeight = buildingUnit / 2;
    var windowDepth = buildingUnit / 100;
    var windowMargin = buildingUnit / 50;
    var wInc = windowWidth + windowMargin * 2;
    var hInc = windowHeight + windowMargin * 2;
    buildings.forEach(function (building) {
        // const bWidth = building.scaling.x * buildingUnit;
        // const bHeight = building.scaling.y * buildingUnit;
        // const bDepth = building.scaling.z * buildingUnit;
        var vw = building.getBoundingInfo().boundingBox.vectorsWorld;
        var numWindowsHoriz, numWindowsVert;
        // numWindowsHoriz = bDepth * 2 / wInc;
        // numWindowsVert = bHeight * 2 / hInc;
        // for (let i = 0; i < numWindowsHoriz; ++i)
        // {
        // 	for (let j = 0; j < numWindowsVert; ++j)
        // 	{
        // 		const w = BABYLON.MeshBuilder.CreateBox('window', {}, scene);
        // 		w.material = windowMat;
        // 		w.scaling = new BABYLON.Vector3(windowDepth, windowHeight, windowWidth);
        // 		w.position = new BABYLON.Vector3(building.position.x, building.position.y + (bHeight / 2), building.position.z);
        // 		//w.position = startPos.add(new BABYLON.Vector3(0, -j * hInc, i * wInc));
        // 	}
        // }
    });
    // Roads
    var roads = [];
    var roadWidth = buildingUnit / 1.25;
    var roadMat = new BABYLON.StandardMaterial('roadmat', scene);
    var roadAnimation = new BABYLON.Animation('roadanimation', 'material.diffuseColor', 15, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    var numKeys = 8;
    var frames = 120;
    keys.push({
        frame: (frames / numKeys) * keys.length,
        value: BABYLON.Color3.FromHexString('#FF0000')
    });
    keys.push({
        frame: (frames / numKeys) * keys.length,
        value: BABYLON.Color3.FromHexString('#FFA500')
    });
    keys.push({
        frame: (frames / numKeys) * keys.length,
        value: BABYLON.Color3.FromHexString('#FFFF00')
    });
    keys.push({
        frame: (frames / numKeys) * keys.length,
        value: BABYLON.Color3.FromHexString('#00FF00')
    });
    keys.push({
        frame: (frames / numKeys) * keys.length,
        value: BABYLON.Color3.FromHexString('#0000FF')
    });
    keys.push({
        frame: (frames / numKeys) * keys.length,
        value: BABYLON.Color3.FromHexString('#4B0082')
    });
    keys.push({
        frame: (frames / numKeys) * keys.length,
        value: BABYLON.Color3.FromHexString('#FF0000')
    });
    roadAnimation.setKeys(keys);
    for (var i = 0; i < rows; ++i) {
        var road = BABYLON.MeshBuilder.CreateGround('road', { width: roadWidth, height: groundHeight }, scene);
        road.position = new BABYLON.Vector3(buildingUnit / 2, .1, groundHeight / 2).subtract(groundOffset);
        road.position = road.position.add(new BABYLON.Vector3(i * margin, 0, 0));
        road.material = roadMat;
        road.animations.push(roadAnimation);
        scene.beginAnimation(road, 0, frames, true);
        roads.push(road);
    }
    for (var i = 0; i < rows; ++i) {
        var road = BABYLON.MeshBuilder.CreateGround('road', { width: groundWidth, height: roadWidth }, scene);
        road.position = new BABYLON.Vector3(groundWidth / 2, .11, buildingUnit / 2).subtract(groundOffset);
        road.position = road.position.add(new BABYLON.Vector3(0, 0, i * margin));
        road.material = roadMat;
        road.animations.push(roadAnimation);
        scene.beginAnimation(road, 0, 210, false);
        roads.push(road);
    }
    // Camera
    var camera;
    var debugCam = true;
    if (debugCam) {
        camera = new BABYLON.ArcRotateCamera('camera', Math.PI / 4, Math.PI / 4, 150, ground.position, scene);
        //camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 400, ground.position, scene);
        camera.attachControl(canvas, false);
    }
    else {
        var camSize = 1.1;
        var camPos = roads[Math.floor(Math.random() * (roads.length - 1))].position.add(new BABYLON.Vector3(0, camSize, 0));
        camera = new BABYLON.UniversalCamera('camera', camPos, scene);
        camera.speed = .15;
        camera.fov = Math.PI / 3;
        camera.ellipsoid = new BABYLON.Vector3(camSize, camSize, camSize);
        camera.ellipsoidOffset = new BABYLON.Vector3(0, camSize, 0);
        camera.checkCollisions = true;
        camera.applyGravity = true;
        camera.keysUp.push(87); // w
        camera.keysLeft.push(65); // a
        camera.keysDown.push(83); // s
        camera.keysRight.push(68); // d
        camera.attachControl(canvas, false);
    }
    // Lights
    var pl1 = new BABYLON.PointLight('pl1', ground.position.add(new BABYLON.Vector3(-groundWidth / 2, Math.max(groundWidth, groundHeight), -groundHeight / 2)), scene);
    var pl2 = new BABYLON.PointLight('pl2', ground.position.add(new BABYLON.Vector3(groundWidth / 2, Math.max(groundWidth, groundHeight), groundHeight / 2)), scene);
    pl1.intensity = pl2.intensity = .7;
    // Return
    return scene;
}
function createBackground(container, shapeSize, margin) {
    var rows = Math.ceil(document.documentElement.clientWidth / shapeSize);
    var cols = Math.ceil(document.documentElement.clientHeight / shapeSize);
    for (var i = 0; i < rows; ++i) {
        for (var j = 0; j < cols; ++j) {
            var shape = document.createElement('div');
            shape.classList.add('shape');
            var x = (i * shapeSize) + (margin * 2 * (i + 1));
            var y = (j * shapeSize) + (margin * 2 * (j + 1));
            shape.style.left = x + "px";
            shape.style.top = y + "px";
            container.append(shape);
        }
    }
}
window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.querySelector('canvas');
    var engine = new BABYLON.Engine(canvas, true);
    var scene = createScene(canvas, engine, 10, 10);
    var shapeContainer = document.querySelector('#bg-container');
    var shapeSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--shape-size'));
    var margin = 2;
    createBackground(shapeContainer, shapeSize, margin);
    engine.runRenderLoop(function () { return scene.render(); });
    window.addEventListener('resize', function () {
        engine.resize();
        while (shapeContainer.firstChild)
            shapeContainer.firstChild.remove();
        createBackground(shapeContainer, shapeSize, margin);
    });
});
