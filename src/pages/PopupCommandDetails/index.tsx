import { CommandSuggestion, CommandType } from '@src/types/commands';
import { Suggestion } from '../../components/Suggestion/component';
import CommandDetailsSave from '@src/components/CommandDetailsSave';
import Header from '@src/components/Header';
import Card from '@src/components/Card';
import Footer from '@src/components/Footer';

interface SuggestionDetailsProps {
  suggestion?: CommandSuggestion;
}

export default function PopupCommandDetails({
  suggestion
}: SuggestionDetailsProps) {
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
