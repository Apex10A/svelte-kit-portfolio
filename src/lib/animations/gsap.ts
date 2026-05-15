import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger);
}

export const revealOnScroll = (element: HTMLElement, delay = 0) => {
	return gsap.from(element, {
		y: 50,
		opacity: 0,
		duration: 1,
		delay,
		ease: 'power3.out',
		scrollTrigger: {
			trigger: element,
			start: 'top 85%',
			toggleActions: 'play none none reverse'
		}
	});
};

export const staggerReveal = (elements: HTMLElement[] | string, delay = 0) => {
	return gsap.from(elements, {
		y: 30,
		opacity: 0,
		duration: 0.8,
		stagger: 0.2,
		delay,
		ease: 'power2.out',
		scrollTrigger: {
			trigger: typeof elements === 'string' ? elements : elements[0],
			start: 'top 85%',
			toggleActions: 'play none none reverse'
		}
	});
};

export const heroEntrance = (elements: {
	title: HTMLElement | null;
	subtitle: HTMLElement | null;
	cta: HTMLElement | null;
}) => {
	const tl = gsap.timeline();
	
	if (elements.title) {
		tl.from(elements.title, {
			y: 30,
			opacity: 0,
			duration: 1,
			ease: 'power4.out'
		});
	}
	
	if (elements.subtitle) {
		tl.from(elements.subtitle, {
			y: 20,
			opacity: 0,
			duration: 0.8,
			ease: 'power3.out'
		}, '-=0.6');
	}
	
	if (elements.cta) {
		tl.from(elements.cta, {
			y: 20,
			opacity: 0,
			duration: 0.8,
			ease: 'power3.out'
		}, '-=0.4');
	}
	
	return tl;
};
