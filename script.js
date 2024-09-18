import * as THREE from './node_modules/three/build/three.cjs'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from './node_modules/three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from './node_modules/three/examples/jsm/geometries/TextGeometry.js'
import GUI from './node_modules/lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Axis  helper
const axisHelper = new THREE.AxesHelper()
//scene.add(axisHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/8.png')
const donoutTexture = textureLoader.load('textures/matcaps/2.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
donoutTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Fonts
 */
const fontLoader = new FontLoader()
const textGerometry = new TextGeometry()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        console.log('font loaded') // debug
        const textGeometry = new TextGeometry(
            'Ahmad Mahagna',
            {
                font: font,
                size: 0.6,
                depth: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        textGeometry.computeBoundingBox()
        //console.log(textGeometry.boundingBox) //debugging
        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const text = new THREE.Mesh(textGeometry, textMaterial)
        textGeometry.center()
        scene.add(text)
    }
)

//monitoring
console.time()


/**
 * Object
 */
// optimization step create mesh once
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 40)
const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: donoutTexture })
for (let i = 0; i <100; i++)
{
    const donut = new THREE.Mesh(donutGeometry, donutMaterial)

    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10

    donut.rotation.x = (Math.random() - 0.5) * 10
    donut.rotation.y = (Math.random() - 0.5) * 10
    donut.rotation.z = (Math.random() - 0.5) * 10

    const scale = (Math.random())

    donut.scale.set(scale, scale, scale)

    scene.add(donut)
}

console.timeEnd()

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()