import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react'; 
import NoteDetailTag from './NoteDetailTag';
import Editor from '@monaco-editor/react';
import CloseIcon from '@mui/icons-material/Close';
import styles from "./Text.module.css";
// forwardRef(({ detail, index, removeElement, moveElement }, ref) 
const Text = forwardRef(({ detail, index, removeElement, moveElement }, ref) => {
  const [code, setCode] = useState(detail?.content);
  const [language, setLanguage] = useState(detail?.language || "javascript");

  const supportedLanguageList = [
    { name: "javascript", displayName: "JavaScript", onAction: () => { setLanguage("javascript"); updateText("javascript", index, "language"); } },
    { name: "python", displayName: "Python", onAction: () => { setLanguage("python"); updateText("python", index, "language"); } },
    { name: "typescript", displayName: "TypeScript", onAction: () => { setLanguage("typescript"); updateText("typescript", index, "language"); } },
    { name: "csharp", displayName: "C#", onAction: () => { setLanguage("csharp"); updateText("csharp", index, "language"); } },
    { name: "c++", displayName: "C++", onAction: () => { setLanguage("c++"); updateText("c++", index, "language"); } },
    { name: "markdown", displayName: "Markdown", onAction: () => { setLanguage("markdown"); updateText("markdown", index, "language"); } },
    { name: "java", displayName: "Java", onAction: () => { setLanguage("java"); updateText("java", index, "language"); } },
    { name: "ruby", displayName: "Ruby", onAction: () => { setLanguage("ruby"); updateText("ruby", index, "language"); } },
    { name: "sass", displayName: "SASS", onAction: () => { setLanguage("sass"); updateText("sass", index, "language"); } },
    { name: "r", displayName: "R", onAction: () => { setLanguage("r"); updateText("r", index, "language"); } },
  ];


  const [editorHeight, setEditorHeight] = useState(50);
  const lineHeight = 20;

  const adjustEditorHeight = (editor) => {
    const lineCount = editor.getModel().getLineCount();
    const newHeight = Math.min(lineCount * lineHeight, 400);
    setEditorHeight(newHeight);
  };

  const handleEditorChange = (newValue) => {
    if (ref?.current && ref?.current[index] && ref?.current[index].current) {
      // Update only the `text` property at the specific index
      const updatedContent = { ...ref.current[index].current, content: newValue };
      ref.current[index].current = updatedContent;
    }
  };
  const updateText = (newLanguage, index, type) => {
    const updatedContent = { ...ref.current[index].current, language: newLanguage };
      ref.current[index].current = updatedContent;
  }
  const moveHandler = () => {
        moveElement(index);
    }

  return (
    <div style={{ position: "relative", overflow: "visible", borderRadius: "10px", backgroundColor: "#1A1911", paddingLeft: "5px", paddingBottom: "10px", flexGrow: "1", marginTop: "10px" }}>
      <div style={{ height: "25px", display: "flex", justifyContent: "space-between", paddingRight: "5px"}}>
        <CloseIcon onClick={() => removeElement(index)} />

        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent: "center"}}>
          {index != 0 && <div onMouseDown={moveHandler} className={styles.textUpBtn}><span class="material-symbols-outlined">expand_less</span></div>}
          <NoteDetailTag options={supportedLanguageList} currentLanguage={language} />
        </div>
        
      </div>
      <div style={{ flexGrow: "1", overflow: "hidden", maxHeight: "400px" }}>
        <Editor
          height={`${editorHeight}px`}
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          options={{
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            automaticLayout: true,
            readOnly: false,
          }}
          onMount={(editor) => {
            adjustEditorHeight(editor);
            editor.onDidChangeModelContent(() => adjustEditorHeight(editor));
          }}
        />
      </div>
    </div>
  );
});

export default Text;
