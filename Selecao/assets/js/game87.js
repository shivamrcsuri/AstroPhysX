import * as THREE from 'https://cdn.skypack.dev/three@0.131';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.131/examples/jsm/controls/OrbitControls.js';

let running = true;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth*3/4, window.innerHeight*3/4);
renderer.setClearColor(0x111111, 1);
document.getElementById("game").appendChild( renderer.domElement );

// Physics constants here
const starMass = 10000000;
const starRadius = 5;
const gConst = 6.67408e-11;
const zeroes = new THREE.Vector3(0, 0, 0);
const time = 16*10e-3

class Star{
	constructor(position){
		const geometry = new THREE.SphereGeometry(starRadius);
		const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
		this.sphere = new THREE.Mesh( geometry, material );
    this.sphere.position.x = position.x;
    this.sphere.position.y = position.y;
		this.sphere.position.z = position.z;
    this.position = position;
    this.radius = starRadius;
    scene.add(this.sphere);
	}
  update(){}
}

class Asteroid
{
  constructor(playerPosition)
  {
		const geometry = new THREE.SphereGeometry(1);
    const material = new THREE.MeshBasicMaterial({ color: 0x964b00});
    this.sphere = new THREE.Mesh(geometry,material);
    this.position = new THREE.Vector3(Math.random()*50-25+playerPosition.x,Math.random()*50-25+playerPosition.y,Math.random()*20-20+playerPosition.z);
    this.sphere.position.x = this.position.x;
    this.sphere.position.y = this.position.y;
    this.sphere.position.z = this.position.z;
    this.radius = 1;
    this.speed = Math.random();
    scene.add(this.sphere);
  }
  update(){
    this.position.z += this.speed;
    this.sphere.position.z = this.position.z;
  }
}

class Planet{
  constructor(position,radius,color){
    const geometry = new THREE.SphereGeometry(radius)
    const material = new THREE.MeshBasicMaterial({color: color});
		this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.position.x = position.x || 0;
    this.sphere.position.y = position.y || 0;
    this.sphere.position.z = position.z || 0;
    scene.add(this.sphere);
    this.mass = 10;
    this.position = position;
    this.radius = radius;
  }
  update(){
    this.accelerationX = (this.sphere.position.x*(-1)*gConst*starMass)/(this.sphere.position.distanceTo(zeroes))**3;
    this.accelerationY = (this.sphere.position.y*(-1)*gConst*starMass)/(this.sphere.position.distanceTo(zeroes))**3;
    this.accelerationZ = (this.sphere.position.z*(-1)*gConst*starMass)/(this.sphere.position.distanceTo(zeroes))**3;
    this.sphere.position.x += 0.5*this.accelerationX*(time**2);
    //console.log(this.sphere.position.x);
    this.sphere.position.y += 0.5*this.accelerationY*(time**2);
    //console.log(this.sphere.position.y);
    this.sphere.position.z += 0.5*this.accelerationZ*(time**2);
    //console.log(this.sphere.position.z);
  }
}

class Rocket{
	constructor(){
    const mass = 1;
		const geometry = new THREE.BoxGeometry(1,1,2);
		const material = new THREE.MeshBasicMaterial({color: 0xfffff0});
		this.cube = new THREE.Mesh(geometry, material);
    scene.add(this.cube);
		this.rotation = new THREE.Vector3(0, 0, 0);
		this.position = new THREE.Vector3(0, 0, 25);
		this.cube.position.z = 5;
    this.acceleration = 0;
		function f(rocket, event)
		{
			if(event.keyCode == 68) {
				rocket.rotation.y -= 0.1;
				//console.log('D was pressed');
			}
			else if(event.keyCode == 83) {
				rocket.rotation.x -= 0.1;
				//console.log('S was pressed');
			}
			else if(event.keyCode == 65) {
				rocket.rotation.y += 0.1;
				//console.log('A was pressed');
			}
			else if(event.keyCode == 87) {
				rocket.rotation.x += 0.1;
				//console.log('W was pressed');
			}
			else if(event.keyCode == 69) {
				rocket.acceleration -= 0.02;
				//console.log('E was pressed');
			}
			else if(event.keyCode == 82) {
				rocket.acceleration += 0.02;
				//console.log('R was pressed');
			}
		};
		document.addEventListener('keydown', f.bind(null,this));
	}
	update()
	{
		this.cube.rotation.x = this.rotation.x;
		this.cube.rotation.y = this.rotation.y;
		this.position.x += this.acceleration * Math.cos(this.rotation.x) * Math.sin(this.rotation.y);
		this.position.y += this.acceleration * -Math.sin(this.rotation.x) * Math.cos(this.rotation.y);
		this.position.z += this.acceleration * Math.cos(this.rotation.x) * Math.cos(this.rotation.y);
    this.cube.position.x = this.position.x;
    this.cube.position.y = this.position.y;
    this.cube.position.z = this.position.z;
    //camera.position.x = this.position.x;
    //camera.position.y = this.position.y + 2;
    //camera.position.z = this.position.z + 10;
	}
	collidesWithAnObstacle(obstacles)
	{
    for(let obstacle of obstacles)
    {
      if(obstacle instanceof Star)
      {
        console.log(this.position.distanceTo(obstacle.position));
        console.log(2 + obstacle.radius);
      }
      if(this.position.distanceTo(obstacle.position) <= 1.25 + obstacle.radius)
      {
        return true;
      }
    }
		return false;
	}
}

let rocket = new Rocket();
let sun = new Star(new THREE.Vector3(0, 0, 0));
let mercury = new Planet(new THREE.Vector3(2, 0, 3),0.5,0x00b0ff);
let venus = new Planet(new THREE.Vector3(4,0,7),3.5,0x00b0ff);
let earth = new Planet(new THREE.Vector3(5, 1, 7.75),1,0x00b0ff);
let mars = new Planet(new THREE.Vector3(0.25, 5, 8.25),0.75,0x00b0ff);
let jupiter = new Planet(new THREE.Vector3(1.5, 0, 10),3,0x00b0ff);
let saturn = new Planet(new THREE.Vector3(8,0,13.75),2.25,0x00b0ff);
let uranus = new Planet(new THREE.Vector3(12.5,6,16.25),2,0x00b0ff);
let neptune = new Planet(new THREE.Vector3(23.5,0,24),1.5,0x00b0ff);

let obstacles = [sun, mercury, venus, earth, mars, jupiter, saturn];
let asteroids = [];

const sunLight = new THREE.PointLight(0xff0000, 10, 100);
sunLight.position.set(5, 5, 5);
scene.add(sunLight);

const controls = new OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window );
controls.screenSpacePanning = false;
controls.enableZoom = true;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;

setInterval(function(){
  let asteroid = new Asteroid(rocket.position);
  asteroids.push(asteroid);
  setTimeout(()=>{asteroid.remove();asteroids.shift();},10000);
},500);

function animate() {
  if(running)
  {
    requestAnimationFrame( animate );
    controls.target.x=rocket.position.x;
    controls.target.y=rocket.position.y;
    controls.target.z=rocket.position.z;
    controls.update();
	  rocket.update();
    sun.update();
    mercury.update();
    venus.update();
    earth.update();
    mars.update();
    jupiter.update();
    saturn.update();
    uranus.update();
    neptune.update();
    if(rocket.collidesWithAnObstacle(obstacles))
	  {
      window.alert("Getting to close to planets is not a good idea. You crashed!");
		  location.reload();
      running = false;
      animate = function(){}
  	}
    for(let asteroid of asteroids)
    {
      asteroid.update();
    }
    if(rocket.collidesWithAnObstacle(asteroids))
	  {
      window.alert("You crashed into an asteroid!");
		  location.reload();
      running = false;
      animate = function(){}
	  }
    renderer.render(scene,camera);
    }
}
animate();
