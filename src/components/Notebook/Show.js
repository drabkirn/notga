import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import EasyMDE from 'easymde';

import { easyMDEOptions } from '../Shared/defaults';
import Highlight from '../Shared/Highlight';

import 'easymde/dist/easymde.min.css';

function Show(props) {
  const notes = useState(
    [
      {
        id: 1,
        title: "first",
        content: "abcd"
      },
      {
        id: 2,
        title: "second",
        content: "Hello world, this is `my message` to you!"
      }
    ]
  );

  const [noteContentRender, setNoteContentRender] = useState(null);

  useEffect(() => {
    handleEasyMDE();
  }, []);

  const noteIdParam = parseInt(props.match.params.id);
  if(!noteIdParam) {
    return <Redirect to="/dash" />
  }

  const note = notes && notes[0].filter((n) => n.id === noteIdParam);
  if(note && note.length === 0) {
    return <Redirect to="/dash" />
  }

  const handleEasyMDE = () => {
    const noteContentElement = document.getElementById('noteContent');
    const updatedEasyMDEOptions = {...easyMDEOptions, element: noteContentElement, initialValue: note[0].content};
    const myEasyMDE = new EasyMDE(updatedEasyMDEOptions);
    setNoteContentRender(myEasyMDE.options.previewRender(myEasyMDE.value()));
    myEasyMDE.toTextArea();
  };

  return(
    <div>
      <h3>This is Show page</h3>
      <p>Title: { note[0].title }</p>
      <p>Content: { note[0].content }</p>

      <div className="editor-preview editor-preview-side editor-preview-active-side" style={{ position: "static", width: "100%", marginTop: "20px" }}>
        <Highlight content={ noteContentRender }></Highlight>
      </div>

      <div>
        <textarea name="noteContent" id="noteContent" style={ { visibility: "hidden" } }></textarea>
      </div>
    </div>
  );
};

export default Show;