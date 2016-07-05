function DisplayLibrary(container, javaContainer, buildAxes, buildConstraintBox, buildRoom) {

  this.inverted = false;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, container.width() / container.height(), 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  this.scene = scene;
  this.camera = camera;
  this.renderer = renderer;

  renderer.setSize(container.width(), container.height());
  renderer.setClearColor( 0xffffff, 1 );
  container.append(renderer.domElement);
  var controls = new THREE.TrackballControls(camera, javaContainer);

  if(buildAxes) {
    this.buildAxes(40);
  }
  if(buildConstraintBox) {
    this.buildConstraintBox(6, 6);
  }
  if(buildRoom) {
    var room = this.buildRoom(100);
    scene.add(room);
  }

  camera.position.x = 80;
  camera.position.y = 80;
  camera.position.z = 80;
  var quaternion = new THREE.Quaternion();
  quaternion.setFromAxisAngle(new THREE.Vector3(1,0,0), Math.PI/2);
  camera.up.applyQuaternion(quaternion);

  var self = this;

  render();


  function render() {
    self.withinRender();
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);

  }


  
}

DisplayLibrary.prototype.invertedCoordinates = function() {
  var invCoor = new THREE.Object3D();
  invCoor.rotation.x = Math.PI;
  this.invCoor = invCoor;
  this.inverted = true;
  return invCoor;
}

DisplayLibrary.prototype.withinRender = function() {
}

DisplayLibrary.prototype.setWithinRender = function(func) {
  this.withinRender = func;
}

DisplayLibrary.prototype.roundIt = function(val, decimal) {
  return Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
}

DisplayLibrary.prototype.createDesiredObject = function() {

  var geo = new THREE.SphereGeometry(1, 32, 32);
  var mat = new THREE.MeshBasicMaterial({color: 0x000000, })

  //Reset the surface
  if(!(currentObject === null)) {
    var currentObject = this.scene.getObjectByName('currentDesiredObject');
    this.scene.remove(currentObject);
  }

  var functionObject = new THREE.Mesh(geo, mat);
  functionObject.name = 'currentDesiredObject';
  return functionObject;
}

DisplayLibrary.prototype.createGameTarget = function(radius) {

  var geo = new THREE.SphereGeometry(radius, 32, 32);
  var mat = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});

  var functionObject = new THREE.Mesh(geo, mat);
  return functionObject;
}

DisplayLibrary.prototype.createMultipleGameTargets = function(num, minRadius, boundingBox) {
  var gameTargets = [];

  for(var i = 0; i < num; i++) {
    var radius = minRadius + (minRadius/2)*Math.random();
    var positionx = boundingBox*2*(Math.random() - 0.5);
    var positiony = boundingBox*2*(Math.random() - 0.5);
    var positionz = boundingBox*2*(Math.random() - 0.5);
    var gameTarget = this.createGameTarget(radius);
    gameTarget.position.x = positionx;
    gameTarget.position.y = positiony;
    gameTarget.position.z = positionz;
    gameTargets.push(gameTarget);
  }
  this.targets = gameTargets;
  return gameTargets;
}

DisplayLibrary.prototype.disturbGameTargets = function() {
  if(this.targets === undefined) { return; }
  var gameTargets = this.targets;
  for(var i = 0; i < gameTargets.length; i++) {
    var radius = gameTargets[i].geometry.parameters.radius;
    gameTargets[i].position.x += radius*0.05*(Math.random() - 0.5);
    gameTargets[i].position.y += radius*0.05*(Math.random() - 0.5);
    gameTargets[i].position.z += radius*0.05*(Math.random() - 0.5);
  }
}