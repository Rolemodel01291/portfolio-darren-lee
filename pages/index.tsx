import React from 'react';
import Head from 'next/head'
import { isMobile } from 'react-device-detect';
import Typewriter from "typewriter-effect";
import Router from 'next/router';

import Button from '@mui/material/Button';

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import TweenMax from "gsap"

import Header from '../components/header/Header';

class Home extends React.Component<{}> {

  componentDidMount() {
    let container: any, clock: any = new THREE.Clock();
    let camera: any, scene: any, renderer: any, controls: any;
    let particles_model: THREE.Points<THREE.BufferGeometry, any>;

    const animationDuration = 9, animationDelay = 0.1;
    var randomColor = require('randomcolor');

    init();
    animate();

    function particles() {
      var geometry, i, j, material: any, numParticles, orbitSizes, orbitSpeeds, particles, posIndex, positions, pulseSpeeds, ref, sprite1, textureLoader;
      textureLoader = new THREE.TextureLoader();
      // sprite1 = textureLoader.load("assets/models/particle1.jpg");

      let spriteMap = new THREE.Texture();
      var bubble = new Image();
      bubble.src = "data:image/png;base64,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";
      bubble.onload = function () {
        spriteMap.image = bubble;
        spriteMap.needsUpdate = true;
      };
      numParticles = 2000;
      geometry = new THREE.BufferGeometry();
      positions = new Float32Array(numParticles * 3);
      pulseSpeeds = new Float32Array(numParticles);
      orbitSizes = new Float32Array(numParticles);
      orbitSpeeds = new Float32Array(numParticles);
      for (i = j = 0, ref = numParticles; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        posIndex = i * 3;
        positions[posIndex] = Math.random() * 300 - 150;
        positions[posIndex + 1] = Math.random() * 300 - 150;
        positions[posIndex + 2] = Math.random() * 300 - 150;
        pulseSpeeds[i] = 1 + (Math.random() * 2);
        orbitSizes[i] = 1 + (Math.random() * 2);
        orbitSpeeds[i] = -2 + (Math.random() * 4);
      }
      geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.addAttribute('pulseSpeed', new THREE.BufferAttribute(pulseSpeeds, 1));
      geometry.addAttribute('orbitSize', new THREE.BufferAttribute(orbitSizes, 1));
      geometry.addAttribute('orbitSpeed', new THREE.BufferAttribute(orbitSpeeds, 1));
      material = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone({
          map: { type: "t", value: null },
          offsetRepeat: { type: "v4", value: new THREE.Vector4(0, 0, 1, 1) },
          time: { type: "f", value: 0 },
          color: { type: "c", value: new THREE.Color(0x8888dd) },
          size: { type: "f", value: 0.9 },
          scale: { type: "f", value: 500 }
        }),
        vertexShader: "uniform float time; uniform float size; uniform float scale; attribute float pulseSpeed; attribute float orbitSpeed; attribute float orbitSize; void main() { vec3 animatedPosition = position; animatedPosition.x += sin(time * orbitSpeed) * orbitSize; animatedPosition.y += cos(time * orbitSpeed) * orbitSize; animatedPosition.z += cos(time * orbitSpeed) * orbitSize; vec3 transformed = vec3( animatedPosition ); vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 ); gl_Position =  projectionMatrix * mvPosition; float animatedSize = size * ( scale / - mvPosition.z ); animatedSize *= 1.0 + sin(time * pulseSpeed); gl_PointSize = animatedSize; }",
        fragmentShader: "uniform sampler2D map; uniform vec4 offsetRepeat; uniform vec3 color; void main() { gl_FragColor = texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy ); gl_FragColor.rgb *= color.rgb; }",
        blending: THREE.AdditiveBlending,
        transparent: true
      });
      material.uniforms.map.value = spriteMap//sprite1;
      material.uniforms.size.value = 1.0;
      particles_model = new THREE.Points(geometry, material);
      scene.add(particles_model);
      scene.children.pop();
      scene.children.unshift(particles_model);
    };

    function triangleGeometry(radius: number, thickness: number, depth: number) {
      var shape = new THREE.Shape();
      var r = radius + thickness;
      var y = Math.sin(-Math.PI / 6) * r;
      var x = Math.cos(Math.PI / 6) * r;
      shape.moveTo(0, r);
      shape.lineTo(-x, y);
      shape.lineTo(x, y);
      shape.lineTo(0, r);

      var hole = new THREE.Path();
      r = radius;
      y = Math.sin(-Math.PI / 6) * r;
      x = Math.cos(Math.PI / 6) * r;
      hole.moveTo(0, r);
      hole.lineTo(-x, y);
      hole.lineTo(x, y);
      hole.lineTo(0, r);

      shape.holes.push(hole);

      var extrudeSettings = { steps: 1, depth: depth, bevelEnabled: false };
      var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
      geometry.translate(0, 0, -depth / 2);
      return geometry;
    }

    function init() {
      //=========== scene, camera, renderer ===========
      container = document.getElementById('index-canvas-container');
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.y = 0//-20
      camera.position.z = 100
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      renderer.setSize(window.innerWidth, window.innerHeight);
      controls = new OrbitControls(camera, renderer.domElement);
      controls.maxDistance = 300;
      controls.minDistance = 10;
      controls.autoRotate = false;
      // controls.autoRotateSpeed = -0.5;
      controls.update();
      container.appendChild(renderer.domElement);
      window.addEventListener('resize', onWindowResize);
      //=========== lights =========== 
      const lightIntensity = 0.5;
      const lightDistance = 200;

      let light;

      light = new THREE.PointLight(randomColor({ luminosity: 'light' }), lightIntensity, lightDistance);
      light.position.set(0, 100, 0);
      scene.add(light);
      light = new THREE.PointLight(randomColor({ luminosity: 'light' }), lightIntensity, lightDistance);
      light.position.set(0, -100, 0);
      scene.add(light);

      light = new THREE.PointLight(randomColor({ luminosity: 'light' }), lightIntensity, lightDistance);
      light.position.set(100, 0, 0);
      scene.add(light);
      light = new THREE.PointLight(randomColor({ luminosity: 'light' }), lightIntensity, lightDistance);
      light.position.set(-100, 0, 0);
      scene.add(light);

      light = new THREE.PointLight(randomColor({ luminosity: 'light' }), lightIntensity, lightDistance);
      light.position.set(0, 0, 100);
      scene.add(light);
      light = new THREE.PointLight(randomColor({ luminosity: 'light' }), lightIntensity, lightDistance);
      light.position.set(0, 0, -100);
      scene.add(light);

      particles();

      const nbTrucs = 1;
      const nbObjects = isMobile ? 22 : 35, objectMinRadius = 0.5, objectRadiusCoef = 1, objectThickness = 0.3, objectDepth = 0.5;

      for (var i = 0; i < nbTrucs; i++) {
        const o3d = new THREE.Object3D();
        var material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.9 });
        for (var i = 0; i < nbObjects; i++) {
          var geometry = triangleGeometry(objectMinRadius + objectRadiusCoef * i, objectThickness, objectDepth);
          var mesh = new THREE.Mesh(geometry, material);
          TweenMax.to(mesh.rotation, animationDuration, {
            y: Math.PI * 2,
            z: Math.PI * 2,
            // ease: Power1.easeInOut,
            repeat: -1,
            yoyo: true,
            delay: i * animationDelay
          });
          o3d.add(mesh);
        }
        if (isMobile)
          o3d.position.set(0, -5, 0)
        else
          o3d.position.set(35, -10, 0)
        scene.add(o3d);
      }

    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function animate() {
      controls.update();
      requestAnimationFrame(animate);
      render();
    }
    function render() {
      const delta = clock.getDelta();
      particles_model.material.uniforms.time.value += delta;
      renderer.render(scene, camera);
    }
  }

  render() {
    return (
      <>
        <Head>
          <title>My Portfolio</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <div className='w-full h-[100vh] '>
          <div className='w-full md:w-[60%] h-full text-white font-medium flex justify-center items-center'>
            <div>
              <div className='text-32 md:text-45 py-8 text-center md:text-left'>
                <Typewriter
  
                  onInit={(typewriter) => {

                    typewriter

                      .typeString("Hey there, Nice to meet you")

                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("I’m Darren Lee.")
                      .start();
                  }}
                />
                
              </div>
              <div className='text-lg md:text-36 pb-8 text-center md:text-left'>Fullstack/Blockchain Engineer, Enthusiast</div>
              {/* <div className='text-36 text-start text-white'>
                <Button variant="outlined" onClick={()=>Router.push('/contact')} className="btn btn-primary text-white text-26 border-background font-sans hover:border-white" size="large">Contact</Button>
              </div> */}
            </div>
          </div>
        </div>
        <div id='index-canvas-container' className='absolute w-full h-full top-0 left-0' style={{ zIndex: '-100' }}></div>
        <Header />
      </>
    );
  }
}

export default Home;