"use strict";
function createScene(canvas, engine) {
    /* Scene */
    var scene = new BABYLON.Scene(engine);
    /* Lights */
    new BABYLON.PointLight('pl', new BABYLON.Vector3(100, 200, 0), scene);
    new BABYLON.HemisphericLight("hemilight1", new BABYLON.Vector3(0, 1, 0), scene);
    //new BABYLON.HemisphericLight("hemilight2", new BABYLON.Vector3(0, -1, 0), scene);
    /* SolidParticleSystem */
    var sps = new BABYLON.SolidParticleSystem('sps', scene, { updatable: false });
    var particle = BABYLON.MeshBuilder.CreateBox('particle', {}, scene);
    var numParticles = 10000;
    var numRows = Math.floor(Math.sqrt(numParticles));
    var particleWidth = 2;
    var camTarget;
    sps.addShape(particle, numParticles, { positionFunction: function (p, i) {
            var row = Math.floor(i / numRows);
            var col = i % numRows;
            var heightFactor = 5;
            var height = Math.sin(i) * heightFactor + heightFactor;
            var x = col * particleWidth;
            var z = row * particleWidth;
            p.position = new BABYLON.Vector3(x, 0, z);
            p.scaling = new BABYLON.Vector3(particleWidth, height, particleWidth);
            var particleColor3 = BABYLON.Color3.FromHexString('#00FF00');
            var particleColor4 = BABYLON.Color4.FromColor3(particleColor3);
            p.color = particleColor4;
            if (row === Math.floor(numRows / 2) && col === Math.floor(numRows / 2)) {
                console.log('yeet');
                camTarget = new BABYLON.Vector3(x, 0, z);
            }
        } });
    sps.buildMesh();
    particle.dispose();
    /* Camera */
    var camera = new BABYLON.ArcRotateCamera('cam', Math.PI / 4, Math.PI / 3, 300, camTarget, scene);
    camera.attachControl(canvas, true);
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
