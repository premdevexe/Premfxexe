import { createClient } from '@sanity/client';

const projectId = process.env.VITE_SANITY_PROJECT_ID || '';
const hasSanity = Boolean(projectId && projectId !== 'kv5wjjmj' && projectId !== 'unconfigured');

const sanityClient = hasSanity ? createClient({
    projectId,
    dataset: process.env.VITE_SANITY_DATASET || 'production',
    useCdn: true,
    apiVersion: '2024-03-01',
}) : null;

// Tech stack filename -> human-readable name mapping for JSON-LD
const TECH_STACK_NAMES = {
    'reactlogo.webp': 'React',
    'htmllogo.webp': 'HTML5',
    'csslogo.webp': 'CSS3',
    'jslogo.webp': 'JavaScript',
    'tailwindlogo.webp': 'Tailwind CSS',
    'firebaselogo.webp': 'Firebase',
    'netlifylogo.webp': 'Netlify',
    'wordpresslogo.webp': 'WordPress',
    'elementorlogo.webp': 'Elementor',
    'phplogo.webp': 'PHP & Laravel',
};

const DEFAULT_PROJECTS = [
    {
        title: 'NammahSpot',
        seoTitle: 'NammahSpot — Local Business Discovery Platform',
        description: 'A platform focused on helping users discover local businesses and helping businesses improve their online presence with rich search and local SEO.',
        url: 'https://nammahspot.in/',
        techStack: ['Laravel', 'PHP', 'MySQL', 'Technical SEO', 'Tailwind CSS']
    },
    {
        title: 'Nool & Crop',
        seoTitle: 'Nool & Crop — E-Commerce Storefront',
        description: 'An e-commerce storefront focused on presenting products through a digital storefront with optimized conversion and product browsing.',
        url: 'https://noolandcrop.in/',
        techStack: ['React', 'Node.js', 'Tailwind CSS', 'E-Commerce']
    },
    {
        title: 'Cloudaspire',
        seoTitle: 'Cloudaspire — Web Solutions & Digital Marketing',
        description: 'Digital solutions provider in Puducherry specializing in website development, technical SEO, local SEO, and digital growth marketing.',
        url: 'https://github.com/priyakutti920',
        techStack: ['Web Development', 'Technical SEO', 'Local SEO', 'SMM']
    },
    {
        title: 'OpusZen',
        seoTitle: 'OpusZen — API Gateway Architecture',
        description: 'API and technology platform focusing on API gateway architecture, provider integrations, backend services, and secure API authentication.',
        url: 'https://github.com/priyakutti920',
        techStack: ['Node.js', 'Express', 'API Gateway', 'REST APIs']
    },
    {
        title: 'The Flash Provider',
        seoTitle: 'The Flash Provider — SMM Management Platform',
        description: 'Social media marketing platform providing automated growth services, service management, and multi-provider dispatch.',
        url: 'https://github.com/priyakutti920',
        techStack: ['Full-Stack', 'SMM', 'Service Management']
    },
    {
        title: 'Nura City',
        seoTitle: 'Nura City — City & Local Discovery Platform Concept',
        description: 'A digital city platform concept focused on local information, businesses, municipal services, and location-based discovery.',
        url: 'https://github.com/priyakutti920',
        techStack: ['React', 'Tailwind CSS', 'Location Discovery']
    }
];

/**
 * Helper to ensure dates are in ISO-8601 format with timezone for SEO.
 */
function formatIsoDate(dateString) {
    if (!dateString) return undefined;
    if (dateString.includes('T')) return dateString;
    return `${dateString}T12:00:00Z`;
}

/**
 * Build dynamic JSON-LD structured data.
 */
function buildJsonLd(globalInfo, projects, studio, awards, faqList) {
    const graph = [];
    const siteUrl = globalInfo?.siteUrl || 'https://premkumar.dev';
    const activeProjects = (projects && projects.length > 0) ? projects : DEFAULT_PROJECTS;

    // --- 1. Person ---
    const person = {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: globalInfo?.name || 'Prem Kumar',
        alternateName: ['Prem', 'Prem Kumar Dev'],
        url: siteUrl,
        jobTitle: globalInfo?.jobTitle || 'Developer & Digital Product Builder',
        description: globalInfo?.aboutMe || "I'm Prem Kumar, a developer and digital professional focused on building modern websites, web applications, digital platforms, and growth-focused solutions. I combine development, SEO, performance optimization, and digital marketing to turn ideas into useful digital products.",
        knowsAbout: [
            'Laravel', 'PHP', 'React', 'Three.js', 'JavaScript', 'TypeScript',
            'Tailwind CSS', 'Node.js', 'Express', 'MySQL', 'PostgreSQL', 'REST APIs',
            'Technical SEO', 'Local SEO', 'Structured Data', 'SMM', 'Digital Marketing'
        ],
        sameAs: [
            globalInfo?.githubUrl || 'https://github.com/priyakutti920',
            globalInfo?.linkedinUrl,
            globalInfo?.instagramUrl,
            globalInfo?.xUrl,
        ].filter(Boolean)
    };
    graph.push(person);

    // --- 2. WebSite ---
    const website = {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: globalInfo?.siteTitle || 'Prem Kumar | Developer, Laravel & SEO Specialist',
        description: globalInfo?.siteDescription || 'Explore Prem Kumar\'s portfolio of web development, Laravel applications, digital products, SEO projects, and digital marketing solutions.',
        publisher: { '@id': `${siteUrl}/#person` }
    };
    graph.push(website);

    // --- 3. ProfilePage ---
    const profilePage = {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profilepage`,
        url: siteUrl,
        mainEntity: { '@id': `${siteUrl}/#person` },
        about: { '@id': `${siteUrl}/#person` }
    };
    graph.push(profilePage);

    // --- 4. FAQPage ---
    if (faqList && faqList.length > 0) {
        const faqPage = {
            '@type': 'FAQPage',
            '@id': `${siteUrl}/#faq`,
            mainEntity: faqList.map(item => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer
                }
            }))
        };
        graph.push(faqPage);
    }

    // --- 5. ItemList: Portfolio Projects ---
    graph.push({
        '@type': 'ItemList',
        '@id': `${siteUrl}/#projectslist`,
        name: 'Portfolio Projects by Prem Kumar',
        description: 'Selected web applications, Laravel backends, and digital products by Prem Kumar.',
        numberOfItems: activeProjects.length,
        itemListElement: activeProjects.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'CreativeWork',
                name: p.seoTitle || p.title,
                description: p.seoDescription || p.description || '',
                url: p.url || undefined,
                creator: { '@id': `${siteUrl}/#person` },
                ...(p.techStack && p.techStack.length > 0 ? {
                    keywords: p.techStack.map(t => TECH_STACK_NAMES[t] || t).join(', ')
                } : {}),
            }
        }))
    });

    // Individual CreativeWork entries
    activeProjects.forEach(p => {
        const projectSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        graph.push({
            '@type': 'CreativeWork',
            '@id': `${siteUrl}/#project-${projectSlug}`,
            name: p.seoTitle || p.title,
            description: p.seoDescription || p.description || '',
            url: p.url || undefined,
            creator: { '@id': `${siteUrl}/#person` },
            ...(p.techStack && p.techStack.length > 0 ? {
                keywords: p.techStack.map(t => TECH_STACK_NAMES[t] || t).join(', ')
            } : {}),
        });
    });

    return {
        '@context': 'https://schema.org',
        '@graph': graph
    };
}

// Helper to generate the llms.txt content in clean Markdown
function buildLlmsTxt(globalInfo, projects, studio, awards, faqList) {
    const siteTitle = globalInfo?.siteTitle || 'Prem Kumar | Developer, Laravel & SEO Specialist';
    const siteDescription = globalInfo?.siteDescription || 'Building Digital Experiences That Perform, Rank & Grow.';
    const aboutMe = globalInfo?.aboutMe || "I'm Prem Kumar, a developer and digital professional focused on building modern websites, web applications, digital platforms, and growth-focused solutions. I combine development, SEO, performance optimization, and digital marketing to turn ideas into useful digital products.";
    const activeProjects = (projects && projects.length > 0) ? projects : DEFAULT_PROJECTS;

    let content = `# ${siteTitle}\n`;
    content += `> ${siteDescription}\n\n`;

    content += `## Biography / About Me\n`;
    content += `${aboutMe}\n\n`;

    content += `## Professional Roles\n`;
    content += `- Laravel Developer\n`;
    content += `- Full-Stack Developer\n`;
    content += `- Website Creator\n`;
    content += `- SEO Specialist\n`;
    content += `- Digital Marketing Professional\n`;
    content += `- SMM Professional\n\n`;

    content += `## Core Technologies & Skills\n`;
    content += `- **Backend:** Laravel, PHP, Node.js, Express.js, REST APIs.\n`;
    content += `- **Frontend:** HTML5, CSS3, JavaScript (ES6+), React, Vite, Tailwind CSS.\n`;
    content += `- **Databases:** MySQL, PostgreSQL, Supabase, SQL.\n`;
    content += `- **SEO:** Technical SEO, On-Page SEO, Local SEO, Keyword Research, Sitemap Optimization, Structured Data, Google Search Console.\n`;
    content += `- **Digital Marketing:** Social Media Marketing (SMM), Content Strategy, Digital Branding, Google Ads.\n`;
    content += `- **Tools:** Git, GitHub, XAMPP, phpMyAdmin, Vercel, Railway, Render.\n\n`;

    content += `## Selected Portfolio Projects\n`;
    activeProjects.forEach(p => {
        const tech = p.techStack ? ` (Tech: ${p.techStack.map(t => TECH_STACK_NAMES[t] || t).join(', ')})` : '';
        content += `- [${p.seoTitle || p.title}](${p.url || 'https://github.com/priyakutti920'}): ${p.seoDescription || p.description || ''}${tech}\n`;
    });
    content += `\n`;

    if (studio && studio.length > 0) {
        content += `## Studio Content & Case Studies\n`;
        studio.forEach(s => {
            content += `- [${s.seoTitle || s.title} (${s.platform})](${s.url || 'https://github.com/priyakutti920'}): ${s.seoDescription || s.description || ''}\n`;
        });
        content += `\n`;
    }

    if (faqList && faqList.length > 0) {
        content += `## Frequently Asked Questions (FAQ)\n`;
        faqList.forEach(item => {
            content += `- **${item.question}**\n`;
            content += `  ${item.answer.replace(/\n/g, '\n  ')}\n`;
        });
    }

    return content;
}

export function generateSeoHtml() {
    let cachedLlmsContent = '';

    async function getLlmsContent() {
        if (!cachedLlmsContent) {
            if (sanityClient) {
                try {
                    const [globalInfo, projects, studio, awards, faqList] = await Promise.all([
                        sanityClient.fetch(`*[_id == "globalInfo"][0]`),
                        sanityClient.fetch(`*[_type == "galleryProject"]`),
                        sanityClient.fetch(`*[_type == "studioItem"]`),
                        sanityClient.fetch(`*[_type == "awardCertificate"]`),
                        sanityClient.fetch(`*[_type == "faq"]`)
                    ]);
                    cachedLlmsContent = buildLlmsTxt(globalInfo, projects, studio, awards, faqList);
                } catch (e) {
                    cachedLlmsContent = buildLlmsTxt(null, null, null, null, null);
                }
            } else {
                cachedLlmsContent = buildLlmsTxt(null, null, null, null, null);
            }
        }
        return cachedLlmsContent;
    }

    return {
        name: 'sanity-seo-plugin',

        // Serve llms.txt in local development mode
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                if (req.url === '/llms.txt') {
                    const content = await getLlmsContent();
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end(content);
                } else {
                    next();
                }
            });
        },

        // This hook runs when Vite generates or serves index.html
        async transformIndexHtml(html) {
            try {
                let globalInfo = null;
                let projects = null;
                let studio = null;
                let awards = null;
                let faqList = null;

                if (sanityClient) {
                    try {
                        [globalInfo, projects, studio, awards, faqList] = await Promise.all([
                            sanityClient.fetch(`*[_id == "globalInfo"][0]`),
                            sanityClient.fetch(`*[_type == "galleryProject"]`),
                            sanityClient.fetch(`*[_type == "studioItem"] { ..., "thumbnailUrl": frontTexture.asset->url }`),
                            sanityClient.fetch(`*[_type == "awardCertificate"]`),
                            sanityClient.fetch(`*[_type == "faq"]`)
                        ]);
                    } catch (e) {
                        // Use default local fallbacks
                    }
                }

                // Fallback values for Prem Kumar
                const siteTitle = globalInfo?.siteTitle || 'Prem Kumar | Developer, Laravel & SEO Specialist';
                const siteDescription = globalInfo?.siteDescription || 'Explore Prem Kumar\'s portfolio of web development, Laravel applications, digital products, SEO projects, and digital marketing solutions.';
                const aboutMe = globalInfo?.aboutMe || "I'm Prem Kumar, a developer and digital professional focused on building modern websites, web applications, digital platforms, and growth-focused solutions. I combine development, SEO, performance optimization, and digital marketing to turn ideas into useful digital products.";
                const activeProjects = (projects && projects.length > 0) ? projects : DEFAULT_PROJECTS;

                // Cache llms.txt content
                cachedLlmsContent = buildLlmsTxt(globalInfo, projects, studio, awards, faqList);

                // ====== PART 1: Build semantic HTML string ======
                let seoHtml = `\n<div id="seo-content" class="sr-only-seo">\n`;
                seoHtml += `  <header>\n`;
                seoHtml += `    <h1>${siteTitle}</h1>\n`;
                seoHtml += `    <p>${siteDescription}</p>\n`;
                seoHtml += `  </header>\n`;

                seoHtml += `  <section id="about">\n`;
                seoHtml += `    <h2>About Prem Kumar</h2>\n`;
                seoHtml += `    <p>${aboutMe}</p>\n`;
                seoHtml += `    <a href="${globalInfo?.githubUrl || 'https://github.com/priyakutti920'}">GitHub</a>\n`;
                if (globalInfo?.linkedinUrl) seoHtml += `    <a href="${globalInfo.linkedinUrl}">LinkedIn</a>\n`;
                seoHtml += `  </section>\n`;

                seoHtml += `  <section id="projects">\n    <h2>Projects</h2>\n    <ul>\n`;
                activeProjects.forEach(p => {
                    seoHtml += `      <li>\n        <h3>${p.seoTitle || p.title}</h3>\n        <p>${p.seoDescription || p.description || ''}</p>\n        ${p.url ? `<a href="${p.url}">Visit ${p.seoTitle || p.title}</a>\n` : ''}      </li>\n`;
                });
                seoHtml += `    </ul>\n  </section>\n`;

                if (studio && studio.length > 0) {
                    seoHtml += `  <section id="studio">\n    <h2>The Studio (Content)</h2>\n    <ul>\n`;
                    studio.forEach(s => {
                        seoHtml += `      <li>\n        <h3>${s.seoTitle || s.title} (${s.platform})</h3>\n        <p>${s.seoDescription || s.description || ''}</p>\n        ${s.url ? `<a href="${s.url}">View Content</a>\n` : ''}      </li>\n`;
                    });
                    seoHtml += `    </ul>\n  </section>\n`;
                }

                if (faqList && faqList.length > 0) {
                    seoHtml += `  <section id="faq">\n    <h2>Frequently Asked Questions (FAQ)</h2>\n`;
                    faqList.forEach(item => {
                        seoHtml += `    <article>\n      <h3>${item.question}</h3>\n      <p>${item.answer}</p>\n    </article>\n`;
                    });
                    seoHtml += `  </section>\n`;
                }

                seoHtml += `</div>\n`;

                // ====== PART 2: Build dynamic JSON-LD ======
                const jsonLdSchemas = buildJsonLd(globalInfo, projects, studio, awards, faqList);
                const jsonLdScript = `\n  <!-- Dynamic Structured Data (JSON-LD) — generated at build time -->\n  <script type="application/ld+json">\n${JSON.stringify(jsonLdSchemas, null, 2)}\n  </script>\n`;

                // ====== PART 3: Transform HTML ======
                let transformedHtml = html.replace(
                    /<title>(.*?)<\/title>/,
                    `<title>${siteTitle}</title>`
                );
                
                if (transformedHtml.includes('<meta name="description"')) {
                    transformedHtml = transformedHtml.replace(
                        /<meta name="description" content="(.*?)"\s*\/?>/,
                        `<meta name="description" content="${siteDescription}" />`
                    );
                }

                // Update Open Graph metadata
                transformedHtml = transformedHtml
                    .replace(
                        /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
                        `<meta property="og:title" content="${siteTitle}" />`
                    )
                    .replace(
                        /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
                        `<meta property="og:description" content="${siteDescription}" />`
                    );

                // Update Twitter metadata
                transformedHtml = transformedHtml
                    .replace(
                        /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
                        `<meta name="twitter:title" content="${siteTitle}" />`
                    )
                    .replace(
                        /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
                        `<meta name="twitter:description" content="${siteDescription}" />`
                    );

                transformedHtml = transformedHtml.replace('</head>', `${jsonLdScript}</head>`);

                if (transformedHtml.includes('id="seo-content"')) {
                    transformedHtml = transformedHtml.replace(
                        /<div id="seo-content" class="sr-only-seo">[\s\S]*?<\/div>/,
                        seoHtml
                    );
                } else {
                    transformedHtml = transformedHtml.replace('</body>', `${seoHtml}</body>`);
                }

                return transformedHtml;
            } catch (error) {
                console.error('SEO Plugin Error: Failed to generate SEO HTML', error);
                return html;
            }
        },

        // Emit llms.txt to the build output directory
        async generateBundle() {
            const content = await getLlmsContent();
            this.emitFile({
                type: 'asset',
                fileName: 'llms.txt',
                source: content
            });
        }
    };
}
