# Bai's Secondhand Clothes 二手衣物

An experimental simple demo website to display secondhand clothes for sales with friends via vibe coding.

A minimalist black-and-white website for displaying second-hand clothing items with elegant serif typography.

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
└── photos/             # Product images (1.jpg through 26.jpg)
    ├── 1.jpg
    ├── 2.jpg
    └── ... (through 26.jpg)
```

## Features

- **Product Display**: 26 secondhand clothing items with photos
- **Category Filtering**: Browse by category (褲子, 外套, 長袖襯衫, etc.)
- **Product Numbers**: Easy reference with product IDs (#1, #2, etc.)
- **Copy Button**: Click to copy product names to clipboard
- **Sale Status Tracking**: Products can be marked as "sold" or "open"
- **Measurement Disclaimer**: "不專業尺碼測量，實際皆可能稍有誤差"
- **Responsive Design**: Works on desktop and mobile devices
- **Mobile Sidebar**: Floating toggle button with backdrop overlay

## Managing Products

Edit `data/products.json` to:
- Add or remove products
- Update prices and specifications
- Mark items as sold by changing `"sale_status": "sold"`
- Categorize items

Product photos should be added to the `photos/` folder with filenames matching product IDs (e.g., `1.jpg`, `2.jpg`, etc.).
