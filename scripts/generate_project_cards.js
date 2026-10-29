import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('public/textures/gallery');

// Load timberkitty as our clean frame reference
async function createCardBase() {
  const frameImg = await sharp('public/textures/gallery/timberkittyprzod.webp')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = frameImg;
  const { width, height, channels } = info;

  // Clear inner content box: x: 120 to 904, y: 640 to 1910
  const cleared = Buffer.from(data);
  const bgR = 240, bgG = 240, bgB = 240;

  for (let y = 640; y <= 1910; y++) {
    for (let x = 120; x <= 904; x++) {
      const idx = (y * width + x) * channels;
      cleared[idx] = bgR;
      cleared[idx + 1] = bgG;
      cleared[idx + 2] = bgB;
    }
  }

  return {
    raw: cleared,
    info
  };
}

// Helper to composite SVG onto the base frame
async function generateCard(baseRaw, info, innerSvg, outputPath, isPainted = false, paintedTint = null) {
  const innerBuffer = await sharp(Buffer.from(innerSvg))
    .resize(784, 1270)
    .png()
    .toBuffer();

  let compositePipeline = sharp(baseRaw, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels
    }
  }).composite([
    {
      input: innerBuffer,
      top: 640,
      left: 120
    }
  ]);

  if (isPainted && paintedTint) {
    // Add subtle painted wash
  }

  await compositePipeline
    .webp({ quality: 90 })
    .toFile(outputPath);

  console.log('Generated:', outputPath);
}

async function run() {
  const { raw, info } = await createCardBase();

  // 1. NammahSpot
  const nammaLogoB64 = fs.existsSync('C:/Users/Dell/Downloads/IMG_20261001_214117-removebg-preview.png')
    ? fs.readFileSync('C:/Users/Dell/Downloads/IMG_20261001_214117-removebg-preview.png').toString('base64')
    : '';

  const nammaSvgSketch = `
    <svg width="784" height="1270" viewBox="0 0 784 1270" xmlns="http://www.w3.org/2000/svg">
      <rect width="784" height="1270" fill="#f0f0f0"/>
      <!-- App Header Bar -->
      <rect x="30" y="30" width="724" height="60" rx="12" fill="none" stroke="#222" stroke-width="3" stroke-dasharray="1000"/>
      <circle cx="65" cy="60" r="12" fill="#333"/>
      <line x1="100" y1="60" x2="680" y2="60" stroke="#444" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Category Badge -->
      <rect x="180" y="130" width="424" height="45" rx="22" fill="#e5e5e5" stroke="#222" stroke-width="2.5"/>
      <text x="392" y="160" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#111" text-anchor="middle" letter-spacing="2">LOCAL DISCOVERY PLATFORM</text>
      
      <!-- Project Logo -->
      ${nammaLogoB64 ? `<image href="data:image/png;base64,${nammaLogoB64}" x="72" y="220" width="640" height="220" style="filter: grayscale(100%) contrast(150%);" />` : ''}

      <!-- Main Headline -->
      <text x="392" y="500" font-family="Arial, sans-serif" font-weight="bold" font-size="34" fill="#111" text-anchor="middle">NAMMAHSPOT.IN</text>
      <text x="392" y="540" font-family="Arial, sans-serif" font-size="20" fill="#444" text-anchor="middle" letter-spacing="1">Discover • Connect • Grow Local</text>
      <line x1="150" y1="570" x2="634" y2="570" stroke="#333" stroke-width="2.5"/>

      <!-- Feature Card 1 -->
      <rect x="60" y="610" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="660" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">📍 Verified Local Business Listings</text>
      <text x="95" y="700" font-family="Arial, sans-serif" font-size="18" fill="#555">Comprehensive profiles, operating hours, categories &amp; contact points</text>
      <text x="95" y="730" font-family="Arial, sans-serif" font-size="16" fill="#777">Direct customer engagement &amp; verified merchant tags</text>

      <!-- Feature Card 2 -->
      <rect x="60" y="790" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="840" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">🔍 Location-Based Search &amp; Discovery</text>
      <text x="95" y="880" font-family="Arial, sans-serif" font-size="18" fill="#555">Real-time geolocation filtering, category sorting &amp; directions</text>
      <text x="95" y="910" font-family="Arial, sans-serif" font-size="16" fill="#777">Optimized for high-speed local indexing and discoverability</text>

      <!-- Feature Card 3 -->
      <rect x="60" y="970" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="1020" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">⚡ Local SEO &amp; Business Visibility</text>
      <text x="95" y="1060" font-family="Arial, sans-serif" font-size="18" fill="#555">Structured schema markup, NAP consistency &amp; local ranking signals</text>
      <text x="95" y="1090" font-family="Arial, sans-serif" font-size="16" fill="#777">Helping local shops dominate nearby search results</text>

      <!-- Bottom Status -->
      <rect x="220" y="1170" width="344" height="60" rx="30" fill="#222"/>
      <text x="392" y="1208" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#fff" text-anchor="middle" letter-spacing="1">LIVE PLATFORM</text>
    </svg>
  `;

  const nammaSvgPainted = `
    <svg width="784" height="1270" viewBox="0 0 784 1270" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="nammaBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f2f7fc"/>
          <stop offset="100%" stop-color="#fff8f2"/>
        </linearGradient>
        <linearGradient id="btnGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#f97316"/>
        </linearGradient>
      </defs>
      <rect width="784" height="1270" fill="url(#nammaBg)"/>
      <rect x="30" y="30" width="724" height="60" rx="12" fill="#fff" stroke="#0284c7" stroke-width="3"/>
      <circle cx="65" cy="60" r="12" fill="#0284c7"/>
      <line x1="100" y1="60" x2="680" y2="60" stroke="#94a3b8" stroke-width="3" stroke-linecap="round"/>
      
      <!-- Category Badge -->
      <rect x="180" y="130" width="424" height="45" rx="22" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5"/>
      <text x="392" y="160" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#0369a1" text-anchor="middle" letter-spacing="2">LOCAL DISCOVERY PLATFORM</text>
      
      <!-- Project Logo (Full Color) -->
      ${nammaLogoB64 ? `<image href="data:image/png;base64,${nammaLogoB64}" x="72" y="220" width="640" height="220" />` : ''}

      <!-- Main Headline -->
      <text x="392" y="500" font-family="Arial, sans-serif" font-weight="bold" font-size="34" fill="#0f172a" text-anchor="middle">NAMMAHSPOT.IN</text>
      <text x="392" y="540" font-family="Arial, sans-serif" font-weight="600" font-size="20" fill="#f97316" text-anchor="middle" letter-spacing="1">Discover • Connect • Grow Local</text>
      <line x1="150" y1="570" x2="634" y2="570" stroke="#0284c7" stroke-width="3"/>

      <!-- Feature Card 1 -->
      <rect x="60" y="610" width="664" height="150" rx="14" fill="#ffffff" stroke="#bae6fd" stroke-width="3"/>
      <text x="95" y="660" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#0284c7">📍 Verified Local Business Listings</text>
      <text x="95" y="700" font-family="Arial, sans-serif" font-size="18" fill="#334155">Comprehensive profiles, operating hours, categories &amp; contact points</text>
      <text x="95" y="730" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Direct customer engagement &amp; verified merchant tags</text>

      <!-- Feature Card 2 -->
      <rect x="60" y="790" width="664" height="150" rx="14" fill="#ffffff" stroke="#ffedd5" stroke-width="3"/>
      <text x="95" y="840" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#ea580c">🔍 Location-Based Search &amp; Discovery</text>
      <text x="95" y="880" font-family="Arial, sans-serif" font-size="18" fill="#334155">Real-time geolocation filtering, category sorting &amp; directions</text>
      <text x="95" y="910" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Optimized for high-speed local indexing and discoverability</text>

      <!-- Feature Card 3 -->
      <rect x="60" y="970" width="664" height="150" rx="14" fill="#ffffff" stroke="#bae6fd" stroke-width="3"/>
      <text x="95" y="1020" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#0369a1">⚡ Local SEO &amp; Business Visibility</text>
      <text x="95" y="1060" font-family="Arial, sans-serif" font-size="18" fill="#334155">Structured schema markup, NAP consistency &amp; local ranking signals</text>
      <text x="95" y="1090" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Helping local shops dominate nearby search results</text>

      <!-- Bottom Status -->
      <rect x="220" y="1170" width="344" height="60" rx="30" fill="url(#btnGrad)"/>
      <text x="392" y="1208" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#fff" text-anchor="middle" letter-spacing="1">EXPLORE LIVE PLATFORM</text>
    </svg>
  `;

  await generateCard(raw, info, nammaSvgSketch, path.join(OUT_DIR, 'nammahspot_front.webp'), false);
  await generateCard(raw, info, nammaSvgPainted, path.join(OUT_DIR, 'nammahspot_painted.webp'), true);

  // 2. Cloudaspire
  const cloudLogoB64 = fs.existsSync('C:/Users/Dell/Downloads/cloudaspiresolutions.in-1024x1024.png')
    ? fs.readFileSync('C:/Users/Dell/Downloads/cloudaspiresolutions.in-1024x1024.png').toString('base64')
    : '';

  const cloudSvgSketch = `
    <svg width="784" height="1270" viewBox="0 0 784 1270" xmlns="http://www.w3.org/2000/svg">
      <rect width="784" height="1270" fill="#f0f0f0"/>
      <rect x="30" y="30" width="724" height="60" rx="12" fill="none" stroke="#222" stroke-width="3"/>
      <circle cx="65" cy="60" r="12" fill="#333"/>
      <line x1="100" y1="60" x2="680" y2="60" stroke="#444" stroke-width="3" stroke-linecap="round"/>
      
      <rect x="150" y="130" width="484" height="45" rx="22" fill="#e5e5e5" stroke="#222" stroke-width="2.5"/>
      <text x="392" y="160" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#111" text-anchor="middle" letter-spacing="2">DIGITAL MARKETING &amp; WEB SOLUTIONS</text>
      
      ${cloudLogoB64 ? `<image href="data:image/png;base64,${cloudLogoB64}" x="252" y="210" width="280" height="280" style="filter: grayscale(100%) contrast(140%);" />` : ''}

      <text x="392" y="525" font-family="Arial, sans-serif" font-weight="bold" font-size="34" fill="#111" text-anchor="middle">CLOUDASPIRE SOLUTIONS</text>
      <text x="392" y="565" font-family="Arial, sans-serif" font-size="18" fill="#444" text-anchor="middle">Puducherry, India • Performance &amp; Growth</text>
      <line x1="150" y1="595" x2="634" y2="595" stroke="#333" stroke-width="2.5"/>

      <rect x="60" y="630" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="680" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">🌐 High-Converting Web Development</text>
      <text x="95" y="720" font-family="Arial, sans-serif" font-size="18" fill="#555">Bespoke business websites, responsive UI, ultra-fast load speed</text>
      <text x="95" y="750" font-family="Arial, sans-serif" font-size="16" fill="#777">Scalable architecture built for conversion and brand authority</text>

      <rect x="60" y="805" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="855" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">📈 Comprehensive Technical &amp; Local SEO</text>
      <text x="95" y="895" font-family="Arial, sans-serif" font-size="18" fill="#555">On-page SEO, Google Search Console, sitemaps, structured data</text>
      <text x="95" y="925" font-family="Arial, sans-serif" font-size="16" fill="#777">Proven organic ranking strategies for regional &amp; competitive keywords</text>

      <rect x="60" y="980" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="1030" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">🚀 Social Media Marketing (SMM) &amp; Ads</text>
      <text x="95" y="1070" font-family="Arial, sans-serif" font-size="18" fill="#555">Data-driven campaign management, lead acquisition, branding</text>
      <text x="95" y="1100" font-family="Arial, sans-serif" font-size="16" fill="#777">End-to-end digital growth funnels that deliver real ROI</text>

      <rect x="220" y="1170" width="344" height="60" rx="30" fill="#222"/>
      <text x="392" y="1208" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#fff" text-anchor="middle" letter-spacing="1">AGENCY SOLUTIONS</text>
    </svg>
  `;

  const cloudSvgPainted = `
    <svg width="784" height="1270" viewBox="0 0 784 1270" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cloudGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#3b82f6"/>
          <stop offset="100%" stop-color="#8b5cf6"/>
        </linearGradient>
      </defs>
      <rect width="784" height="1270" fill="#f8fafc"/>
      <rect x="30" y="30" width="724" height="60" rx="12" fill="#fff" stroke="#6366f1" stroke-width="3"/>
      <circle cx="65" cy="60" r="12" fill="#6366f1"/>
      <line x1="100" y1="60" x2="680" y2="60" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
      
      <rect x="150" y="130" width="484" height="45" rx="22" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2.5"/>
      <text x="392" y="160" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#6d28d9" text-anchor="middle" letter-spacing="2">DIGITAL MARKETING &amp; WEB SOLUTIONS</text>
      
      ${cloudLogoB64 ? `<image href="data:image/png;base64,${cloudLogoB64}" x="252" y="210" width="280" height="280" />` : ''}

      <text x="392" y="525" font-family="Arial, sans-serif" font-weight="bold" font-size="34" fill="#1e1b4b" text-anchor="middle">CLOUDASPIRE SOLUTIONS</text>
      <text x="392" y="565" font-family="Arial, sans-serif" font-weight="600" font-size="18" fill="#6366f1" text-anchor="middle">Puducherry, India • Performance &amp; Growth</text>
      <line x1="150" y1="595" x2="634" y2="595" stroke="#8b5cf6" stroke-width="3"/>

      <rect x="60" y="630" width="664" height="150" rx="14" fill="#ffffff" stroke="#c7d2fe" stroke-width="3"/>
      <text x="95" y="680" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#4338ca">🌐 High-Converting Web Development</text>
      <text x="95" y="720" font-family="Arial, sans-serif" font-size="18" fill="#334155">Bespoke business websites, responsive UI, ultra-fast load speed</text>
      <text x="95" y="750" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Scalable architecture built for conversion and brand authority</text>

      <rect x="60" y="805" width="664" height="150" rx="14" fill="#ffffff" stroke="#ddd6fe" stroke-width="3"/>
      <text x="95" y="855" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#6d28d9">📈 Comprehensive Technical &amp; Local SEO</text>
      <text x="95" y="895" font-family="Arial, sans-serif" font-size="18" fill="#334155">On-page SEO, Google Search Console, sitemaps, structured data</text>
      <text x="95" y="925" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Proven organic ranking strategies for regional &amp; competitive keywords</text>

      <rect x="60" y="980" width="664" height="150" rx="14" fill="#ffffff" stroke="#c7d2fe" stroke-width="3"/>
      <text x="95" y="1030" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#4338ca">🚀 Social Media Marketing (SMM) &amp; Ads</text>
      <text x="95" y="1070" font-family="Arial, sans-serif" font-size="18" fill="#334155">Data-driven campaign management, lead acquisition, branding</text>
      <text x="95" y="1100" font-family="Arial, sans-serif" font-size="16" fill="#64748b">End-to-end digital growth funnels that deliver real ROI</text>

      <rect x="220" y="1170" width="344" height="60" rx="30" fill="url(#cloudGrad)"/>
      <text x="392" y="1208" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#fff" text-anchor="middle" letter-spacing="1">AGENCY SOLUTIONS</text>
    </svg>
  `;

  await generateCard(raw, info, cloudSvgSketch, path.join(OUT_DIR, 'cloudaspire_front.webp'), false);
  await generateCard(raw, info, cloudSvgPainted, path.join(OUT_DIR, 'cloudaspire_painted.webp'), true);

  // 3. Nool & Crop
  const noolLogoB64 = fs.existsSync('D:/Projects/noolandcrop/public/assets/images/logo.png')
    ? fs.readFileSync('D:/Projects/noolandcrop/public/assets/images/logo.png').toString('base64')
    : '';

  const noolSvgSketch = `
    <svg width="784" height="1270" viewBox="0 0 784 1270" xmlns="http://www.w3.org/2000/svg">
      <rect width="784" height="1270" fill="#f0f0f0"/>
      <rect x="30" y="30" width="724" height="60" rx="12" fill="none" stroke="#222" stroke-width="3"/>
      <circle cx="65" cy="60" r="12" fill="#333"/>
      <line x1="100" y1="60" x2="680" y2="60" stroke="#444" stroke-width="3" stroke-linecap="round"/>
      
      <rect x="220" y="130" width="344" height="45" rx="22" fill="#e5e5e5" stroke="#222" stroke-width="2.5"/>
      <text x="392" y="160" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#111" text-anchor="middle" letter-spacing="2">E-COMMERCE STOREFRONT</text>
      
      ${noolLogoB64 ? `<image href="data:image/png;base64,${noolLogoB64}" x="192" y="240" width="400" height="180" style="filter: grayscale(100%) contrast(150%);" />` : `
        <text x="392" y="340" font-family="Arial, sans-serif" font-weight="bold" font-size="44" fill="#111" text-anchor="middle">NOOL &amp; CROP</text>
      `}

      <text x="392" y="520" font-family="Arial, sans-serif" font-weight="bold" font-size="34" fill="#111" text-anchor="middle">NOOLANDCROP.IN</text>
      <text x="392" y="560" font-family="Arial, sans-serif" font-size="18" fill="#444" text-anchor="middle">Modern Apparel &amp; Textile Digital Storefront</text>
      <line x1="150" y1="590" x2="634" y2="590" stroke="#333" stroke-width="2.5"/>

      <rect x="60" y="630" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="680" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">🛍️ Intuitive Digital Storefront</text>
      <text x="95" y="720" font-family="Arial, sans-serif" font-size="18" fill="#555">Clean product presentation, visual lookbooks &amp; responsive UX</text>
      <text x="95" y="750" font-family="Arial, sans-serif" font-size="16" fill="#777">Frictionless product browsing across mobile and desktop</text>

      <rect x="60" y="805" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="855" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">📦 Catalog Management &amp; Inventory</text>
      <text x="95" y="895" font-family="Arial, sans-serif" font-size="18" fill="#555">Robust product variations, category indexing &amp; SKU tracking</text>
      <text x="95" y="925" font-family="Arial, sans-serif" font-size="16" fill="#777">Engineered with structured relational database architecture</text>

      <rect x="60" y="980" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="1030" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">🚀 SEO &amp; Organic Search Indexing</text>
      <text x="95" y="1070" font-family="Arial, sans-serif" font-size="18" fill="#555">Rich product schema metadata, open graph tags, clean URLs</text>
      <text x="95" y="1100" font-family="Arial, sans-serif" font-size="16" fill="#777">Maximizing online visibility and organic apparel discovery</text>

      <rect x="220" y="1170" width="344" height="60" rx="30" fill="#222"/>
      <text x="392" y="1208" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#fff" text-anchor="middle" letter-spacing="1">VISIT STOREFRONT</text>
    </svg>
  `;

  const noolSvgPainted = `
    <svg width="784" height="1270" viewBox="0 0 784 1270" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="noolGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#334155"/>
        </linearGradient>
      </defs>
      <rect width="784" height="1270" fill="#fffdfa"/>
      <rect x="30" y="30" width="724" height="60" rx="12" fill="#fff" stroke="#0f172a" stroke-width="3"/>
      <circle cx="65" cy="60" r="12" fill="#0f172a"/>
      <line x1="100" y1="60" x2="680" y2="60" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
      
      <rect x="220" y="130" width="344" height="45" rx="22" fill="#f1f5f9" stroke="#0f172a" stroke-width="2.5"/>
      <text x="392" y="160" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#0f172a" text-anchor="middle" letter-spacing="2">E-COMMERCE STOREFRONT</text>
      
      ${noolLogoB64 ? `<image href="data:image/png;base64,${noolLogoB64}" x="192" y="240" width="400" height="180" />` : `
        <text x="392" y="340" font-family="Arial, sans-serif" font-weight="bold" font-size="44" fill="#0f172a" text-anchor="middle">NOOL &amp; CROP</text>
      `}

      <text x="392" y="520" font-family="Arial, sans-serif" font-weight="bold" font-size="34" fill="#0f172a" text-anchor="middle">NOOLANDCROP.IN</text>
      <text x="392" y="560" font-family="Arial, sans-serif" font-weight="600" font-size="18" fill="#64748b" text-anchor="middle">Modern Apparel &amp; Textile Digital Storefront</text>
      <line x1="150" y1="590" x2="634" y2="590" stroke="#0f172a" stroke-width="3"/>

      <rect x="60" y="630" width="664" height="150" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="3"/>
      <text x="95" y="680" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#0f172a">🛍️ Intuitive Digital Storefront</text>
      <text x="95" y="720" font-family="Arial, sans-serif" font-size="18" fill="#334155">Clean product presentation, visual lookbooks &amp; responsive UX</text>
      <text x="95" y="750" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Frictionless product browsing across mobile and desktop</text>

      <rect x="60" y="805" width="664" height="150" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="3"/>
      <text x="95" y="855" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#0f172a">📦 Catalog Management &amp; Inventory</text>
      <text x="95" y="895" font-family="Arial, sans-serif" font-size="18" fill="#334155">Robust product variations, category indexing &amp; SKU tracking</text>
      <text x="95" y="925" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Engineered with structured relational database architecture</text>

      <rect x="60" y="980" width="664" height="150" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="3"/>
      <text x="95" y="1030" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#0f172a">🚀 SEO &amp; Organic Search Indexing</text>
      <text x="95" y="1070" font-family="Arial, sans-serif" font-size="18" fill="#334155">Rich product schema metadata, open graph tags, clean URLs</text>
      <text x="95" y="1100" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Maximizing online visibility and organic apparel discovery</text>

      <rect x="220" y="1170" width="344" height="60" rx="30" fill="url(#noolGrad)"/>
      <text x="392" y="1208" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#fff" text-anchor="middle" letter-spacing="1">VISIT STOREFRONT</text>
    </svg>
  `;

  await generateCard(raw, info, noolSvgSketch, path.join(OUT_DIR, 'noolandcrop_front.webp'), false);
  await generateCard(raw, info, noolSvgPainted, path.join(OUT_DIR, 'noolandcrop_painted.webp'), true);

  // 4. OpusZen
  const opusLogoB64 = fs.existsSync('C:/Users/Dell/Downloads/IMG_20261016_144235.png')
    ? fs.readFileSync('C:/Users/Dell/Downloads/IMG_20261016_144235.png').toString('base64')
    : '';

  const opusSvgSketch = `
    <svg width="784" height="1270" viewBox="0 0 784 1270" xmlns="http://www.w3.org/2000/svg">
      <rect width="784" height="1270" fill="#f0f0f0"/>
      <rect x="30" y="30" width="724" height="60" rx="12" fill="none" stroke="#222" stroke-width="3"/>
      <circle cx="65" cy="60" r="12" fill="#333"/>
      <line x1="100" y1="60" x2="680" y2="60" stroke="#444" stroke-width="3" stroke-linecap="round"/>
      
      <rect x="180" y="130" width="424" height="45" rx="22" fill="#e5e5e5" stroke="#222" stroke-width="2.5"/>
      <text x="392" y="160" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#111" text-anchor="middle" letter-spacing="2">API &amp; TECHNOLOGY PLATFORM</text>
      
      ${opusLogoB64 ? `<image href="data:image/png;base64,${opusLogoB64}" x="262" y="220" width="260" height="260" style="filter: grayscale(100%) contrast(150%);" />` : ''}

      <text x="392" y="525" font-family="Arial, sans-serif" font-weight="bold" font-size="34" fill="#111" text-anchor="middle">OPUSZEN</text>
      <text x="392" y="565" font-family="Arial, sans-serif" font-size="18" fill="#444" text-anchor="middle">API Gateway &amp; Backend Infrastructure</text>
      <line x1="150" y1="595" x2="634" y2="595" stroke="#333" stroke-width="2.5"/>

      <rect x="60" y="630" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="680" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">⚡ API Gateway Architecture</text>
      <text x="95" y="720" font-family="Arial, sans-serif" font-size="18" fill="#555">High-throughput routing, rate limiting, request validation</text>
      <text x="95" y="750" font-family="Arial, sans-serif" font-size="16" fill="#777">Engineered for seamless microservice orchestration</text>

      <rect x="60" y="805" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="855" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">🔐 Provider Integrations &amp; Auth</text>
      <text x="95" y="895" font-family="Arial, sans-serif" font-size="18" fill="#555">Secure JWT/API-key authentication, third-party provider bridges</text>
      <text x="95" y="925" font-family="Arial, sans-serif" font-size="16" fill="#777">Resilient webhook delivery &amp; automated retry mechanisms</text>

      <rect x="60" y="980" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="1030" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">🛠️ Modern Web Technologies</text>
      <text x="95" y="1070" font-family="Arial, sans-serif" font-size="18" fill="#555">Node.js, Express, PostgreSQL, Supabase integration</text>
      <text x="95" y="1100" font-family="Arial, sans-serif" font-size="16" fill="#777">Developer-first documentation &amp; clean API endpoints</text>

      <rect x="220" y="1170" width="344" height="60" rx="30" fill="#222"/>
      <text x="392" y="1208" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#fff" text-anchor="middle" letter-spacing="1">SYSTEM ARCHITECTURE</text>
    </svg>
  `;

  const opusSvgPainted = `
    <svg width="784" height="1270" viewBox="0 0 784 1270" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="50%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#b45309"/>
        </linearGradient>
      </defs>
      <rect width="784" height="1270" fill="#0f172a"/>
      <rect x="30" y="30" width="724" height="60" rx="12" fill="#1e293b" stroke="#f59e0b" stroke-width="3"/>
      <circle cx="65" cy="60" r="12" fill="#f59e0b"/>
      <line x1="100" y1="60" x2="680" y2="60" stroke="#475569" stroke-width="3" stroke-linecap="round"/>
      
      <rect x="180" y="130" width="424" height="45" rx="22" fill="#1e293b" stroke="#f59e0b" stroke-width="2.5"/>
      <text x="392" y="160" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#fbbf24" text-anchor="middle" letter-spacing="2">API &amp; TECHNOLOGY PLATFORM</text>
      
      ${opusLogoB64 ? `<image href="data:image/png;base64,${opusLogoB64}" x="262" y="220" width="260" height="260" />` : ''}

      <text x="392" y="525" font-family="Arial, sans-serif" font-weight="bold" font-size="34" fill="#fbbf24" text-anchor="middle">OPUSZEN</text>
      <text x="392" y="565" font-family="Arial, sans-serif" font-weight="600" font-size="18" fill="#94a3b8" text-anchor="middle">API Gateway &amp; Backend Infrastructure</text>
      <line x1="150" y1="595" x2="634" y2="595" stroke="#f59e0b" stroke-width="3"/>

      <rect x="60" y="630" width="664" height="150" rx="14" fill="#1e293b" stroke="#334155" stroke-width="3"/>
      <text x="95" y="680" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#fbbf24">⚡ API Gateway Architecture</text>
      <text x="95" y="720" font-family="Arial, sans-serif" font-size="18" fill="#cbd5e1">High-throughput routing, rate limiting, request validation</text>
      <text x="95" y="750" font-family="Arial, sans-serif" font-size="16" fill="#94a3b8">Engineered for seamless microservice orchestration</text>

      <rect x="60" y="805" width="664" height="150" rx="14" fill="#1e293b" stroke="#334155" stroke-width="3"/>
      <text x="95" y="855" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#fbbf24">🔐 Provider Integrations &amp; Auth</text>
      <text x="95" y="895" font-family="Arial, sans-serif" font-size="18" fill="#cbd5e1">Secure JWT/API-key authentication, third-party provider bridges</text>
      <text x="95" y="925" font-family="Arial, sans-serif" font-size="16" fill="#94a3b8">Resilient webhook delivery &amp; automated retry mechanisms</text>

      <rect x="60" y="980" width="664" height="150" rx="14" fill="#1e293b" stroke="#334155" stroke-width="3"/>
      <text x="95" y="1030" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#fbbf24">🛠️ Modern Web Technologies</text>
      <text x="95" y="1070" font-family="Arial, sans-serif" font-size="18" fill="#cbd5e1">Node.js, Express, PostgreSQL, Supabase integration</text>
      <text x="95" y="1100" font-family="Arial, sans-serif" font-size="16" fill="#94a3b8">Developer-first documentation &amp; clean API endpoints</text>

      <rect x="220" y="1170" width="344" height="60" rx="30" fill="url(#goldGrad)"/>
      <text x="392" y="1208" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#0f172a" text-anchor="middle" letter-spacing="1">SYSTEM ARCHITECTURE</text>
    </svg>
  `;

  await generateCard(raw, info, opusSvgSketch, path.join(OUT_DIR, 'opuszen_front.webp'), false);
  await generateCard(raw, info, opusSvgPainted, path.join(OUT_DIR, 'opuszen_painted.webp'), true);

  // 5. Nura City
  const nuraSvgSketch = `
    <svg width="784" height="1270" viewBox="0 0 784 1270" xmlns="http://www.w3.org/2000/svg">
      <rect width="784" height="1270" fill="#f0f0f0"/>
      <rect x="30" y="30" width="724" height="60" rx="12" fill="none" stroke="#222" stroke-width="3"/>
      <circle cx="65" cy="60" r="12" fill="#333"/>
      <line x1="100" y1="60" x2="680" y2="60" stroke="#444" stroke-width="3" stroke-linecap="round"/>
      
      <rect x="180" y="130" width="424" height="45" rx="22" fill="#e5e5e5" stroke="#222" stroke-width="2.5"/>
      <text x="392" y="160" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#111" text-anchor="middle" letter-spacing="2">CITY &amp; LOCAL DISCOVERY</text>
      
      <!-- City Skyline Sketch Graphic -->
      <g transform="translate(192, 230)">
        <rect x="40" y="100" width="60" height="140" fill="none" stroke="#222" stroke-width="4"/>
        <rect x="120" y="40" width="80" height="200" fill="none" stroke="#222" stroke-width="4"/>
        <rect x="220" y="70" width="70" height="170" fill="none" stroke="#222" stroke-width="4"/>
        <rect x="310" y="120" width="50" height="120" fill="none" stroke="#222" stroke-width="4"/>
        <circle cx="200" cy="20" r="14" fill="#333"/>
      </g>

      <text x="392" y="525" font-family="Arial, sans-serif" font-weight="bold" font-size="34" fill="#111" text-anchor="middle">NURA CITY</text>
      <text x="392" y="565" font-family="Arial, sans-serif" font-size="18" fill="#444" text-anchor="middle">Digital City Platform &amp; Community Discovery</text>
      <line x1="150" y1="595" x2="634" y2="595" stroke="#333" stroke-width="2.5"/>

      <rect x="60" y="630" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="680" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">🏙️ Local Information &amp; Services Hub</text>
      <text x="95" y="720" font-family="Arial, sans-serif" font-size="18" fill="#555">Aggregated municipal data, essential services, emergency hubs</text>
      <text x="95" y="750" font-family="Arial, sans-serif" font-size="16" fill="#777">One-stop information architecture for modern citizens</text>

      <rect x="60" y="805" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="855" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">🗺️ Interactive Map &amp; Navigation</text>
      <text x="95" y="895" font-family="Arial, sans-serif" font-size="18" fill="#555">Location-based service discovery, category routing &amp; points of interest</text>
      <text x="95" y="925" font-family="Arial, sans-serif" font-size="16" fill="#777">Fast, lightweight client-side spatial indexing</text>

      <rect x="60" y="980" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="1030" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">💡 Growth-Focused Digital Platform</text>
      <text x="95" y="1070" font-family="Arial, sans-serif" font-size="18" fill="#555">Designed to connect local service providers with active citizens</text>
      <text x="95" y="1100" font-family="Arial, sans-serif" font-size="16" fill="#777">Modern UI/UX concept tailored for scalable local expansion</text>

      <rect x="220" y="1170" width="344" height="60" rx="30" fill="#222"/>
      <text x="392" y="1208" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#fff" text-anchor="middle" letter-spacing="1">PROJECT CONCEPT</text>
    </svg>
  `;

  const nuraSvgPainted = `
    <svg width="784" height="1270" viewBox="0 0 784 1270" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="nuraGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#059669"/>
          <stop offset="100%" stop-color="#10b981"/>
        </linearGradient>
      </defs>
      <rect width="784" height="1270" fill="#f0fdf4"/>
      <rect x="30" y="30" width="724" height="60" rx="12" fill="#fff" stroke="#10b981" stroke-width="3"/>
      <circle cx="65" cy="60" r="12" fill="#10b981"/>
      <line x1="100" y1="60" x2="680" y2="60" stroke="#a7f3d0" stroke-width="3" stroke-linecap="round"/>
      
      <rect x="180" y="130" width="424" height="45" rx="22" fill="#d1fae5" stroke="#059669" stroke-width="2.5"/>
      <text x="392" y="160" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#047857" text-anchor="middle" letter-spacing="2">CITY &amp; LOCAL DISCOVERY</text>
      
      <!-- City Skyline Painted Graphic -->
      <g transform="translate(192, 230)">
        <rect x="40" y="100" width="60" height="140" fill="#059669" rx="4"/>
        <rect x="120" y="40" width="80" height="200" fill="#10b981" rx="4"/>
        <rect x="220" y="70" width="70" height="170" fill="#047857" rx="4"/>
        <rect x="310" y="120" width="50" height="120" fill="#34d399" rx="4"/>
        <circle cx="200" cy="20" r="14" fill="#fbbf24"/>
      </g>

      <text x="392" y="525" font-family="Arial, sans-serif" font-weight="bold" font-size="34" fill="#064e3b" text-anchor="middle">NURA CITY</text>
      <text x="392" y="565" font-family="Arial, sans-serif" font-weight="600" font-size="18" fill="#059669" text-anchor="middle">Digital City Platform &amp; Community Discovery</text>
      <line x1="150" y1="595" x2="634" y2="595" stroke="#10b981" stroke-width="3"/>

      <rect x="60" y="630" width="664" height="150" rx="14" fill="#ffffff" stroke="#a7f3d0" stroke-width="3"/>
      <text x="95" y="680" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#047857">🏙️ Local Information &amp; Services Hub</text>
      <text x="95" y="720" font-family="Arial, sans-serif" font-size="18" fill="#334155">Aggregated municipal data, essential services, emergency hubs</text>
      <text x="95" y="750" font-family="Arial, sans-serif" font-size="16" fill="#64748b">One-stop information architecture for modern citizens</text>

      <rect x="60" y="805" width="664" height="150" rx="14" fill="#ffffff" stroke="#a7f3d0" stroke-width="3"/>
      <text x="95" y="855" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#059669">🗺️ Interactive Map &amp; Navigation</text>
      <text x="95" y="895" font-family="Arial, sans-serif" font-size="18" fill="#334155">Location-based service discovery, category routing &amp; points of interest</text>
      <text x="95" y="925" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Fast, lightweight client-side spatial indexing</text>

      <rect x="60" y="980" width="664" height="150" rx="14" fill="#ffffff" stroke="#a7f3d0" stroke-width="3"/>
      <text x="95" y="1030" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#047857">💡 Growth-Focused Digital Platform</text>
      <text x="95" y="1070" font-family="Arial, sans-serif" font-size="18" fill="#334155">Designed to connect local service providers with active citizens</text>
      <text x="95" y="1100" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Modern UI/UX concept tailored for scalable local expansion</text>

      <rect x="220" y="1170" width="344" height="60" rx="30" fill="url(#nuraGrad)"/>
      <text x="392" y="1208" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#fff" text-anchor="middle" letter-spacing="1">PROJECT CONCEPT</text>
    </svg>
  `;

  await generateCard(raw, info, nuraSvgSketch, path.join(OUT_DIR, 'nuracity_front.webp'), false);
  await generateCard(raw, info, nuraSvgPainted, path.join(OUT_DIR, 'nuracity_painted.webp'), true);

  // 6. The Flash Provider
  const flashSvgSketch = `
    <svg width="784" height="1270" viewBox="0 0 784 1270" xmlns="http://www.w3.org/2000/svg">
      <rect width="784" height="1270" fill="#f0f0f0"/>
      <rect x="30" y="30" width="724" height="60" rx="12" fill="none" stroke="#222" stroke-width="3"/>
      <circle cx="65" cy="60" r="12" fill="#333"/>
      <line x1="100" y1="60" x2="680" y2="60" stroke="#444" stroke-width="3" stroke-linecap="round"/>
      
      <rect x="160" y="130" width="464" height="45" rx="22" fill="#e5e5e5" stroke="#222" stroke-width="2.5"/>
      <text x="392" y="160" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#111" text-anchor="middle" letter-spacing="2">SOCIAL MEDIA MARKETING PLATFORM</text>
      
      <!-- Flash Lightning Icon -->
      <path d="M 410,210 L 330,350 L 400,350 L 370,470 L 470,320 L 400,320 Z" fill="#222" stroke="#111" stroke-width="4"/>

      <text x="392" y="525" font-family="Arial, sans-serif" font-weight="bold" font-size="34" fill="#111" text-anchor="middle">THE FLASH PROVIDER</text>
      <text x="392" y="565" font-family="Arial, sans-serif" font-size="18" fill="#444" text-anchor="middle">Automated SMM Services &amp; Platform Growth</text>
      <line x1="150" y1="595" x2="634" y2="595" stroke="#333" stroke-width="2.5"/>

      <rect x="60" y="630" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="680" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">⚡ Automated SMM Services</text>
      <text x="95" y="720" font-family="Arial, sans-serif" font-size="18" fill="#555">High-speed order processing, social growth packages &amp; fulfillment</text>
      <text x="95" y="750" font-family="Arial, sans-serif" font-size="16" fill="#777">Multi-platform social media distribution networks</text>

      <rect x="60" y="805" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="855" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">📊 Service Management &amp; Analytics</text>
      <text x="95" y="895" font-family="Arial, sans-serif" font-size="18" fill="#555">Real-time status tracking, balance management &amp; reporting</text>
      <text x="95" y="925" font-family="Arial, sans-serif" font-size="16" fill="#777">Intuitive control panel for volume marketing workflows</text>

      <rect x="60" y="980" width="664" height="150" rx="14" fill="#fafafa" stroke="#333" stroke-width="3"/>
      <text x="95" y="1030" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#111">🔗 Resilient API Integrations</text>
      <text x="95" y="1070" font-family="Arial, sans-serif" font-size="18" fill="#555">RESTful endpoints, automated webhook sync, high concurrency</text>
      <text x="95" y="1100" font-family="Arial, sans-serif" font-size="16" fill="#777">Engineered with reliable PHP/Laravel backend architecture</text>

      <rect x="220" y="1170" width="344" height="60" rx="30" fill="#222"/>
      <text x="392" y="1208" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#fff" text-anchor="middle" letter-spacing="1">SMM PLATFORM</text>
    </svg>
  `;

  const flashSvgPainted = `
    <svg width="784" height="1270" viewBox="0 0 784 1270" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flashGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ef4444"/>
          <stop offset="100%" stop-color="#eab308"/>
        </linearGradient>
      </defs>
      <rect width="784" height="1270" fill="#fffbeb"/>
      <rect x="30" y="30" width="724" height="60" rx="12" fill="#fff" stroke="#f59e0b" stroke-width="3"/>
      <circle cx="65" cy="60" r="12" fill="#ef4444"/>
      <line x1="100" y1="60" x2="680" y2="60" stroke="#fde68a" stroke-width="3" stroke-linecap="round"/>
      
      <rect x="160" y="130" width="464" height="45" rx="22" fill="#fef3c7" stroke="#d97706" stroke-width="2.5"/>
      <text x="392" y="160" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#b45309" text-anchor="middle" letter-spacing="2">SOCIAL MEDIA MARKETING PLATFORM</text>
      
      <!-- Flash Lightning Icon (Painted) -->
      <path d="M 410,210 L 330,350 L 400,350 L 370,470 L 470,320 L 400,320 Z" fill="url(#flashGrad)" stroke="#b45309" stroke-width="4"/>

      <text x="392" y="525" font-family="Arial, sans-serif" font-weight="bold" font-size="34" fill="#78350f" text-anchor="middle">THE FLASH PROVIDER</text>
      <text x="392" y="565" font-family="Arial, sans-serif" font-weight="600" font-size="18" fill="#d97706" text-anchor="middle">Automated SMM Services &amp; Platform Growth</text>
      <line x1="150" y1="595" x2="634" y2="595" stroke="#f59e0b" stroke-width="3"/>

      <rect x="60" y="630" width="664" height="150" rx="14" fill="#ffffff" stroke="#fde68a" stroke-width="3"/>
      <text x="95" y="680" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#b45309">⚡ Automated SMM Services</text>
      <text x="95" y="720" font-family="Arial, sans-serif" font-size="18" fill="#334155">High-speed order processing, social growth packages &amp; fulfillment</text>
      <text x="95" y="750" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Multi-platform social media distribution networks</text>

      <rect x="60" y="805" width="664" height="150" rx="14" fill="#ffffff" stroke="#fde68a" stroke-width="3"/>
      <text x="95" y="855" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#b45309">📊 Service Management &amp; Analytics</text>
      <text x="95" y="895" font-family="Arial, sans-serif" font-size="18" fill="#334155">Real-time status tracking, balance management &amp; reporting</text>
      <text x="95" y="925" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Intuitive control panel for volume marketing workflows</text>

      <rect x="60" y="980" width="664" height="150" rx="14" fill="#ffffff" stroke="#fde68a" stroke-width="3"/>
      <text x="95" y="1030" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#b45309">🔗 Resilient API Integrations</text>
      <text x="95" y="1070" font-family="Arial, sans-serif" font-size="18" fill="#334155">RESTful endpoints, automated webhook sync, high concurrency</text>
      <text x="95" y="1100" font-family="Arial, sans-serif" font-size="16" fill="#64748b">Engineered with reliable PHP/Laravel backend architecture</text>

      <rect x="220" y="1170" width="344" height="60" rx="30" fill="url(#flashGrad)"/>
      <text x="392" y="1208" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#fff" text-anchor="middle" letter-spacing="1">SMM PLATFORM</text>
    </svg>
  `;

  await generateCard(raw, info, flashSvgSketch, path.join(OUT_DIR, 'theflashprovider_front.webp'), false);
  await generateCard(raw, info, flashSvgPainted, path.join(OUT_DIR, 'theflashprovider_painted.webp'), true);

  console.log('All 6 Project Cards successfully generated!');
}

run().catch(console.error);

