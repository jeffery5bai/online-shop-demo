# Bai's Give Away 二手衣物

A minimalist black-and-white website for displaying second-hand clothing items with elegant serif typography.

## Live Demo

Visit the live site: [Coming soon after GitHub Pages setup]

## How to Run Locally

**IMPORTANT:** This website must be run from a web server, not by opening index.html directly in the browser (file:// protocol won't work due to CORS restrictions when loading JSON files).

### Option 1: Python (Recommended)

If you have Python installed:

```bash
# Navigate to the project folder
cd /Users/jefferybai/Desktop/Life/online-shop-demo

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser to: http://localhost:8000

### Option 2: Node.js

If you have Node.js installed:

```bash
# Install http-server globally (one time only)
npm install -g http-server

# Run the server
http-server
```

### Option 3: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click on index.html
3. Select "Open with Live Server"

## Project Structure

```
online-shop-demo/
├── index.html          # Main HTML page
├── style.css           # Styling
├── script.js           # JavaScript functionality
├── data/
│   └── products.json   # Product data (26 items)
└── photos/             # Product images (add your photos here)
    ├── 1.jpg
    ├── 2.jpg
    └── ...
```

## Adding Product Photos

Add your product photos to the `photos/` folder with filenames matching the product IDs:
- `1.jpg`, `2.jpg`, `3.jpg`, etc.

The website will automatically display them!
