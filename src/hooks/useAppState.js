import { useDispatch } from 'react-redux';
import { updateLanguage } from '../state/actions';
import { LANGUAGE } from '../state/constants';

export default function useAppState() {
  const dispatch = useDispatch();
  const InitializeApp = () => {
    const language = localStorage.getItem(LANGUAGE) || 'en';
    dispatch(updateLanguage(language));
  };
  return { InitializeApp };
}
