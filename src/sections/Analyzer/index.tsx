import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// components
import LexemesTable from './LexemesTable';
// icons
import DownloadIcon from '@mui/icons-material/Download';
// types
import { Lexemes } from '../../App';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ theme }) => ({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: theme.palette.secondary.main,
    },
  }));

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(18),
  marginRight: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    color: theme.palette.secondary.main,
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));

export default function CodeAnalyzer({ lexemes, error }: { lexemes: Lexemes[], error: string | null }) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDownloadLexemes = () => {
    const fileData = lexemes.map(lexeme => `${lexeme.token} ----> ${lexeme.value}`).join("\n");
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "output.txt";
    link.href = url;
    link.click();
  }

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Tooltip title="Download Tokens">
        <IconButton 
          onClick={handleDownloadLexemes}
          color='secondary'
          sx={{
            position: 'absolute',
            top: 3,
            right: 8,
            zIndex: 10
          }}
        >
          <DownloadIcon fontSize='large' />
        </IconButton>
      </Tooltip>
      <Box sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Lexemes" />
          <StyledTab label="Syntax Tree" />
        </StyledTabs>
        <Box sx={{ height: "75vh", p: 3, overflowY: 'auto' }}>
            <LexemesTable lexemes={lexemes} />
            {lexemes.length === 0 && !error && (
              <Stack 
                spacing={2} 
                justifyContent="center" 
                alignItems="center" 
                sx={{ width: "100%", height: "100%", p: 5 }}
              >
                <Box 
                  component="img"
                  alt="programming"
                  src="/images/img_programming.png"
                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
                <Typography align="center" variant="h6" color="white" fontWeight={600}>
                  Click 'Analyze Code' to view program tokens.
                </Typography>
              </Stack>
            )}

            {error && (
              <Stack 
                spacing={2} 
                justifyContent="center" 
                alignItems="center" 
                sx={{ width: "100%", height: "100%", p: 5 }}
              >
                <Box 
                  component="img"
                  alt="programming"
                  src="/images/img_error.png"
                  sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
                <Typography align="center" variant="h6" color="white" fontWeight={600}>
                  {error}
                </Typography>
              </Stack>
            )}
        </Box>
      </Box>
    </Box>
  );
}
