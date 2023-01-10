import React, { useState } from 'react';
// mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
// monaco
import Editor, { Monaco } from "@monaco-editor/react";
import EzLanguageTokens from './constants';
// icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface CodeEditorProps {
    handleProgramChange: (value: string) => void;
    handleAnalyzeCode: () => void;
}

type EditorTheme = "light" | "vs-dark"

export default function CodeEditor(props: CodeEditorProps) {
    const { handleProgramChange, handleAnalyzeCode } = props;
    const [editorTheme, setEditorTheme] = useState<EditorTheme>("light");

    const handleEditorChange = (value?: string) => {
        if (value) handleProgramChange(value)
    }

    const handleBeforeMount = (monaco: Monaco) => {
        if (!monaco.languages.getLanguages().some(({ id }) => id === 'ezlanguage')) {
            monaco.languages.register({ id: 'ezlanguage' });
            monaco.languages.setMonarchTokensProvider('ezlanguage', EzLanguageTokens() as any)
        } else {
            console.log("Language already exists");
        }
    }

    const handleOnThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditorTheme(e.target.value as EditorTheme)
    }

    return (
        <>
            <Stack 
                spacing={2}
                direction="row" 
                justifyContent="space-between"
                alignItems="center"
            >
                <Stack 
                    direction="row" 
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{ display: { xs: "none", md: "flex" } }}
                >
                    <Avatar 
                        alt="ez-logo"
                        src="/images/ic_ezlanguage.png"
                        sx={{ width: 80, height: 80 }}
                    />
                    <Typography variant="h4" fontWeight="bold">
                        EZ
                    </Typography>
                </Stack>
                <Stack 
                    spacing={2}
                    direction="row" 
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <TextField
                        select 
                        label="Theme"
                        value={editorTheme}
                        onChange={handleOnThemeChange}
                        sx={{ minWidth: 120 }}
                    >
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="vs-dark">Dark</MenuItem>
                    </TextField>
                    <Button 
                        variant="contained"
                        size="large"
                        startIcon={<PlayArrowIcon />}
                        onClick={handleAnalyzeCode}
                    >
                        Analyze Code
                    </Button>
                </Stack>
            </Stack>
            <Box sx={{ width: "100%", py: 2 }}>
                <Editor
                    height="70vh"
                    defaultLanguage="ezlanguage"
                    defaultValue="<< write code here >>"
                    beforeMount={handleBeforeMount}
                    theme={editorTheme}
                    options={{
                        fontSize: 20
                    }}
                    onChange={handleEditorChange}
                />
            </Box>
        </>
    )
}