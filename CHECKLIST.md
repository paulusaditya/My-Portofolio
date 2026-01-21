# ✅ Setup Checklist - Portfolio Website

Gunakan checklist ini untuk memastikan semua sudah siap!

## 📋 Pre-Launch Checklist

### 1. Database Setup ✅ WAJIB!
- [ ] Login ke [Supabase Dashboard](https://supabase.com/dashboard)
- [ ] Buka tab **SQL Editor**
- [ ] Copy SEMUA code SQL dari `/DATABASE_SCHEMA.md`
- [ ] Paste dan **Run** SQL
- [ ] Verify di **Table Editor**: 7 tables created
  - [ ] profiles
  - [ ] skills  
  - [ ] experiences
  - [ ] certificates
  - [ ] projects
  - [ ] status
  - [ ] social_links
- [ ] Check sample data inserted successfully

### 2. Environment Variables
- [ ] File `.env` exists di root folder
- [ ] `VITE_SUPABASE_URL` terisi dengan URL project Supabase
- [ ] `VITE_SUPABASE_ANON_KEY` terisi dengan anon key
- [ ] `VITE_ADMIN_PASSWORD` terisi (optional, default: "Paulus21")

### 3. Test Website
- [ ] Buka `http://localhost:5173/` - Portfolio loads
- [ ] Test navigation smooth scroll
- [ ] Toggle dark/light mode works
- [ ] All sections display (Hero, About, Skills, etc.)
- [ ] Social links clickable
- [ ] Contact form functional
- [ ] Responsive pada mobile (resize browser)

### 4. Test Admin Login
- [ ] Akses `http://localhost:5173/admin/login`
- [ ] Login berhasil dengan:
  - Username: `Administrator`
  - Password: `Paulus21`
- [ ] Redirect ke dashboard after login
- [ ] Sidebar navigation works
- [ ] "View Portfolio" link works
- [ ] Logout works

### 5. Test Admin CRUD - Profile
- [ ] Click "Profile" di sidebar
- [ ] Form terisi dengan data dari database
- [ ] Update nama → Save → Success notification
- [ ] Reload page → Data persisted
- [ ] Check portfolio → Perubahan muncul

### 6. Test Admin CRUD - Skills
- [ ] Click "Skills" di sidebar
- [ ] Table shows existing skills
- [ ] Click "Add Skill" → Modal muncul
- [ ] Isi form → Submit → Success notification
- [ ] Skill baru muncul di table
- [ ] Click Edit → Modal terisi dengan data
- [ ] Update → Save → Success
- [ ] Click Delete → Confirmation → Deleted
- [ ] Check portfolio → Skills update

### 7. Test Admin CRUD - Experience
- [ ] Click "Experience" di sidebar
- [ ] Add new experience → Success
- [ ] Edit experience → Success
- [ ] Delete experience → Success
- [ ] Check timeline di portfolio

### 8. Test Admin CRUD - Certificates
- [ ] Click "Certificates" di sidebar
- [ ] Add certificate → Success
- [ ] Edit → Success
- [ ] Delete → Success
- [ ] Check portfolio certificates grid

### 9. Test Admin CRUD - Projects
- [ ] Click "Projects" di sidebar
- [ ] Add project → Success
- [ ] Toggle "Featured" → Works
- [ ] Edit → Success
- [ ] Delete → Success
- [ ] Check portfolio projects

### 10. Test Admin CRUD - Status
- [ ] Click "Status" di sidebar
- [ ] Toggle "Available" checkbox
- [ ] Update status message
- [ ] Save → Success
- [ ] Check portfolio → Status badge updates

### 11. Test Admin CRUD - Social Links
- [ ] Click "Social Links" di sidebar
- [ ] Add social link → Success
- [ ] Edit → Success
- [ ] Delete → Success
- [ ] Check portfolio → Links appear in Hero & Footer

---

## 🎨 Content Checklist

### Profile Information
- [ ] Replace "John Doe" dengan nama Anda
- [ ] Update title/profession
- [ ] Tulis bio yang menarik (2-3 kalimat)
- [ ] Update email address
- [ ] Add phone number
- [ ] Add location
- [ ] Upload profile photo URL
- [ ] Upload resume PDF URL

### Skills
- [ ] Delete sample skills
- [ ] Add minimal 5-10 skills real
- [ ] Group by categories (Frontend, Backend, Tools)
- [ ] Set realistic levels (0-100%)
- [ ] Set order_index untuk sorting

### Experience
- [ ] Delete sample experiences
- [ ] Add minimal 1-3 work experiences
- [ ] Include descriptions
- [ ] Add start/end dates
- [ ] Mark current position if applicable
- [ ] Add technologies used

### Certificates
- [ ] Add relevant certifications
- [ ] Include issuer names
- [ ] Add issue dates
- [ ] Add credential IDs if available
- [ ] Add verification URLs
- [ ] Upload certificate images

### Projects
- [ ] Add minimal 3-5 best projects
- [ ] Write compelling descriptions
- [ ] Upload project screenshots
- [ ] Add demo URLs (live sites)
- [ ] Add GitHub repository URLs
- [ ] Tag with technologies used
- [ ] Mark 2-3 projects as "Featured"

### Status
- [ ] Set availability (true/false)
- [ ] Write appropriate status message
  - Example: "Available for new opportunities"
  - Example: "Open to freelance work"
  - Example: "Currently employed, open to exciting projects"

### Social Links
- [ ] Add GitHub profile URL
- [ ] Add LinkedIn profile URL
- [ ] Add Twitter/X (optional)
- [ ] Add other social platforms
- [ ] Verify all URLs are correct

---

## 🚀 Pre-Deployment Checklist

### Content Quality
- [ ] All text has no typos
- [ ] All links working (test each one)
- [ ] All images loading properly
- [ ] Contact information is correct
- [ ] Resume PDF accessible

### Design & UX
- [ ] Dark mode looks good
- [ ] Light mode looks good
- [ ] Animations smooth (not too fast/slow)
- [ ] Navigation works on mobile
- [ ] All sections visible on mobile
- [ ] Footer displays correctly
- [ ] No content overflow

### Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile device (real device)
- [ ] Test all CRUD operations once more
- [ ] Test admin logout → login again

### Performance
- [ ] Page loads fast
- [ ] Images optimized (not too large)
- [ ] No console errors
- [ ] No broken links

### Security
- [ ] Admin password changed from default (optional)
- [ ] `.env` file not committed to git
- [ ] Supabase keys kept secret

---

## 📱 Mobile Testing Checklist

### Portfolio Mobile View
- [ ] Hero section readable
- [ ] Navigation hamburger menu works
- [ ] All sections scroll smoothly
- [ ] Images fit screen
- [ ] Buttons large enough to tap
- [ ] Contact form usable
- [ ] Footer not cut off

### Admin Mobile View
- [ ] Login form usable
- [ ] Sidebar opens with hamburger
- [ ] Forms usable on small screen
- [ ] Tables scrollable horizontally
- [ ] Modals fit screen
- [ ] Can create/edit/delete on mobile

---

## 🎯 Launch Checklist

Ready to share your portfolio?

- [ ] All content checklist completed
- [ ] Tested on multiple devices
- [ ] No errors in console
- [ ] All links working
- [ ] Portfolio looks professional
- [ ] Admin password secure
- [ ] Backup database data

### When Ready:
- [ ] Share portfolio URL with friends for feedback
- [ ] Add portfolio link to LinkedIn
- [ ] Add portfolio link to resume
- [ ] Share with recruiters
- [ ] Post on social media
- [ ] Add to job applications

---

## 📊 Maintenance Checklist (Monthly)

- [ ] Update availability status
- [ ] Add new projects
- [ ] Update skills as you learn
- [ ] Add new certificates
- [ ] Update resume link
- [ ] Refresh project screenshots
- [ ] Check all external links still work
- [ ] Backup database data

---

## 🆘 Troubleshooting Checklist

If something doesn't work:

- [ ] Check browser console for errors
- [ ] Verify Supabase credentials in `.env`
- [ ] Check if database tables exist
- [ ] Verify RLS policies enabled
- [ ] Clear browser cache
- [ ] Try incognito mode
- [ ] Check network tab for failed requests
- [ ] Review error messages carefully
- [ ] Check Supabase logs
- [ ] Restart dev server

---

## ✅ Final Check

Sebelum declare "DONE":

- [ ] Database setup completed
- [ ] All sample data replaced with real data
- [ ] Tested thoroughly on desktop & mobile
- [ ] No errors in console
- [ ] Portfolio looks professional
- [ ] Admin dashboard fully functional
- [ ] Content proofread (no typos)
- [ ] All links verified
- [ ] Ready to share! 🎉

---

## 🎉 Completion

Jika semua checklist di atas sudah ✅:

**CONGRATULATIONS! 🎊**

Website portfolio Anda sudah 100% siap digunakan dan dibagikan!

Next steps:
1. Share link dengan recruiter
2. Add ke LinkedIn profile
3. Include di CV/Resume
4. Apply for jobs! 💼

**Good luck dengan career journey Anda! 🚀**
