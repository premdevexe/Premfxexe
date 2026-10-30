import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('public/textures/studio');

// 1. TV Screen
async function generateTvTexture(baseFile, logoFile, title, subtitle, tag, color, outFile) {
  const baseImg = sharp(path.join(OUT_DIR, baseFile));
  const meta = await sharp(path.join(OUT_DIR, baseFile)).metadata();
  const W = meta.width;
  const H = meta.height;

  // Reference is 2048 x 1024
  const scale = W / 2048;

  let logoBuffer = null;
  if (logoFile && fs.existsSync(logoFile)) {
    logoBuffer = await sharp(logoFile)
      .resize(Math.round(220 * scale), Math.round(220 * scale), { fit: 'inside' })
      .png()
      .toBuffer();
  }

  const svgOverlay = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sketch" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      
      <g transform="translate(${Math.round(260 * scale)}, ${Math.round(140 * scale)})">
        <rect x="0" y="0" width="${Math.round(1180 * scale)}" height="${Math.round(740 * scale)}" rx="${Math.round(16 * scale)}" fill="${color}" fill-opacity="0.12" stroke="#222" stroke-width="${Math.max(2, Math.round(4 * scale))}" stroke-dasharray="${Math.round(16 * scale)},${Math.round(8 * scale)}" filter="url(#sketch)" />
        
        <rect x="${Math.round(40 * scale)}" y="${Math.round(40 * scale)}" width="${Math.round(240 * scale)}" height="${Math.round(48 * scale)}" rx="${Math.round(8 * scale)}" fill="#18181b" />
        <text x="${Math.round(160 * scale)}" y="${Math.round(72 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(24 * scale)}" font-weight="bold" fill="#facc15" text-anchor="middle" letter-spacing="2">${tag}</text>
        
        <text x="${Math.round(40 * scale)}" y="${Math.round(380 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(62 * scale)}" font-weight="bold" fill="#111827" letter-spacing="1">${title}</text>
        <text x="${Math.round(40 * scale)}" y="${Math.round(440 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(32 * scale)}" font-weight="600" fill="#374151">${subtitle}</text>
        
        <line x1="${Math.round(40 * scale)}" y1="${Math.round(520 * scale)}" x2="${Math.round(1140 * scale)}" y2="${Math.round(520 * scale)}" stroke="#555" stroke-width="${Math.max(1, Math.round(3 * scale))}" stroke-dasharray="${Math.round(8 * scale)},${Math.round(6 * scale)}" />
        <text x="${Math.round(40 * scale)}" y="${Math.round(580 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(28 * scale)}" fill="#4b5563">PREM KUMAR • FULL-STACK &amp; PRODUCT ARCHITECTURE</text>
        <text x="${Math.round(40 * scale)}" y="${Math.round(625 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(24 * scale)}" fill="#6b7280">Performance Optimized • Technical SEO • Scalable Engineering</text>
      </g>
    </svg>
  `;

  const composites = [
    {
      input: Buffer.from(svgOverlay),
      top: 0,
      left: 0,
    }
  ];

  if (logoBuffer) {
    composites.push({
      input: logoBuffer,
      top: Math.round(240 * scale),
      left: Math.round(300 * scale),
    });
  }

  await baseImg
    .composite(composites)
    .webp({ quality: 85 })
    .toFile(path.join(OUT_DIR, outFile));

  console.log(`Generated TV: ${outFile} (${W}x${H})`);
}

// 2. Monitor Screen
async function generateMonitorTexture(baseFile, logoFile, title, subtitle, tag, color, outFile) {
  const baseImg = sharp(path.join(OUT_DIR, baseFile));
  const meta = await sharp(path.join(OUT_DIR, baseFile)).metadata();
  const W = meta.width;
  const H = meta.height;

  // Reference is 1024 x 512
  const scale = W / 1024;

  let logoBuffer = null;
  if (logoFile && fs.existsSync(logoFile)) {
    logoBuffer = await sharp(logoFile)
      .resize(Math.round(110 * scale), Math.round(110 * scale), { fit: 'inside' })
      .png()
      .toBuffer();
  }

  const svgOverlay = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(${Math.round(90 * scale)}, ${Math.round(60 * scale)})">
        <rect x="0" y="0" width="${Math.round(840 * scale)}" height="${Math.round(390 * scale)}" rx="${Math.round(10 * scale)}" fill="${color}" fill-opacity="0.1" stroke="#333" stroke-width="${Math.max(1, Math.round(3 * scale))}" stroke-dasharray="${Math.round(10 * scale)},${Math.round(5 * scale)}" />
        
        <rect x="${Math.round(30 * scale)}" y="${Math.round(25 * scale)}" width="${Math.round(160 * scale)}" height="${Math.round(34 * scale)}" rx="${Math.round(6 * scale)}" fill="#18181b" />
        <text x="${Math.round(110 * scale)}" y="${Math.round(48 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(18 * scale)}" font-weight="bold" fill="#38bdf8" text-anchor="middle" letter-spacing="1">${tag}</text>
        
        <text x="${Math.round(30 * scale)}" y="${Math.round(210 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(38 * scale)}" font-weight="bold" fill="#111827">${title}</text>
        <text x="${Math.round(30 * scale)}" y="${Math.round(255 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(22 * scale)}" font-weight="600" fill="#4b5563">${subtitle}</text>
        
        <line x1="${Math.round(30 * scale)}" y1="${Math.round(295 * scale)}" x2="${Math.round(810 * scale)}" y2="${Math.round(295 * scale)}" stroke="#666" stroke-width="${Math.max(1, Math.round(2 * scale))}" stroke-dasharray="${Math.round(6 * scale)},${Math.round(4 * scale)}" />
        <text x="${Math.round(30 * scale)}" y="${Math.round(340 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(20 * scale)}" fill="#374151">Prem Kumar • Puducherry, India • Technical SEO &amp; Web Development</text>
      </g>
    </svg>
  `;

  const composites = [
    {
      input: Buffer.from(svgOverlay),
      top: 0,
      left: 0,
    }
  ];

  if (logoBuffer) {
    composites.push({
      input: logoBuffer,
      top: Math.round(110 * scale),
      left: Math.round(120 * scale),
    });
  }

  await baseImg
    .composite(composites)
    .webp({ quality: 85 })
    .toFile(path.join(OUT_DIR, outFile));

  console.log(`Generated Monitor: ${outFile} (${W}x${H})`);
}

// 3. Phone Screen
async function generatePhoneTexture(baseFile, logoFile, title, subtitle, tag, color, outFile) {
  const baseImg = sharp(path.join(OUT_DIR, baseFile));
  const meta = await sharp(path.join(OUT_DIR, baseFile)).metadata();
  const W = meta.width;
  const H = meta.height;

  // Reference is 1024 x 2048
  const scale = W / 1024;

  let logoBuffer = null;
  if (logoFile && fs.existsSync(logoFile)) {
    logoBuffer = await sharp(logoFile)
      .resize(Math.round(240 * scale), Math.round(240 * scale), { fit: 'inside' })
      .png()
      .toBuffer();
  }

  const svgOverlay = `
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(${Math.round(140 * scale)}, ${Math.round(200 * scale)})">
        <rect x="0" y="0" width="${Math.round(744 * scale)}" height="${Math.round(1648 * scale)}" rx="${Math.round(30 * scale)}" fill="${color}" fill-opacity="0.12" stroke="#222" stroke-width="${Math.max(2, Math.round(5 * scale))}" stroke-dasharray="${Math.round(14 * scale)},${Math.round(8 * scale)}" />
        
        <rect x="${Math.round(40 * scale)}" y="${Math.round(60 * scale)}" width="${Math.round(240 * scale)}" height="${Math.round(54 * scale)}" rx="${Math.round(10 * scale)}" fill="#18181b" />
        <text x="${Math.round(160 * scale)}" y="${Math.round(97 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(26 * scale)}" font-weight="bold" fill="#4ade80" text-anchor="middle" letter-spacing="2">${tag}</text>
        
        <text x="${Math.round(372 * scale)}" y="${Math.round(640 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(64 * scale)}" font-weight="bold" fill="#111827" text-anchor="middle" letter-spacing="1">${title}</text>
        <text x="${Math.round(372 * scale)}" y="${Math.round(710 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(34 * scale)}" font-weight="600" fill="#374151" text-anchor="middle">${subtitle}</text>
        
        <rect x="${Math.round(50 * scale)}" y="${Math.round(780 * scale)}" width="${Math.round(644 * scale)}" height="${Math.round(220 * scale)}" rx="${Math.round(16 * scale)}" fill="#ffffff" fill-opacity="0.8" stroke="#333" stroke-width="${Math.max(1, Math.round(3 * scale))}" stroke-dasharray="${Math.round(8 * scale)},${Math.round(6 * scale)}" />
        <text x="${Math.round(372 * scale)}" y="${Math.round(850 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(30 * scale)}" font-weight="bold" fill="#0f172a" text-anchor="middle">"Building Digital Experiences</text>
        <text x="${Math.round(372 * scale)}" y="${Math.round(895 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(30 * scale)}" font-weight="bold" fill="#0f172a" text-anchor="middle">That Perform, Rank &amp; Grow."</text>
        <text x="${Math.round(372 * scale)}" y="${Math.round(955 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(24 * scale)}" fill="#64748b" text-anchor="middle">github.com/premdevexe</text>
        
        <g transform="translate(${Math.round(70 * scale)}, ${Math.round(1060 * scale)})">
          <rect x="0" y="0" width="${Math.round(280 * scale)}" height="${Math.round(60 * scale)}" rx="${Math.round(30 * scale)}" fill="#e2e8f0" stroke="#333" stroke-width="2" />
          <text x="${Math.round(140 * scale)}" y="${Math.round(38 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(24 * scale)}" font-weight="bold" fill="#1e293b" text-anchor="middle">LARAVEL DEV</text>
          
          <rect x="${Math.round(320 * scale)}" y="0" width="${Math.round(280 * scale)}" height="${Math.round(60 * scale)}" rx="${Math.round(30 * scale)}" fill="#e2e8f0" stroke="#333" stroke-width="2" />
          <text x="${Math.round(460 * scale)}" y="${Math.round(38 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(24 * scale)}" font-weight="bold" fill="#1e293b" text-anchor="middle">FULL-STACK</text>
          
          <rect x="0" y="${Math.round(80 * scale)}" width="${Math.round(280 * scale)}" height="${Math.round(60 * scale)}" rx="${Math.round(30 * scale)}" fill="#e2e8f0" stroke="#333" stroke-width="2" />
          <text x="${Math.round(140 * scale)}" y="${Math.round(118 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(24 * scale)}" font-weight="bold" fill="#1e293b" text-anchor="middle">TECHNICAL SEO</text>
          
          <rect x="${Math.round(320 * scale)}" y="${Math.round(80 * scale)}" width="${Math.round(280 * scale)}" height="${Math.round(60 * scale)}" rx="${Math.round(30 * scale)}" fill="#e2e8f0" stroke="#333" stroke-width="2" />
          <text x="${Math.round(460 * scale)}" y="${Math.round(118 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(24 * scale)}" font-weight="bold" fill="#1e293b" text-anchor="middle">SMM &amp; GROWTH</text>
        </g>
        
        <line x1="${Math.round(50 * scale)}" y1="${Math.round(1300 * scale)}" x2="${Math.round(694 * scale)}" y2="${Math.round(1300 * scale)}" stroke="#777" stroke-width="${Math.max(1, Math.round(3 * scale))}" stroke-dasharray="${Math.round(10 * scale)},${Math.round(6 * scale)}" />
        <text x="${Math.round(372 * scale)}" y="${Math.round(1370 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(28 * scale)}" fill="#334155" text-anchor="middle">Connect on GitHub &amp; Web</text>
        <text x="${Math.round(372 * scale)}" y="${Math.round(1420 * scale)}" font-family="Cabin Sketch, sans-serif" font-size="${Math.round(24 * scale)}" fill="#64748b" text-anchor="middle">Puducherry, India</text>
      </g>
    </svg>
  `;

  const composites = [
    {
      input: Buffer.from(svgOverlay),
      top: 0,
      left: 0,
    }
  ];

  if (logoBuffer) {
    composites.push({
      input: logoBuffer,
      top: Math.round(420 * scale),
      left: Math.round(390 * scale),
    });
  }

  await baseImg
    .composite(composites)
    .webp({ quality: 85 })
    .toFile(path.join(OUT_DIR, outFile));

  console.log(`Generated Phone: ${outFile} (${W}x${H})`);
}

async function run() {
  const nammahLogo = 'C:/Users/Dell/Downloads/IMG_20261001_214117-removebg-preview.png';
  const noolLogo = 'D:/Projects/noolandcrop/client/public/logo.png';
  const cloudLogo = 'C:/Users/Dell/Downloads/cloudaspiresolutions.in-1024x1024.png';
  const pkLogo = 'public/favico.png';

  // 1. TV 1: NammahSpot
  await generateTvTexture(
    'tv_front.webp',
    nammahLogo,
    'NAMMAHSPOT',
    'Local Business Discovery Platform',
    'PLATFORM ARCHITECTURE',
    '#f59e0b',
    'tvfront_nammahspot.webp'
  );
  await generateTvTexture(
    'tv_front_painted.webp',
    nammahLogo,
    'NAMMAHSPOT',
    'Local Business Discovery Platform',
    'PLATFORM ARCHITECTURE',
    '#f59e0b',
    'tvfront_nammahspot_painted.webp'
  );

  // 2. TV 2: Nool & Crop
  await generateTvTexture(
    'tv_front.webp',
    noolLogo,
    'NOOL &amp; CROP',
    'E-Commerce Storefront &amp; Management',
    'ECOMMERCE STOREFRONT',
    '#3b82f6',
    'tvfront_noolandcrop.webp'
  );
  await generateTvTexture(
    'tv_front_painted.webp',
    noolLogo,
    'NOOL &amp; CROP',
    'E-Commerce Storefront &amp; Management',
    'ECOMMERCE STOREFRONT',
    '#3b82f6',
    'tvfront_noolandcrop_painted.webp'
  );

  // 3. Monitor: Cloudaspire
  await generateMonitorTexture(
    'monitor_front.webp',
    cloudLogo,
    'CLOUDASPIRE SOLUTIONS',
    'Web Development, SEO &amp; Digital Growth',
    'CASE STUDY',
    '#0284c7',
    'monitorfront_cloudaspire.webp'
  );
  await generateMonitorTexture(
    'monitor_front_painted.webp',
    cloudLogo,
    'CLOUDASPIRE SOLUTIONS',
    'Web Development, SEO &amp; Digital Growth',
    'CASE STUDY',
    '#0284c7',
    'monitorfront_cloudaspire_painted.webp'
  );

  // 4. Phone: Prem Kumar
  await generatePhoneTexture(
    'phone_front.webp',
    pkLogo,
    'PREM KUMAR',
    'Developer &amp; Product Builder',
    'DEV PROFILE',
    '#10b981',
    'phonefront_premkumar.webp'
  );
  await generatePhoneTexture(
    'phone_front_painted.webp',
    pkLogo,
    'PREM KUMAR',
    'Developer &amp; Product Builder',
    'DEV PROFILE',
    '#10b981',
    'phonefront_premkumar_painted.webp'
  );

  console.log('All studio textures successfully generated!');
}

run().catch(err => {
  console.error('Error generating studio textures:', err);
  process.exit(1);
});
