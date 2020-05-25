import React, { createRef, useEffect } from 'react';

import 'highlight.js/styles/github.css';

import hljs from 'highlight.js/lib/index';

function Highlight(props) {
  const nodeRef = createRef();

  useEffect(() => {
    initHighlightJS();
  }, [props.content]);

  const initHighlightJS = () => {
    if(nodeRef) {
      const nodes = nodeRef.current.querySelectorAll('pre');
      nodes.forEach((node) => {
          hljs.highlightBlock(node);
      });
    }
  };

  return(
    <div ref={ nodeRef } dangerouslySetInnerHTML={{ __html: props.content }}></div>
  );
}

export default Highlight;