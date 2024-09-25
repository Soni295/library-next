export function SubmitBtn({ text }: { text: string }) {
  return (
    <input
      className="bg-blue-400 m-auto mt-[1rem] px-8 py-2 rounded-xl cursor-pointer"
      type="submit"
      value={text}
    />
  );
}
