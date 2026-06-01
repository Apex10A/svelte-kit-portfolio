type Cleanup = () => void;

function inkDensity(nx: number, ny: number, time: number): number {
	const headCx = 0.5;
	const headCy = 0.36;
	const headR = 0.17;
	const headDist = Math.hypot(nx - headCx, ny - headCy);
	const head = Math.max(0, 1 - headDist / headR);

	const shoulderCx = 0.5;
	const shoulderCy = 0.63;
	const shoulderRx = 0.34;
	const shoulderRy = 0.2;
	const sdx = (nx - shoulderCx) / shoulderRx;
	const sdy = (ny - shoulderCy) / shoulderRy;
	const shoulders = Math.max(0, 1 - Math.hypot(sdx, sdy));

	let density = Math.max(head * 0.92, shoulders * 0.72);

	const vignette = 1 - Math.hypot(nx - 0.5, ny - 0.52) * 0.9;
	density *= Math.max(0.12, vignette);

	const grain =
		Math.sin(nx * 92 + ny * 71 + time * 0.4) * 0.025 +
		Math.sin(nx * 41 - ny * 53) * 0.015;
	density += grain;

	return Math.min(1, Math.max(0, density));
}

function getInkColor(canvas: HTMLCanvasElement): string {
	const isDark = canvas.closest('.dark') !== null || document.documentElement.classList.contains('dark');
	return isDark ? '#f5e6c8' : '#1a1a1a';
}

export function initHalftonePlate(canvas: HTMLCanvasElement): Cleanup {
	const ctx = canvas.getContext('2d');
	if (!ctx) return () => {};

	const spacing = 5;
	let animationId = 0;
	let mouseX = 0.5;
	let mouseY = 0.5;
	let targetMouseX = 0.5;
	let targetMouseY = 0.5;
	let time = 0;
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const onMouseMove = (event: MouseEvent) => {
		const rect = canvas.getBoundingClientRect();
		targetMouseX = (event.clientX - rect.left) / rect.width;
		targetMouseY = (event.clientY - rect.top) / rect.height;
	};

	const onResize = () => {
		const rect = canvas.getBoundingClientRect();
		const dpr = Math.min(window.devicePixelRatio, 2);
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		draw();
	};

	const draw = () => {
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		if (!width || !height) return;

		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = getInkColor(canvas);

		mouseX += (targetMouseX - mouseX) * 0.06;
		mouseY += (targetMouseY - mouseY) * 0.06;

		for (let row = 0, y = spacing; y < height; row++, y += spacing) {
			const rowOffset = row % 2 === 0 ? 0 : spacing * 0.5;
			for (let x = spacing + rowOffset; x < width; x += spacing) {
				const nx = x / width;
				const ny = y / height;

				const parallaxX = (mouseX - 0.5) * 0.08;
				const parallaxY = (mouseY - 0.5) * 0.08;
				const density = inkDensity(nx + parallaxX, ny + parallaxY, time);

				if (density < 0.1) continue;

				const radius = density * spacing * 0.52;
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		ctx.globalAlpha = 0.35;
		ctx.font = 'bold 11px "Playfair Display SC", serif';
		ctx.textAlign = 'center';
		ctx.fillText('PA', width * 0.5, height * 0.54);
		ctx.globalAlpha = 1;
	};

	const animate = () => {
		if (!reducedMotion) {
			time += 0.016;
			draw();
			animationId = requestAnimationFrame(animate);
		}
	};

	const themeObserver = new MutationObserver(() => draw());
	themeObserver.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['class']
	});

	window.addEventListener('mousemove', onMouseMove);
	window.addEventListener('resize', onResize);
	onResize();
	if (!reducedMotion) animate();

	return () => {
		cancelAnimationFrame(animationId);
		themeObserver.disconnect();
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('resize', onResize);
	};
}
