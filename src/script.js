import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; 
// import * as dat from 'dat.gui';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

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
        video.src = "./Videos/video.mp4"

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
            linkImpresionBooClcik = false
            linkPremiereBooClcik = false
        }

        let infoTitle = document.getElementById('infoTitle')
        let infoSubTitle = document.getElementById('infoSubTitle')
        let infoText = document.getElementById('infoText')

        let Estrella1 = document.getElementById('Estrella1').style
        let Estrella2 = document.getElementById('Estrella2').style
        let Estrella3 = document.getElementById('Estrella3').style
        let Estrella4 = document.getElementById('Estrella4').style
        let Estrella5 = document.getElementById('Estrella5').style

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
                        infoSubTitle.textContent = 'Mi Mayor Pasión:'
                        infoText.textContent = 'Llevo utilizando Unity desde 2015 y he creado más de 10 proyectos y un juego completo. Con estos proyectos he aprendido a programar en C# (nivel avanzado-medio), creación de escenarios 3D y 2D, animaciones, físicas, shaders, partículas, diseño UX & UI, realidad virtual...'
                        
                        Estrella1.color = "#7ace67"
                        Estrella2.color = "#7ace67"
                        Estrella3.color = "#7ace67"
                        Estrella4.color = "#7ace67"
                        Estrella5.color = "black"
                        
                        InfoDiv.animation = 'infoDivAnim 200ms ease-out';
                        linkUnityBooClcik = true

                        linkBlenderBooClcik = false
                        linkSolidityBooClcik = false
                        linkHTMLCSSJSBooClcik = false
                        linkImpresionBooClcik = false
                        linkPremiereBooClcik = false
                    } else{
                        InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                        InfoDiv.animationFillMode = 'forwards';

                        // Close

                        linkUnityBooClcik = false
                        linkBlenderBooClcik = false
                        linkSolidityBooClcik = false
                        linkHTMLCSSJSBooClcik = false
                        linkImpresionBooClcik = false
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
                            infoSubTitle.textContent = 'El Mejor Programa De Modelado 3D:'
                            infoText.textContent = 'Cuando empecé a hacer videojuegos en unity me di cuenta que los modelos que había en internet no se adecuaban a mis necesidades, por lo que decidí aprender un programa que me permitiese hacer cualquier tipo de modelo y ese fue blender. En los 4 años que llevo usándolo he aprendido a modelar, animar, hacer renders, también he aprendido sobre nodos y simulación de fluidos...'
                            
                            Estrella1.color = "#7ace67"
                            Estrella2.color = "#7ace67"
                            Estrella3.color = "#7ace67"
                            Estrella4.color = "#7ace67"
                            Estrella5.color = "black"
                            
                            InfoDiv.animation = 'infoDivAnim 200ms ease-out';
                            linkBlenderBooClcik = true

                            linkUnityBooClcik = false
                            linkSolidityBooClcik = false
                            linkHTMLCSSJSBooClcik = false
                            linkImpresionBooClcik = false
                            linkPremiereBooClcik = false
                        } else{
                            InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                            InfoDiv.animationFillMode = 'forwards';
                            
                            // Close

                            linkUnityBooClcik = false
                            linkBlenderBooClcik = false
                            linkSolidityBooClcik = false
                            linkHTMLCSSJSBooClcik = false
                            linkImpresionBooClcik = false
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
                            infoTitle.textContent = 'HTML CSS JS'
                            infoSubTitle.textContent = 'Si No Estas En Internet No Existes:'
                            infoText.textContent = 'Siempre me ha picado la curiosidad con saber como se hacen las webs, pero no fue hasta el segundo año del grado medio en sistemas microinformáticos y redes que me puse a aprender html, css y java. Ya sabia programar en C# por lo que se me hizo muy sencillo aprenderlo, una vez que sabia lo básico investigue por internet y aprendí sobre Three.js, diseño responsive y programación en javascript.'
                            
                            Estrella1.color = "#7ace67"
                            Estrella2.color = "#7ace67"
                            Estrella3.color = "#7ace67"
                            Estrella4.color = "black"
                            Estrella5.color = "black"
                            
                            InfoDiv.animation = 'infoDivAnim 200ms ease-out';
                            linkHTMLCSSJSBooClcik = true

                            linkUnityBooClcik = false
                            linkBlenderBooClcik = false
                            linkSolidityBooClcik = false
                            linkImpresionBooClcik = false
                            linkPremiereBooClcik = false
                        } else{
                            InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                            InfoDiv.animationFillMode = 'forwards';

                            // Close

                            linkUnityBooClcik = false
                            linkBlenderBooClcik = false
                            linkSolidityBooClcik = false
                            linkHTMLCSSJSBooClcik = false
                            linkImpresionBooClcik = false
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
                            
                            Estrella1.color = "#7ace67"
                            Estrella2.color = "#7ace67"
                            Estrella3.color = "#7ace67"
                            Estrella4.color = "black"
                            Estrella5.color = "black"
                            
                            InfoDiv.animation = 'infoDivAnim 200ms ease-out';
                            linkSolidityBooClcik = true

                            linkUnityBooClcik = false
                            linkBlenderBooClcik = false
                            linkHTMLCSSJSBooClcik = false
                            linkImpresionBooClcik = false
                            linkPremiereBooClcik = false
                        } else{
                            InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                            InfoDiv.animationFillMode = 'forwards';
                            
                            // Close

                            linkUnityBooClcik = false
                            linkBlenderBooClcik = false
                            linkSolidityBooClcik = false
                            linkHTMLCSSJSBooClcik = false
                            linkImpresionBooClcik = false
                            linkPremiereBooClcik = false
                        }
                    }
        
        // Impresion 3D
            // Pantalla
            var ImpresionTexture = new THREE.TextureLoader().load('IMG/After-Effects.jpg')
            let materialPantallaImpresion= new THREE.MeshBasicMaterial({map: ImpresionTexture})

            let linkImpresion= document.getElementById('LinkWork6')
            console.log(linkImpresion)
            linkImpresion.onmouseover = linkImpresionFN
            linkImpresion.onmouseout = linkImpresionFN
            var linkImpresionBoo = Boolean(false)
                function linkImpresionFN(evento){
                    if(booleanClickDrone == false)
                    {
                        if(linkImpresionBoo != true){
                            pantalla.material = materialPantallaImpresion
                            linkImpresionBoo = true
                        }else{
                            pantalla.material = materialPantallaApagada
                            linkImpresionBoo = false
                        }
                    }
                }
                
                // Contenido

                linkImpresion.onclick = clickLinkImpresion
                var linkImpresionBooClcik = Boolean(false)
                    function clickLinkImpresion(){
                        if(linkImpresionBooClcik== false){
                            InfoDiv.display = "block"
                            infoTitle.textContent = 'Impresion 3D'
                            infoSubTitle.textContent = 'Del Mundo Virtual Al Real:'
                            infoText.textContent = 'Empecé la impresión en 3D en el año 2019 y junto con un compañero de clase montamos un pequeño proyecto, el proyecto se llamo ¨SupaPrint¨ y ofrecíamos el servicio de impresión, es decir la gente nos contactaba y nosotros imprimíamos lo que nos pidiesen, desde figuras, llaveros... hasta piezas mecánicas. He utilizado impresoras de filamento tradicional y impresoras láser de resina.'
                            
                            Estrella1.color = "#7ace67"
                            Estrella2.color = "#7ace67"
                            Estrella3.color = "#7ace67"
                            Estrella4.color = "#7ace67"
                            Estrella5.color = "black"
                            
                            InfoDiv.animation = 'infoDivAnim 200ms ease-out';
                            linkImpresionBooClcik = true

                            linkUnityBooClcik = false
                            linkBlenderBooClcik = false
                            linkSolidityBooClcik = false
                            linkHTMLCSSJSBooClcik = false
                            linkPremiereBooClcik = false
                        } else{
                            InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                            InfoDiv.animationFillMode = 'forwards';
                            
                            // Close

                            linkUnityBooClcik = false
                            linkBlenderBooClcik = false
                            linkSolidityBooClcik = false
                            linkHTMLCSSJSBooClcik = false
                            linkImpresionBooClcik = false
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
                        infoSubTitle.textContent = 'El Mejor Software De Edición De Vídeo:'
                        infoText.textContent = 'Cuando tenia al rededor de 10 años empecé a editar vídeo con el programa camtasia pero se me quedaba pequeño para lo que yo quería hacer. Después de unos años encontré el programa premiere pro y con el aprendí a editar de verdad. En el canal de youtube donde voy subiendo mis vídeos filmados con drones, tengo también directos en los que se ve como uso premiere pro y after effects. También podéis ver un pequeño vídeo en esta web o bien clicando sobre el drone que hay en el escritorio o clicando sobre la entrada que dice ¨Piloto De Drones¨.'
                        
                        Estrella1.color = "#7ace67"
                        Estrella2.color = "#7ace67"
                        Estrella3.color = "#7ace67"
                        Estrella4.color = "black"
                        Estrella5.color = "black"
                        
                        InfoDiv.animation = 'infoDivAnim 200ms ease-out';
                        linkPremiereBooClcik = true

                        linkUnityBooClcik = false
                        linkBlenderBooClcik = false
                        linkSolidityBooClcik = false
                        linkHTMLCSSJSBooClcik = false
                        linkImpresionBooClcik = false   
                    } else{
                        InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                        InfoDiv.animationFillMode = 'forwards';
                        
                        // Close

                        linkUnityBooClcik = false
                        linkBlenderBooClcik = false
                        linkSolidityBooClcik = false
                        linkHTMLCSSJSBooClcik = false
                        linkImpresionBooClcik = false
                        linkPremiereBooClcik = false
                    }
                }

        // Piloto De Drones
            // Pantalla
            var pilotoTexture = new THREE.TextureLoader().load('IMG/Click.jpg')
            let materialPantallaPiloto= new THREE.MeshBasicMaterial({map: pilotoTexture})

            let linkPiloto= document.getElementById('LinkWork7')
            linkPiloto.onmouseover = linkPilotoFN
            linkPiloto.onmouseout = linkPilotoFN
            var linkPilotoBoo = Boolean(false)
                function linkPilotoFN(evento){
                    if(booleanClickDrone == false)
                    {
                        if(linkPilotoBoo != true){
                            pantalla.material = materialPantallaPiloto
                            linkPilotoBoo = true
                        }else{
                            pantalla.material = materialPantallaApagada
                            linkPilotoBoo = false
                        }
                    } else{
                        if(linkPilotoBoo != true){
                            linkPilotoBoo = true
                        }else{
                            linkPilotoBoo = false
                        }
                    }
                }

            // Contenido

            linkPiloto.onclick = linkPilotoClickFN
                function linkPilotoClickFN(evento){

                        InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                        InfoDiv.animationFillMode = 'forwards';
                        
                        // Close

                        linkUnityBooClcik = false
                        linkBlenderBooClcik = false
                        linkSolidityBooClcik = false
                        linkHTMLCSSJSBooClcik = false
                        linkImpresionBooClcik = false
                        linkPremiereBooClcik = false

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
        const lamparaLight = new THREE.SpotLight(0xffe892, 40, 0.18, Math.PI/3.5, 0.9, 1)
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

                                InfoDiv.animation = 'infoDivAnimSalida 200ms ease-out';
                                InfoDiv.animationFillMode = 'forwards';
                                
                                // Close
        
                                linkUnityBooClcik = false
                                linkBlenderBooClcik = false
                                linkSolidityBooClcik = false
                                linkHTMLCSSJSBooClcik = false
                                linkImpresionBooClcik = false
                                linkPremiereBooClcik = false

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

 var delta = 0
 var speed = 120

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
            delta = clock.getDelta();
            //if ( mixer ) mixer.update( delta  );
            if (mixer) mixer.update(delta * speed);
            //console.log(delta)

        // Light Help
            //helper.update()
            //helperVentana.update()

        // Render
            renderer.render(scene, camera)
            composer.render();

        // Call tick again on the next frame
        requestAnimationFrame(tick)
    }

tick()