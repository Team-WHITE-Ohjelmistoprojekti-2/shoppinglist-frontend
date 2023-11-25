import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthEffect = (isAuthenticated) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
};

export default useAuthEffect;