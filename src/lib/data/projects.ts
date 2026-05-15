export interface Project {
	title: string;
	description: string;
	tags: string[];
	demoLink: string;
	githubLink: string;
	page: string;
	section: string;
}

export const projects: Project[] = [
	{
		title: 'CryptoFlow Dashboard',
		description: 'A revolutionary real-time crypto analytics dashboard featuring live price streaming via WebSockets, interactive financial charts, and a seamless adaptive interface for modern traders.',
		tags: ['Vue.js', 'TypeScript', 'ECharts', 'Pinia', 'TailwindCSS'],
		demoLink: 'https://example.com',
		githubLink: 'https://github.com',
		page: 'A1',
		section: 'TECHNOLOGY'
	},
	{
		title: 'The Dev Chronicle',
		description: 'An interactive newspaper-themed developer portfolio that pushes the boundaries of web typography and 3D rendering. Built with custom ink-dissolve particle effects and editorial-grade GSAP animations.',
		tags: ['SvelteKit', 'TypeScript', 'Three.js', 'GSAP', 'TailwindCSS'],
		demoLink: 'https://example.com',
		githubLink: 'https://github.com',
		page: 'B4',
		section: 'DESIGN'
	},
	{
		title: 'Commerce API',
		description: 'A production-ready RESTful backbone engineered for scale. Implements robust JWT authentication, secure Stripe payment integration, and optimized PostgreSQL relational database management.',
		tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Stripe'],
		demoLink: 'https://example.com',
		githubLink: 'https://github.com',
		page: 'C2',
		section: 'BUSINESS'
	}
];
