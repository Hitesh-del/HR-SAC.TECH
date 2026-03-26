# HR-SAC Software Company Website Requirements Document

## 1. Application Overview

### 1.1 Application Name
HR-SAC Software Company Website

### 1.2 Application Description
A high-end animated modern software company website showcasing HR-SAC as a professional software development and IT solutions company. The website features a black and white premium tech theme with smooth animations, glassmorphism UI, and interactive elements to present the company's digital services and expertise.

### 1.3 Application Type
Web (Corporate Website)

### 1.4 Target Language
English

## 2. Design Style

### 2.1 Visual Theme
- Black and white premium tech theme with futuristic, minimal aesthetic
- Background: black and white gradient
- Accent colors: white, light gray, dark gray gradient
- UI style: glassmorphism with soft glow and modern cards
- Font style: modern tech sans-serif
- Animations: smooth, professional, interactive transitions
- Navigation bar: glass effect style
- Design inspiration reference: pawartechnologyservices.com

## 3. Website Structure

### 3.1 Home Page
- Animated hero section with Galaxy animated background (using provided Galaxy component with npx shadcn@latest add @react-bits/Galaxy-JS-CSS)
- Remove color palette, code icon, and phone icons from hero section
- Short company introduction with animated counters
- Services preview cards with hover animations
- Case studies preview
- Client testimonials slider
- Team highlights
- Blog preview
- Call-to-action for free consultation
- Modern footer with social links

### 3.2 About Us Page
- Company story
- Mission and vision
- Development process overview
- Team members section
- Animated statistics (projects completed, clients served)

### 3.3 Capabilities Page
Services offered by HR-SAC:
- Website Development
- Mobile App Development
- UI/UX Design
- Software Development
- Cloud Integration
- Free IT Consultation

Features:
- Animated service cards
- Hover interactions
- Technology stack icons

### 3.4 Case Studies Page
- Project portfolio grid
- Detailed project pages with problem-solution-results format
- Screenshots and performance metrics

### 3.5 Insights Page
- Blog articles
- Client testimonials
- Career opportunities
- Industry insights

### 3.6 Contact Page
- Contact form
- Google map location
- Email and phone information
- Free consultation booking
- Live chat option

## 4. Key Features

### 4.1 Interactive Elements
- Smooth scroll animations
- 3D style service cards
- Interactive hover effects
- Animated counters
- Modern gradient buttons
- Glassmorphism UI components
- Animated section transitions
- Galaxy animated background in hero section

### 4.2 UI Components
- Animated navigation bar with glass effect
- Modern blog cards
- Testimonial cards
- Team member profile cards
- Gradient CTA buttons
- Galaxy component integration

### 4.3 Responsive Design
- Optimized for mobile, tablet, and desktop devices
- SEO optimized structure

### 4.4 Performance Optimization
- Optimized loading speed
- Lazy loading enabled
- Image optimization

## 5. Authentication
- Google login (OSS method)
- Email login
- OTP 2-step verification

## 6. Data Storage
- Supabase integration for data storage and management

## 7. Galaxy Animated Background Implementation

### 7.1 Installation
Use the following command to add the Galaxy component:
```
npx shadcn@latest add @react-bits/Galaxy-JS-CSS
```

### 7.2 Component Import
```javascript
import Galaxy from './Galaxy';
```

### 7.3 Basic Usage
Integrate the Galaxy component in the hero section with default or custom prop values as needed.

### 7.4 Component Files
The Galaxy component includes:
- Galaxy.tsx (React component with WebGL implementation)
- Galaxy.css (styling)

The component uses OGL library for WebGL rendering and includes customizable parameters for focal point, rotation, star speed, density, hue shift, animation speed, mouse interaction, glow intensity, saturation, and other visual effects.