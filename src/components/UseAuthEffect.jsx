import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthEffect = (isAuthenticated) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false ) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
};

export default useAuthEffect;
