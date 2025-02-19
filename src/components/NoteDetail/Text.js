import React, { useState, useRef, forwardRef, useEffect } from 'react';
import NoteDetailTag from './NoteDetailTag';
import Editor from '@monaco-editor/react';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Text.module.css';

const Text = forwardRef(({ detail, index, removeElement, moveElement }, ref) => {
  const [code, setCode] = useState(detail?.content);
  const [language, setLanguage] = useState(detail?.language || 'javascript');
  const [editorHeight, setEditorHeight] = useState('70'); // Initial height
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null); // Store the editor instance

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

  const handleEditorChange = (newValue) => {
    setCode(newValue);
    if (ref?.current && ref?.current[index] && ref?.current[index].current) {
      const updatedContent = { ...ref.current[index].current, content: newValue };
      ref.current[index].current = updatedContent;
    }
    updateEditorHeight(); // Update height whenever the content changes
  };

  const updateText = (newLanguage, index, type) => {
    const updatedContent = { ...ref.current[index].current, language: newLanguage };
    ref.current[index].current = updatedContent;
  };

  const moveHandler = () => {
    moveElement(index);
  };

  const updateEditorHeight = () => {
    const editor = editorRef.current;
    if (editor) {
      const model = editor.getModel();
      if (model) {
        const lineCount = model.getLineCount();
        const newHeight = lineCount * 22; // Add some padding
        setEditorHeight(`${newHeight}`);
      }
    }
  };

  useEffect(() => {
    const editorContainer = editorContainerRef.current;
    const editor = editorRef.current;

    if (editorContainer && editor) {
      const handleWheel = (event) => {
        if (event.ctrlKey) {
          // Allow zooming with Ctrl + Scroll
          return;
        }
        event.preventDefault();
        editorContainer.scrollBy({
          top: event.deltaY,
          behavior: 'smooth',
        });
      };

      const editorDomNode = editor.getDomNode();
      editorDomNode.addEventListener('wheel', handleWheel);

      return () => {
        editorDomNode.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  return (
    <div
      ref={editorContainerRef}
      style={{
        position: 'relative',
        // overflowY: 'auto', // Enable vertical scrolling
        borderRadius: '10px',
        backgroundColor: '#1A1911',
        paddingLeft: '5px',
        // paddingBottom: '10px',
        marginTop: '10px',
        marginRight: '20px',
        width: '100%',
        display:"inline-block",
        minHeight: `${Number(editorHeight) + 50}px`, // Set a fixed height for the parent container
      }}
      onClick={() => { console.log("clicked", editorHeight)}}
    >
      <div
        style={{
          position: 'relative',
          height: '25px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 15px',
          width: '100%',
        }}
      >
        <CloseIcon onClick={() => removeElement(index)} style={{ cursor: 'pointer' }} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {index !== 0 && (
            <div onMouseDown={moveHandler} className={styles.textUpBtn}>
              <span className="material-symbols-outlined">expand_less</span>
            </div>
          )}
          <NoteDetailTag options={supportedLanguageList} currentLanguage={language} />
        </div>
      </div>
      <div style={{ position: 'absolute', minHeight: `${editorHeight}px`, width: "100%" }}>
        <Editor
          ref={editorRef} // Attach the editor ref
          // height={editorHeight + "px"} // Set dynamic height
          height={`${editorHeight}px`}
          language={language}
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          options={{
            lineHeight: 22,
            scrollBeyondLastLine: false,
            minimap: { enabled: false },
            readOnly: false,
            automaticLayout:true,
            scrollbar: {
              horizontal: 'hidden',
              alwaysConsumeMouseWheel: false, // Disable consuming mouse wheel events
            },
            overviewRulerLanes: 0,
          }}
          onMount={(editor) => {
            editorRef.current = editor;
            updateEditorHeight(); // Calculate height on mount
          }}
        />
      </div>
    </div>
  );
});

export default Text;