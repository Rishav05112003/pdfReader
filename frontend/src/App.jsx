// App.js
import { useState } from 'react';
import FileUpload from './components/FileUpload';
import ChatWindow from './components/ChatWindow';

function App() {
  const [sessionId, setSessionId] = useState(null);

  return (
    <div className="app">
      {!sessionId ? (
        <FileUpload onSuccess={setSessionId} />
      ) : (
        <ChatWindow sessionId={sessionId} />
      )}
    </div>
  );
}

export default App;