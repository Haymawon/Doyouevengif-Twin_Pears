import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import './styles/global.css'

const router = createRouter();

// --- Global Title Blinking Feature ---
let originalTitle = document.title;
let blinkInterval: number | undefined;
document.addEventListener('visibilitychange', function () {
	if (document.hidden) {
		blinkInterval = window.setInterval(() => {
			document.title = document.title === 'Wait! Come back!'
				? originalTitle
				: 'Wait! Come back!';
		}, 1000);
	} else {
		clearInterval(blinkInterval);
		document.title = originalTitle;
	}
});

// --- Global Title Update on Route Change ---
router.afterEach((to) => {
	// Default site title and description
	let title = 'Twin Pears';
	if (to.name === 'post' && to.params.slug) {
		// Try to get post title from blogPosts
		try {
			// Dynamic import to avoid circular deps
			const posts = require('./data/posts');
			const post = posts.blogPosts.find((p: any) => p.slug === to.params.slug);
			if (post) title = `${post.title} — Twin Pears`;
		} catch {}
	} else if (to.name === 'about') {
		title = 'About — Twin Pears';
	} else if (to.name === 'contact') {
		title = 'Contact — Twin Pears';
	} else if (to.name === 'privacy') {
		title = 'Privacy Policy — Twin Pears';
	}
	document.title = title;
	originalTitle = title;
});

createApp(App).use(router).mount('#app')