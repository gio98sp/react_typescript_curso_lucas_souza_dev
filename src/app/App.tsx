
import { AppRoutes } from './routes/index';
import { UsuarioLogadoProvider } from './shared/contexts';

export const App = () => {
  return (
    <UsuarioLogadoProvider>
      <AppRoutes />
    </UsuarioLogadoProvider>
  );
}

