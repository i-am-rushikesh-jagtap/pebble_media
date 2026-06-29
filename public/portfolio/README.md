# 🎬 Portfolio Video Integration Guide

## 📁 Folder Structure

```
portfolio/
├── videos/          # Brand videos
├── events/          # Event coverage videos
└── thumbs/          # Video thumbnails (optional)
```

## 🎥 Videos to Add

### Brand Videos (place in `/videos/`)
1. **bar-flying.mp4** - Bar Flying brand film
2. **gudgum.mp4** - Gudgum product video
3. **go-zero.mp4** - Go Zero brand campaign
4. **not-funny.mp4** - Not Funny creative content
5. **bold-fit.mp4** - Bold Fit fitness brand
6. **chebel.mp4** - Chebel brand story

### Event Coverage (place in `/events/`)
1. **zerodha.mp4** - Zerodha corporate event
2. **great-creators-trail.mp4** - Great Creators Trail highlight
3. **70-30.mp4** - 70-30 event coverage  
4. **ev-bike.mp4** - EV Bike launch event

## 📥 How to Add Videos

### Option 1: From Google Drive (Manual)
1. Download videos from your Google Drive folders
2. Rename them to match the filenames above
3. Copy to the appropriate folder (`videos/` or `events/`)
4. Refresh your website - videos will auto-load!

### Option 2: Direct Copy (If Local)
```bash
# Copy all brand videos
cp /path/to/your/videos/*.mp4 public/portfolio/videos/

# Copy all event videos
cp /path/to/your/events/*.mp4 public/portfolio/events/
```

## 🖼️ Optional: Add Video Thumbnails

For better performance, you can add custom thumbnails:

1. Extract a frame from each video (or use a screenshot)
2. Save as JPG: `bar-flying.jpg`, `gudgum.jpg`, etc.
3. Place in `/thumbs/` folder
4. Update component to use them (or let video auto-generate)

## ⚙️ Video Format Recommendations

- **Format:** MP4 (H.264)
- **Resolution:** 1920x1080 (Full HD) or 1280x720 (HD)
- **File Size:** Under 50MB per video (compress if needed)
- **Aspect Ratio:** 16:9

## 🔄 After Adding Videos

The website will automatically:
- Display video thumbnails with play buttons
- Show duration overlays
- Enable click-to-play modal
- Optimize loading performance

## 💡 Need Help?

If videos don't appear:
1. Check filenames match exactly (case-sensitive!)
2. Ensure files are in correct folders
3. Hard refresh browser (Ctrl+Shift+R)
4. Check browser console for errors

---

**Your video portfolio is ready to go! Just add the files and they'll display automatically.** 🚀
