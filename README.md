# Rohit Agarwala — Academic Website

A personal academic portfolio website for Rohit Agarwala, PhD Scholar in High-Energy Nuclear Physics, Bodoland University, Kokrajhar, Assam.

## 📂 File Structure

```
rohit-website/
├── index.html          ← Home page
├── about.html          ← About Me
├── research.html       ← Research Interests
├── publications.html   ← Publications
├── conferences.html    ← Conferences & Schools
├── talks.html          ← Talks & Seminars
├── education.html      ← Education & CV
├── hobbies.html        ← Hobbies
├── gallery.html        ← Gallery (event photos)
├── contact.html        ← Contact
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── main.js         ← Animations & interactions
│   └── gallery.js      ← Photo viewer on the Gallery page
└── images/
    └── gallery/
        └── emmi-2026/  ← One folder per event: full-size photos…
            └── thumbs/ ← …and smaller copies for the photo grid
```

---

## 🚀 Deploying to GitHub Pages (Free Hosting)

Follow these steps to get your website live at `https://yourusername.github.io`

### Step 1: Create a GitHub Account
Go to [github.com](https://github.com) and sign up for a free account.
- Choose a username like `rohitagarwala` (this will be part of your site URL)

### Step 2: Create a New Repository
1. Click the **"+"** button in the top right → **"New repository"**
2. Name it exactly: `yourusername.github.io`  
   (e.g., if your username is `rohitagarwala`, name it `rohitagarwala.github.io`)
3. Make it **Public**
4. Click **"Create repository"**

### Step 3: Upload Your Files
1. On the repository page, click **"uploading an existing file"**
2. Drag and drop ALL the files from this folder (including the `css/` and `js/` subfolders)
3. Make sure to upload the folder structure — not just the HTML files
4. Click **"Commit changes"**

### Step 4: Enable GitHub Pages
1. Go to your repository **Settings** (gear icon)
2. Scroll down to **"Pages"** in the left sidebar
3. Under "Source", select **"Deploy from a branch"**
4. Choose **"main"** branch → **"/ (root)"**
5. Click **"Save"**

### Step 5: Your Site is Live! 🎉
After 1-2 minutes, your site will be live at:
`https://yourusername.github.io`

---

## 🖼️ Adding Your Profile Photo

1. Save your photo as `images/profile.jpg`
2. In `about.html` and `index.html`, you can add an `<img>` tag where needed

---

## ✏️ Updating Content

All content is in plain HTML — you can edit it directly:
- **New publication?** Add a new `.pub-card` block in `publications.html`
- **New conference?** Add a new `.conf-card` in `conferences.html`
- **New talk?** Add a `.timeline-item` in `talks.html`
- **Change a photo caption?** In `gallery.html`, each photo is an `<a class="photo">` block. Edit the
  text in its `data-caption="…"` (shown in the photo viewer) and in its `photo-caption` span (shown on hover).

---

## 📷 Adding Event Photos

Photos live in `images/gallery/<event>/`, with a smaller copy of each in `thumbs/`.
Before uploading, photos are resized for the web and their hidden metadata (including GPS location)
is removed. Each event gets its own `<section class="gallery-event">` in `gallery.html`.

**After uploading an update:** if the site still looks old, press **Ctrl + F5** (or **Cmd + Shift + R**
on a Mac) to reload it without the browser's saved copy.

---

## 📧 Contact
therohitagarwala@buniv.edu.in | Bodoland University, Kokrajhar, Assam
