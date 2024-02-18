export default function ErrorModal({ btnCaption, children }) {
  return (
    <dialog className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{btnCaption}</Button>
      </form>
    </dialog>
  );
}
