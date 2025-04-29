import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes, FaExpand, FaCompress, FaFont, FaPalette, FaHighlighter, FaPrint, FaDownload, FaMoon, FaSun, FaImage, FaShapes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import html2canvas from 'html2canvas';

const fontColorPalette = [
  '#000000', // Black
  '#333333', // Dark Gray
  '#555555', // Gray
  '#777777', // Medium Gray
  '#ffffff', // White
  '#9f7aea', // Purple
  '#f687b3', // Pink
  '#f6ad55', // Orange
  '#68d391', // Green
  '#63b3ed', // Blue
  '#fefcbf', // Yellow
  '#fed7d7'  // Red
];

const highlightPalette = [
  'rgba(159, 122, 234, 0.3)', // Purple
  'rgba(246, 135, 179, 0.3)', // Pink
  'rgba(246, 173, 85, 0.3)',  // Orange
  'rgba(104, 211, 145, 0.3)', // Green
  'rgba(99, 179, 237, 0.3)',  // Blue
  'rgba(254, 252, 191, 0.3)', // Yellow
  'rgba(254, 215, 215, 0.3)'  // Red
];

const shapeOptions = [
  { value: 'rectangle', label: 'Rectangle' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'circle', label: 'Circle' },
  { value: 'legal-pad', label: 'Legal Pad' },
  { value: 'document', label: 'Document' }
];

const fontOptions = [
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Garamond', label: 'Garamond' },
  { value: 'Courier New', label: 'Courier' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Verdana', label: 'Verdana' }
];

const legalIcons = ['⚖️', '🔨', '📜', '📚', '🖋️', '🧑‍⚖️', '🏛️', '🔍'];

const initialNotes = {
  '2025-04-29': [
    { 
      id: 1, 
      title: 'Meeting Notes', 
      content: '<p>Discussed <strong>legal draft</strong> with client.</p>', 
      time: '10:00 AM', 
      editable: false, 
      editedAt: null,
      fontColor: '#000000',
      highlight: null,
      font: 'Times New Roman',
      icon: '⚖️',
      shape: 'rectangle',
      bgImage: null
    },
    { 
      id: 2, 
      title: 'Client Call', 
      content: '<p>Talked about <u>NDA terms</u>.</p>', 
      time: '2:00 PM', 
      editable: false, 
      editedAt: null,
      fontColor: '#000000',
      highlight: null,
      font: 'Times New Roman',
      icon: '📜',
      shape: 'rectangle',
      bgImage: null
    },
  ],
  '2025-04-28': [
    { 
      id: 3, 
      title: 'Review', 
      content: '<p>Reviewed <em>IPR law</em> sections 3-5.</p>', 
      time: '5:00 PM', 
      editable: false, 
      editedAt: null,
      fontColor: '#000000',
      highlight: null,
      font: 'Times New Roman',
      icon: '📚',
      shape: 'rectangle',
      bgImage: null
    },
  ],
};

const NotePage = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedDate, setSelectedDate] = useState('2025-04-29');
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [fullScreenNote, setFullScreenNote] = useState(null);
  const [currentFontColor, setCurrentFontColor] = useState('#000000');
  const [currentHighlight, setCurrentHighlight] = useState(null);
  const [currentFont, setCurrentFont] = useState('Times New Roman');
  const [currentShape, setCurrentShape] = useState('rectangle');
  const [darkMode, setDarkMode] = useState(true);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [showHighlightDropdown, setShowHighlightDropdown] = useState(false);
  const [showShapeDropdown, setShowShapeDropdown] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);

  // Toggle dark/light mode
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const toggleEdit = (date, id, enterFullScreen = false) => {
    const updated = { ...notes };
    updated[date] = updated[date].map(note => {
      if (note.id === id) {
        const isEditing = !note.editable;
        setEditingNoteId(isEditing ? id : null);
        
        if (!isEditing && fullScreenNote === id) {
          setFullScreenNote(null);
        }
        
        if (enterFullScreen && isEditing) {
          setFullScreenNote(id);
        }
        
        return {
          ...note,
          editable: isEditing,
          editedAt: isEditing ? new Date().toLocaleString() : note.editedAt
        };
      }
      return note;
    });
    setNotes(updated);
  };

  const handleChange = (date, id, field, value) => {
    const updated = { ...notes };
    updated[date] = updated[date].map(note =>
      note.id === id ? { ...note, [field]: value } : note
    );
    setNotes(updated);
  };

  const handleDateChange = e => setSelectedDate(e.target.value);
  const handleExit = () => window.location.href = '/';
  
  const handleFontColorSelect = (color) => {
    setCurrentFontColor(color);
    if (editingNoteId) {
      handleChange(selectedDate, editingNoteId, 'fontColor', color);
    }
    setShowColorDropdown(false);
  };

  const handleHighlightSelect = (color) => {
    setCurrentHighlight(color);
    if (editingNoteId) {
      handleChange(selectedDate, editingNoteId, 'highlight', color);
    }
    setShowHighlightDropdown(false);
  };

  const handleFontSelect = (font) => {
    setCurrentFont(font);
    if (editingNoteId) {
      handleChange(selectedDate, editingNoteId, 'font', font);
    }
    setShowFontDropdown(false);
  };

  const handleShapeSelect = (shape) => {
    setCurrentShape(shape);
    if (editingNoteId) {
      handleChange(selectedDate, editingNoteId, 'shape', shape);
    }
    setShowShapeDropdown(false);
  };

  const handleIconSelect = (icon) => {
    if (editingNoteId) {
      handleChange(selectedDate, editingNoteId, 'icon', icon);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImageUpload(imageUrl);
        if (editingNoteId) {
          handleChange(selectedDate, editingNoteId, 'bgImage', imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeBackgroundImage = () => {
    setImageUpload(null);
    if (editingNoteId) {
      handleChange(selectedDate, editingNoteId, 'bgImage', null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadNoteAsImage = (noteId) => {
    const element = document.getElementById(`note-${noteId}`);
    if (element) {
      html2canvas(element, {
        backgroundColor: darkMode ? '#1a202c' : '#f7fafc',
        scale: 2 // Higher quality
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `legal-note-${new Date().toISOString().slice(0,10)}-${noteId}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': [1, 2, 3, false] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ]
  };

  const getShapeStyle = (shape) => {
    switch (shape) {
      case 'rounded':
        return { borderRadius: '1rem' };
      case 'circle':
        return { borderRadius: '50%', aspectRatio: '1/1' };
      case 'legal-pad':
        return { 
          borderRadius: '0.5rem',
          backgroundImage: 'linear-gradient(to bottom, #f9f9f9 0%, #f9f9f9 1px, #fff 1px, #fff 2rem)',
          backgroundSize: '100% 2rem',
          paddingTop: '1.5rem'
        };
      case 'document':
        return {
          borderRadius: '0.5rem',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          borderTop: '30px solid #f5f5f5',
          position: 'relative'
        };
      default:
        return { borderRadius: '0.25rem' };
    }
  };

  const notesForDate = notes[selectedDate] || [];

  return (
    <div className={`relative min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Control Buttons */}
      <div className="fixed top-4 right-4 z-50 flex space-x-4 bg-white/10 dark:bg-black/10 backdrop-blur-sm p-2 rounded-full">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-full ${darkMode ? 'text-yellow-300 hover:bg-yellow-900/30' : 'text-blue-800 hover:bg-blue-200'}`}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <button
          onClick={handleExit}
          className="p-2 rounded-full text-red-500 hover:bg-red-900/30"
          title="Exit"
        >
          <FaTimes />
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <motion.h1 
          className="text-3xl font-bold mb-6 text-purple-600 dark:text-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          📝 Legal Notes
        </motion.h1>

        {/* Date Picker */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label className="block text-purple-600 dark:text-purple-400 mb-2">Select Date</label>
          <input
            type="date"
            className={`bg-transparent border ${darkMode ? 'border-purple-700' : 'border-purple-300'} p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </motion.div>

        {notesForDate.length === 0 ? (
          <motion.p 
            className="text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            No notes for {new Date(selectedDate).toDateString()}.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notesForDate.map((note, index) => (
              <motion.div
                key={note.id}
                id={`note-${note.id}`}
                className={`relative transition-all duration-300 hover:shadow-purple-300/30 hover:-translate-y-1 
                  ${fullScreenNote === note.id ? 'fixed inset-0 z-50 m-4 md:m-10 lg:m-20 overflow-auto' : ''}
                  ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                style={{ 
                  ...getShapeStyle(note.shape),
                  backgroundColor: darkMode ? 'rgba(26, 32, 44, 0.8)' : 'rgba(247, 250, 252, 0.8)',
                  border: `1px solid ${note.editable ? (darkMode ? '#f6ad55' : '#d69e2e') : (darkMode ? '#6b46c1' : '#9f7aea')}`,
                  color: note.fontColor,
                  fontFamily: note.font,
                  backgroundImage: note.bgImage ? `url(${note.bgImage})` : (note.highlight ? `linear-gradient(to right, transparent, ${note.highlight})` : 'none'),
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  padding: '1.5rem',
                  minHeight: fullScreenNote === note.id ? '80vh' : '300px'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Note Header */}
                <div className="flex items-start mb-2">
                  <span className="text-2xl mr-2">{note.icon}</span>
                  {note.editable ? (
                    <input
                      className="w-full bg-transparent border-b border-purple-500 text-purple-600 dark:text-purple-400 font-bold text-lg focus:outline-none"
                      value={note.title}
                      onChange={(e) => handleChange(selectedDate, note.id, 'title', e.target.value)}
                      style={{ color: note.fontColor }}
                    />
                  ) : (
                    <h3 className="text-lg font-bold" style={{ color: note.fontColor }}>
                      {note.title}
                    </h3>
                  )}
                </div>

                {/* Note Content */}
                {note.editable ? (
                  <ReactQuill
                    theme="snow"
                    value={note.content}
                    onChange={(content) => handleChange(selectedDate, note.id, 'content', content)}
                    modules={modules}
                    className="h-64 mb-4"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: note.fontColor,
                      fontFamily: note.font
                    }}
                  />
                ) : (
                  <div 
                    className="text-sm mt-2 mb-8"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                    style={{ color: note.fontColor }}
                  />
                )}

                {/* Note Footer */}
                <div className="absolute bottom-3 left-4 text-xs" style={{ color: note.fontColor }}>
                  Created: {note.time}
                </div>
                {note.editedAt && (
                  <div className="absolute bottom-3 right-4 text-xs italic" style={{ color: note.fontColor }}>
                    Edited: {note.editedAt}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex space-x-2">
                  {!note.editable && (
                    <>
                      <button
                        onClick={() => downloadNoteAsImage(note.id)}
                        className="p-1 hover:bg-white/20 rounded-full"
                        title="Download"
                        style={{ color: note.fontColor }}
                      >
                        <FaDownload />
                      </button>
                      <button
                        onClick={() => toggleEdit(selectedDate, note.id, true)}
                        className="p-1 hover:bg-white/20 rounded-full"
                        title="Edit"
                        style={{ color: note.fontColor }}
                      >
                        <FaEdit />
                      </button>
                    </>
                  )}
                  {note.editable && (
                    <button
                      onClick={() => toggleEdit(selectedDate, note.id)}
                      className="p-1 hover:bg-white/20 rounded-full"
                      title="Save"
                      style={{ color: note.fontColor }}
                    >
                      <FaSave />
                    </button>
                  )}
                </div>

                {/* Editor Toolbar (visible only when editing) */}
                {note.editable && (
                  <div className="flex flex-wrap items-center mt-4 gap-2">
                    {/* Font Color Picker */}
                    <div className="relative">
                      <button
                        onClick={() => setShowColorDropdown(!showColorDropdown)}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-white/20"
                        title="Text Color"
                        style={{ color: note.fontColor }}
                      >
                        <FaPalette />
                      </button>
                      {showColorDropdown && (
                        <div className={`absolute left-0 mt-1 z-20 p-2 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <div className="grid grid-cols-4 gap-2 w-48">
                            {fontColorPalette.map(color => (
                              <button
                                key={color}
                                className="w-8 h-8 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                                onClick={() => handleFontColorSelect(color)}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Highlight Picker */}
                    <div className="relative">
                      <button
                        onClick={() => setShowHighlightDropdown(!showHighlightDropdown)}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-white/20"
                        title="Highlight"
                        style={{ color: note.fontColor }}
                      >
                        <FaHighlighter />
                      </button>
                      {showHighlightDropdown && (
                        <div className={`absolute left-0 mt-1 z-20 p-2 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <div className="grid grid-cols-4 gap-2 w-48">
                            {highlightPalette.map((color, index) => (
                              <button
                                key={index}
                                className="w-8 h-8 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                                onClick={() => handleHighlightSelect(color)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Font Selector */}
                    <div className="relative">
                      <button
                        onClick={() => setShowFontDropdown(!showFontDropdown)}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-white/20"
                        title="Font"
                        style={{ color: note.fontColor }}
                      >
                        <FaFont />
                      </button>
                      {showFontDropdown && (
                        <div className={`absolute left-0 mt-1 z-20 p-2 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <div className="grid grid-cols-1 gap-1 w-48 max-h-60 overflow-y-auto">
                            {fontOptions.map(font => (
                              <button
                                key={font.value}
                                className="text-left px-3 py-1 hover:bg-purple-100 dark:hover:bg-purple-900 rounded"
                                style={{ fontFamily: font.value, color: note.fontColor }}
                                onClick={() => handleFontSelect(font.value)}
                              >
                                {font.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Shape Selector */}
                    <div className="relative">
                      <button
                        onClick={() => setShowShapeDropdown(!showShapeDropdown)}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-white/20"
                        title="Shape"
                        style={{ color: note.fontColor }}
                      >
                        <FaShapes />
                      </button>
                      {showShapeDropdown && (
                        <div className={`absolute left-0 mt-1 z-20 p-2 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                          <div className="grid grid-cols-1 gap-1 w-48 max-h-60 overflow-y-auto">
                            {shapeOptions.map(shape => (
                              <button
                                key={shape.value}
                                className="text-left px-3 py-1 hover:bg-purple-100 dark:hover:bg-purple-900 rounded flex items-center"
                                style={{ color: note.fontColor }}
                                onClick={() => handleShapeSelect(shape.value)}
                              >
                                <span className="mr-2">{shape.value === 'document' ? '📄' : shape.value === 'legal-pad' ? '📝' : '⬜'}</span>
                                {shape.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image Upload */}
                    <div className="relative">
                      <label className="flex items-center justify-center p-2 rounded-full hover:bg-white/20 cursor-pointer"
                            style={{ color: note.fontColor }}
                            title="Upload Background">
                        <FaImage />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {note.bgImage && (
                      <button
                        onClick={removeBackgroundImage}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-white/20"
                        title="Remove Background"
                        style={{ color: note.fontColor }}
                      >
                        <FaTimes />
                      </button>
                    )}

                    {/* Icon Selector */}
                    <div className="relative">
                      <button
                        onClick={() => {
                          const randomIcon = legalIcons[Math.floor(Math.random() * legalIcons.length)];
                          handleIconSelect(randomIcon);
                        }}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-white/20"
                        title="Random Legal Icon"
                        style={{ color: note.fontColor }}
                      >
                        <span className="text-lg">🎲</span>
                      </button>
                    </div>

                    {/* Print Button */}
                    <button
                      onClick={handlePrint}
                      className="flex items-center justify-center p-2 rounded-full hover:bg-white/20 ml-auto"
                      title="Print"
                      style={{ color: note.fontColor }}
                    >
                      <FaPrint />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .container, .container * {
            visibility: visible;
          }
          .container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default NotePage;