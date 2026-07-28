# 📋 TaskFlow - Kanban Task Management App

![TaskFlow Logo](icon/TaskFlow.png)

A simple, beautiful, and powerful task management application built with vanilla JavaScript. Organize your tasks using a Kanban-style board with drag-and-drop functionality!

---

## ✨ Features

### 🎯 Core Features
- **Add Tasks** - Quickly create new tasks with custom status
- **Drag & Drop** - Move tasks between columns effortlessly
- **Edit Tasks** - Update task descriptions anytime
- **Delete Tasks** - Remove individual tasks or clear all at once
- **Auto-Save** - All changes saved automatically to your browser

### 🔧 Advanced Features
- **🎨 Theme Toggle** - Switch between light and dark modes
- **🔄 Smart Sorting** - Sort tasks by date or name (4 modes)
- **📤 Export Tasks** - Download your tasks as JSON backup
- **💾 Persistent Storage** - Tasks saved in browser localStorage
- **📱 Fully Responsive** - Works perfectly on mobile, tablet, and desktop

### 🛡️ Security Features
- XSS Protection - Safe handling of user input
- Input Validation - Prevents malicious or oversized content
- Confirmation Dialogs - Protects against accidental deletions

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### How to Run
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start managing your tasks!

---

## 📖 How to Use

### Adding a Task
1. Type your task in the input field
2. Select the status: **Not Started**, **Progress**, or **Done**
3. Click the ➕ button or press Enter

### Moving Tasks (Drag & Drop)
1. Hover over a task card
2. Click and hold the card
3. Drag it to any column (Not Started, Progress, Done)
4. Release to drop

### Editing a Task
1. Find the task you want to edit
2. Click the ✏️ **Edit** button on the card
3. Enter new text in the popup
4. Click OK to save

### Deleting a Task
1. Find the task you want to remove
2. Click the 🗑️ **Delete** button on the card
3. Confirm deletion in the popup

### Using the Toolbar

| Button | Feature | Description |
|--------|---------|-------------|
| 🎨 | **Theme** | Toggle between light/dark mode |
| 📤 | **Export** | Download tasks as JSON file |
| 🔄 | **Sort** | Cycle through sort modes |
| ➕ | **Add** | Create a new task |
| 🗑️ | **Clear All** | Delete all tasks |

---

## 🔄 Sort Modes

Click the sort button multiple times to cycle through:

1. **📅 Date (Newest First)** - Most recent tasks at top
2. **📅 Date (Oldest First)** - Original tasks at top
3. **🔤 Name (A-Z)** - Alphabetical ascending
4. **🔤 Name (Z-A)** - Alphabetical descending

---

## 💡 Tips & Tricks

### Keyboard Shortcuts
- Press **Enter** after typing to quickly add a task

### Best Practices
- Keep task descriptions under 500 characters
- Use the export feature to backup your tasks regularly
- Try dark mode for reduced eye strain!

### Developer Console
Open the browser console (F12) to see:
- TaskFlow ASCII art logo
- Sort operation feedback
- Debug information

---

## 🗂️ Project Structure

```
TaskFlow/
├── index.html          # Main HTML structure
├── style.css           # Styling and themes
├── script.js           # All application logic
├── README.md           # This file
├── DOCUMENTATION.md    # Detailed technical docs
└── icon/               # App icons and images
    ├── TaskFlow.png
    ├── done.svg
    ├── notStarted.svg
    └── progres.svg
```

---

## 🛠️ Technical Details

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser localStorage API
- **Dependencies**: None! (100% vanilla JavaScript)
- **Browser Support**: All modern browsers
- **Responsive Design**: Mobile-first, works on all screen sizes
- **Touch Support**: Optimized for touch devices with larger tap targets

---

## 📦 Data Storage

Your tasks are stored in your browser's localStorage under the key:
```
kanbanStorageCache
```

Each task contains:
- **id**: Unique identifier (timestamp-based)
- **text**: Task description
- **status**: Current column (notStarted, Progress, Done)
- **dateCreated**: Human-readable creation date

---

## 🔒 Security

TaskFlow is designed with security in mind:

✅ **XSS Prevention** - User input is sanitized using `textContent`  
✅ **Input Validation** - 500 character limit enforced  
✅ **Safe DOM Manipulation** - No unsafe `innerHTML` for user data  
✅ **Status Validation** - Only allowed status values accepted  
✅ **Confirmation Dialogs** - Prevents accidental data loss  

---

## 📱 Mobile Support

TaskFlow is **fully responsive** and optimized for:

### Supported Devices
- ✅ **Desktop** - Full experience (1024px+)
- ✅ **Tablet** - Optimized layout (768px - 1024px)
- ✅ **Mobile** - Vertical stack (480px - 768px)
- ✅ **Small Mobile** - Compact interface (360px - 480px)

### Mobile Features
- **Vertical Column Layout** - Columns stack for easy scrolling
- **Touch-Friendly Buttons** - Minimum 44x44px tap targets
- **Visible Drag Handles** - Always shown on mobile devices
- **Landscape Support** - Columns side-by-side in landscape mode
- **Optimized Text Sizes** - Readable on all screen sizes
- **No Horizontal Scroll** - Content always fits the screen

### Testing Your Device
Simply open TaskFlow on any device - it automatically adapts to your screen size!

---

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --font: #EEEEEE;
    --emphasizes-Font: #76ABAE;
    --button-Gradient-1: #67A4A8;
    /* ... more colors ... */
}
```

### Modifying Task Limit
Change the character limit in `script.js`:
```javascript
if (text.length > 500) // Change 500 to your preferred limit
```

---

## 🐛 Troubleshooting

### Tasks Not Saving?
- Check if localStorage is enabled in your browser
- Make sure you're not in Incognito/Private mode

### Drag & Drop Not Working?
- Use a modern browser (Chrome 91+, Firefox 89+, Safari 14+)
- Make sure JavaScript is enabled
- On mobile, drag handles are always visible for easier interaction

### Theme Not Switching?
- Clear your browser cache
- Check browser console (F12) for errors

---

## 📝 License

This project is open source and available for personal and educational use.

---

## 👨‍💻 Development

Created with ❤️ using vanilla JavaScript

**AI Assistance**: Major portions of JavaScript logic created with AI assistance and curated by the developer.

---

## 🤝 Contributing

Want to improve TaskFlow? Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

---

## 📧 Support

Having issues? Check the `DOCUMENTATION.md` file for more detailed technical information.

---

## 🎉 Enjoy TaskFlow!

Start organizing your tasks today! 🚀

---

**Version**: WIP-RELEASE--BATCH-01  
**Last Updated**: 2026
