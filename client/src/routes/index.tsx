import { useRoutes } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const user = useAppSelector((state) => state.user);

  const element = useRoutes([
    ...publicRoutes,
    ...(user ? protectedRoutes : []),
  ]);

  return <>{element}</>;
};
