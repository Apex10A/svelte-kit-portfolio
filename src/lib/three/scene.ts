import * as THREE from 'three';

export class HeroScene {
	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private renderer: THREE.WebGLRenderer;
	private container: HTMLElement;
	private objects: THREE.Mesh[] = [];
	private animationId: number | null = null;
	private mouseX = 0;
	private mouseY = 0;

	constructor(container: HTMLElement) {
		this.container = container;
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(
			75,
			this.container.clientWidth / this.container.clientHeight,
			0.1,
			1000
		);
		this.camera.position.z = 5;

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
		this.container.appendChild(this.renderer.domElement);

		this.initObjects();
		this.initLights();
		this.initEvents();
		this.animate();
	}

	private initObjects() {
		const brandColor = 0x00ff88;

		// Icosahedron
		const icosahedronGeo = new THREE.IcosahedronGeometry(1.5, 1);
		const wireframeMat = new THREE.MeshBasicMaterial({
			color: brandColor,
			wireframe: true,
			transparent: true,
			opacity: 0.3
		});
		const icosahedron = new THREE.Mesh(icosahedronGeo, wireframeMat);
		icosahedron.position.set(-2, 0, 0);
		this.scene.add(icosahedron);
		this.objects.push(icosahedron);

		// Torus
		const torusGeo = new THREE.TorusGeometry(1, 0.4, 16, 100);
		const torus = new THREE.Mesh(torusGeo, wireframeMat);
		torus.position.set(2, 0, 0);
		this.scene.add(torus);
		this.objects.push(torus);
	}

	private initLights() {
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		this.scene.add(ambientLight);
	}

	private initEvents() {
		window.addEventListener('resize', this.onResize.bind(this));
		window.addEventListener('mousemove', this.onMouseMove.bind(this));
	}

	private onResize() {
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
	}

	private onMouseMove(event: MouseEvent) {
		this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
		this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
	}

	private animate() {
		this.animationId = requestAnimationFrame(this.animate.bind(this));

		this.objects.forEach((obj, i) => {
			obj.rotation.x += 0.005;
			obj.rotation.y += 0.005;

			// Subtle parallax
			const factor = i === 0 ? 0.5 : -0.5;
			obj.position.x += (this.mouseX * factor - obj.position.x) * 0.05;
			obj.position.y += (this.mouseY * factor - obj.position.y) * 0.05;
		});

		this.renderer.render(this.scene, this.camera);
	}

	public dispose() {
		if (this.animationId) cancelAnimationFrame(this.animationId);
		window.removeEventListener('resize', this.onResize);
		window.removeEventListener('mousemove', this.onMouseMove);

		this.scene.traverse((object) => {
			if (object instanceof THREE.Mesh) {
				object.geometry.dispose();
				if (Array.isArray(object.material)) {
					object.material.forEach((mat) => mat.dispose());
				} else {
					object.material.dispose();
				}
			}
		});

		this.renderer.dispose();
		if (this.container.contains(this.renderer.domElement)) {
			this.container.removeChild(this.renderer.domElement);
		}
	}
}
