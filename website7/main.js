"use strict";
function createScene(canvas, engine) {
    /* Scene */
    var scene = new BABYLON.Scene(engine);
    /* Camera */
    var camera = new BABYLON.ArcRotateCamera('cam', Math.PI / 4, Math.PI / 3, 300, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    /* Lights */
    //const pointLight = new BABYLON.PointLight('pl', camera.position, scene);
    var hemiLight = new BABYLON.HemisphericLight("hemilight", new BABYLON.Vector3(0, 1, -.5), scene);
    /* Ground */
    var groundWidth = 100;
    var groundHeight = groundWidth;
    var ground = BABYLON.MeshBuilder.CreateGround('ground', { width: groundWidth, height: groundHeight }, scene);
    // const groundMat = new BABYLON.StandardMaterial('groundmat', scene);
    // groundMat.diffuseColor = BABYLON.Color3.FromHexString('#52433c');
    // ground.material = groundMat;
    /* SolidParticleSystem */
    var sps = new BABYLON.SolidParticleSystem('sps', scene, { updatable: false });
    var particle = BABYLON.MeshBuilder.CreateBox('particle', {}, scene);
    var numParticles = 100;
    var particleWidth = 10;
    var minParticleHeight = particleWidth / 2;
    var maxParticleHeight = particleWidth * 5;
    sps.addShape(particle, numParticles, { positionFunction: function (p, i) {
            var height = Math.random() * (maxParticleHeight - minParticleHeight) + minParticleHeight;
            p.scaling = new BABYLON.Vector3(particleWidth, height, particleWidth);
            var xMin = -groundWidth / 2 + particleWidth / 2;
            var xMax = groundWidth / 2 - particleWidth / 2;
            var zMin = -groundHeight / 2 + particleWidth / 2;
            var zMax = groundHeight / 2 - particleWidth / 2;
            p.position = new BABYLON.Vector3(Math.random() * (xMax - xMin) + xMin, height / 2, Math.random() * (zMax - zMin) + zMin);
            var particleColor3 = BABYLON.Color3.FromHexString('#ff6b6b');
            var particleColor4 = BABYLON.Color4.FromColor3(particleColor3);
            p.color = particleColor4;
        } });
    sps.buildMesh();
    particle.dispose();
    return scene;
}
window.addEventListener('load', function () {
    var canvas = document.querySelector('canvas');
    var engine = new BABYLON.Engine(canvas, true);
    var scene = createScene(canvas, engine);
    engine.runRenderLoop(function () {
        scene.render();
    });
    window.addEventListener('resize', function () {
        engine.resize();
    });
});