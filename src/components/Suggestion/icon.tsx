import classNames from 'classnames';

import BoltIcon from '@src/icons/bolt';
import BookmarkIcon from '@src/icons/bookmark';
import InformationCircleIcon from '@src/icons/information-circle';
import MagnifyingGlassIcon from '@src/icons/magnifying-glass';
import RectangleStackIcon from '@src/icons/rectangle-stack';
import { CommandIcon } from '@src/types/commands';
import SquarePlusIcon from '@src/icons/square-plus';
import SquareXIcon from '@src/icons/square-x';
import SquareHelpIcon from '@src/icons/square-help';
import PinnedIcon from '@src/icons/pinned';
import PinnedOffIcon from '@src/icons/pinned-off';

export default function SuggestionIcon({
  iconKey,
  hasFocus
}: {
  iconKey: CommandIcon;
  hasFocus: boolean;
}): JSX.Element {
  const styles = classNames('w-5 h-5 stroke-gray-700', {});
  switch (iconKey) {
    case CommandIcon.INFORMATION_CIRCLE:
      return <InformationCircleIcon className={styles} />;
    case CommandIcon.BOOKMARK:
      return <BookmarkIcon className={styles} />;
    case CommandIcon.RECTANGLE_STACK:
      return <RectangleStackIcon className={styles} />;
    case CommandIcon.BOLT:
      return <BoltIcon className={styles} />;
    case CommandIcon.SQUARE_PLUS:
      return <SquarePlusIcon className={styles} />;
    case CommandIcon.SQUARE_X:
      return <SquareXIcon className={styles} />;
    case CommandIcon.SQUARE_HELP:
      return <SquareHelpIcon className={styles} />;
    case CommandIcon.PINNED:
      return <PinnedIcon className={styles} />;
    case CommandIcon.PINNED_OFF:
      return <PinnedOffIcon className={styles} />;
    case CommandIcon.MAGNIFYING_GLASS:
    default:
      return <MagnifyingGlassIcon className={styles} />;
  }
}
