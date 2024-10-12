import { useAutoComplete } from '@/app/ui/useAutoComplete';

export function InputTagSearch({
  data: { bindOption, bindInput, selectedIndex, bindOptions, suggestions },
}: InputTagSearchProps) {
  return (
    <div className="flex flex-col w-[300px] h-[500px]">
      <input
        type="text"
        className="py-[0.1em] rounded-lg pl-[0.5rem] text-sm border border-black"
        {...bindInput}
      />
      <ul
        className="scroll-smooth top-[0.2rem] relative overflow-x-hidden overflow-y-auto"
        {...bindOptions}
      >
        {suggestions.map((suggestion, index) => (
          <li
            {...bindOption}
            className={
              `flex border border-y-slate-400 text-sm items-center h-[20px] pl-[0.5rem] bg-white hover:bg-slate-300 ` +
              (selectedIndex === index && 'bg-blue-200')
            }
            key={suggestion.name + index}
          >
            <div className="flex items-center space-x-1">
              <div>{suggestion.name}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface InputTagSearchProps {
  data: ReturnType<typeof useAutoComplete>;
}
