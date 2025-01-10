import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const speakText = () => {
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR'; // Set language to French

    // Optional: Select French voice if available
    const voices = speechSynthesis.getVoices();
    const frenchVoice = voices.find(voice => voice.lang === 'fr-FR');
    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h1>Text to Speech (French)</h1>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type text here..."
        rows="4"
        cols="50"
      />
      <button onClick={speakText}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
