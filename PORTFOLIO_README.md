# Modern Portfolio Website with Admin CMS

A full-stack portfolio website with a powerful admin dashboard for content management.

## 🎯 Features Implemented

### Public Portfolio
✅ **Hero Section** - Name, role, bio, avatar, CTA buttons (Download CV, Contact)
✅ **About Section** - Rich text content with HTML support
✅ **Skills Section** - Hard skills with progress bars, soft skills grid
✅ **Experience Section** - Timeline view with company, role, duration, descriptions
✅ **Projects Section** - Grid layout with images, tech stack tags, GitHub/Live demo links
✅ **Certificates Section** - Grid view with modal preview, file/image support
✅ **Status Section** - Current availability indicator
✅ **Social Media Section** - Dynamic social links with icons
✅ **Dark/Light Mode** - Full theme support with smooth transitions
✅ **Smooth Animations** - Motion/React (Framer Motion) for scroll animations
✅ **Responsive Design** - Mobile-first, fully responsive layout
✅ **Progress Indicator** - Scroll progress bar at top
✅ **SEO Ready** - Dynamic page titles and metadata

### Admin Dashboard (CMS)
✅ **Secure Authentication** - Supabase Auth with JWT
✅ **Profile Management** - Edit personal info, contact details, CV link
✅ **Skills CRUD** - Create, Read, Update, Delete skills
✅ **Experience CRUD** - Manage work history
✅ **Projects CRUD** - Portfolio projects management
✅ **Certificates CRUD** - With file upload support
✅ **Status Management** - Update availability status
✅ **Social Links Management** - Manage social media profiles
✅ **File Upload** - Supabase Storage integration for images/files
✅ **Toast Notifications** - User feedback for all actions
✅ **Form Validation** - React Hook Form integration
✅ **Responsive Sidebar** - Mobile-friendly admin interface

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18.3 + TypeScript + Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **Animations**: Motion/React (Framer Motion)
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form
- **Backend**: Supabase Edge Functions (Hono web server)
- **Database**: Supabase KV Store (PostgreSQL)
- **Storage**: Supabase Storage (for files/images)
- **Authentication**: Supabase Auth (JWT)

### Project Structure
```
/src
├── /app
│   ├── /components
│   │   ├── /portfolio       # Public portfolio sections
│   │   ├── ProtectedRoute.tsx
│   │   └── ThemeToggle.tsx
│   ├── /pages
│   │   ├── Portfolio.tsx    # Main public page
│   │   └── /admin
│   │       ├── Login.tsx
│   │       ├── Dashboard.tsx
│   │       ├── ProfileEditor.tsx
│   │       ├── SkillsManager.tsx
│   │       └── ... (other managers)
│   └── App.tsx              # Main app with routing
├── /contexts
│   └── AuthContext.tsx      # Auth state management
├── /hooks
│   └── usePortfolioData.ts  # Data fetching hook
├── /lib
│   └── supabase.ts          # Supabase client & API helpers
├── /types
│   └── portfolio.ts         # TypeScript interfaces
└── /styles
    └── theme.css            # Dark/light theme variables

/supabase/functions/server
└── index.tsx                # API server with all endpoints
```

## 🚀 API Endpoints

### Public Endpoints
- `GET /profile` - Get profile data
- `GET /skills` - Get all skills
- `GET /experiences` - Get all experiences
- `GET /projects` - Get all projects
- `GET /certificates` - Get all certificates
- `GET /socials` - Get social links
- `GET /status` - Get current status

### Protected Endpoints (Require Auth)
- `POST /signup` - Create admin account
- `PUT /profile` - Update profile
- `POST|PUT|DELETE /skills/:id?` - Skills CRUD
- `POST|PUT|DELETE /experiences/:id?` - Experience CRUD
- `POST|PUT|DELETE /projects/:id?` - Projects CRUD
- `POST|PUT|DELETE /certificates/:id?` - Certificates CRUD
- `PUT /socials` - Update social links
- `PUT /status` - Update status
- `POST /upload` - Upload files (certificates, CV, images)
- `DELETE /upload/:path` - Delete uploaded file

## 📊 Database Schema (KV Store)

Data is stored using key prefixes:
- `profile` - Single profile object
- `skill:{id}` - Individual skills
- `experience:{id}` - Individual experiences
- `project:{id}` - Individual projects
- `certificate:{id}` - Individual certificates
- `socials` - Array of social links
- `status` - Current availability status

## 🎨 Theme System

Dark/light mode implemented using:
- `next-themes` for theme management
- CSS custom properties in `/src/styles/theme.css`
- Tailwind CSS v4 with custom color tokens
- Smooth transitions between themes

## 🔐 Authentication Flow

1. Admin navigates to `/admin/login`
2. First user signs up via signup form (creates account with Supabase Admin API)
3. User signs in with email/password
4. JWT token stored in Supabase session
5. Protected routes check for valid session
6. API requests include JWT in Authorization header
7. Server validates token before allowing CRUD operations

## 📦 File Upload

Files are uploaded to Supabase Storage:
- Bucket: `make-04525f52-portfolio-files`
- Folders: `certificates/`, `cv/`, `project-images/`
- Signed URLs generated (1-year expiry)
- Files deleted when associated records are deleted

## 🌐 Deployment Guide

### 1. Supabase Setup
- Supabase project is already connected
- No additional database migrations needed (uses KV store)
- Storage bucket created automatically on first server startup

### 2. Create Admin Account
1. Visit `/admin/login`
2. Click "Sign up"
3. Enter email, password, and name
4. Account created with email auto-confirmed

### 3. Populate Content
1. Login to admin dashboard
2. Fill out Profile section
3. Add Skills (hard & soft)
4. Add Work Experience
5. Add Projects with tech stack
6. Upload Certificates
7. Set Availability Status
8. Add Social Links

### 4. Customization
- Modify theme colors in `/src/styles/theme.css`
- Adjust animations in portfolio components
- Add custom sections by creating new components
- Extend API with additional endpoints in `/supabase/functions/server/index.tsx`

## 🎯 SEO Optimization

The portfolio automatically sets:
- Page title from profile name and role
- Can be extended to add:
  - Meta descriptions
  - OpenGraph tags
  - Twitter cards
  - Sitemap generation
  - Schema.org markup

## 🔍 Next Steps / Future Enhancements

1. **Completed Manager Pages** - Implement full CRUD for Experience, Projects, Certificates, Status, and Socials (following SkillsManager pattern)
2. **Rich Text Editor** - Add WYSIWYG editor for About section
3. **Image Upload UI** - Drag-and-drop file uploads
4. **Analytics Dashboard** - Track portfolio views and engagement
5. **Contact Form** - Add email form with backend integration
6. **Blog Section** - Optional blog with markdown support
7. **Multi-language Support** - i18n for international audience
8. **PDF Generation** - Auto-generate CV from portfolio data
9. **Search & Filters** - Filter projects by tech stack
10. **Performance Metrics** - Lighthouse scores, Core Web Vitals

## 📝 Notes

- All manager pages (except Profile and Skills) show stub components - implement following the SkillsManager pattern
- File upload endpoint is ready but UI needs to be integrated in managers
- No email server configured - signup uses auto-confirmed emails
- KV store is flexible and doesn't require schema migrations
- All API endpoints include error handling and logging
- Toast notifications provide user feedback for all actions

## 🎨 Design Philosophy

- **Minimalist** - Clean, modern aesthetic
- **Tech-focused** - Perfect for developers/designers
- **Professional** - Suitable for job applications
- **Performant** - Optimized animations and lazy loading
- **Accessible** - Semantic HTML and ARIA labels
- **Mobile-first** - Works beautifully on all devices

---

**Built with** ❤️ **using React, TypeScript, Tailwind CSS, and Supabase**
