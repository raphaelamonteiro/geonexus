import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/hello")
      .then((res) => setMsg(res.data.message))
      .catch(() => setMsg("Erro ao conectar :("));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Front + Back conectados!</h1>
      <p>Resposta do servidor:</p>
      <strong>{msg}</strong>
    </div>
  );
}

export default App;
