import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 
import * as dat from 'dat.gui';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
//import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const gltfLoader = new GLTFLoader()
gltfLoader.setPath('./GLTF/')

// Debug
//const gui = new dat.GUI() // Esto es la interfaz grafica para editar valores en directo

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Ratation Funtion
function rotateObject(object, degreeX=0, degreeY=0, degreeZ=0) {
    object.rotateX(THREE.Math.degToRad(degreeX));
    object.rotateY(THREE.Math.degToRad(degreeY));
    object.rotateZ(THREE.Math.degToRad(degreeZ));
}

// Objects

const DroneC = []
const LamparaC = []

    // GLTF
        // Habitacion
            gltfLoader.load('Habitación.gltf', (gltf) =>{
                gltf.scene.scale.set(0.1,0.1,0.1)
                gltf.scene.rotation.set(0,0,0)
                gltf.castShadow = true
                scene.add(gltf.scene)
            })

        // Lampara
            gltfLoader.load('Lampara.gltf', (gltf) =>{
                gltf.scene.scale.set(0.1,0.1,0.1)
                gltf.scene.rotation.set(0,0,0)
                gltf.castShadow = true
                scene.add(gltf.scene)

                gltf.scene.traverse( function( LamparaU ) {

                    if ( LamparaU.isMesh) {
                        LamparaC.push( LamparaU );
                    }
                } );
            })

        // Drone
            var mixer
            var droneClips
            var i = 0

            gltfLoader.load('Drone.gltf', (gltfD) =>{
                gltfD.scene.scale.set(0.1,0.1,0.1)
                gltfD.scene.rotation.set(0,0,0)
                gltfD.castShadow = true
                scene.add( gltfD.scene );

                mixer = new THREE.AnimationMixer( gltfD.scene )
                droneClips = gltfD.animations
                console.log(droneClips)

                gltfD.scene.traverse( function( DroneU ) {
                    if ( DroneU.isMesh) {
                        DroneC.push( DroneU );
                    }
                } );
            })


// Video
    // Cargar el video
        let video = document.getElementById('video1')
        video.src = "./Videos/LucasRojo.mp4"

    // Textura y material del video
        let videoTexture = new THREE.VideoTexture(video)

        let materialPantallaVideo = new THREE.MeshStandardMaterial({map: videoTexture})
        let materialPantallaApagada = new THREE.MeshBasicMaterial({color: 0x000000})
    // Geometria de la pantalla y su mesh
        let pantallaGeo = new THREE.BoxGeometry(0.01,0.1565,0.296)
        let pantalla = new THREE.Mesh(pantallaGeo,materialPantallaApagada)
        pantalla.position.set(-0.94, 0.533, -0.2765)

        scene.add(pantalla)
    // Funciones Pantalla
        
        // Div Contenido Informacion
        let InfoDiv = document.getElementById('InfoDiv').style

        let infoIcono = document.getElementById('infoIcono')
        infoIcono.onclick = infoIconoFN
        function infoIconoFN(){
            InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
            InfoDiv.animationFillMode = 'forwards';

            // Close

            linkUnityBooClcik = false
            linkBlenderBooClcik = false
            linkSolidityBooClcik = false
            linkHTMLCSSJSBooClcik = false
            linkAfterBooClcik = false
            linkPremiereBooClcik = false
        }

        let infoTitle = document.getElementById('infoTitle')
        let infoSubTitle = document.getElementById('infoSubTitle')
        let infoText = document.getElementById('infoText')

        // Unity
            // Pantalla
            var unityTexture = new THREE.TextureLoader().load('IMG/Unity2.png')
            let materialPantallaUnity = new THREE.MeshBasicMaterial({map: unityTexture})

            let linkUnity = document.getElementById('LinkWork1')
            console.log(linkUnity)
            linkUnity.onmouseover = linkUnityFN
            linkUnity.onmouseout = linkUnityFN
            var linkUnityBoo = Boolean(false)
                function linkUnityFN(evento){
                    if(booleanClickDrone == false)
                    {
                        if(linkUnityBoo != true){
                            pantalla.material = materialPantallaUnity
                            linkUnityBoo = true
                        }else{
                            pantalla.material = materialPantallaApagada
                            linkUnityBoo = false
                        }
                    }
                }

            // Contenido

            linkUnity.onclick = clickLinkUnity
            var linkUnityBooClcik = Boolean(false)
                function clickLinkUnity(){
                    if(linkUnityBooClcik== false){
                        InfoDiv.display = "block"
                        infoTitle.textContent = 'UNITY'
                        infoSubTitle.textContent = 'Unity Subtitle:'
                        infoText.textContent = 'Contenido unity parrafo '+'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam fugiat sapiente veritatis labore error hic ad, quod vel incidunt minima quas adipisci aperiam, itaque facere reiciendis officiis voluptate nulla nam!'
                        InfoDiv.animation = 'infoDivAnim 200ms ease-out';
                        linkUnityBooClcik = true
                    } else{
                        InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                        InfoDiv.animationFillMode = 'forwards';

                        // Close

                        linkUnityBooClcik = false
                        linkBlenderBooClcik = false
                        linkSolidityBooClcik = false
                        linkHTMLCSSJSBooClcik = false
                        linkAfterBooClcik = false
                        linkPremiereBooClcik = false
                    }
                }

        // Blender
            // Pantalla
            var blenderTexture = new THREE.TextureLoader().load('IMG/Blender.png')
            let materialPantallaBlender = new THREE.MeshBasicMaterial({map: blenderTexture})

            let linkBlender = document.getElementById('LinkWork2')
            console.log(linkBlender)
            linkBlender.onmouseover = linkBlenderFN
            linkBlender.onmouseout = linkBlenderFN
            var linkBlenderBoo = Boolean(false)
                function linkBlenderFN(evento){
                    if(booleanClickDrone == false)
                    {
                        if(linkBlenderBoo != true){
                            pantalla.material = materialPantallaBlender
                            linkBlenderBoo = true
                        }else{
                            pantalla.material = materialPantallaApagada
                            linkBlenderBoo = false
                        }
                    }
                }

                // Contenido

                linkBlender.onclick = clickLinkBlender
                var linkBlenderBooClcik = Boolean(false)
                    function clickLinkBlender(){
                        if(linkBlenderBooClcik== false){
                            InfoDiv.display = "block"
                            infoTitle.textContent = 'BLENDER'
                            infoSubTitle.textContent = 'Blender Subtitle:'
                            infoText.textContent = 'Contenido blender parrafo '+'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam fugiat sapiente veritatis labore error hic ad, quod vel incidunt minima quas adipisci aperiam, itaque facere reiciendis officiis voluptate nulla nam!'
                            InfoDiv.animation = 'infoDivAnim 200ms ease-out';
                            linkBlenderBooClcik = true
                        } else{
                            InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                            InfoDiv.animationFillMode = 'forwards';
                            
                            // Close

                            linkUnityBooClcik = false
                            linkBlenderBooClcik = false
                            linkSolidityBooClcik = false
                            linkHTMLCSSJSBooClcik = false
                            linkAfterBooClcik = false
                            linkPremiereBooClcik = false
                        }
                    }
        
        // HTMLCSSJS
            // Pantalla
            var HTMLCSSJSTexture = new THREE.TextureLoader().load('IMG/HTMLCSSJS.png')
            let materialPantallaHTMLCSSJS = new THREE.MeshBasicMaterial({map: HTMLCSSJSTexture})

            let linkHTMLCSSJS= document.getElementById('LinkWork3')
            console.log(linkHTMLCSSJS)
            linkHTMLCSSJS.onmouseover = linkHTMLCSSJSFN
            linkHTMLCSSJS.onmouseout = linkHTMLCSSJSFN
            var linkHTMLCSSJSBoo = Boolean(false)
                function linkHTMLCSSJSFN(evento){
                    if(booleanClickDrone == false)
                    {
                        if(linkHTMLCSSJSBoo != true){
                            pantalla.material = materialPantallaHTMLCSSJS
                            linkHTMLCSSJSBoo = true
                        }else{
                            pantalla.material = materialPantallaApagada
                            linkHTMLCSSJSBoo = false
                        }
                    }
                }
  
                // Contenido

                linkHTMLCSSJS.onclick = clickLinkHTMLCSSJS
                var linkHTMLCSSJSBooClcik = Boolean(false)
                    function clickLinkHTMLCSSJS(){
                        if(linkHTMLCSSJSBooClcik== false){
                            InfoDiv.display = "block"
                            infoTitle.textContent = 'HTMLCSSJS'
                            infoSubTitle.textContent = 'HTMLCSSJS Subtitle:'
                            infoText.textContent = 'Contenido HTMLCSSJS parrafo '+'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam fugiat sapiente veritatis labore error hic ad, quod vel incidunt minima quas adipisci aperiam, itaque facere reiciendis officiis voluptate nulla nam!'
                            InfoDiv.animation = 'infoDivAnim 200ms ease-out';
                            linkHTMLCSSJSBooClcik = true
                        } else{
                            InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                            InfoDiv.animationFillMode = 'forwards';

                            // Close

                            linkUnityBooClcik = false
                            linkBlenderBooClcik = false
                            linkSolidityBooClcik = false
                            linkHTMLCSSJSBooClcik = false
                            linkAfterBooClcik = false
                            linkPremiereBooClcik = false
                        }
                    }
                          
        // SOLIDITY
            // Pantalla
            var solidityTexture = new THREE.TextureLoader().load('IMG/solidity.jfif')
            let materialPantallaSolidity = new THREE.MeshBasicMaterial({map: solidityTexture})

            let linkSolidity= document.getElementById('LinkWork4')
            console.log(linkSolidity)
            linkSolidity.onmouseover = linkSolidityFN
            linkSolidity.onmouseout = linkSolidityFN
            var linkSolidityBoo = Boolean(false)
                function linkSolidityFN(evento){
                    if(booleanClickDrone == false)
                    {
                        if(linkSolidityBoo != true){
                            pantalla.material = materialPantallaSolidity
                            linkSolidityBoo = true
                        }else{
                            pantalla.material = materialPantallaApagada
                            linkSolidityBoo = false
                        }
                    }
                }

                // Contenido

                linkSolidity.onclick = clickLinkSolidity
                var linkSolidityBooClcik = Boolean(false)
                    function clickLinkSolidity(){
                        if(linkSolidityBooClcik== false){
                            InfoDiv.display = "block"
                            infoTitle.textContent = 'SOLIDITY'
                            infoSubTitle.textContent = 'El Lenguaje Del Futuro De Las Finanzas:'
                            infoText.textContent = 'Las tecnologías avanzan muy rápido y hay que estar actualizándose constantemente, por eso he estudiado y aprendido el lenguaje de programación solidity. Este lenguaje se utiliza para crear smart contracts, que son trozos de códigos capaces de gestionar criptodivisas (como por ejemplo ethereum). Como con todo he aprendido por mi cuenta rebuscando por internet, pero en este caso me entusiasmo tanto que hice un curso por internet y he leído varios libro tutórales...'
                            InfoDiv.animation = 'infoDivAnim 200ms ease-out';
                            linkSolidityBooClcik = true
                        } else{
                            InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                            InfoDiv.animationFillMode = 'forwards';
                            
                            // Close

                            linkUnityBooClcik = false
                            linkBlenderBooClcik = false
                            linkSolidityBooClcik = false
                            linkHTMLCSSJSBooClcik = false
                            linkAfterBooClcik = false
                            linkPremiereBooClcik = false
                        }
                    }
        
        // After Effects
            // Pantalla
            var afterTexture = new THREE.TextureLoader().load('IMG/After-Effects.jpg')
            let materialPantallaAfter= new THREE.MeshBasicMaterial({map: afterTexture})

            let linkAfter= document.getElementById('LinkWork6')
            console.log(linkAfter)
            linkAfter.onmouseover = linkAfterFN
            linkAfter.onmouseout = linkAfterFN
            var linkAfterBoo = Boolean(false)
                function linkAfterFN(evento){
                    if(booleanClickDrone == false)
                    {
                        if(linkAfterBoo != true){
                            pantalla.material = materialPantallaAfter
                            linkAfterBoo = true
                        }else{
                            pantalla.material = materialPantallaApagada
                            linkAfterBoo = false
                        }
                    }
                }
                
                // Contenido

                linkAfter.onclick = clickLinkAfter
                var linkAfterBooClcik = Boolean(false)
                    function clickLinkAfter(){
                        if(linkAfterBooClcik== false){
                            InfoDiv.display = "block"
                            infoTitle.textContent = 'AFTER EFFECTS'
                            infoSubTitle.textContent = 'After Effects Subtitle:'
                            infoText.textContent = 'Contenido after effects parrafo '+'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam fugiat sapiente veritatis labore error hic ad, quod vel incidunt minima quas adipisci aperiam, itaque facere reiciendis officiis voluptate nulla nam!'
                            InfoDiv.animation = 'infoDivAnim 200ms ease-out';
                            linkAfterBooClcik = true
                        } else{
                            InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                            InfoDiv.animationFillMode = 'forwards';
                            
                            // Close

                            linkUnityBooClcik = false
                            linkBlenderBooClcik = false
                            linkSolidityBooClcik = false
                            linkHTMLCSSJSBooClcik = false
                            linkAfterBooClcik = false
                            linkPremiereBooClcik = false
                        }
                    }
        
        // Premiere Pro
            // Pantalla
            var premiereTexture = new THREE.TextureLoader().load('IMG/Premiere.png')
            let materialPantallaPremiere= new THREE.MeshBasicMaterial({map: premiereTexture})

            let linkPremiere= document.getElementById('LinkWork5')
            console.log(linkPremiere)
            linkPremiere.onmouseover = linkPremiereFN
            linkPremiere.onmouseout = linkPremiereFN
            var linkPremiereBoo = Boolean(false)
                function linkPremiereFN(evento){
                    if(booleanClickDrone == false)
                    {
                        if(linkPremiereBoo != true){
                            pantalla.material = materialPantallaPremiere
                            linkPremiereBoo = true
                        }else{
                            pantalla.material = materialPantallaApagada
                            linkPremiereBoo = false
                        }
                    }
                }

            // Contenido

            linkPremiere.onclick = clickLinkPremiere
            var linkPremiereBooClcik = Boolean(false)
                function clickLinkPremiere(){
                    if(linkPremiereBooClcik== false){
                        InfoDiv.display = "block"
                        infoTitle.textContent = 'PREMIERE PRO'
                        infoSubTitle.textContent = 'Premiere Pro Subtitle:'
                        infoText.textContent = 'Contenido premiere pro parrafo '+'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam fugiat sapiente veritatis labore error hic ad, quod vel incidunt minima quas adipisci aperiam, itaque facere reiciendis officiis voluptate nulla nam!'
                        InfoDiv.animation = 'infoDivAnim 200ms ease-out';
                        linkPremiereBooClcik = true
                    } else{
                        InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                        InfoDiv.animationFillMode = 'forwards';
                        
                        // Close

                        linkUnityBooClcik = false
                        linkBlenderBooClcik = false
                        linkSolidityBooClcik = false
                        linkHTMLCSSJSBooClcik = false
                        linkAfterBooClcik = false
                        linkPremiereBooClcik = false
                    }
                }  

// Materials


// Mesh

// Lights
    // General
    //const ambientLight = new THREE.AmbientLight(0xffffff,1)
    //scene.add(ambientLight)
    
    // Venta Point
        const ventanaPoint = new THREE.SpotLight(0x3a4852, 8, 2, Math.PI/3, 0.9, 1) //3a4852
        //const ventanaPoint = new THREE.SpotLight(0x3a6052, 5, 2, Math.PI/3, 0.9, 1)
        ventanaPoint.position.set(-0.1, 0.65, -0.2)
        ventanaPoint.target.position.set(-5,-0.2,-1)
        ventanaPoint.castShadow = true
        ventanaPoint.shadow.mapSize.width = 1024
        ventanaPoint.shadow.mapSize.height = 1024
 
        const helperVentana = new THREE.SpotLightHelper( ventanaPoint )

        scene.add(ventanaPoint,ventanaPoint.target)
        //scene.add(ventanaPoint, helperVentana, ventanaPoint.target)
    //Lampara
        const lamparaLight = new THREE.SpotLight(0xffe892, 100, 0.18, Math.PI/3.5, 0.9, 1)
        lamparaLight.position.set(-0.832, 0.53, 0)
        lamparaLight.target.position.set(-0.832,0,0)
        lamparaLight.castShadow = true
    
        const helper = new THREE.SpotLightHelper( lamparaLight )

        let booleanLight = Boolean(false)
        scene.add(lamparaLight.target)
        //scene.add(lamparaLight, helper, lamparaLight.target)

    // Funcion cambio de color
    let colorDoc = document.getElementById('colorID')
    colorDoc.onclick = colorFN
    var cambioColorBoolean = Boolean(false)
        function colorFN(evento){
            let colorHex = '#' + ((Math.random() * 0xffffff).toString(16)).slice(0,6)
            ventanaPoint.color.set(colorHex)
        }

/**
 * Shadows
 */
//renderer.shadowMap.enabled = true


/**
 * Sizes
 */
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

/**
 * Camera
 */
    // Base camera
        const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.0001, 100)
        scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ReinhardToneMapping;

    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // Raton y Raycaster
    const mouse = new THREE.Vector2()
    const mouse2 = new THREE.Vector2()
    window.addEventListener('mousemove', (event) =>{
        mouse2.x = (event.clientX / window.innerWidth) * 2
        mouse.x = (event.clientX / window.innerWidth) * 2 -1
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
        //console.log(mouse.x)
    })

    const raycaster = new THREE.Raycaster()


/**
 * Animate
 */

    const clock = new THREE.Clock()

/**
 * Click Objetos
 */

    var timpoClik = 0 //Tiempo par evitar doble click

    // Lampara
        var booleanClickLampara = Boolean(false)

    // Drone
        var booleanClickDrone = Boolean(false)

    // Evento Click
        window.addEventListener('mousedown', (event) =>{ // Click
                raycaster.setFromCamera(mouse, camera)
                // Lampara
                    const intersectsLampara = raycaster.intersectObjects(LamparaC)
                    
                    for(const intersect of intersectsLampara){ 
                        if(timpoClik <= 0){
                            if(booleanClickLampara == false){  // Prender
                                console.log('Prender')
                    
                                scene.add(lamparaLight)
                                timpoClik = 1
                    
                                booleanClickLampara = true
                            }else{                      // Apagar
                                console.log('Apagar')
                    
                                scene.remove(lamparaLight)
                                timpoClik = 1
                        
                                booleanClickLampara = Boolean(false)
                            }
                        }
                    }
                
                // Drone
                const intersectsDrone = raycaster.intersectObjects(DroneC)
                    
                    for(const intersect of intersectsDrone){ 
                        if(timpoClik <= 0){
                            if(booleanClickDrone == false){  // Prender
                                console.log('Prender')
                    
                                pantalla.material = materialPantallaVideo
                                video.play()

                                droneClips.forEach( ( clip ) => {
                                    mixer.clipAction( clip ).play()
                                    
                                    i ++
                                } );
			                                
                                timpoClik = 1
                    
                                booleanClickDrone = true
                            }else{                      // Apagar
                                console.log('Apagar')

                                droneClips.forEach( ( clip ) => {
                                    mixer.clipAction( clip ).stop()
                                    i ++
                                } );
                                
                                pantalla.material = materialPantallaApagada
                                video.pause()
                                timpoClik = 1
                        
                                booleanClickDrone = Boolean(false)
                            }
                        }
                    }
        })


/**
 * Movimiento Camara / Raton
 */
    // Evento

    const composer = new EffectComposer( renderer );
    const renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );

    // const bloomPass = new UnrealBloomPass(
    //     new THREE.Vector2(window.innerWidth, window.innerHeight),
    //     1.5,
    //     0.4,
    //     0.85
    // );
    // console.log(bloomPass)
    // composer.addPass( bloomPass );

    const body = document.getElementById('contenido').style

/**
 * Update
 */
    const tick = () => {
        const elapsedTime = clock.getElapsedTime()

        if(timpoClik > 0){
            timpoClik -= 1
        }

        // Update objects
            const currentTimeLine = window.pageYOffset * 0.00015
            const x = currentTimeLine * Math.PI
            camera.position.set(x -0.9, 0.53 + x / 3.4, -0.277)
            //camera.lookAt(pantalla.position)

        // Camera Mouse
            if(x > 0.1 && window.innerWidth > 1400){   // Pantalla no fija
                camera.position.set(camera.position.x,camera.position.y,camera.position.z * mouse2.x)
                camera.lookAt(pantalla.position)
                body.background = 'transparent'
            }else{                                     // Pantalla fija
                camera.lookAt(pantalla.position)
                if(x < 0.1){
                    body.background = 'black'
                }else{
                    body.background = 'transparent'
                }
            }

        // Animation
            //var delta = clock.start(0);
            //if ( mixer ) mixer.update( delta  );
            if (mixer) mixer.update(0.014);

        // Light Help
            //helper.update()
            //helperVentana.update()

        // Render
            renderer.render(scene, camera)
            composer.render();

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

tick()