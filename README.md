# JSON Diary Web Application

A web-based diary application that allows users to create, store, and manage diary entries with JSON file support and pagination.

## Demo
<img src="./Screenshot 2024-11-22 at 5.18.58 PM.png">

## Features

- 📝 Create and store diary entries
- 📅 Automatic timestamp for each entry
- 📁 Load existing entries from JSON file
- 💾 Save entries to JSON file
- 📖 Pagination support (5 entries per page)
- 📱 Responsive design
- 🎨 Beautiful handwriting-style interface
- 🔄 Real-time updates
- 📊 Entry management system

## Setup

1. Clone the repository or download the files
2. Place all files in a web server directory
3. Open `index.html` in a web browser

```bash
# Example using Python's built-in server
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## File Structure

```
diary-app/
│
├── index.html          # Main application file
├── diary_entries.json  # JSON file for storing entries
└── README.md          # Documentation
```

## JSON File Format

The application expects JSON files in the following format:

```json
[
  {
    "text": "Your diary entry text",
    "timestamp": "2024-11-22T10:30:00.000Z"
  },
  {
    "text": "Another diary entry",
    "timestamp": "2024-11-22T11:45:00.000Z"
  }
]
```

## Usage

### Loading Existing Entries

1. Click the "Choose JSON File" button
2. Select your `diary_entries.json` file
3. Entries will be loaded and displayed with pagination

### Adding New Entries

1. Type your entry in the input field at the bottom
2. Press Enter or click "Add Entry"
3. Entry will be added with current timestamp

### Navigation

- Use arrow buttons to navigate between pages
- Current page and total pages are displayed
- 5 entries are shown per page

### Saving Entries

1. Click "Download JSON" button
2. File will be saved as `diary_entries.json`
3. Contains all entries in JSON format

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Dependencies

- Bootstrap 5.3.1
- jQuery 3.6.4
- Google Fonts (Indie Flower)

## Styling

The application uses:
- Custom CSS for diary-style lines
- Handwriting font for authentic diary feel
- Responsive design for all screen sizes
- Color theme:
  - Background: Cornsilk (#fff8dc)
  - Text: Dark Brown (#2c1810)
  - Accents: Saddle Brown (#8b4513)

## Technical Details

### Key Components

1. **Entry Management**
   - JSON data structure
   - Timestamp generation
   - Entry validation

2. **Pagination System**
   - 5 entries per page
   - Dynamic page calculation
   - Smooth navigation

3. **File Handling**
   - JSON file reading
   - JSON file writing
   - Error handling

### Event Handlers

```javascript
// Add new entry
$('#addEntry').click(addNewEntry);

// File input change
$('#fileInput').change(handleFileInput);

// Pagination navigation
$('#prevPage').click(handlePrevPage);
$('#nextPage').click(handleNextPage);
```

## Customization

### Changing Entries Per Page

Modify the `entriesPerPage` constant in the JavaScript:

```javascript
const entriesPerPage = 5; // Change this value
```

### Modifying Styles

Update the CSS variables in the style section:

```css
body {
    --primary-color: #8b4513;
    --background-color: #f5e6d3;
    --text-color: #2c1810;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Created by Rashed Zaman

## Acknowledgments

- Font: Indie Flower by Google Fonts
- Framework: Bootstrap
- Library: jQuery

## Support

For support, please open an issue in the repository or contact [Jmrashed@gmail.com]