import React from 'react';

interface LandmarkArtworkProps {
  destinationId: string;
  className?: string;
}

export const LandmarkArtwork: React.FC<LandmarkArtworkProps> = ({ destinationId, className = '' }) => {
  const normId = destinationId.toLowerCase();

  switch (normId) {
    case 'usa':
    case 'united-states':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-usa" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#FB7185" />
            </linearGradient>
            <linearGradient id="torch-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Sky */}
          <rect width="400" height="200" fill="url(#sky-usa)" />
          {/* Distant Sunset Sun */}
          <circle cx="280" cy="140" r="45" fill="#FFE4E6" fillOpacity="0.4" />
          <circle cx="280" cy="140" r="25" fill="#FFF1F2" fillOpacity="0.8" />
          
          {/* Stars in Sky */}
          <circle cx="40" cy="30" r="1.5" fill="#fff" opacity="0.8" />
          <circle cx="110" cy="45" r="1" fill="#fff" opacity="0.6" />
          <circle cx="180" cy="25" r="1.5" fill="#fff" opacity="0.7" />
          <circle cx="340" cy="35" r="1" fill="#fff" opacity="0.9" />

          {/* Distant Manhattan Skyline Silhouettes */}
          <path
            d="M120 200 V130 H135 V110 H140 V130 H155 V90 H165 V80 H168 V90 H175 V135 H190 V105 H200 V95 H202 V105 H210 V140 H230 V120 H245 V145 H260 V100 H270 V90 H273 V100 H285 V150 H310 V125 H330 V200 Z"
            fill="#0F172A"
            opacity="0.4"
          />
          {/* Middle Skyline */}
          <path
            d="M160 200 V140 H180 V120 H195 V100 H200 V70 H202 V100 H215 V145 H235 V130 H250 V115 H265 V150 H290 V135 H320 V200 Z"
            fill="#1E1B4B"
            opacity="0.7"
          />

          {/* Statue of Liberty Island Base */}
          <path d="M0 200 L60 160 H140 L160 200 Z" fill="#022C22" opacity="0.8" />
          {/* Pedestal */}
          <rect x="75" y="130" width="35" height="35" rx="3" fill="#334155" />
          <rect x="70" y="160" width="45" height="15" rx="2" fill="#1E293B" />
          <rect x="80" y="115" width="25" height="15" rx="2" fill="#475569" />

          {/* Statue of Liberty Body & Robes */}
          <path
            d="M87 115 L84 80 L88 60 L97 60 L102 80 L98 115 Z"
            fill="#059669"
          />
          {/* Head & Crown Spikes */}
          <circle cx="92" cy="52" r="7" fill="#10B981" />
          {/* Crown rays */}
          <path d="M86 48 L83 42 M89 46 L88 39 M92 45 L92 38 M96 46 L97 39 M99 48 L102 42" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
          
          {/* Raised Arm & Torch */}
          <path d="M99 65 L112 40 L115 42 L104 68 Z" fill="#059669" />
          {/* Torch Flame Glow */}
          <circle cx="114" cy="35" r="16" fill="url(#torch-glow)" />
          <path d="M112 38 Q115 28 116 34 Q118 29 119 36 Q116 40 112 38 Z" fill="#FBBF24" />
          <circle cx="115" cy="34" r="3" fill="#FFFBEB" />

          {/* Tablet in left arm */}
          <rect x="80" y="68" width="6" height="12" rx="1" fill="#047857" transform="rotate(-15 80 68)" />

          {/* Harbor Water Reflection */}
          <rect x="0" y="175" width="400" height="25" fill="#0F172A" opacity="0.6" />
          <line x1="20" y1="185" x2="160" y2="185" stroke="#38BDF8" strokeWidth="1.5" opacity="0.4" strokeDasharray="8 6" />
          <line x1="180" y1="190" x2="350" y2="190" stroke="#FB7185" strokeWidth="1.5" opacity="0.4" strokeDasharray="12 8" />
        </svg>
      );

    case 'uk':
    case 'united-kingdom':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-uk" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="60%" stopColor="#4338CA" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <radialGradient id="clock-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
              <stop offset="100%" stopColor="#EAB308" stopOpacity="0.8" />
            </radialGradient>
          </defs>
          {/* Twilight Sky */}
          <rect width="400" height="200" fill="url(#sky-uk)" />

          {/* Glowing London Eye Wheel in distance */}
          <circle cx="330" cy="110" r="45" stroke="#FDA4AF" strokeWidth="1.5" fill="none" opacity="0.4" strokeDasharray="4 4" />
          <circle cx="330" cy="110" r="3" fill="#FDA4AF" opacity="0.6" />
          <line x1="330" y1="110" x2="310" y2="155" stroke="#FDA4AF" strokeWidth="1.5" opacity="0.4" />
          <line x1="330" y1="110" x2="350" y2="155" stroke="#FDA4AF" strokeWidth="1.5" opacity="0.4" />

          {/* Distant Westminster Hall Roofs */}
          <path
            d="M130 200 V150 H160 V135 L170 120 L180 135 V150 H220 V140 L230 125 L240 140 V150 H270 V130 L280 115 L290 130 V200 Z"
            fill="#0F172A"
            opacity="0.6"
          />

          {/* Big Ben Clock Tower (Elizabeth Tower) */}
          {/* Main Tower Base and Body */}
          <rect x="70" y="60" width="46" height="140" fill="#1E293B" />
          {/* Tower vertical pilasters */}
          <line x1="78" y1="65" x2="78" y2="160" stroke="#334155" strokeWidth="1.5" />
          <line x1="93" y1="65" x2="93" y2="160" stroke="#334155" strokeWidth="1.5" />
          <line x1="108" y1="65" x2="108" y2="160" stroke="#334155" strokeWidth="1.5" />

          {/* Clock Chamber */}
          <rect x="66" y="55" width="54" height="42" fill="#0F172A" rx="2" />
          {/* Clock Face Circle */}
          <circle cx="93" cy="76" r="14" fill="url(#clock-glow)" stroke="#B45309" strokeWidth="1.5" />
          <line x1="93" y1="76" x2="93" y2="67" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
          <line x1="93" y1="76" x2="99" y2="76" stroke="#451A03" strokeWidth="1.5" strokeLinecap="round" />

          {/* Tower Spire & Belfry */}
          <polygon points="68,55 93,12 118,55" fill="#0F172A" />
          {/* Top Lantern Pinnacle */}
          <line x1="93" y1="12" x2="93" y2="2" stroke="#F59E0B" strokeWidth="2.5" />

          {/* Westminster Bridge arches in foreground */}
          <path
            d="M0 160 Q35 150 70 160 Q105 150 140 160 Q175 150 210 160 Q245 150 280 160 Q315 150 350 160 Q385 150 400 160 L400 172 L0 172 Z"
            fill="#334155"
          />
          {/* Red London Telephone Box on bridge */}
          <rect x="35" y="132" width="12" height="28" rx="2" fill="#E11D48" />
          <rect x="37" y="138" width="8" height="12" rx="1" fill="#FEF2F2" opacity="0.8" />
          <rect x="36" y="130" width="10" height="3" rx="1.5" fill="#BE123C" />

          {/* River Thames Water Reflection */}
          <rect x="0" y="170" width="400" height="30" fill="#0F172A" />
          <line x1="60" y1="180" x2="140" y2="180" stroke="#FCD34D" strokeWidth="2" opacity="0.4" strokeDasharray="8 4" />
          <line x1="20" y1="190" x2="380" y2="190" stroke="#FB7185" strokeWidth="1.5" opacity="0.3" strokeDasharray="14 8" />
        </svg>
      );

    case 'japan':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-japan" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="45%" stopColor="#4338CA" />
              <stop offset="80%" stopColor="#FDA4AF" />
              <stop offset="100%" stopColor="#FFF1F2" />
            </linearGradient>
            <radialGradient id="sun-japan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#BE123C" />
            </radialGradient>
          </defs>
          {/* Dawn Sky */}
          <rect width="400" height="200" fill="url(#sky-japan)" />

          {/* The Rising Sun Disc */}
          <circle cx="210" cy="90" r="42" fill="url(#sun-japan)" opacity="0.85" />

          {/* Majestic Mount Fuji */}
          {/* Base & Slopes */}
          <polygon points="90,200 210,50 330,200" fill="#312E81" />
          {/* Snow Cap on Mount Fuji Peak */}
          <path
            d="M210 50 L180 88 Q195 96 202 85 Q210 98 218 86 Q228 97 240 88 Z"
            fill="#FFFFFF"
          />

          {/* Chureito Pagoda (Iconic 5-Tier Japanese Pagoda) */}
          {/* Base */}
          <rect x="52" y="160" width="46" height="40" fill="#450A0A" />
          
          {/* Tier 1 Roof & Floor */}
          <polygon points="38,160 75,145 112,160" fill="#DC2626" />
          <rect x="58" y="140" width="34" height="12" fill="#7F1D1D" />

          {/* Tier 2 Roof & Floor */}
          <polygon points="44,140 75,128 106,140" fill="#DC2626" />
          <rect x="62" y="124" width="26" height="10" fill="#7F1D1D" />

          {/* Tier 3 Roof & Floor */}
          <polygon points="48,124 75,114 102,124" fill="#DC2626" />
          <rect x="65" y="110" width="20" height="8" fill="#7F1D1D" />

          {/* Tier 4 Roof & Floor */}
          <polygon points="52,110 75,102 98,110" fill="#DC2626" />
          <rect x="68" y="98" width="14" height="8" fill="#7F1D1D" />

          {/* Top Tier Roof & Spire (Sorin) */}
          <polygon points="56,98 75,90 94,98" fill="#DC2626" />
          <line x1="75" y1="90" x2="75" y2="70" stroke="#FBBF24" strokeWidth="2.5" />
          <circle cx="75" cy="68" r="2.5" fill="#FBBF24" />

          {/* Cherry Blossom (Sakura) Branches in Foreground */}
          {/* Main branch */}
          <path d="M400 0 Q340 30 300 15 Q260 40 240 30" stroke="#451A03" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M340 22 Q320 60 290 65" stroke="#451A03" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M300 15 Q280 45 250 50" stroke="#451A03" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Pink Sakura Flower clusters */}
          <circle cx="320" cy="25" r="7" fill="#F472B6" opacity="0.9" />
          <circle cx="323" cy="22" r="3" fill="#FDF2F8" />
          <circle cx="285" cy="55" r="8" fill="#F472B6" opacity="0.9" />
          <circle cx="288" cy="52" r="3" fill="#FDF2F8" />
          <circle cx="245" cy="35" r="7" fill="#FB7185" opacity="0.9" />
          <circle cx="360" cy="18" r="9" fill="#F472B6" opacity="0.9" />
          <circle cx="300" cy="15" r="6" fill="#FDA4AF" opacity="0.9" />

          {/* Drifting Sakura Petals */}
          <ellipse cx="210" cy="35" rx="3.5" ry="2" fill="#F472B6" opacity="0.8" transform="rotate(25 210 35)" />
          <ellipse cx="160" cy="65" rx="3" ry="1.8" fill="#F472B6" opacity="0.7" transform="rotate(-35 160 65)" />
          <ellipse cx="260" cy="85" rx="4" ry="2" fill="#F472B6" opacity="0.8" transform="rotate(45 260 85)" />
        </svg>
      );

    case 'france':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-france" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
            <radialGradient id="beacon-light" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Parisian Dusk Sky */}
          <rect width="400" height="200" fill="url(#sky-france)" />

          {/* Searchlight Beacon from Eiffel Tower Top */}
          <polygon points="200,20 380,0 350,15" fill="url(#beacon-light)" opacity="0.7" />
          <polygon points="200,20 20,40 50,55" fill="url(#beacon-light)" opacity="0.4" />

          {/* Stars */}
          <circle cx="80" cy="30" r="1.5" fill="#fff" opacity="0.8" />
          <circle cx="320" cy="40" r="1.5" fill="#fff" opacity="0.9" />
          <circle cx="130" cy="50" r="1" fill="#fff" opacity="0.6" />

          {/* Distant Parisian Haussmann Skyline */}
          <path
            d="M0 200 V165 H40 V155 H60 V165 H110 V160 H140 V170 H260 V160 H300 V165 H340 V155 H360 V165 H400 V200 Z"
            fill="#0F172A"
            opacity="0.5"
          />

          {/* Eiffel Tower (Tour Eiffel) */}
          {/* Base Pillars / Legs */}
          <path
            d="M140 200 L170 140 H182 L160 200 Z"
            fill="#1E293B"
          />
          <path
            d="M260 200 L230 140 H218 L240 200 Z"
            fill="#1E293B"
          />
          {/* Base Arch */}
          <path
            d="M160 200 Q200 148 240 200"
            stroke="#1E293B"
            strokeWidth="8"
            fill="none"
          />

          {/* First Platform */}
          <rect x="166" y="136" width="68" height="8" rx="2" fill="#E2E8F0" />
          <line x1="168" y1="138" x2="232" y2="138" stroke="#F59E0B" strokeWidth="1.5" />

          {/* Middle Section */}
          <polygon points="172,136 186,85 214,85 228,136" fill="#334155" />
          {/* Middle lattice X bracing */}
          <line x1="176" y1="130" x2="210" y2="90" stroke="#64748B" strokeWidth="1" />
          <line x1="224" y1="130" x2="190" y2="90" stroke="#64748B" strokeWidth="1" />

          {/* Second Platform */}
          <rect x="184" y="82" width="32" height="6" rx="1.5" fill="#E2E8F0" />

          {/* Upper Spire Tower */}
          <polygon points="187,82 198,24 202,24 213,82" fill="#1E293B" />
          {/* Top Dome & Lantern */}
          <rect x="196" y="20" width="8" height="6" rx="2" fill="#FCD34D" />
          <line x1="200" y1="20" x2="200" y2="10" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="200" cy="18" r="3" fill="#FFFBEB" />

          {/* River Seine & Promenade in Foreground */}
          <rect x="0" y="185" width="400" height="15" fill="#0F172A" />
          <line x1="40" y1="192" x2="360" y2="192" stroke="#60A5FA" strokeWidth="1.5" opacity="0.5" strokeDasharray="16 10" />
        </svg>
      );

    case 'uae':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-uae" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="60%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="burj-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          {/* Arabian Sunset Sky */}
          <rect width="400" height="200" fill="url(#sky-uae)" />

          {/* Golden Crescent Moon */}
          <path d="M330 35 A12 12 0 1 0 342 47 A10 10 0 1 1 330 35 Z" fill="#FDE047" opacity="0.9" />

          {/* Distant Dubai Skyline Towers */}
          <rect x="40" y="120" width="25" height="80" fill="#0F172A" opacity="0.6" />
          <rect x="75" y="95" width="30" height="105" fill="#1E293B" opacity="0.7" />
          <rect x="115" y="130" width="22" height="70" fill="#0F172A" opacity="0.6" />
          <rect x="250" y="110" width="28" height="90" fill="#1E293B" opacity="0.7" />
          <rect x="290" y="85" width="32" height="115" fill="#0F172A" opacity="0.6" />
          <rect x="330" y="125" width="25" height="75" fill="#1E293B" opacity="0.7" />

          {/* Iconic Dubai Frame Outline */}
          <rect x="30" y="85" width="34" height="55" stroke="#F59E0B" strokeWidth="3" fill="none" opacity="0.8" rx="2" />

          {/* Burj Khalifa (World's Tallest Skyscraper) */}
          {/* Base tiered section */}
          <polygon points="175,200 182,145 218,145 225,200" fill="url(#burj-grad)" />
          {/* Tier 2 */}
          <polygon points="183,145 188,105 212,105 217,145" fill="url(#burj-grad)" />
          {/* Tier 3 */}
          <polygon points="189,105 193,65 207,65 211,105" fill="url(#burj-grad)" />
          {/* Tier 4 */}
          <polygon points="194,65 197,35 203,35 206,65" fill="url(#burj-grad)" />
          {/* Needle Spire */}
          <line x1="200" y1="35" x2="200" y2="8" stroke="#F8FAFC" strokeWidth="2.5" />
          <circle cx="200" cy="8" r="2" fill="#E11D48" />

          {/* Burj vertical reflective light stripe */}
          <line x1="200" y1="35" x2="200" y2="195" stroke="#38BDF8" strokeWidth="1.5" opacity="0.8" />

          {/* Dubai Fountain / Marina Water */}
          <rect x="0" y="182" width="400" height="18" fill="#0284C7" opacity="0.8" />
          {/* Fountain light water jets */}
          <path d="M160 182 Q175 160 190 182" stroke="#BAE6FD" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M210 182 Q225 160 240 182" stroke="#BAE6FD" strokeWidth="2" fill="none" opacity="0.7" />
        </svg>
      );

    case 'italy':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-italy" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          {/* Roman Sunset Sky */}
          <rect width="400" height="200" fill="url(#sky-italy)" />

          {/* Sun glowing over Rome */}
          <circle cx="120" cy="110" r="38" fill="#FEF08A" opacity="0.7" />

          {/* Italian Cypress Trees (Tuscan style) */}
          <polygon points="40,200 48,110 56,200" fill="#064E3B" />
          <polygon points="62,200 68,130 74,200" fill="#064E3B" />
          <polygon points="350,200 357,115 364,200" fill="#064E3B" />
          <polygon points="370,200 375,135 380,200" fill="#064E3B" />

          {/* The Roman Colosseum */}
          {/* Colosseum outer stone wall */}
          <path
            d="M90 200 L95 105 Q240 85 340 105 L345 200 Z"
            fill="#78350F"
          />
          {/* Left broken ruin profile */}
          <path
            d="M95 105 L120 100 L130 115 L160 110 L180 120 L210 115 L250 125 L340 105"
            stroke="#451A03"
            strokeWidth="3"
            fill="none"
          />

          {/* Tier 1 Arches (Top level) */}
          <g fill="#1F2937" opacity="0.9">
            <rect x="135" y="125" width="10" height="16" rx="5" />
            <rect x="155" y="125" width="10" height="16" rx="5" />
            <rect x="175" y="125" width="10" height="16" rx="5" />
            <rect x="195" y="125" width="10" height="16" rx="5" />
            <rect x="215" y="125" width="10" height="16" rx="5" />
            <rect x="235" y="125" width="10" height="16" rx="5" />
            <rect x="255" y="125" width="10" height="16" rx="5" />
            <rect x="275" y="125" width="10" height="16" rx="5" />
            <rect x="295" y="125" width="10" height="16" rx="5" />
          </g>

          {/* Tier 2 Arches (Middle level) */}
          <g fill="#1F2937" opacity="0.95">
            <rect x="120" y="150" width="12" height="20" rx="6" />
            <rect x="142" y="150" width="12" height="20" rx="6" />
            <rect x="164" y="150" width="12" height="20" rx="6" />
            <rect x="186" y="150" width="12" height="20" rx="6" />
            <rect x="208" y="150" width="12" height="20" rx="6" />
            <rect x="230" y="150" width="12" height="20" rx="6" />
            <rect x="252" y="150" width="12" height="20" rx="6" />
            <rect x="274" y="150" width="12" height="20" rx="6" />
            <rect x="296" y="150" width="12" height="20" rx="6" />
            <rect x="318" y="150" width="12" height="20" rx="6" />
          </g>

          {/* Ground Cobblestone */}
          <rect x="0" y="185" width="400" height="15" fill="#451A03" />
        </svg>
      );

    case 'saudi-arabia':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-ksa" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#064E3B" />
              <stop offset="60%" stopColor="#047857" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#sky-ksa)" />
          {/* Desert Dunes */}
          <path d="M0 200 Q120 160 260 190 Q340 170 400 185 L400 200 Z" fill="#92400E" opacity="0.9" />
          <path d="M0 200 Q180 175 400 195 L400 200 Z" fill="#78350F" />
          {/* Kingdom Centre Tower Riyadh */}
          {/* Left Pillar */}
          <polygon points="182,200 188,40 195,40 194,200" fill="#E2E8F0" />
          {/* Right Pillar */}
          <polygon points="206,200 205,40 212,40 218,200" fill="#CBD5E1" />
          {/* Iconic Parabolic Arch at Top */}
          <path d="M188 40 Q200 80 212 40 Z" fill="#047857" />
          <path d="M188 40 Q200 18 212 40" stroke="#F1F5F9" strokeWidth="4" fill="none" />
          {/* Sky Bridge */}
          <rect x="194" y="24" width="12" height="4" rx="1" fill="#FEF08A" />
          {/* Palm Trees */}
          <polygon points="70,185 73,165 76,185" fill="#451A03" />
          <circle cx="73" cy="160" r="10" fill="#065F46" />
          <polygon points="320,190 323,170 326,190" fill="#451A03" />
          <circle cx="323" cy="165" r="12" fill="#065F46" />
        </svg>
      );

    case 'turkey':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-turkey" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#312E81" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#FB7185" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#sky-turkey)" />
          {/* Hot Air Balloons in Cappadocia sky */}
          {/* Balloon 1 */}
          <ellipse cx="90" cy="55" rx="16" ry="20" fill="#F43F5E" />
          <polygon points="78,65 90,82 102,65" fill="#F43F5E" />
          <rect x="87" y="84" width="6" height="5" fill="#78350F" />
          {/* Balloon 2 */}
          <ellipse cx="290" cy="40" rx="12" ry="15" fill="#FBBF24" />
          <polygon points="280,48 290,62 300,48" fill="#FBBF24" />
          <rect x="288" y="63" width="4" height="4" fill="#78350F" />
          {/* Balloon 3 */}
          <ellipse cx="230" cy="70" rx="9" ry="12" fill="#38BDF8" />
          <polygon points="223,76 230,88 237,76" fill="#38BDF8" />
          {/* Blue Mosque / Hagia Sophia Domes & Minarets */}
          {/* Minarets */}
          <rect x="130" y="90" width="5" height="110" fill="#1E1B4B" />
          <polygon points="128,90 132.5,70 137,90" fill="#1E1B4B" />
          <rect x="265" y="90" width="5" height="110" fill="#1E1B4B" />
          <polygon points="263,90 267.5,70 272,90" fill="#1E1B4B" />
          {/* Central Dome */}
          <circle cx="200" cy="155" r="42" fill="#1E1B4B" />
          <polygon points="198,113 200,98 202,113" fill="#FBBF24" />
          {/* Side Semi-domes */}
          <circle cx="165" cy="165" r="25" fill="#0F172A" />
          <circle cx="235" cy="165" r="25" fill="#0F172A" />
        </svg>
      );

    case 'thailand':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-thai" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="60%" stopColor="#7C2D12" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#sky-thai)" />
          {/* Wat Arun Central Prang (Temple of Dawn) */}
          <polygon points="195,190 200,30 205,190" fill="#FEF08A" />
          <polygon points="185,190 200,45 215,190" fill="#E2E8F0" opacity="0.9" />
          <polygon points="170,190 200,70 230,190" fill="#F8FAFC" opacity="0.8" />
          {/* Side Prangs */}
          <polygon points="140,190 150,90 160,190" fill="#FDE047" />
          <polygon points="240,190 250,90 260,190" fill="#FDE047" />
          {/* Spire top */}
          <line x1="200" y1="30" x2="200" y2="15" stroke="#F59E0B" strokeWidth="2.5" />
          <circle cx="200" cy="15" r="2.5" fill="#FEF08A" />
          {/* Chao Phraya River */}
          <rect x="0" y="175" width="400" height="25" fill="#0C4A6E" />
          {/* Thai Longtail Boat */}
          <path d="M50 182 Q80 182 95 178 L105 172 L100 185 Q75 186 50 182 Z" fill="#78350F" />
          <line x1="95" y1="178" x2="115" y2="170" stroke="#DC2626" strokeWidth="2" />
        </svg>
      );

    case 'spain':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-spain" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#312E81" />
              <stop offset="60%" stopColor="#BE123C" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#sky-spain)" />
          {/* Sagrada Família Towers Barcelona */}
          {/* Tower 1 */}
          <polygon points="150,190 160,40 170,190" fill="#B45309" />
          <line x1="160" y1="40" x2="160" y2="28" stroke="#FDE047" strokeWidth="2" />
          <circle cx="160" cy="27" r="3" fill="#FDE047" />
          {/* Tower 2 */}
          <polygon points="175,190 188,30 200,190" fill="#92400E" />
          <line x1="188" y1="30" x2="188" y2="16" stroke="#FDE047" strokeWidth="2" />
          <circle cx="188" cy="15" r="3.5" fill="#FDE047" />
          {/* Tower 3 */}
          <polygon points="200,190 212,30 225,190" fill="#92400E" />
          <line x1="212" y1="30" x2="212" y2="16" stroke="#FDE047" strokeWidth="2" />
          <circle cx="212" cy="15" r="3.5" fill="#FDE047" />
          {/* Tower 4 */}
          <polygon points="230,190 240,40 250,190" fill="#B45309" />
          <line x1="240" y1="40" x2="240" y2="28" stroke="#FDE047" strokeWidth="2" />
          <circle cx="240" cy="27" r="3" fill="#FDE047" />
          {/* Connecting bridge arch */}
          <path d="M160 80 Q200 65 240 80" stroke="#78350F" strokeWidth="6" fill="none" />
          {/* Gothic windows perforations */}
          <ellipse cx="188" cy="90" rx="3" ry="8" fill="#18181B" />
          <ellipse cx="212" cy="90" rx="3" ry="8" fill="#18181B" />
        </svg>
      );

    case 'germany':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-de" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="60%" stopColor="#475569" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#sky-de)" />
          {/* Brandenburg Gate Berlin */}
          {/* Quadriga Chariot on top */}
          <rect x="185" y="70" width="30" height="12" fill="#047857" rx="2" />
          <polygon points="200,55 195,70 205,70" fill="#047857" />
          {/* Entablature */}
          <rect x="110" y="82" width="180" height="18" fill="#E2E8F0" rx="2" />
          {/* Doric Columns */}
          <rect x="120" y="100" width="14" height="100" fill="#CBD5E1" />
          <rect x="150" y="100" width="14" height="100" fill="#CBD5E1" />
          <rect x="180" y="100" width="14" height="100" fill="#CBD5E1" />
          <rect x="206" y="100" width="14" height="100" fill="#CBD5E1" />
          <rect x="236" y="100" width="14" height="100" fill="#CBD5E1" />
          <rect x="266" y="100" width="14" height="100" fill="#CBD5E1" />
          {/* Base */}
          <rect x="100" y="190" width="200" height="10" fill="#94A3B8" />
        </svg>
      );

    case 'australia':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-aus" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="50%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#FB7185" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#sky-aus)" />
          {/* Sydney Harbour Bridge silhouette */}
          <path d="M20 180 Q140 70 260 180" stroke="#334155" strokeWidth="8" fill="none" />
          <path d="M20 180 Q140 100 260 180" stroke="#334155" strokeWidth="3" fill="none" />
          {/* Sydney Opera House Shells */}
          <path d="M180 180 Q210 110 240 180 Z" fill="#F8FAFC" />
          <path d="M220 180 Q245 125 270 180 Z" fill="#E2E8F0" />
          <path d="M250 180 Q270 135 290 180 Z" fill="#F8FAFC" />
          <path d="M275 180 Q290 148 305 180 Z" fill="#E2E8F0" />
          {/* Harbour Water */}
          <rect x="0" y="180" width="400" height="20" fill="#0369A1" />
          <line x1="40" y1="188" x2="360" y2="188" stroke="#38BDF8" strokeWidth="2" opacity="0.4" strokeDasharray="12 8" />
        </svg>
      );

    case 'regional-europe':
    case 'europe-regional':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-eu" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#sky-eu)" />
          {/* 12 European Stars Circle in Sky */}
          <g fill="#FDE047" opacity="0.6">
            <circle cx="80" cy="50" r="2" />
            <circle cx="95" cy="45" r="2" />
            <circle cx="110" cy="50" r="2" />
            <circle cx="115" cy="65" r="2" />
            <circle cx="110" cy="80" r="2" />
            <circle cx="95" cy="85" r="2" />
            <circle cx="80" cy="80" r="2" />
            <circle cx="75" cy="65" r="2" />
          </g>
          {/* Big Ben Tower left */}
          <rect x="70" y="80" width="22" height="120" fill="#1E293B" />
          <polygon points="68,80 81,40 94,80" fill="#0F172A" />
          {/* Eiffel Tower Center */}
          <polygon points="175,190 190,30 205,190" fill="#E2E8F0" />
          <path d="M178 190 Q190 150 202 190" stroke="#334155" strokeWidth="6" fill="none" />
          {/* Leaning Tower of Pisa Right */}
          <rect x="290" y="70" width="26" height="130" fill="#F8FAFC" transform="rotate(7 290 70)" rx="2" />
          {/* Roman Colosseum right */}
          <path d="M230 190 L240 120 Q320 100 370 120 L380 190 Z" fill="#78350F" opacity="0.7" />
        </svg>
      );

    case 'regional-asia':
    case 'asia-regional':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-asia" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="60%" stopColor="#047857" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#sky-asia)" />
          {/* Red Sun */}
          <circle cx="200" cy="90" r="40" fill="#DC2626" opacity="0.8" />
          {/* Mt Fuji in background */}
          <polygon points="80,190 200,60 320,190" fill="#1E1B4B" />
          <path d="M200 60 L180 90 Q200 98 220 90 Z" fill="#FFFFFF" />
          {/* Asian Pagoda Tiered in foreground */}
          <polygon points="40,190 60,110 80,190" fill="#B91C1C" />
          <polygon points="320,190 340,100 360,190" fill="#B91C1C" />
        </svg>
      );

    case 'global-140':
    case 'global-plan':
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-glob" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="50%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#sky-glob)" />
          {/* Connected Global Network Lines & Globe */}
          <circle cx="200" cy="100" r="70" stroke="#38BDF8" strokeWidth="2" fill="none" opacity="0.5" />
          <ellipse cx="200" cy="100" rx="35" ry="70" stroke="#38BDF8" strokeWidth="1.5" fill="none" opacity="0.4" />
          <line x1="130" y1="100" x2="270" y2="100" stroke="#38BDF8" strokeWidth="1.5" opacity="0.4" />
          {/* Glowing Satellites / Cities */}
          <circle cx="165" cy="70" r="4" fill="#FF6B35" />
          <circle cx="235" cy="85" r="4" fill="#00B67A" />
          <circle cx="180" cy="130" r="4" fill="#FBBF24" />
          <circle cx="220" cy="120" r="4" fill="#38BDF8" />
          {/* Worldwide Skyline Silhouette at bottom */}
          <path d="M0 200 V160 H30 V140 H45 V160 H80 V120 H95 V160 H140 V150 H160 V130 H170 V160 H230 V125 H245 V160 H290 V145 H310 V160 H350 V135 H365 V160 H400 V200 Z" fill="#020617" opacity="0.8" />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 400 200"
          className={`w-full h-full object-cover ${className}`}
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sky-def" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B192C" />
              <stop offset="60%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <rect width="400" height="200" fill="url(#sky-def)" />
          {/* Stylized Globe Line Art */}
          <circle cx="300" cy="100" r="75" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.25" />
          <ellipse cx="300" cy="100" rx="40" ry="75" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.25" />
          <line x1="225" y1="100" x2="375" y2="100" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.25" />
          {/* Mountains Silhouette */}
          <polygon points="40,200 130,120 220,200" fill="#0F172A" opacity="0.4" />
          <polygon points="160,200 250,110 340,200" fill="#0F172A" opacity="0.3" />
        </svg>
      );
  }
};
