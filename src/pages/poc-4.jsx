import { useRef, useEffect } from 'react';

function Poc4() {
    const iframeRef = useRef(null);
    const hasLoaded = useRef(false); // ป้องกันโหลดซ้ำ

    useEffect(() => {
        const handleMessage = (event) => {

            console.log('[📥 Message Received]', event.data);
            try {
                const msg = JSON.parse(event.data);

                if (msg.event === 'init' && !hasLoaded.current) {
                    console.log('[📥 Ready] Draw.io is ready to receive content.');
                    hasLoaded.current = true;

                    const saved = localStorage.getItem('myDiagram');

                    if (saved) {
                        // โหลดจาก localStorage
                        iframeRef.current.contentWindow.postMessage(
                            JSON.stringify({
                                action: 'load',
                                xml: saved,
                                title: 'Loaded from localStorage',
                                modified: false,
                            }),
                            '*'
                        );
                    } else {
                        // ✅ ถ้ายังไม่มี → สร้าง diagram ว่างใหม่
                        iframeRef.current.contentWindow.postMessage(
                            JSON.stringify({
                                action: 'load',
                                xml: '',
                                title: 'New Project',
                                modified: false,
                            }),
                            '*'
                        );
                    }
                }

                if (msg.event === 'save') {
                    const xml = msg.xml;
                    localStorage.setItem('myDiagram', xml);
                    console.log('✅ Diagram saved to localStorage');
                    alert('Diagram saved to localStorage!');
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

            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({
                    action: 'load',
                    xml,
                    title: file.name,
                    modified: true,
                    autosave: 1,
                    saveAndExit: 0,
                }),
                '*'
            );
        };
        reader.readAsText(file);
    };

    const loadFromLocalStorage = () => {
        const saved = localStorage.getItem('myDiagram');
        if (saved && iframeRef.current) {
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
        <div className="App">
            <header className="App-header">
                <h1>Draw.io with LocalStorage + New Project</h1>

                <input
                    type="file"
                    accept=".drawio,.xml"
                    onChange={handleFileUpload}
                    style={{ marginBottom: '10px' }}
                />

                <button onClick={loadFromLocalStorage} style={{ marginBottom: '10px' }}>
                    Load from localStorage
                </button>
                <button onClick={() => {
                    iframeRef.current.contentWindow.postMessage(
                        JSON.stringify({ action: 'template' }),
                        '*'
                    );
                }}>
                    🆕 New Diagram
                </button>

                <iframe
                    ref={iframeRef}
                    id="drawioFrame"
                    src="https://embed.diagrams.net/?embed=1&proto=json&ui=light&libraries=1&nav=1&toolbar=1&zoom=1&layers=1&pages=1&math=1&dark=0&saveAndExit=0&noSaveBtn=0&noExitBtn=1"
                    width="1000"
                    height="600"
                    title="Draw.io Editor"
                    style={{ border: '1px solid #ccc', borderRadius: '8px' }}
                />

            </header>
        </div>
    );
}

export default Poc4;
