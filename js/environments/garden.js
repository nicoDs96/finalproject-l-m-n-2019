
function garden(){


  //Scene
  var scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  //Camera
  var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(17,14,-12);
  camera.up = new THREE.Vector3(0,1,0);
  camera.lookAt(new THREE.Vector3(0,0,0));

  //Renderer
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  if(document.querySelector('canvas') != undefined ){
      document.body.replaceChild( renderer.domElement, document.getElementsByTagName('canvas')[0] );
  }
  else{
      document.body.appendChild( renderer.domElement );
  }

  //Light
  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
  hemiLight.position.set(0, 14, 0);
  scene.add(hemiLight);

  //Room
  var path = './img/garden/';
  var format = '.jpg';
  var geometry = new THREE.BoxGeometry(35, 15, 35);
  var cubeMaterials = [
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path + 'px' + format),
            side: THREE.DoubleSide
        }), //front
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path + 'nx' + format),
            side: THREE.DoubleSide
        }), //behind
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path + 'py' + format),
            side: THREE.DoubleSide
        }), //roof
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path + 'ny' + format),
            side: THREE.DoubleSide
        }), //floor
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path + 'pz' + format),
            side: THREE.DoubleSide
        }), //right
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load(path + 'nz' + format),
            side: THREE.DoubleSide
        }) //left
  ];
  var ground = new THREE.Mesh(geometry,cubeMaterials);
  ground.position.y=7.5;
  scene.add(ground);

  //Fountain
  var loader = new THREE.GLTFLoader();
  loader.load('models/garden/fountain/scene.gltf',
	function ( gltf ) {
  var model = gltf.scene;
  model.traverse( function ( object ) {
      if ( object.isMesh ){
          object.castShadow = true;
          object.geometry.scale(1,1,1);
      }
  });
  model.position.set(0,-0.2,0);
  scene.add(model);
  },
  function ( xhr ) {
	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded: fountain' );
	},
	function ( error ) {
  console.log( 'An error happened' );
  });
  var boxModelFountain = new THREE.Mesh(
      new THREE.SphereGeometry( 5, 32, 32 ),
      new THREE.MeshStandardMaterial( {opacity: 0 , transparent: true} )
  );
  scene.add(boxModelFountain);

  //Gazebo
  var loader = new THREE.GLTFLoader();
  loader.load('models/garden/gazebo/scene.gltf',
  function ( gltf ) {
  var model = gltf.scene;
  model.traverse( function ( object ) {
      if ( object.isMesh ){
          object.castShadow = true;
          object.geometry.scale(1.5,1.5,1.5);
          object.geometry.rotateZ(0.785398);
      }
  });
  model.position.set(-10,0,10);
  scene.add(model);
  },
  function ( xhr ) {
  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded: gazebo' );
  },
  function ( error ) {
  console.log( 'An error happened' );
  });
  var boxModelGazebo = new THREE.Mesh(
      new THREE.SphereGeometry( 5, 32, 32 ),
      new THREE.MeshStandardMaterial( {opacity: 0 , transparent: true} )
  );
  boxModelGazebo.position.set(-10,2.3,10);
  scene.add(boxModelGazebo);

  //Chair
  var loader = new THREE.GLTFLoader();
  loader.load('models/garden/chair/scene.gltf',
	function ( gltf ) {
  var model = gltf.scene;
  model.traverse( function ( object ) {
      if ( object.isMesh ){
          object.castShadow = true;
          object.geometry.scale(0.02,0.02,0.02);
          object.geometry.rotateX(3.14159);
          object.geometry.rotateY(3.14159);
        }
    });
    model.position.set(-9,0,-7);
    scene.add(model);
    },
  function ( xhr ) {
	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded: chair' );
	},
	function ( error ) {
  console.log( 'An error happened' );
  });

  //Tree
  var loader = new THREE.GLTFLoader();
  loader.load('models/garden/tree/OrangeTree.gltf',
  function ( gltf ) {
  var model = gltf.scene;
  model.traverse( function ( object ) {
      if ( object.isMesh ){
          object.castShadow = true;
        }
    });
    model.position.set(10,0,10);
    scene.add(model);
    },
  function ( xhr ) {
  console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded: tree' );
  },
  function ( error ) {
  console.log( 'An error happened' );
  });
  var boxModelTree = new THREE.Mesh(
        new THREE.CubeGeometry( 5, 5, 5 ),
        new THREE.MeshStandardMaterial( {opacity: 0 , transparent: true} )
    );
  boxModelTree.position.set(10,7.8,10);
  boxModelTree.scale.set(0.15,3.99,0.15);
  scene.add(boxModelTree);

  //Robot
  var modelChar, box, checkHat, checkGlasses;
  var hat = null;
  var glasses = null;
  var hatIsLoaded = false;
  var glassesAreLoaded = false;
  var rootBone = [];
  var robotSkeleton;
  var invisibleBox;
  var loaderChar = new THREE.GLTFLoader();
  loaderChar.load('models/character/robot1/RobotExpressive.glb',
  function ( gltf ) {
     modelChar = gltf.scene;
     modelChar.traverse( function ( object ) {
     if ( object.isMesh ){
       object.castShadow = true;
     }
     if( object.name == 'RobotArmature'){
          rootBone.push(object.children[0]);
     }
     if(object.name == 'FootL' || object.name == 'FootR' ){
          object.visible = false;
     }});
     modelChar.position.set(0,-3,0);
     scene.add( modelChar );
     robotSkeleton = new THREE.Skeleton( rootBone );
     var size = new THREE.Box3().setFromObject(modelChar).getSize();
     invisibleBox = new THREE.Mesh(new THREE.CubeGeometry(size.x/2-0.8,size.y,size.z-0.1),
                                   new THREE.MeshStandardMaterial( {opacity: 0,transparent: true}));
     invisibleBox.position.set(0,3,-7);
     scene.add(invisibleBox);
     invisibleBox.add(modelChar);

     if( getCookie('glasses') == 'yes'){
     glasses = drawGlasses();
     checkGlasses = setInterval(function(){
     if(glasses == null){
     }else{
        clearInterval(checkGlasses);
        glassesAreLoaded = true;
        var box = new THREE.Box3().setFromObject( modelChar );
        glasses.scale.set(0.1,0.15,0.15);
        glasses.position.x -= 0.1 ;
        glasses.position.z -= box.getSize().z -4.5;
        glasses.position.y += box.getSize().y -0.75 ;
        modelChar.add(glasses);
      }
     }, 500);}
     if( getCookie('hat') == 'yes'){
        var loader = new THREE.GLTFLoader();
        loader.load('models/accessories/hat/scene.gltf',
        function ( gltf ) {
        hat = gltf.scene;
        hat.traverse( function ( object ) {
        if ( object.isMesh ){
            object.castShadow = true;
        }});
        hat.scale.set(0.05, 0.05, 0.05);
        hat.position.set(0, 4, 0);
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded: hat' );
        },
        function ( error ) {
            console.log( 'An error happened' );
        });
        checkHat = setInterval(function(){
            if(hat == null){
                ;
            }
            else{
                clearInterval(checkHat);
                hatIsLoaded = true;
                hat.scale.set(
                    hat.scale.x*0.3,
                    hat.scale.y*0.2,
                    hat.scale.z*0.2
                );
                var box = new THREE.Box3().setFromObject( modelChar );
                modelChar.add(hat);
        }}, 500);
   }},
   function ( xhr ) {
   console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded: robot' );
   },
   function ( error ) {
      console.log( 'An error happened' );
      console.log(error);
   });

  //Raycaster - Robot movement
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var collidableMeshList = [];
  collidableMeshList.push(ground);
  collidableMeshList.push(boxModelTree);
  collidableMeshList.push(boxModelFountain);
  collidableMeshList.push(boxModelGazebo);
  function onMouseClick( event ) {
          mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
          mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
          raycaster.setFromCamera( mouse, camera );
          var intersects = raycaster.intersectObjects( scene.children );
          var point = intersects[intersects.length -1].point;
          if(modelChar != null){
               // if( !isNaN( modelChar.position.angleTo(point) ) ) {
               //     modelChar.rotation.y = modelChar.position.angleTo(point);
               // }
              var mainB = robotSkeleton.bones;
              var armL = mainB[0].children[1].children[2].children[0].children[0].children[1];
              var armR = mainB[0].children[1].children[2].children[0].children[0].children[2];
              var head = mainB[0].children[1].children[2].children[0].children[0].children[0].children[0];
              var legL = mainB[0].children[1].children[0];
              var legR = mainB[0].children[1].children[1];
              var rootInit = { x : invisibleBox.position.x , z : invisibleBox.position.z };
              var rootFinal = { x : point.x , z : point.z };
              var tween = new TWEEN.Tween(rootInit).to(rootFinal, 1500).onComplete(function() {
                  tweenHEAD1.stop();
                  tweenLEGR1.stop();
                  tweenLEGL1.stop();
                  tweenARMR1.stop();
                  tweenARML1.stop();
                  tweenHEAD2.stop();
                  tweenLEGR2.stop();
                  tweenLEGL2.stop();
                  tweenARMR2.stop();
                  tweenARML2.stop();
              });
              tween.onUpdate(function(){
                  invisibleBox.position.x = rootInit.x;
                  invisibleBox.position.z = rootInit.z;

                  var originPoint = invisibleBox.position.clone();

                  for (var vertexIndex = 0; vertexIndex < invisibleBox.geometry.vertices.length; vertexIndex++)
                  {
                    var localVertex = invisibleBox.geometry.vertices[vertexIndex].clone();
                    var globalVertex = localVertex.applyMatrix4( invisibleBox.matrix );
                    var directionVector = globalVertex.sub( invisibleBox.position );

                    var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
                    var collisionResults = ray.intersectObjects( collidableMeshList );
                    if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
                      //alert("game over");
                    }
                  }
              });
              tween.start();
              var tweenLEGL1 = new TWEEN.Tween(legL.rotation).to({
                x: 1,
                y: 0,
                z: 0.2
              }, 300);

              var tweenLEGL2 = new TWEEN.Tween(legL.rotation).to({
                x: 2.7,
                y: -0.16,
                z: -0.075
              }, 300);

              var tweenLEGR1 = new TWEEN.Tween(legR.rotation).to({
                x: 4,
                y: 0,
                z: 0.2
              }, 300);

              var tweenLEGR2 = new TWEEN.Tween(legR.rotation).to({
                x: 2.7,
                y: 0.25,
                z: 0.12
              }, 300);

              var tweenHEAD1 = new TWEEN.Tween(head.rotation).to({
                x: -0.3,
                y: -0.031,
                z: 0.055
              }, 300);

              var tweenHEAD2 = new TWEEN.Tween(head.rotation).to({
                x: -0.086,
                y: -0.031,
                z: 0.055
              }, 300);

              var tweenARML1 = new TWEEN.Tween(armL.rotation).to({
                x: -0.9,
                y: 0,
                z: -2.7
              }, 300);

              var tweenARML2 = new TWEEN.Tween(armL.rotation).to({
                x: -0.11,
                y: 0,
                z: -2.7
              }, 300);

              var tweenARMR1 = new TWEEN.Tween(armR.rotation).to({
                x: -0.9,
                y: 0,
                z: 2.7
              }, 300);

              var tweenARMR2 = new TWEEN.Tween(armR.rotation).to({
                x: -0.11,
                y: 0,
                z: 2.7
              }, 300);

              tweenHEAD1.chain(tweenHEAD2);
              tweenLEGR1.chain(tweenLEGR2);
              tweenLEGL1.chain(tweenLEGL2);
              tweenARML1.chain(tweenARML2);
              tweenARMR1.chain(tweenARMR2);
              tweenHEAD2.chain(tweenHEAD1);
              tweenLEGR2.chain(tweenLEGR1);
              tweenLEGL2.chain(tweenLEGL1);
              tweenARML2.chain(tweenARML1);
              tweenARMR2.chain(tweenARMR1);
              tweenHEAD1.start();
              tweenLEGR1.start();
              tweenLEGL1.start();
              tweenARMR1.start();
              tweenARML1.start();
      }
  }
  window.addEventListener( 'click', onMouseClick, false );


  //Debug
  var controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableZoom = true;
  controls.update();
  var gui = new dat.gui.GUI();
  var f1 = gui.addFolder('Camera Position');
  f1.add(camera.position, 'x').min(-40).max(40).step(0.1);
  f1.add(camera.position, 'y').min(-40).max(40).step(0.1);
  f1.add(camera.position, 'z').min(-40).max(40).step(0.1);
  var axesHelper = new THREE.AxesHelper( 30 );
  scene.add( axesHelper );

  //Animation
  function animate() {
      renderer.render( scene, camera );
      TWEEN.update();
      requestAnimationFrame( animate );
  }
  animate();

}