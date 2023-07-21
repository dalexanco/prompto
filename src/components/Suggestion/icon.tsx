import classNames from 'classnames';

import BoltIcon from '@src/icons/bolt';
import BookmarkIcon from '@src/icons/bookmark';
import InformationCircleIcon from '@src/icons/information-circle';
import MagnifyingGlassIcon from '@src/icons/magnifying-glass';
import RectangleStackIcon from '@src/icons/rectangle-stack';
import { CommandIcon } from '@src/types/commands';

export default function SuggestionIcon({
  iconKey,
  hasFocus
}: {
  iconKey: CommandIcon;
  hasFocus: boolean;
}): JSX.Element {
  const styles = classNames('w-4 h-4', {
    ['stroke-white']: hasFocus,
    ['stroke-gray-600']: !hasFocus
  });
  switch (iconKey) {
    case CommandIcon.INFORMATION_CIRCLE:
      return <InformationCircleIcon className={styles} />;
    case CommandIcon.BOOKMARK:
      return <BookmarkIcon className={styles} />;
    case CommandIcon.RECTANGLE_STACK:
      return <RectangleStackIcon className={styles} />;
    case CommandIcon.BOLT:
      return <BoltIcon className={styles} />;
    default:
      return <MagnifyingGlassIcon className={styles} />;
  }
}
