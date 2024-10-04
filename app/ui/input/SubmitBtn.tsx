export function SubmitBtn({ text }: { text: string }) {
  return (
    <input
      className="bg-blue-400 m-auto mt-[1rem] px-[2rem] py-[0.1rem] rounded-xl cursor-pointer"
      type="submit"
      value={text}
    />
  );
}
