export function DeleteBtn({ text, onClick }: DeleteBtnProps) {
  return (
    <input
      className="bg-red-400 m-auto mt-[1rem] px-[2rem] py-[0.1rem] rounded-xl cursor-pointer"
      type="button"
      value={text}
      onClick={onClick}
    />
  );
}

interface DeleteBtnProps {
  text: string;
  onClick: () => void;
}
