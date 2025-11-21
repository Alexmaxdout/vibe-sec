import { useState } from "react";
import {
  Container,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField
} from "@mui/material";
import CodeEditor from "./components/CodeEditor";
import ResultBox from "./components/ResultBox";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("javascript"); // for editor only
  const [result, setResult] = useState(null); // will store analysis array
  const [loading, setLoading] = useState(false);

  const analyzeCode = async () => {
    if (!code.trim()) {
      alert("Please enter some code.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("http://localhost:5000/analyze", {
        code,
        description
      });

      // backend now returns { full_code, analysis: [...] }
      setResult(res.data.analysis);
    } catch (err) {
      console.error(err);
      setResult([{ status: "unsafe", code: "", explanation: "Server error or connection failed." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ padding: "40px 0" }}>
      <Typography variant="h3" align="center" style={{ marginBottom: 20 }}>
        Secure Code Analyzer
      </Typography>

      {/* Description Input */}
      <TextField
        label="What is this code supposed to do?"
        multiline
        minRows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        sx={{
          backgroundColor: "#1e1e1e",
          borderRadius: "5px",
          textarea: { color: "white" },
          label: { color: "#bbb" }
        }}
        style={{ marginBottom: 20 }}
      />

      {/* Language Dropdown (editor syntax highlighting only) */}
      <FormControl fullWidth style={{ marginBottom: 20 }}>
        <InputLabel>Language</InputLabel>
        <Select
          value={language}
          label="Language"
          onChange={(e) => setLanguage(e.target.value)}
          sx={{
            color: "white",
            ".MuiSelect-icon": { color: "white" },
            ".MuiOutlinedInput-notchedOutline": { borderColor: "white" }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: "#1e1e1e",
                color: "white"
              }
            }
          }}
        >
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="c">C</MenuItem>
          <MenuItem value="cpp">C++</MenuItem>
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="typescript">TypeScript</MenuItem>
          <MenuItem value="go">Go</MenuItem>
          <MenuItem value="rust">Rust</MenuItem>
        </Select>
      </FormControl>

      {/* Code Editor */}
      <Box style={{ marginBottom: 20 }}>
        <CodeEditor code={code} setCode={setCode} language={language} />
      </Box>

      {/* Analyze Button */}
      <Button
        variant="contained"
        onClick={analyzeCode}
        disabled={loading}
        fullWidth
      >
        Analyze Code
      </Button>

      {/* ResultBox handles loading + display */}
      <ResultBox result={result} loading={loading} />
    </Container>
  );
}

export default App;
