import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function FloatingIcon() {
  useEffect(() => {
    setTimeout(() => {
      const fixedActionBtn = document.querySelector('.fixed-action-btn');

      if(fixedActionBtn) {
        document.addEventListener("scroll", () => {
          const bodyTag = document.querySelector('body');
  
          const bodyHeight = bodyTag.clientHeight;
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
  
          const scrollingDifference = bodyHeight - windowHeight;
          const scrollTopPosition = document.scrollingElement.scrollTop;
  
          if(scrollTopPosition >= scrollingDifference) {
            if(windowWidth <= 600) {
              fixedActionBtn.style.bottom = "130px";
            } else {
              fixedActionBtn.style.bottom = "70px";
            }
          } else {
            fixedActionBtn.style.bottom = "23px";
          }
        });
      }
    }, 2000);
  }, []);

  return(
    <div className="fixed-action-btn">
      <Link to="/new" className="btn-floating btn-large oxford-blue-bg">
        <i className="large material-icons">add</i>
      </Link>
    </div>
  );
};

export default FloatingIcon;