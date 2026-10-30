/**
 * Studio Content Data
 * 
 * Content items for the Studio monitor tower.
 * Platforms: 'youtube', 'blog', 'tiktok'
 */

export const PLATFORM_CONFIG = {
    youtube: {
        color: '#FF0000',
        accentColor: '#cc0000',
        icon: '▶',
        label: 'Tech Breakdown',
        shape: 'tv', // Wide CRT style
    },
    blog: {
        color: '#4A90D9',
        accentColor: '#2d6cb5',
        icon: '📝',
        label: 'Case Study',
        shape: 'monitor', // Thin desktop monitor
    },
    tiktok: {
        color: '#00F2EA',
        accentColor: '#FF0050',
        icon: '⚡',
        label: 'Dev Highlights',
        shape: 'phone', // Vertical phone
    },
    instagram: {
        color: '#E1306C',
        accentColor: '#C13584',
        icon: '📷',
        label: 'Instagram',
        shape: 'phone',
    },
    x: {
        color: '#000000',
        accentColor: '#14171A',
        icon: '𝕏',
        label: 'X (Twitter)',
        shape: 'monitor',
    },
    linkedin: {
        color: '#0077B5',
        accentColor: '#005E93',
        icon: 'in',
        label: 'LinkedIn',
        shape: 'monitor',
    },
    codrops: {
        color: '#0099FF',
        accentColor: '#0077CC',
        icon: '💧',
        label: 'Codrops',
        shape: 'monitor',
    },
};

const RAW_CONTENT_DATA = [
    // ============ Tech Breakdowns (TV / CRT) ============
    {
        id: 'yt-001',
        platform: 'youtube',
        title: 'NammahSpot: Local Business Discovery Architecture',
        description: 'How we engineered a high-performance local discovery directory connecting users with local services, featuring location-based search, rich schema indexing, and fast response times.',
        frontTexture: '/textures/studio/tvfront_nammahspot.webp',
        paintedFrontTexture: '/textures/studio/tvfront_nammahspot_painted.webp',
        thumbnail: null,
        url: 'https://nammahspot.in/',
        date: '2026-02-15',
        views: '1.8K',
        duration: '14:20',
    },
    {
        id: 'yt-002',
        platform: 'youtube',
        title: 'Nool & Crop: Scalable E-Commerce Storefront',
        description: 'Deep dive into digital storefront architecture, product catalog management, fast cart state, and responsive customer experiences built for conversion.',
        frontTexture: '/textures/studio/tvfront_noolandcrop.webp',
        paintedFrontTexture: '/textures/studio/tvfront_noolandcrop_painted.webp',
        thumbnail: null,
        url: 'https://noolandcrop.in/',
        date: '2026-01-28',
        views: '2.1K',
        duration: '12:45',
    },
    {
        id: 'yt-003',
        platform: 'youtube',
        title: 'Laravel REST API & Service Architecture',
        description: 'Structuring clean service layers, repository patterns, and robust authentication middleware in Laravel and PHP backends.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2026-01-10',
        views: '3.4K',
        duration: '18:30',
    },
    {
        id: 'yt-004',
        platform: 'youtube',
        title: 'Technical SEO: Structured Data & Indexing Mastery',
        description: 'Implementation breakdown for LocalBusiness, Organization, and BreadcrumbList JSON-LD schemas to achieve high-ranking search results in Google Search Console.',
        thumbnail: null,
        url: 'https://nammahspot.in/',
        date: '2025-12-22',
        views: '2.7K',
        duration: '16:15',
    },
    {
        id: 'yt-005',
        platform: 'youtube',
        title: 'OpusZen: High-Throughput API Gateway Architecture',
        description: 'Engineering microservice communication, API provider integrations, error resilience, and secure key authentication for modern web applications.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-12-05',
        views: '1.9K',
        duration: '21:00',
    },
    {
        id: 'yt-006',
        platform: 'youtube',
        title: 'React, Vite & Tailwind CSS Performance Optimization',
        description: 'Achieving sub-second First Contentful Paint and 100/100 Lighthouse performance metrics with lazy loading, asset compression, and modular component trees.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-11-18',
        views: '4.2K',
        duration: '15:10',
    },
    {
        id: 'yt-007',
        platform: 'youtube',
        title: 'The Flash Provider: SMM Platform Service Management',
        description: 'System design for automated service management, multi-provider dispatch, order queueing, and client growth platforms.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-11-02',
        views: '2.3K',
        duration: '19:40',
    },
    {
        id: 'yt-008',
        platform: 'youtube',
        title: 'Relational Database Schema Design & SQL Optimization',
        description: 'Designing normalized schemas in MySQL & PostgreSQL, multi-column composite indexing, and eliminating N+1 query bottlenecks.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-10-15',
        views: '3.1K',
        duration: '17:25',
    },

    // ============ Case Studies & Articles (Desktop Monitor) ============
    {
        id: 'blog-001',
        platform: 'blog',
        title: 'Building Digital Experiences That Perform, Rank & Grow',
        description: 'Why modern web development cannot exist in a vacuum: fusing clean full-stack architecture, technical SEO, and conversion-oriented product strategy.',
        frontTexture: '/textures/studio/monitorfront_cloudaspire.webp',
        paintedFrontTexture: '/textures/studio/monitorfront_cloudaspire_painted.webp',
        thumbnail: null,
        url: 'https://nammahspot.in/',
        date: '2026-02-20',
        readTime: '6 min',
    },
    {
        id: 'blog-002',
        platform: 'blog',
        title: 'Local SEO Engineering for Indian SMBs: Lessons from NammahSpot',
        description: 'How precise geo-targeting, NAP consistency, localized content, and rapid page speed elevate small business visibility across regional markets.',
        thumbnail: null,
        url: 'https://nammahspot.in/',
        date: '2026-02-05',
        readTime: '8 min',
    },
    {
        id: 'blog-003',
        platform: 'blog',
        title: 'Optimizing Storefront Conversion: Architectural Patterns in Nool & Crop',
        description: 'How reducing UI friction, simplifying navigation hierarchies, and caching product queries drive customer retention in modern e-commerce.',
        thumbnail: null,
        url: 'https://noolandcrop.in/',
        date: '2026-01-20',
        readTime: '7 min',
    },
    {
        id: 'blog-004',
        platform: 'blog',
        title: 'Clean Laravel: Repositories, Form Requests, and Service Classes',
        description: 'Escaping monolithic controllers: how to build maintainable, testable, and future-proof Laravel backends for growing businesses.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2026-01-05',
        readTime: '10 min',
    },
    {
        id: 'blog-005',
        platform: 'blog',
        title: 'Cloudaspire: Empowering Puducherry Businesses with Digital Solutions',
        description: 'Developing high-impact web presence, localized SEO campaigns, and digital growth infrastructure for regional enterprises.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-12-15',
        readTime: '5 min',
    },
    {
        id: 'blog-006',
        platform: 'blog',
        title: 'Core Web Vitals in 2026: LCP, INP, and CLS Practical Fixes',
        description: 'Actionable techniques for eliminating layout shifts, reducing interaction latency, and ensuring smooth 60fps scrolling on mobile devices.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-11-28',
        readTime: '9 min',
    },
    {
        id: 'blog-007',
        platform: 'blog',
        title: 'Full-Stack Security Checklist: Securing Web APIs & Databases',
        description: 'Essential security measures including CORS validation, prepared statements, JWT lifecycle management, and rate limiting in modern apps.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-11-10',
        readTime: '8 min',
    },
    {
        id: 'blog-008',
        platform: 'blog',
        title: 'From Prototype to Production: A Practical Digital Product Roadmap',
        description: 'How to take a client vision or startup idea from concept design through development, deployment, and organic search indexing.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-10-25',
        readTime: '7 min',
    },

    // ============ Dev Highlights (Phone) ============
    {
        id: 'tt-001',
        platform: 'tiktok',
        title: 'Prem Kumar | Full-Stack & Laravel Portfolio ✨',
        description: 'Developer & Digital Product Builder based in Puducherry, India. Explore codebases and live platforms.',
        frontTexture: '/textures/studio/phonefront_premkumar.webp',
        paintedFrontTexture: '/textures/studio/phonefront_premkumar_painted.webp',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2026-02-22',
        views: '12.4K',
        likes: '1.5K',
    },
    {
        id: 'tt-002',
        platform: 'tiktok',
        title: 'Top 5 Local SEO Checks for 2026 📈',
        description: 'Structured data, Google Business verification, NAP consistency, and mobile performance essentials.',
        thumbnail: null,
        url: 'https://nammahspot.in/',
        date: '2026-02-10',
        views: '9.2K',
        likes: '980',
    },
    {
        id: 'tt-003',
        platform: 'tiktok',
        title: 'Laravel Eloquent Query Tips ⚡',
        description: 'Always use eager loading with "with()" to avoid the dreaded N+1 query problem in production.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2026-01-25',
        views: '18.5K',
        likes: '2.4K',
    },
    {
        id: 'tt-004',
        platform: 'tiktok',
        title: 'Storefront Optimization with Nool & Crop 🛒',
        description: 'Designing intuitive product catalogs that keep shoppers engaged.',
        thumbnail: null,
        url: 'https://noolandcrop.in/',
        date: '2026-01-14',
        views: '11.1K',
        likes: '1.2K',
    },
    {
        id: 'tt-005',
        platform: 'tiktok',
        title: 'Modern CSS & Tailwind Component Patterns 🎨',
        description: 'Rapid UI building with clean, accessible utility classes and responsive layouts.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-12-30',
        views: '24.6K',
        likes: '3.1K',
    },
    {
        id: 'tt-006',
        platform: 'tiktok',
        title: 'API Gateway Architecture Breakdown 🔌',
        description: 'How OpusZen centralizes authentication and external provider requests seamlessly.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-12-18',
        views: '14.8K',
        likes: '1.9K',
    },
    {
        id: 'tt-007',
        platform: 'tiktok',
        title: 'Indexing & Sitemap Best Practices 🔍',
        description: 'Ensure search engines discover all canonical URLs instantly after deployment.',
        thumbnail: null,
        url: 'https://nammahspot.in/',
        date: '2025-12-02',
        views: '21.0K',
        likes: '2.8K',
    },
    {
        id: 'tt-008',
        platform: 'tiktok',
        title: 'Full-Stack Developer Workflow: Git & GitHub 💻',
        description: 'Feature branching, meaningful commits, and streamlined CI/CD deployments.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-11-24',
        views: '16.3K',
        likes: '2.2K',
    },
    {
        id: 'tt-009',
        platform: 'tiktok',
        title: 'Fast Web Images: WebP vs AVIF 🖼️',
        description: 'Compressing image assets to keep bundle sizes under budget without quality loss.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-11-12',
        views: '29.4K',
        likes: '4.1K',
    },
    {
        id: 'tt-010',
        platform: 'tiktok',
        title: 'Puducherry Tech & Web Solutions 🌐',
        description: 'Building modern platforms with Cloudaspire to accelerate business growth.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-10-30',
        views: '13.7K',
        likes: '1.4K',
    },
    {
        id: 'tt-011',
        platform: 'tiktok',
        title: 'Interactive 3D on the Modern Web 🚀',
        description: 'Balancing Three.js scene complexity with smooth 60fps performance.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-10-18',
        views: '35.2K',
        likes: '5.2K',
    },
    {
        id: 'tt-012',
        platform: 'tiktok',
        title: 'Building Digital Products That Grow 💡',
        description: 'Fusing engineering discipline with organic search and digital marketing.',
        thumbnail: null,
        url: 'https://github.com/premdevexe',
        date: '2025-10-04',
        views: '22.8K',
        likes: '3.6K',
    },
];

const ytTextures = ['/textures/studio/tvfront_nammahspot.webp', '/textures/studio/tvfront_noolandcrop.webp'];
const ytPaintedTextures = ['/textures/studio/tvfront_nammahspot_painted.webp', '/textures/studio/tvfront_noolandcrop_painted.webp'];
const blogTextures = ['/textures/studio/monitorfront_cloudaspire.webp'];
const blogPaintedTextures = ['/textures/studio/monitorfront_cloudaspire_painted.webp'];
const ttTextures = ['/textures/studio/phonefront_premkumar.webp'];
const ttPaintedTextures = ['/textures/studio/phonefront_premkumar_painted.webp'];

let ytIdx = 0, blogIdx = 0, ttIdx = 0;
let ytPIdx = 0, blogPIdx = 0, ttPIdx = 0;

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    return {
        ...item,
        frontTexture: item.frontTexture || (
            item.platform === 'youtube' ? ytTextures[ytIdx++ % ytTextures.length] :
                item.platform === 'blog' ? blogTextures[blogIdx++ % blogTextures.length] :
                    ttTextures[ttIdx++ % ttTextures.length]
        ),
        paintedFrontTexture: item.paintedFrontTexture || (
            item.platform === 'youtube' ? ytPaintedTextures[ytPIdx++ % ytPaintedTextures.length] :
                item.platform === 'blog' ? blogPaintedTextures[blogPIdx++ % blogPaintedTextures.length] :
                    ttPaintedTextures[ttPIdx++ % ttPaintedTextures.length]
        )
    };
});

// Helper to get content by platform
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

// Get latest content (for "On Air" indicator)
export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};
