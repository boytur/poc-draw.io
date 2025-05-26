import { useRef } from 'react';

function Poc2() {
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
                <iframe
                    id="drawioFrame"
                    src="https://drive.google.com/file/d/1SVTIPjtubjE4ymUkW94sLxKEqDHs7nft/preview?usp=sharing"
                    width="1000"
                    height="600"
                    title="Draw.io Editor"
                    style={{ border: '1px solid #ccc', marginTop: '20px' }}
                />
            </header>
        </div>
    );
}

export default Poc2;
