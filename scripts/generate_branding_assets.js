import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateBranding() {
  // 1. Favicon (426x426) - Hand-drawn stylized "PK" monogram with sketch circle
  const favSvg = `
    <svg width="426" height="426" viewBox="0 0 426 426" xmlns="http://www.w3.org/2000/svg">
      <rect width="426" height="426" rx="90" fill="#fafafa"/>
      <!-- Hand-drawn concentric sketchy circle -->
      <path d="M 213,25 C 320,22 400,105 402,213 C 404,320 320,402 213,400 C 105,398 24,318 26,213 C 28,106 108,27 213,25 Z" fill="none" stroke="#1a1a1a" stroke-width="8" stroke-linecap="round"/>
      <path d="M 210,32 C 312,30 392,110 395,210 C 397,312 315,394 210,392 C 112,390 35,312 37,210 C 39,112 112,34 210,32 Z" fill="none" stroke="#333" stroke-width="3" stroke-dasharray="12,6"/>
      
      <!-- "P" letter -->
      <path d="M 120,320 L 120,110 L 210,110 C 260,110 260,195 210,195 L 120,195" fill="none" stroke="#1a1a1a" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
      
      <!-- "K" letter -->
      <path d="M 250,110 L 250,320 M 340,115 L 252,220 L 345,320" fill="none" stroke="#1a1a1a" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
      
      <!-- Accent dot -->
      <circle cx="365" cy="315" r="9" fill="#f97316"/>
    </svg>
  `;

  await sharp(Buffer.from(favSvg))
    .png()
    .toFile('public/favico.png');
  console.log('Generated public/favico.png');

  // 2. Open Graph Image (1200x630)
  const ogSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fafafa"/>
          <stop offset="100%" stop-color="#f0ece1"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>

      <!-- Hand-drawn double outer border -->
      <rect x="25" y="25" width="1150" height="580" rx="16" fill="none" stroke="#222" stroke-width="4"/>
      <rect x="35" y="35" width="1130" height="560" rx="12" fill="none" stroke="#444" stroke-width="1.5" stroke-dasharray="16,8"/>

      <!-- Perspective sketch floor lines -->
      <line x1="200" y1="605" x2="480" y2="440" stroke="#bbb" stroke-width="2" stroke-dasharray="6,6"/>
      <line x1="400" y1="605" x2="520" y2="440" stroke="#bbb" stroke-width="2" stroke-dasharray="6,6"/>
      <line x1="600" y1="605" x2="600" y2="440" stroke="#bbb" stroke-width="2" stroke-dasharray="6,6"/>
      <line x1="800" y1="605" x2="680" y2="440" stroke="#bbb" stroke-width="2" stroke-dasharray="6,6"/>
      <line x1="1000" y1="605" x2="720" y2="440" stroke="#bbb" stroke-width="2" stroke-dasharray="6,6"/>

      <!-- Top Tag -->
      <rect x="420" y="70" width="360" height="42" rx="21" fill="#e5e5e5" stroke="#333" stroke-width="2"/>
      <text x="600" y="97" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#222" text-anchor="middle" letter-spacing="3">&lt; INTERACTIVE 3D PORTFOLIO /&gt;</text>

      <!-- Main Name -->
      <text x="600" y="230" font-family="Arial, sans-serif" font-weight="900" font-size="92" fill="#111" text-anchor="middle" letter-spacing="14">PREM KUMAR</text>

      <!-- Title / Roles -->
      <text x="600" y="295" font-family="Arial, sans-serif" font-weight="bold" font-size="28" fill="#444" text-anchor="middle" letter-spacing="4">DEVELOPER &amp; DIGITAL PRODUCT BUILDER</text>

      <!-- Headline -->
      <text x="600" y="375" font-family="Georgia, serif" font-style="italic" font-size="26" fill="#1e293b" text-anchor="middle">"Building Digital Experiences That Perform, Rank &amp; Grow."</text>

      <!-- Skill Pills -->
      <g transform="translate(180, 430)">
        <rect x="0" y="0" width="135" height="42" rx="21" fill="#fff" stroke="#333" stroke-width="2"/>
        <text x="67" y="27" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#111" text-anchor="middle">Laravel</text>

        <rect x="155" y="0" width="135" height="42" rx="21" fill="#fff" stroke="#333" stroke-width="2"/>
        <text x="222" y="27" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#111" text-anchor="middle">Full-Stack</text>

        <rect x="310" y="0" width="135" height="42" rx="21" fill="#fff" stroke="#333" stroke-width="2"/>
        <text x="377" y="27" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#111" text-anchor="middle">React &amp; 3D</text>

        <rect x="465" y="0" width="180" height="42" rx="21" fill="#fff" stroke="#333" stroke-width="2"/>
        <text x="555" y="27" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#111" text-anchor="middle">Technical SEO</text>

        <rect x="665" y="0" width="175" height="42" rx="21" fill="#fff" stroke="#333" stroke-width="2"/>
        <text x="752" y="27" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#111" text-anchor="middle">Digital Marketing</text>
      </g>

      <!-- Doodles / Stars -->
      <path d="M 120,130 L 130,150 L 150,150 L 135,165 L 140,185 L 120,172 L 100,185 L 105,165 L 90,150 L 110,150 Z" fill="none" stroke="#333" stroke-width="2"/>
      <path d="M 1080,130 L 1090,150 L 1110,150 L 1095,165 L 1100,185 L 1080,172 L 1060,185 L 1065,165 L 1050,150 L 1070,150 Z" fill="none" stroke="#333" stroke-width="2"/>
      
      <!-- Bottom Footer -->
      <text x="600" y="550" font-family="Arial, sans-serif" font-size="16" fill="#666" text-anchor="middle" letter-spacing="1">Web Development • Laravel Solutions • Organic Search Optimization • SMM</text>
    </svg>
  `;

  await sharp(Buffer.from(ogSvg))
    .webp({ quality: 92 })
    .toFile('public/og-image.webp');
  console.log('Generated public/og-image.webp');

  // 3. Avatar on Cloud (1781x890) for About Room
  const cloudAvatarSvg = `
    <svg width="1781" height="890" viewBox="0 0 1781 890" xmlns="http://www.w3.org/2000/svg">
      <!-- Transparent background -->
      <!-- Hand-drawn Fluffy Cloud Base -->
      <path d="
        M 380,660 
        C 250,660 160,570 170,450 
        C 90,430 50,340 90,260 
        C 120,180 200,140 280,170 
        C 330,90 440,60 530,110 
        C 600,40 730,30 820,90 
        C 900,30 1030,30 1110,90 
        C 1200,50 1310,70 1380,140 
        C 1480,120 1590,180 1620,280 
        C 1700,340 1710,450 1650,540 
        C 1680,620 1610,710 1510,720 
        C 1440,780 1330,790 1250,750 
        C 1170,820 1020,830 920,780 
        C 830,830 700,830 610,780 
        C 520,810 420,770 380,660 Z" 
        fill="#ffffff" stroke="#1a1a1a" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>

      <!-- Inner cloud pencil shade lines -->
      <path d="M 280,600 C 400,640 550,620 650,580" fill="none" stroke="#bbb" stroke-width="6" stroke-linecap="round" stroke-dasharray="16,10"/>
      <path d="M 750,700 C 900,740 1100,720 1250,660" fill="none" stroke="#bbb" stroke-width="6" stroke-linecap="round" stroke-dasharray="16,10"/>
      <path d="M 1320,580 C 1420,620 1520,590 1580,520" fill="none" stroke="#bbb" stroke-width="6" stroke-linecap="round" stroke-dasharray="16,10"/>

      <!-- Hand-Drawn Character (Prem Kumar) on the Cloud with Laptop -->
      <!-- Body & Clothes -->
      <g transform="translate(680, 220)">
        <!-- Head / Hair -->
        <path d="M 180,150 C 140,80 260,30 320,60 C 370,80 390,130 370,180 C 350,150 300,130 250,140 C 200,150 190,170 180,150 Z" fill="#222" stroke="#111" stroke-width="8"/>
        <!-- Face -->
        <path d="M 210,140 C 210,210 240,260 290,260 C 340,260 365,210 365,140" fill="#fff" stroke="#1a1a1a" stroke-width="8" stroke-linecap="round"/>
        <!-- Glasses / Eyes -->
        <circle cx="250" cy="180" r="24" fill="none" stroke="#1a1a1a" stroke-width="7"/>
        <circle cx="315" cy="180" r="24" fill="none" stroke="#1a1a1a" stroke-width="7"/>
        <line x1="274" y1="180" x2="291" y2="180" stroke="#1a1a1a" stroke-width="7"/>
        <circle cx="252" cy="180" r="7" fill="#1a1a1a"/>
        <circle cx="317" cy="180" r="7" fill="#1a1a1a"/>
        <!-- Smile -->
        <path d="M 260,220 Q 285,240 310,220" fill="none" stroke="#1a1a1a" stroke-width="7" stroke-linecap="round"/>
        
        <!-- Torso / Jacket -->
        <path d="M 210,270 L 140,430 L 410,430 L 350,270 Z" fill="#fff" stroke="#1a1a1a" stroke-width="8" stroke-linejoin="round"/>
        <!-- Collar & Tie/T-Shirt -->
        <path d="M 260,270 L 280,340 L 300,270" fill="none" stroke="#1a1a1a" stroke-width="6"/>

        <!-- Laptop on Lap -->
        <path d="M 200,380 L 380,380 L 400,430 L 180,430 Z" fill="#f0f0f0" stroke="#1a1a1a" stroke-width="8" stroke-linejoin="round"/>
        <path d="M 220,380 L 240,300 L 380,300 L 360,380 Z" fill="#ffffff" stroke="#1a1a1a" stroke-width="8" stroke-linejoin="round"/>
        <!-- Code lines on laptop screen -->
        <line x1="250" y1="320" x2="350" y2="320" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
        <line x1="250" y1="335" x2="320" y2="335" stroke="#f97316" stroke-width="4" stroke-linecap="round"/>
        <line x1="250" y1="350" x2="360" y2="350" stroke="#10b981" stroke-width="4" stroke-linecap="round"/>

        <!-- Legs crossed relaxed on cloud -->
        <path d="M 140,430 C 100,460 120,530 220,520 L 350,520 C 420,520 460,480 410,430" fill="#fff" stroke="#1a1a1a" stroke-width="8" stroke-linejoin="round"/>
        <!-- Shoes -->
        <ellipse cx="140" cy="510" rx="35" ry="20" fill="#222"/>
        <ellipse cx="430" cy="500" rx="35" ry="20" fill="#222"/>
      </g>

      <!-- Floating Tech Doodles around Cloud -->
      <!-- PHP / Laravel curly brace -->
      <text x="320" y="320" font-family="Courier, monospace" font-weight="bold" font-size="90" fill="#e11d48">{ }</text>
      <!-- Terminal Tag -->
      <text x="1350" y="320" font-family="Courier, monospace" font-weight="bold" font-size="80" fill="#0284c7">&lt; / &gt;</text>
      <!-- Search / SEO Magnifier -->
      <g transform="translate(420, 440)">
        <circle cx="35" cy="35" r="25" fill="none" stroke="#f59e0b" stroke-width="8"/>
        <line x1="55" y1="55" x2="80" y2="80" stroke="#f59e0b" stroke-width="10" stroke-linecap="round"/>
      </g>
      <!-- Growth Arrow -->
      <g transform="translate(1260, 430)">
        <path d="M 10,70 L 60,20 L 85,45 L 140,0" fill="none" stroke="#10b981" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 115,0 L 140,0 L 140,25" fill="none" stroke="#10b981" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>
  `;

  await sharp(Buffer.from(cloudAvatarSvg))
    .webp({ quality: 90 })
    .toFile('public/textures/about/awatarnachmurce.webp');
  console.log('Generated public/textures/about/awatarnachmurce.webp');
}

generateBranding().catch(console.error);

