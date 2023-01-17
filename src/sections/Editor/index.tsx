import React, { useState } from 'react';
// mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from '@mui/material/Link';
import { Theme } from '@mui/material/styles';
// monaco
import Editor, { Monaco } from "@monaco-editor/react";
import EzLanguageTokens from './constants';
// icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface CodeEditorProps {
    program: string;
    handleProgramChange: (value: string) => void;
    handleAnalyzeCode: () => void;
}

type EditorTheme = "light" | "vs-dark"

export default function CodeEditor(props: CodeEditorProps) {
    const { program, handleProgramChange, handleAnalyzeCode } = props;
    const matches = useMediaQuery((theme) => (theme as Theme).breakpoints.up('sm'));
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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (event.target.files) {
            if (event.target.files[0].name.split('.').pop() !== 'ez')  alert('The file you selected is not an EZ File. Please select an appropriate file.')
            else {
                const reader = new FileReader();

                reader.onload = async (e) => {
                    const text = e.target?.result;
                    if (typeof text === 'string') handleProgramChange(text);
                }

                reader.readAsText(event.target.files[0])
            }
        }
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
                    {matches ? (
                        <Button 
                            variant="contained"
                            size="large"
                            startIcon={<PlayArrowIcon />}
                            onClick={handleAnalyzeCode}
                        >
                            Analyze Code
                        </Button>
                    ) : (
                        <IconButton onClick={handleAnalyzeCode} color='primary'>
                            <PlayArrowIcon />
                        </IconButton>
                    )}
                     {matches ? (
                        <Button 
                            component='label'
                            variant="contained"
                            size="large"
                            startIcon={<FileUploadIcon />}
                            color='secondary'
                        >
                            Upload Code
                            <input 
                                hidden
                                type='file'
                                accept='.ez'
                                onChange={handleFileChange}
                            />
                        </Button>
                    ) : (
                        <IconButton component='label'color='primary'>
                            <FileUploadIcon />
                            <input 
                                hidden
                                type='file'
                                accept='.ez'
                                onChange={handleFileChange}
                            />
                        </IconButton>
                    )}
                </Stack>
            </Stack>
            <Box sx={{ width: "100%", py: 2 }}>
                <Editor
                    height="70vh"
                    defaultLanguage="ezlanguage"
                    beforeMount={handleBeforeMount}
                    theme={editorTheme}
                    options={{
                        fontSize: 20
                    }}
                    value={program}
                    onChange={handleEditorChange}
                />
            </Box>
            <Typography component={Link} href='http://ezlanguage.nat911.com/about' variant="h6" fontWeight="bold" sx={{ cursor: 'pointer' }}>
                Know more about EZ Language?
            </Typography>
        </>
    )
}