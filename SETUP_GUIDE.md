# Portfolio Website - Setup Guide

## 🎉 Your Portfolio Website is Ready!

A modern, production-ready personal portfolio website with an integrated Admin Dashboard (CMS) for managing all content dynamically.

## 🚀 Features

### Public Portfolio
- **Hero Section**: Eye-catching introduction with profile info and status badge
- **About Section**: Personal bio and professional highlights
- **Skills Section**: Categorized skills with visual progress bars
- **Experience Timeline**: Professional work history with technologies
- **Certificates Grid**: Certifications and awards showcase
- **Projects Showcase**: Portfolio projects with featured badge support
- **Contact Section**: Contact form and information
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Smooth Animations**: Powered by Framer Motion
- **SEO Optimized**: Proper meta tags and semantic HTML

### Admin Dashboard
- **Secure Login**: Password-protected access (Username: "Administrator", Password: "Paulus21")
- **Dashboard Overview**: Quick stats and insights
- **Full CRUD Operations** for:
  - Profile Management
  - Skills (with categories and levels)
  - Work Experience (with timeline)
  - Certificates & Awards
  - Projects (with featured marking)
  - Availability Status
  - Social Media Links
- **Modern UI**: Clean, intuitive interface
- **Real-time Updates**: Changes reflect immediately on the portfolio
- **Responsive Admin Panel**: Manage content from any device

## 📋 Prerequisites

Before you start, make sure you have:

1. **Supabase Account** - Already configured with provided credentials
2. **Database Setup** - Run the SQL from `DATABASE_SCHEMA.md` in your Supabase SQL Editor

## 🗄️ Database Setup

**IMPORTANT**: You must set up your Supabase database before using the website.

1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to the **SQL Editor** tab
4. Copy and paste ALL the SQL code from `/DATABASE_SCHEMA.md`
5. Click **Run** to execute the SQL
6. Verify tables are created in the **Table Editor** tab

The database includes:
- 7 tables: `profiles`, `skills`, `experiences`, `certificates`, `projects`, `status`, `social_links`
- Sample data to get you started
- Row Level Security (RLS) policies for public read access
- Proper indexes for performance

## 🎯 How to Use

### Accessing the Portfolio

1. Visit the main page at `/` to see your public portfolio
2. The portfolio displays all data from your Supabase database
3. Toggle between dark and light modes using the sun/moon icon

### Admin Dashboard Access

1. Navigate to `/admin/login`
2. Enter credentials:
   - **Username**: Administrator (read-only)
   - **Password**: Paulus21
3. Click "Sign In" to access the dashboard

### Managing Content

#### Profile
- Update your name, title, and bio
- Add contact information (email, phone, location)
- Set avatar and resume URLs
- Changes save immediately

#### Skills
- Add skills with categories (Frontend, Backend, Tools, etc.)
- Set skill levels (0-100%)
- Organize with order index
- Skills are grouped by category on the portfolio

#### Experience
- Add work experiences with company and position
- Include descriptions and dates
- Mark current positions with "Currently working here"
- Add technologies used (comma-separated)

#### Certificates
- Add certifications and awards
- Include issuer and issue date
- Optional: Add credential ID and verification URL
- Upload certificate images

#### Projects
- Showcase your projects with descriptions
- Add demo and GitHub links
- Mark important projects as "Featured"
- Tag with technologies used

#### Status
- Toggle availability for opportunities
- Update status message
- Status appears on the hero section with indicator

#### Social Links
- Add social media profiles (GitHub, LinkedIn, Twitter, etc.)
- Links appear in hero and footer sections
- Organize with order index

## 🎨 Customization

### Theme Colors
The website uses a professional color scheme with:
- Primary: Blue (600-700)
- Secondary: Purple (600-700)
- Accent: Green (for available status)
- Dark mode: Slate (800-900)

### Adding More Social Platforms
The website supports common platforms:
- GitHub
- LinkedIn  
- Twitter/X
- Mail

Icons are automatically assigned based on platform name.

## 🔒 Security Notes

1. **Admin Access**: The current setup uses a simple password stored in environment variables (`VITE_ADMIN_PASSWORD` or default "Paulus21")
2. **Database**: Public read access is enabled for portfolio data, but write operations require proper credentials
3. **Production**: For production use, consider implementing proper authentication with Supabase Auth

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Routing**: React Router DOM v7
- **Database**: Supabase (PostgreSQL)
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Notifications**: Sonner

## 🐛 Troubleshooting

### "Failed to fetch data"
- Verify Supabase credentials in environment variables
- Check if database tables are created
- Ensure RLS policies are set up correctly

### Admin login not working
- Confirm password is "Paulus21"
- Check browser console for errors
- Clear browser cache and try again

### Dark mode not persisting
- Check browser localStorage permissions
- Ensure JavaScript is enabled

### Images not loading
- Verify image URLs are accessible
- Check CORS settings if using external images
- Use direct image URLs (not redirects)

## 📚 File Structure

```
/src
  /app
    /components
      /admin          # Admin dashboard components
      /portfolio      # Public portfolio components
      /ui             # Reusable UI components
    App.tsx           # Main app with routing
  /contexts           # React contexts (Theme, Admin)
  /lib                # Supabase client
  /pages              # Page components
  /styles             # Global styles
  /types              # TypeScript types

/supabase
  /functions/server   # Edge functions (optional backend)
```

## 🎓 Next Steps

1. **Customize Content**: Log in to admin and update with your real data
2. **Add Images**: Upload profile picture and project screenshots
3. **Social Links**: Add your actual social media profiles
4. **Resume**: Upload your resume PDF and add the URL
5. **Projects**: Showcase your best work with live demos
6. **SEO**: Update meta tags for better search engine visibility

## 💡 Tips

- Keep your bio concise and impactful (2-3 sentences)
- Use high-quality images for better presentation
- Mark only your best projects as "Featured"
- Keep status message updated for opportunities
- Regularly update experience and certificates
- Use consistent technology naming across projects

## 📞 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify Supabase connection and credentials
3. Ensure all SQL migrations are applied
4. Review the DATABASE_SCHEMA.md file

---

**Happy Portfolio Building! 🚀**
