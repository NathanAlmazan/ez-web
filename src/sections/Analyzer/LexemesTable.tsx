import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// types
import { Lexemes } from '../../App';

export default function LexemesTable({ lexemes }: { lexemes: Lexemes[] }) {
  return (
    <Stack spacing={2}>
      {lexemes.map((lexeme, index) => (
        <Card key={index} sx={{ bgcolor: (theme) => theme.palette.secondary.light }}>
          <CardContent>
            <Typography variant="body1" fontWeight={700} component="div">
              {lexeme.value}
            </Typography>
            <Typography variant='subtitle2' color="text.secondary">
              {lexeme.token}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}