# CreativeCommon Club Website 🌟

This is the official website for the **CreativeCommon** club — a student-led creative production team specializing in visual design, storytelling, and multimedia.
Built using **Next.js**, the site showcases club activities, allows project submissions, and integrates with Google Drive and Google Sheets for streamlined workflows.

---

## 🚀 Features

- ⚙️ Built with **Next.js** and **Tailwind CSS**
- 🎨 Stunning parallax hero section with GSAP animations
- 📄 Multi-step submission form with:
- 📁 File upload (logo, references) to Google Drive
- 📃Final data submission to Google Sheets
- ☁️ Cloudinary support for future image handling
- 🔒 Fully client-server integrated via `App Router` and `API Routes`

---

## 📁 Project Structure

/  
├── app/ # App Router structure  (includes pages)  
│ └── api/ # API routes (upload, submit)  
├── components/ # Reusable UI components (Hero, Parallax, etc.)  
├── public/ # Static assets  
├── styles/ # Global styles  
├── .env.local # Environment variables (not committed)  
└── README.md # You're here!  

## 🧑‍💻 Getting Started  

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/creativecommon-site.git
cd creativecommon-site
```


2. Install Dependencies
```bash
npm install
```

3. Set Up Environment Variables
```bash
Create a .env.local file in the root:

NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID=paste folder id here
GOOGLE_SHEETS_API_URL=paste api 
CLOUDINARY_URL=for cloud services paste the url
```
⚠️ Never commit your .env.local file.  


  
4. Run in Development
```bash
npm run dev
Visit http://localhost:3000
```

5. Build for Production
```bash
npm run build
npm run start
```
---

## 🛠️ Technologies Used
Next.js

Tailwind CSS

GSAP

Google Drive API

Google Sheets API

Cloudinary (optional)

## 📬 Contributions  

Got suggestions or want to contribute? Open an issue or submit a pull request!  

## For creative submissions, visit our site and use the form ✨

## 👨 Aurthor
Noah Cherian Jacob
