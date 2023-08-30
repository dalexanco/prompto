import PromptoSquareIcon from '@src/icons/prompto-square';

export default function Header() {
  return (
    <div className="m-4 flex items-center justify-center">
      <PromptoSquareIcon className="inline-block h-5 w-5 align-text-bottom" />{' '}
      <span className="ml-2 text-base font-medium text-stone-800">Prompto</span>
    </div>
  );
}
