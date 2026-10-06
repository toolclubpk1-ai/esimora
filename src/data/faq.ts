import { FAQItem } from '../types';

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is an eSIM?',
    answer: 'An eSIM (embedded SIM) is a digital SIM card built directly into your smartphone or tablet hardware. Rather than inserting a physical plastic SIM card, you simply scan a QR code to download a cellular data profile in seconds.',
    category: 'general',
    order: 1
  },
  {
    id: 'faq-2',
    question: 'How does an eSIM work?',
    answer: 'An eSIM works exactly like a physical SIM card, but everything is handled digitally. When you arrive at your destination, your phone connects to local partner carrier towers (such as Verizon, EE, NTT Docomo, or Orange) and routes your mobile internet traffic seamlessly without international roaming surcharges.',
    category: 'general',
    order: 2
  },
  {
    id: 'faq-3',
    question: 'How do I install my eSIM?',
    answer: 'Installation takes under 2 minutes: \n1. On iOS: Go to Settings > Cellular > Add eSIM > Use QR Code, then scan the QR code received in your confirmation email or dashboard. \n2. On Android: Go to Settings > Network & Internet > SIMs > Add SIM > Download SIM, and scan the QR code. You can also copy/paste the manual LPA activation code.',
    category: 'installation',
    order: 3
  },
  {
    id: 'faq-4',
    question: 'When should I activate my eSIM?',
    answer: 'We recommend installing your eSIM before departure or while connected to airport Wi-Fi. Most plans only start counting down their validity days once you arrive at your destination and connect to the local supported cellular network.',
    category: 'installation',
    order: 4
  },
  {
    id: 'faq-5',
    question: 'Does my phone support eSIM?',
    answer: 'Most smartphones manufactured since 2018 support eSIM, including iPhone XR, XS, 11 through 16 series; Samsung Galaxy S20 through S24 series, Z Fold/Flip; Google Pixel 3 through 9; and many modern Xiaomi and Motorola models. Your phone must also be carrier-unlocked. You can test compatibility with our interactive checker above.',
    category: 'compatibility',
    order: 5
  },
  {
    id: 'faq-6',
    question: 'Can I use hotspot / personal tethering?',
    answer: 'Yes! All ESIMORA fixed data packages and select unlimited packages allow personal hotspot and tethering, so you can share internet with your laptop, tablet, or travel companions at full 5G/4G speed.',
    category: 'general',
    order: 6
  },
  {
    id: 'faq-7',
    question: 'Do I need to remove my physical SIM?',
    answer: 'No, you do not need to remove your physical SIM. Modern phones feature Dual SIM technology. You can keep your primary physical SIM active to receive SMS and verification codes (such as banking OTPs and WhatsApp), while setting your ESIMORA eSIM as your primary cellular data line.',
    category: 'general',
    order: 7
  },
  {
    id: 'faq-8',
    question: 'Can I use an eSIM while traveling to multiple countries?',
    answer: 'Yes. If you choose our Regional Europe (35+ countries), Regional Asia (18 countries), or Global (140+ countries) plans, your eSIM will automatically hop to local partner networks as you cross borders without needing new QR codes or re-installations.',
    category: 'general',
    order: 8
  },
  {
    id: 'faq-9',
    question: 'What happens if my data runs out?',
    answer: 'You will receive notifications at 80% and 100% data usage. You can top-up additional gigabytes or add validity days directly through your ESIMORA "My eSIMs" dashboard in one click without scanning a new QR code.',
    category: 'billing',
    order: 9
  },
  {
    id: 'faq-10',
    question: 'Can I buy an eSIM before my trip?',
    answer: 'Absolutely! You can purchase months in advance. The eSIM profile is stored safely in your account, and the validity clock does not begin ticking until your device links to the destination network overseas.',
    category: 'billing',
    order: 10
  },
  {
    id: 'faq-11',
    question: 'Can I get a refund?',
    answer: 'Yes. We offer a 100% money-back guarantee for unused eSIMs within 30 days of purchase if you encounter technical incompatibility or plan cancellation prior to network activation.',
    category: 'billing',
    order: 11
  },
  {
    id: 'faq-12',
    question: 'How do I contact customer support?',
    answer: 'Our dedicated travel support specialists are available 24 hours a day, 7 days a week, 365 days a year via Live Chat, WhatsApp (+1 800-ESIMORA), and email support at support@esimora.io with an average response time of under 3 minutes.',
    category: 'troubleshooting',
    order: 12
  }
];
