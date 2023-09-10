import { useNavigate, useParams } from 'react-router-dom';
import { useKeyPressEvent } from 'react-use';

import { CommandType } from '@src/types/commands';
import { Suggestion } from '../components/Suggestion/component';
import CommandDetailsSave from '@src/components/CommandDetailsSave';
import Header from '@src/components/Header';
import Card from '@src/components/Card';
import Footer from '@src/components/Footer';
import { useSuggestionsStore } from '@src/stores';

export default function PopupDetailsPage() {
  const { suggestions } = useSuggestionsStore();
  const { suggestionKey } = useParams();
  const navigate = useNavigate();
  useKeyPressEvent('ArrowLeft', () => navigate(-1));

  const suggestion = suggestions.find(({ key }) => key === suggestionKey);
  if (!suggestion) return null;

  switch (suggestion.type) {
    case CommandType.BOOKMARK_SAVE:
      return (
        <>
          <Header />
          <Card color="white" className="mx-4 p-0">
            <Suggestion suggestion={suggestion} />
            <CommandDetailsSave />
          </Card>
          <Footer />
        </>
      );
    default:
      return null;
  }
}
