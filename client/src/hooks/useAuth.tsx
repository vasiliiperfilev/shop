import { useState, useEffect } from 'react';
import { RegisterRequest, User } from '../services/auth/types';
import AuthService from '../services/auth/authService';

const useAuth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const register = async (registerRequest: RegisterRequest) => {
    const user = await AuthService.register(registerRequest);
    setUser(user);
    //add redux store
  };

  useEffect(() => {
    if (user) {
      setIsRegistering(false);
    } else {
      setIsRegistering(true);
    }
  }, [user]);

  return { register, isRegistering };
};

export default useAuth;
