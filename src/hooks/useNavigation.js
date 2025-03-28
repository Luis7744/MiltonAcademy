import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const goToTema = (temaId) => {
    navigate(`/tema/${temaId}`);
  };

  return {
    goToTema
  };
}; 