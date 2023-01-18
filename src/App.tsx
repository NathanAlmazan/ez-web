import { useState, useEffect } from 'react';
// mui
import Grid from '@mui/material/Grid';
// layout
import BaseLayout from './layouts/BaseLayout';
// components
import CodeEditor from './sections/Editor';
import CodeAnalyzer from './sections/Analyzer';
// api
import axios from 'axios';

export interface Lexemes {
  token: string;
  value: string;
}

export interface LexicalAnalyzer {
  lexemes: Lexemes[];
  error: boolean;
  message: string;
}

function App() {
  const [program, setProgram] = useState<string>('');
  const [lexemes, setLexemes] = useState<Lexemes[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleTextChange = (value: string) => {
    setProgram(value);
  }

  const handleAnalyzeCode = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/compiler`, 
    {
      codes: program.split("\n").map((line) => line.replaceAll('\r', ''))
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data: LexicalAnalyzer = res.data;
    if (data.lexemes) {
      setLexemes(data.lexemes);
      setError(null);
    } else {
      setError(data.message);
      setLexemes([]);
    }
  }

  return (
    <BaseLayout>
      <Grid 
        container 
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ p: 2 }}
      >
        <Grid item xs={12} md={8}>
          <CodeEditor 
            program={program}
            handleProgramChange={handleTextChange}
            handleAnalyzeCode={handleAnalyzeCode}
          />
        </Grid>    
        <Grid item xs={12} md={4}>
          <CodeAnalyzer lexemes={lexemes} error={error} />
        </Grid>    
      </Grid> 
    </BaseLayout>
  )
}

export default App
