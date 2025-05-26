import { useRef, useEffect, useState } from 'react';

function Poc4View() {
    const iframeRef = useRef(null);
    const hasLoaded = useRef(false);
    const [status, setStatus] = useState('📄 Ready to view your diagram');

    useEffect(() => {
        const handleMessage = (event) => {
            try {
                const msg = JSON.parse(event.data);

                if (msg.event === 'init' && !hasLoaded.current) {
                    hasLoaded.current = true;

                    const saved = localStorage.getItem('myDiagram');
                    setStatus(saved ? '📂 Loaded diagram from localStorage' : '📄 New blank diagram');

                    iframeRef.current.contentWindow.postMessage(
                        JSON.stringify({
                            action: 'load',
                            xml: saved || '',
                            title: saved ? 'Loaded from localStorage' : 'New Project',
                            modified: false,
                        }),
                        '*'
                    );
                }
            } catch (err) {
                // ignore
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const xml = reader.result;
            setStatus(`📤 Loaded "${file.name}"`);

            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                    action: 'load',
                    xml,
                    title: file.name,
                    modified: false,
                }),
                '*'
            );
        };
        reader.readAsText(file);
    };

    const loadFromLocalStorage = () => {
        const saved = localStorage.getItem('myDiagram');
        if (saved) {
            setStatus('📂 Loaded diagram from localStorage');
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                    action: 'load',
                    xml: saved,
                    title: 'Loaded from localStorage',
                    modified: false,
                }),
                '*'
            );
        }
    };

    return (
        <div style={{ fontFamily: 'sans-serif', padding: '2rem', background: '#f9fafb' }}>
            <div
                style={{
                    maxWidth: '1024px',
                    margin: '0 auto',
                    background: '#fff',
                    padding: '2rem',
                    borderRadius: '1rem',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                    🖼️ Diagram Viewer (Read-Only)
                </h1>

                <p style={{ color: '#666', marginBottom: '1rem' }}>{status}</p>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <input
                        type="file"
                        accept=".drawio,.xml"
                        onChange={handleFileUpload}
                        style={{
                            border: '1px solid #ccc',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            flexGrow: 1,
                        }}
                    />
                    <button
                        onClick={loadFromLocalStorage}
                        style={{
                            background: '#1d4ed8',
                            color: '#fff',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        🔄 Load from LocalStorage
                    </button>
                </div>

                <iframe
                    ref={iframeRef}
                    title="Diagram Viewer"
                    src="https://viewer.diagrams.net/?embed=1&proto=json&edit=_blank&ui=light"
                    width="100%"
                    height="600"
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '0.75rem',
                        backgroundColor: '#f8fafc',
                    }}
                />
            </div>
        </div>
    );
}

export default Poc4View;
