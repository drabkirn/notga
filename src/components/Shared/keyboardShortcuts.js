export const goHomeShortcut = (e) => {
  if((e.key === 'o' || e.key === 'O' ) && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    const homeBtn = document.querySelector('.brand-logo');
    const pathName = window.location.pathname;

    if(pathName.includes("edit") || pathName.includes("new")) {
      if(confirmUnsavedProgressPrompt()) homeBtn.click();
      return;
    }

    homeBtn.click();
  }
};

export const goBackShortcut = (e) => {
  if((e.key === 'b' || e.key === 'B' ) && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    const pathName = window.location.pathname;
    const backBtn = document.querySelector('.back-btn');

    if(pathName.includes("edit") || pathName.includes("new")) {
      if(confirmUnsavedProgressPrompt()) {
        if(backBtn) backBtn.click();
      }
      return;
    }

    if(backBtn) backBtn.click();
  }
};

export const newNoteShortcut = (e) => {
  if((e.key === 'y' || e.key === 'Y' ) && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    const floatingBtn = document.querySelector('.btn-floating.btn-large.oxford-blue-bg');

    if(floatingBtn) floatingBtn.click();
  }
};

export const saveNoteShortcut = (e) => {
  if((e.key === 's' || e.key === 'S' ) && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    const submitBtn = document.querySelector('button[type="submit"]');

    if(submitBtn) submitBtn.click();
  }
};

export const editNoteShortcut = (e) => {
  if((e.key === 'e' || e.key === 'E' ) && (e.ctrlKey || e.metaKey)) {
    console.log(e);
    e.preventDefault();
    const editBtn = document.querySelector('.edit-btn');

    if(editBtn) editBtn.click();
  }
};

export const deleteNoteShortcut = (e) => {
  if((e.key === 'd' || e.key === 'D' ) && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    const deleteBtn = document.querySelector('.delete-btn');

    if(deleteBtn) deleteBtn.click();
  }
};

function confirmUnsavedProgressPrompt() {
  const confirmPrompt = window.confirm("You may have unsaved changes, are you sure you want to leave?");
  return confirmPrompt;
}