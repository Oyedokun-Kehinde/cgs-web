# Cooper Gaming Services - Wiki

**Project:** Cooper Gaming Services Website  
**Client:** Cooper Gaming Services  
**Developer:** Athena Networks  
**Repository:** `https://gitlab.athenanetworks.com.au/athenanetworks/cgs-web.git`

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Features](#features)
4. [Services Offered](#services-offered)
5. [Contact Form](#contact-form)
6. [SEO Implementation](#seo-implementation)
7. [Design System](#design-system)
8. [File Structure](#file-structure)
9. [Related Documentation](#related-documentation)

---

## Project Overview

Cooper Gaming Services is a Queensland-based company specializing in gaming machine sales, service, and maintenance. This website serves as their primary online presence, showcasing their services and providing a contact form for inquiries.

### Business Information

| Field | Value |
|-------|-------|
| **Company** | Cooper Gaming Services |
| **Location** | Brisbane, Queensland, Australia |
| **Phone** | 0433 323 606 |
| **Email** | info@coopergamingservices.com |
| **Hours** | Mon-Fri 8AM-6PM, Sat 9AM-1PM |

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI Framework |
| TypeScript | 5.x | Type Safety |
| Vite | 5.x | Build Tool |
| SCSS | - | Styling |
| Bootstrap | 5.x | CSS Framework |
| Framer Motion | - | Animations |
| Swiper | - | Hero Slider |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime |
| Express | 4.x | API Framework |
| Nodemailer | - | Email Service |
| express-validator | - | Input Validation |

### Deployment

| Service | Purpose |
|---------|---------|
| Athena Networks Hosting | Production Server |
| Let's Encrypt | SSL Certificate |
| PM2 | Process Manager |

---

## Features

### Core Features

- **Responsive Design** - Mobile-first approach, works on all devices
- **Hero Slider** - Animated image carousel with client photos
- **Services Section** - 6 service cards with descriptions
- **About Section** - Company information with mission/vision/values
- **Contact Form** - Email-based inquiry system
- **Sticky Header** - Navigation stays visible on scroll

### Technical Features

- **SPA Routing** - Single Page Application with smooth scrolling
- **Form Validation** - Client and server-side validation
- **Spam Protection** - URL blocking, keyword filtering, rate limiting
- **SEO Optimized** - Meta tags, structured data, Open Graph
- **Performance** - Lazy loading, code splitting, caching

---

## Services Offered

The website showcases 6 main services:

### 1. Gaming Room Design & Consoles

- Custom room design
- Console base supply & installation
- Partnership with premium manufacturers
- Complete floor solutions

### 2. Technical Service & Repairs

- 24/7 emergency call-outs
- Certified technicians
- Diagnostic excellence
- Fast turnaround times

### 3. Preventative Maintenance

- Scheduled servicing
- Compliance inspections
- Performance optimization
- Detailed reporting

### 4. Retail IT Support

- POS repairs, supply & installation
- EFTPOS (Verifone, Ingenico, Paynuts)
- Hardware support (Toshiba, IBM, Fujitsu)
- Ongoing maintenance

### 5. Pay Systems Repairs & Maintenance

- ATM service & repairs
- Note counter maintenance
- Note recycler support
- Compliance & reliability

### 6. Digital Signage

- LED display installation
- Professional setup
- Content management support
- Service & maintenance

---

## Contact Form

### How It Works

1. User fills out the contact form
2. Frontend validates input (required fields, format)
3. Backend validates input (spam protection, sanitization)
4. If valid, two emails are sent:
   - **Admin Notification** - To `info@coopergamingservices.com`
   - **Customer Confirmation** - To the user's email
5. Success/error modal displayed to user

### Validation Rules

| Field | Rules |
|-------|-------|
| Name | Required, 2-50 chars, letters only |
| Email | Required, valid email format |
| Phone | Required, Australian format |
| Service | Required, must be from list |
| Message | Required, 10-500 chars, no URLs, no spam keywords |

### Spam Protection

- **URL Blocking** - All URLs are blocked
- **Keyword Filtering** - 30+ spam phrases blocked
- **Rate Limiting** - 5 requests per 15 minutes per IP
- **Honeypot Field** - Hidden field to catch bots

---

## SEO Implementation

### Meta Tags

- Title, description, keywords
- Canonical URL
- Robots directives
- Theme color

### Open Graph

- Facebook/LinkedIn sharing
- Image, title, description
- Locale (en_AU)

### Twitter Cards

- Large image card
- Title, description, image

### Structured Data

- LocalBusiness schema
- Organization schema
- Service offerings
- Opening hours
- Contact information

### Local SEO

- Geo tags (Brisbane, QLD)
- Coordinates
- Service area

---

## Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary Blue | #2563eb | Buttons, links, accents |
| Dark Blue | #1e40af | Gradients, hover states |
| Silver | #cbd5e1 | Borders, subtle backgrounds |
| Dark Slate | #334155 | Text, footer |
| Light Silver | #f1f5f9 | Backgrounds |
| White | #ffffff | Cards, backgrounds |

### Typography

- **Font Family:** Google Sans Flex
- **Headings:** Bold, dark slate
- **Body:** Regular, medium grey

### Components

- Buttons (primary, secondary, outline)
- Cards (service, value, USP)
- Forms (inputs, selects, textareas)
- Modals (success, error, info)
- Navigation (desktop, mobile off-canvas)

---

## File Structure

```
cgs-web/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── styles/         # SCSS stylesheets
│   │   ├── utils/          # Utility functions
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── public/
│   │   ├── images/         # Static images
│   │   └── favicon.svg     # Site favicon
│   └── index.html          # HTML template with SEO
├── backend/
│   ├── api/                # API endpoints
│   ├── controllers/        # Business logic
│   └── utils/              # Email service, validators
├── DEPLOYMENT.md           # Deployment guide
├── CONTRIBUTING.md         # Contribution guidelines
├── WIKI.md                 # This file
├── LICENSE                 # MIT License
└── README.md               # Project readme
```

---

## Related Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - How to contribute
- **[README.md](./README.md)** - Project overview
- **[LICENSE](./LICENSE)** - MIT License

---

## Support

For questions or issues:

- **Kenny (Developer):** kenny@athenanetworks.com.au
- **Josh (Hosting):** josh@athenanetworks.com.au

---

*Last Updated: December 10, 2025*
