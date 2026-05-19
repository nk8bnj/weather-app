import { Layout } from './Layout/Layout';
import { QueryProvider } from './providers/QueryProvider';

export const App = () => {
  return (
    <QueryProvider>
      <Layout />
    </QueryProvider>
  );
};
