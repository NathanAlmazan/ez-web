import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const theme = createTheme({
    palette: {
        primary: {
            main: '#161620'
        },
        secondary: {
            main: '#EEE144',
            light: '#FDFD96'
        }
    }
})

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {children}
            </Box>
        </ThemeProvider>
    )
}