import '../styles/globals.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#4285F4',
      contrastText: '#1D2029',
    }
  },
  typography: {
    fontFamily: [
      'Visby Round CF',
      'Quincy CF',
      '-apple-system',
      'Roboto',
      'sans-serif'
    ].join(','),
  },
  overrides: {
    
  }
})

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
