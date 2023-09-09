export default function CommandDetailsSave() {
  return (
    <form className="m-3 flex flex-col">
      <label className="font-medium text-stone-600">Bookmark name</label>
      <input
        autoFocus
        type="text"
        className="mt-1 rounded-md border-2 border-stone-100 bg-stone-50 p-2 text-stone-600 outline-primary-500"
      />
      <div className="flex flex-row content-center justify-end space-x-2 pt-4">
        <button className="p-2 font-semibold text-gray-400">Cancel</button>
        <button className="rounded-md border border-b-2 border-primary-300 border-b-primary-400 bg-primary-200 p-2 font-semibold text-primary-600">
          Validate
        </button>
      </div>
    </form>
  );
}
