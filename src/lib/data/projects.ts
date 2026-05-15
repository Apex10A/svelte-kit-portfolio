export interface Project {
	title: string;
	description: string;
	tags: string[];
	demoLink: string;
	githubLink: string;
}

export const projects: Project[] = [
	{
		title: 'CryptoFlow Dashboard',
		description: 'Real-time crypto analytics dashboard with advanced filtering and live updates.',
		tags: ['Vue.js', 'TypeScript', 'ECharts', 'Pinia'],
		demoLink: 'https://example.com',
		githubLink: 'https://github.com'
	},
	{
		title: 'DevPortfolio',
		description: 'A professional, production-grade developer portfolio built with performance and accessibility in mind.',
		tags: ['SvelteKit', 'TypeScript', 'Three.js', 'GSAP', 'TailwindCSS'],
		demoLink: 'https://example.com',
		githubLink: 'https://github.com'
	},
	{
		title: 'E-Commerce API',
		description: 'Robust RESTful API supporting authentication, payments, and complex product management.',
		tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
		demoLink: 'https://example.com',
		githubLink: 'https://github.com'
	}
];
