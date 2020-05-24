import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Dash() {
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

  return(
    <div>
      <h3>This is Dash page</h3>
      <p>Below are your notes:</p>
      <ul>
        {
          notes && notes[0].map((note) => {
            return(
              <li key={note.id}><Link to={ "/show/" + note.id }>{ note.title }</Link></li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default Dash;