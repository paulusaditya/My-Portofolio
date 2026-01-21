# Application Routes

## Public Routes

### `/` - Portfolio Homepage
**Public portfolio website with all sections:**
- Hero with profile and status
- About section
- Skills (grouped by category)
- Work experience timeline
- Certificates showcase
- Featured projects
- Contact form
- Footer with social links

**Features:**
- Dark/light mode toggle
- Smooth scroll navigation
- Responsive design
- Animated transitions

## Admin Routes

### `/admin/login` - Admin Login Page
**Secure login to access dashboard**

**Credentials:**
- Username: `Administrator` (read-only field)
- Password: `Paulus21`

**Features:**
- Session persistence (localStorage)
- Redirect to dashboard on success
- "Back to Portfolio" link

### `/admin` - Admin Dashboard (Protected)
**Full CMS with CRUD operations**

**Accessible Sections:**
1. **Dashboard** - Overview with statistics
2. **Profile** - Manage personal information
3. **Skills** - Add/Edit/Delete skills with levels
4. **Experience** - Manage work history
5. **Certificates** - Add certifications and awards
6. **Projects** - Showcase portfolio projects
7. **Status** - Update availability status
8. **Social Links** - Manage social media links

**Features:**
- Protected route (redirects to login if not authenticated)
- Responsive sidebar navigation
- Real-time data updates
- Modal forms for creating/editing
- Delete confirmations
- "View Portfolio" link
- Logout functionality

## Route Protection

- Public routes (`/`) are accessible to everyone
- Admin routes (`/admin`) require authentication
- Unauthenticated users are redirected to `/admin/login`
- Session persists in localStorage

## Navigation Flow

```
┌─────────────────┐
│   / (Home)      │ ◄── Anyone can visit
│   Portfolio     │
└────────┬────────┘
         │
         ├── Click "Admin" (if available)
         │
         ▼
┌─────────────────┐
│ /admin/login    │ ◄── Login page
│ Login Form      │
└────────┬────────┘
         │
         │ Authenticate
         │
         ▼
┌─────────────────┐
│   /admin        │ ◄── Protected dashboard
│   Dashboard     │
│   (Full CRUD)   │
└────────┬────────┘
         │
         ├── "View Portfolio" → Back to /
         └── "Logout" → Back to /admin/login
```

## Deep Links

You can directly access:
- Main portfolio: `http://localhost:5173/`
- Admin login: `http://localhost:5173/admin/login`
- Admin dashboard: `http://localhost:5173/admin` (requires login)

## API Integration

All admin operations communicate with Supabase:
- **Read**: Public access via anon key
- **Create/Update/Delete**: Requires anon key (RLS policies allow all for demo)

## Environment Variables Required

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_PASSWORD=Paulus21  # Optional, defaults to "Paulus21"
```
