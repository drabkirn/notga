import React, { useState, useEffect } from 'react';
import EasyMDE from 'easymde';

import { easyMDEOptions } from '../Shared/defaults';

import 'easymde/dist/easymde.min.css';

function New() {
  const [noteTitle, setNoteTitle] = useState("");

  useEffect(() => {
    handleEasyMDE();
  }, []);

  const handleEasyMDE = () => {
    const noteContentElement = document.getElementById('noteContent');
    const updatedEasyMDEOptions = {...easyMDEOptions, element: noteContentElement};
    const myEasyMDE = new EasyMDE(updatedEasyMDEOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const noteContentElement = document.getElementById('noteContent');
    console.log(noteTitle, noteContentElement.value);
  };

  return(
    <div>
      <h3>This is New page</h3>
      <form onSubmit={ (e) => handleSubmit(e) }>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" value={ noteTitle } onChange={ (e) => setNoteTitle(e.target.value) } />
        </div>

        <div>
          <textarea id="noteContent"></textarea>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default New;