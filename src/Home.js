import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import './Home.css';

const Home = () => {
  const [textBoxes, setTextBoxes] = useState([]);
  const [selectedBox, setSelectedBox] = useState(null);

  const addTextBox = () => {
    const newTextBox = {
      id: Date.now(),
      text: 'New Text',
      top: 100,
      left: 100,
      width: 200,
      height: 50,
      fontSize: '16px',
      color: '#000000',
      fontWeight: 'normal',
      textDecoration: 'none',
    };
    setTextBoxes([...textBoxes, newTextBox]);
  };

  const handleResize = (id, size) => {
    setTextBoxes(textBoxes.map(box => box.id === id ? { ...box, width: size.width, height: size.height } : box));
  };

  const handleTextChange = (id, newText) => {
    setTextBoxes(textBoxes.map(box => box.id === id ? { ...box, text: newText } : box));
  };

  const handleStyleChange = (id, style, value) => {
    setTextBoxes(textBoxes.map(box => box.id === id ? { ...box, [style]: value } : box));
  };

  const handlePositionChange = (id, top, left) => {
    setTextBoxes(textBoxes.map(box => box.id === id ? { ...box, top, left } : box));
  };

  const handleDelete = (id) => {
    setTextBoxes(textBoxes.filter(box => box.id !== id));
  };

  return (
    <div className="home-container">
      <div className="video-section">
        <video width="600" controls>
          <source src="your-video-source.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {textBoxes.map(box => (
          <Draggable key={box.id} bounds="parent">
            <ResizableBox
              width={box.width}
              height={box.height}
              minConstraints={[100, 50]}
              onResizeStop={(e, data) => handleResize(box.id, data.size)}
            >
              <div
                className="text-box-container"
                style={{ top: box.top, left: box.left }}
                onClick={() => setSelectedBox(box.id)}
              >
                <div
                  className="text-box"
                  style={{
                    fontSize: box.fontSize,
                    color: box.color,
                    fontWeight: box.fontWeight,
                    textDecoration: box.textDecoration,
                  }}
                >
                  {box.text}
                </div>
                <span
                  className="delete-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(box.id);
                  }}
                >
                  &#10005; {/* X icon */}
                </span>
              </div>
            </ResizableBox>
          </Draggable>
        ))}
      </div>
      <div className="text-options">
        <button onClick={addTextBox} className="add-text">Add Text</button>
        {selectedBox !== null && (
          <div className="config-panel">
            <h3>Text Configuration</h3>
            <input
              type="text"
              value={textBoxes.find(box => box.id === selectedBox)?.text || ''}
              onChange={(e) => handleTextChange(selectedBox, e.target.value)}
            />
            <label>Font Size:</label>
            <input
              type="number"
              value={parseInt(textBoxes.find(box => box.id === selectedBox)?.fontSize, 10) || 16}
              onChange={(e) => handleStyleChange(selectedBox, 'fontSize', `${e.target.value}px`)}
            />
            <label>Color:</label>
            <input
              type="color"
              value={textBoxes.find(box => box.id === selectedBox)?.color || '#000000'}
              onChange={(e) => handleStyleChange(selectedBox, 'color', e.target.value)}
            />
            <label>Bold:</label>
            <input
              type="checkbox"
              checked={textBoxes.find(box => box.id === selectedBox)?.fontWeight === 'bold'}
              onChange={(e) => handleStyleChange(selectedBox, 'fontWeight', e.target.checked ? 'bold' : 'normal')}
            />
            <label>Underline:</label>
            <input
              type="checkbox"
              checked={textBoxes.find(box => box.id === selectedBox)?.textDecoration === 'underline'}
              onChange={(e) => handleStyleChange(selectedBox, 'textDecoration', e.target.checked ? 'underline' : 'none')}
            />
            <label>Position X:</label>
            <input
              type="number"
              value={textBoxes.find(box => box.id === selectedBox)?.left || 100}
              onChange={(e) => handlePositionChange(selectedBox, textBoxes.find(box => box.id === selectedBox)?.top, e.target.value)}
            />
            <label>Position Y:</label>
            <input
              type="number"
              value={textBoxes.find(box => box.id === selectedBox)?.top || 100}
              onChange={(e) => handlePositionChange(selectedBox, e.target.value, textBoxes.find(box => box.id === selectedBox)?.left)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
