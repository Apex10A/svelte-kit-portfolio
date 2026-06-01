type GsapInstance = typeof import('gsap').gsap;

let gsapPromise: Promise<GsapInstance | null> | null = null;

async function loadGsap(): Promise<GsapInstance | null> {
	if (typeof window === 'undefined') return null;

	if (!gsapPromise) {
		gsapPromise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
			([{ gsap }, { ScrollTrigger }]) => {
				gsap.registerPlugin(ScrollTrigger);
				return gsap;
			}
		);
	}

	return gsapPromise;
}

const prefersReducedMotion = () => {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export async function animateHero(elements: {
	headline: HTMLElement | null;
	breakingTag: HTMLElement | null;
	dropCap: HTMLElement | null;
	subheadline: HTMLElement | null;
	ctas: HTMLElement | null;
}) {
	if (prefersReducedMotion()) return;

	const gsap = await loadGsap();
	if (!gsap) return;

	const tl = gsap.timeline();

	if (elements.breakingTag) {
		tl.fromTo(
			elements.breakingTag,
			{ scale: 0.8, opacity: 0 },
			{ scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' }
		).to(elements.breakingTag, {
			scale: 1.05,
			duration: 0.2,
			yoyo: true,
			repeat: 1
		});
	}

	if (elements.headline) {
		const words = elements.headline.innerText.split(' ');
		elements.headline.innerHTML = words
			.map((word) => `<span class="inline-block">${word}</span>`)
			.join(' ');
		const spans = elements.headline.querySelectorAll('span');

		tl.from(
			spans,
			{
				y: 40,
				opacity: 0,
				duration: 0.8,
				stagger: 0.1,
				ease: 'power4.out'
			},
			'-=0.3'
		);
	}

	if (elements.dropCap) {
		tl.from(
			elements.dropCap,
			{
				scale: 0,
				transformOrigin: 'top left',
				duration: 1,
				ease: 'elastic.out(1, 0.5)'
			},
			'-=1'
		);
	}

	if (elements.subheadline) {
		tl.from(
			elements.subheadline,
			{
				opacity: 0,
				x: -20,
				duration: 0.8,
				ease: 'power3.out'
			},
			'-=0.5'
		);
	}

	if (elements.ctas) {
		tl.from(
			elements.ctas,
			{
				opacity: 0,
				y: 20,
				duration: 0.6,
				ease: 'power2.out'
			},
			'-=0.4'
		);
	}

	return tl;
}

export async function animateSectionBanner(element: HTMLElement) {
	if (prefersReducedMotion()) return;

	const gsap = await loadGsap();
	if (!gsap) return;

	gsap.fromTo(
		element,
		{ clipPath: 'inset(0 100% 0 0)' },
		{
			clipPath: 'inset(0 0% 0 0)',
			duration: 1.2,
			ease: 'power4.inOut',
			scrollTrigger: {
				trigger: element,
				start: 'top 90%',
				toggleActions: 'play none none reverse'
			}
		}
	);
}

export async function animateCards(elements: string | HTMLElement[]) {
	if (prefersReducedMotion()) return;

	const gsap = await loadGsap();
	if (!gsap) return;

	gsap.from(elements, {
		y: 50,
		opacity: 0,
		duration: 0.8,
		stagger: 0.2,
		ease: 'power3.out',
		scrollTrigger: {
			trigger: typeof elements === 'string' ? elements : elements[0],
			start: 'top 85%',
			toggleActions: 'play none none reverse'
		}
	});
}

export async function animateSkills(elements: string | HTMLElement[]) {
	if (prefersReducedMotion()) return;

	const gsap = await loadGsap();
	if (!gsap) return;

	gsap.from(elements, {
		scale: 0.5,
		opacity: 0,
		duration: 0.5,
		stagger: 0.05,
		ease: 'back.out(1.7)',
		scrollTrigger: {
			trigger: typeof elements === 'string' ? elements : elements[0],
			start: 'top 90%',
			toggleActions: 'play none none reverse'
		}
	});
}
