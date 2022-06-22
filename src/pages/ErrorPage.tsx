import { useAppSelector } from '../redux/hooks';

const ErrorPage = () => {
  const errorMessage = useAppSelector(({ error }) => error);
  return (
    <main style={{ padding: '1rem' }}>
      <p>{errorMessage}</p>
    </main>
  );
};

export default ErrorPage;
