import * as THREE from './libs/three/three.module.js';
import { GLTFLoader } from './libs/three/jsm/GLTFLoader.js';
import { FBXLoader } from './libs/three/jsm/FBXLoader.js';
import { RGBELoader } from './libs/three/jsm/RGBELoader.js';
import { OrbitControls } from './libs/three/jsm/OrbitControls.js';
import { LoadingBar } from './libs/LoadingBar.js';
import { GUI } from './libs/dat.gui.module.js'

	class App{
        constructor(){
            const container = document.createElement( 'div' );
            document.body.appendChild( container );
            
            this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
            this.camera.position.set( 200, 100, 0 );
            
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(  0xcccccc  );
            this.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
            
            // const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
            // this.scene.add(ambient);
            
            // const light = new THREE.DirectionalLight();
            // light.position.set( 0.2, 1, 1);
            // this.scene.add(light);
            const dirLight1 = new THREE.DirectionalLight( 0xffffff );
            dirLight1.position.set( 1, 1, 1 );
            this.scene.add( dirLight1 );

            const dirLight2 = new THREE.DirectionalLight( 0x002288 );
            dirLight2.position.set( - 1, - 1, - 1 );
            this.scene.add( dirLight2 );

            const ambientLight = new THREE.AmbientLight( 0x222222 );
            this.scene.add( ambientLight );
            
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true } );
            this.renderer.setPixelRatio( window.devicePixelRatio );
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            container.appendChild( this.renderer.domElement );
            
            const geometry = new THREE.BoxBufferGeometry();
            geometry.translate( 0, 0.5, 0 );
            const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
            for ( let i = 0; i < 50; i ++ ) {

                this.mesh = new THREE.Mesh( geometry, material );
                this.mesh.position.x = Math.random() * 1600 - 800;
                this.mesh.position.y = 0;
                this.mesh.position.z = i*5;
                this.mesh.scale.x = 40;
                this.mesh.scale.y = 5;
                this.mesh.scale.z = 40;
                this.mesh.updateMatrix();
                this.mesh.matrixAutoUpdate = false;
                this.scene.add( this.mesh );

            }
            

            const axesHelper = new THREE.AxesHelper( 5 );
			this.scene.add( axesHelper );
            
            this.controls = new OrbitControls( this.camera, this.renderer.domElement );
            this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
			this.controls.dampingFactor = 0.05;
            this.controls.screenSpacePanning = false;
            this.controls.minDistance = 100;
			this.controls.maxDistance = 500;
            this.controls.maxPolarAngle = Math.PI / 2;
            this.controls.enableRotate = false;
            
            
            this.controls.addEventListener("change", this.limitOrbit.bind(this))

            this.renderer.setAnimationLoop(this.render.bind(this));
        
            window.addEventListener('resize', this.resize.bind(this) );
        }
        limitOrbit(){
            var minPan = new THREE.Vector3( - 200, - 200, - 200 );
            var maxPan = new THREE.Vector3( 200, 200, 200 );
            var _v = new THREE.Vector3();
            _v.copy(this.controls.target);
            this.controls.target.clamp(minPan, maxPan);
            _v.sub(this.controls.target);
            this.camera.position.sub(_v);
        }

        
        resize(){
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize( window.innerWidth, window.innerHeight );  
        }
        
        render( ) {   
            this.controls.update()
            // this.mesh.rotateY( 0.01 );
            this.renderer.render( this.scene, this.camera );
        }
    }
    
    export { App };