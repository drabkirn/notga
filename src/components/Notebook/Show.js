import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';


function Show(props) {
  const notes = useState(
    [
      {
        id: 1,
        title: "first",
        content: "abcd",
        previewContent: "efgh"
      },
      {
        id: 2,
        title: "second",
        content: "1234",
        previewContent: "5678"
      }
    ]
  );

  const noteIdParam = parseInt(props.match.params.id);
  if(!noteIdParam) {
    return <Redirect to="/dash" />
  }

  const note = notes && notes[0].filter((n) => n.id === noteIdParam);
  if(note && note.length === 0) {
    return <Redirect to="/dash" />
  }

  return(
    <div>
      <h3>This is Show page</h3>
      <p>Title: { note[0].title }</p>
      <p>Content: { note[0].content }</p>
      <p>prevContent: { note[0].previewContent }</p>
    </div>
  );
};

export default Show;