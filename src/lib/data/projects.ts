import { DATA } from './portfolio';

export interface Project {
	title: string;
	description: string;
	tags: string[];
	demoLink: string;
	githubLink: string;
	page: string;
	section: string;
}

const SECTIONS = ['TECHNOLOGY', 'DESIGN', 'BUSINESS'];

export const projects: Project[] = DATA.projects.map((p, index) => ({
	title: p.title,
	description: p.description,
	tags: p.technologies,
	demoLink: p.external,
	githubLink: p.github,
	page: `${String.fromCharCode(65 + (index % 3))}${Math.floor(index / 3) + 1}`,
	section: SECTIONS[index % SECTIONS.length]
}));
