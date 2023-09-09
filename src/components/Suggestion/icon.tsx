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
  className
}: {
  iconKey: CommandIcon;
  className?: string | undefined;
}): JSX.Element {
  switch (iconKey) {
    case CommandIcon.INFORMATION_CIRCLE:
      return <InformationCircleIcon className={className} />;
    case CommandIcon.BOOKMARK:
      return <BookmarkIcon className={className} />;
    case CommandIcon.RECTANGLE_STACK:
      return <RectangleStackIcon className={className} />;
    case CommandIcon.BOLT:
      return <BoltIcon className={className} />;
    case CommandIcon.SQUARE_PLUS:
      return <SquarePlusIcon className={className} />;
    case CommandIcon.SQUARE_X:
      return <SquareXIcon className={className} />;
    case CommandIcon.SQUARE_HELP:
      return <SquareHelpIcon className={className} />;
    case CommandIcon.PINNED:
      return <PinnedIcon className={className} />;
    case CommandIcon.PINNED_OFF:
      return <PinnedOffIcon className={className} />;
    case CommandIcon.MAGNIFYING_GLASS:
    default:
      return <MagnifyingGlassIcon className={className} />;
  }
}
