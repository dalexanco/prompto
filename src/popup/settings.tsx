import { useKeyPressEvent } from 'react-use';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  useKeyPressEvent('ArrowLeft', () => navigate(-1));

  return <>Hey</>;
}
