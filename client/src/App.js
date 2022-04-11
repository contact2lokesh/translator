import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [option, setOption] = useState([]);
  const [to, setTo] = useState("af");
  const [from, setFrom] = useState("af");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/translate", {
        headers: { accept: "application/json" },
      })
      .then((res) => {
        console.log(res);
        setOption(res.data);
      });
  },[]);

  const translate = () => {
    axios.post("http://localhost:5000/api/translate",{'text': input, 'targetLanguage': to, 'source': from}, {
      headers: { accept: "application/json"
                  },
    }).then((res)=>{
      console.log(res.data);
      setOutput(res.data);
    })
  };

  return (
    <div className="App">
      <div>
        From ({from}):
        <select
          onChange={(e) => {
            setFrom(e.target.value);
          }}
        >
          {option && option.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        To ({to}):
        <select
          onChange={(e) => {
            setTo(e.target.value);
          }}
        >
          {option && option.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          cols="50"
          rows="8"
          onInput={(e) => {
            setInput(e.target.value);
          }}
        ></textarea>
      </div>
      <div>
        <textarea cols="50" rows="8" value={output}></textarea>
      </div>
      <div>
        <button onClick={()=>{translate()}}>Translate</button>
      </div>
    </div>
  );
}

export default App;
