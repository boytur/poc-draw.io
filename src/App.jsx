import { useRef } from 'react';
import './App.css';

function App() {
  const iframeRef = useRef(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const xml = reader.result;

      // ส่ง diagram เข้า iframe (Draw.io)
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          action: 'load',
          xml,
        }),
        '*'
      );
    };
    reader.readAsText(file);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Upload Diagram and Preview on Draw.io</h1>
        <input type="file" accept=".drawio,.xml" onChange={handleFileUpload} />
        <iframe
          ref={iframeRef}
          id="drawioFrame"
          src="https://embed.diagrams.net/?embed=1&proto=json&ui=system&modified=0"
          width="1000"
          height="600"
          title="Draw.io Editor"
          style={{ border: '1px solid #ccc', marginTop: '20px' }}
        />
      </header>
    </div>
  );
}

export default App;
