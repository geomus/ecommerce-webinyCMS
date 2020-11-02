import React from "react";

export default function DragDropFile({handleFile, children}) {
  function suppress(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  function onDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) {handleFile(files[0])};
  }
    return (
      <div
        onDrop={onDrop}
        onDragEnter={suppress}
        onDragOver={suppress}
      >
        {children}
      </div>
    );
}

