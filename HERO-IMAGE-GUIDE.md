# Hero Image Guide

## Current Hero Image

The landing page now uses a beautiful, serene nature background image from Unsplash that conveys:
- **Peace & Tranquility**: Soft, calming landscape
- **Dignity & Respect**: Professional and tasteful
- **Hope & Comfort**: Uplifting natural scenery

**Current Image:**
- Source: Unsplash (free to use)
- URL: `https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07`
- Theme: Peaceful landscape with soft lighting
- Overlay: Dark slate gradient (85% opacity) for text readability

## Why This Image Works

1. **Professional**: Appropriate for funeral services industry
2. **Calming**: Soft colors and natural scenery
3. **Readable**: Dark overlay ensures white text is clearly visible
4. **Universal**: Appeals to diverse audiences
5. **Respectful**: Dignified without being somber

## How to Change the Hero Image

### Option 1: Use a Different Unsplash Image

Browse [Unsplash](https://unsplash.com) for free, high-quality images. Search for:
- "peaceful landscape"
- "serene nature"
- "sunset sky"
- "calm ocean"
- "memorial garden"

Once you find an image, copy its URL and update `styles.css`:

```css
.hero {
    background: 
        linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 100%),
        url('YOUR_UNSPLASH_IMAGE_URL') center/cover;
    /* ... */
}
```

### Option 2: Use Your Own Image

1. **Prepare your image:**
   - Recommended size: 1920x1080px or larger
   - Format: JPG or PNG
   - Optimize for web (compress to <500KB)

2. **Add image to project:**
   ```bash
   # Create images folder
   mkdir landing-page/images
   
   # Copy your image
   cp /path/to/your/image.jpg landing-page/images/hero.jpg
   ```

3. **Update CSS:**
   ```css
   .hero {
       background: 
           linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 100%),
           url('images/hero.jpg') center/cover;
       /* ... */
   }
   ```

### Option 3: Use a Solid Color (No Image)

If you prefer a simple gradient without an image:

```css
.hero {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
    color: white;
    padding: 8rem 0 6rem;
    text-align: center;
}
```

## Recommended Image Sources

### Free Stock Photos
1. **Unsplash** - https://unsplash.com
   - Free for commercial use
   - High quality
   - No attribution required

2. **Pexels** - https://www.pexels.com
   - Free for commercial use
   - Large selection
   - No attribution required

3. **Pixabay** - https://pixabay.com
   - Free for commercial use
   - Diverse collection

### Paid Stock Photos (Higher Quality)
1. **Shutterstock** - https://www.shutterstock.com
2. **Adobe Stock** - https://stock.adobe.com
3. **iStock** - https://www.istockphoto.com

## Image Selection Tips

### DO Choose Images With:
- ✅ Soft, calming colors
- ✅ Natural scenery (sky, water, gardens)
- ✅ Peaceful atmosphere
- ✅ Good contrast areas for text overlay
- ✅ Professional quality
- ✅ Appropriate for funeral services context

### DON'T Choose Images With:
- ❌ Busy, cluttered compositions
- ❌ Harsh or jarring colors
- ❌ People (unless very tasteful)
- ❌ Religious symbols (unless specific to your market)
- ❌ Dark or depressing themes
- ❌ Low resolution or poor quality

## Adjusting the Overlay

The dark overlay ensures text is readable. You can adjust the opacity:

```css
/* Lighter overlay (more image visible) */
linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.7) 100%)

/* Darker overlay (better text contrast) */
linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)

/* Current (balanced) */
linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 100%)
```

## Image Optimization

Before using your own images, optimize them:

### Online Tools (Free)
1. **TinyPNG** - https://tinypng.com
   - Compress PNG and JPG
   - Maintains quality
   - Easy to use

2. **Squoosh** - https://squoosh.app
   - Google's image optimizer
   - Advanced options
   - Compare before/after

3. **ImageOptim** (Mac) - https://imageoptim.com
   - Desktop app
   - Batch processing

### Command Line (Advanced)
```bash
# Install ImageMagick
brew install imagemagick

# Resize and optimize
convert input.jpg -resize 1920x1080^ -quality 85 output.jpg
```

## Mobile Considerations

The hero image automatically adapts to mobile devices. The CSS uses:
- `center/cover` - Image stays centered and covers the area
- Responsive padding adjusts for smaller screens
- Text remains readable with overlay

## Accessibility

The current implementation includes:
- ✅ Text shadow for readability
- ✅ High contrast (white text on dark overlay)
- ✅ Semantic HTML structure
- ✅ Responsive design

## Examples of Good Hero Images

### Peaceful Landscapes
- Sunset over calm water
- Misty mountains
- Serene garden paths
- Soft clouds in blue sky

### Abstract/Subtle
- Soft bokeh lights
- Gentle color gradients
- Minimalist nature patterns

### Philippines-Specific (Optional)
- Rice terraces at sunset
- Peaceful beach scenes
- Traditional Filipino gardens
- Manila Bay sunset

## Testing Your Image

After changing the image:

1. **Check readability:**
   - Is the text clearly visible?
   - Does the overlay provide enough contrast?

2. **Test on mobile:**
   - Does the image look good on small screens?
   - Is important content visible?

3. **Check loading speed:**
   - Is the image optimized?
   - Does it load quickly?

4. **Verify appropriateness:**
   - Is it suitable for funeral services?
   - Does it convey the right tone?

## Current Implementation

```css
.hero {
    background: 
        linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.85) 100%),
        url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2076&auto=format&fit=crop') center/cover;
    color: white;
    padding: 8rem 0 6rem;
    text-align: center;
    position: relative;
}
```

**Features:**
- Dark slate overlay for text contrast
- Unsplash image (free to use)
- Centered and covers full width
- Responsive and mobile-friendly
- Professional and appropriate

## Need Help?

If you need assistance choosing or implementing a hero image:
1. Browse the recommended sources above
2. Test different images by updating the URL
3. Adjust the overlay opacity for best readability
4. Optimize images before deployment

The current image is production-ready and appropriate for your funeral services platform!
