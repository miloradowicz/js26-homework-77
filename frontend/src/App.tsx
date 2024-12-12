import { Container } from '@mui/material';
import Feed from './containers/Feed/Feed';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      maxSnack={1}
    >
      <Container sx={{ p: 4 }}>
        <Feed />
      </Container>
    </SnackbarProvider>
  );
}

export default App;
