import { useAutoComplete } from '@/app/ui/useAutoComplete';

export function InputTagSearch({
  data: {
    bindOption,
    bindInput,
    selectedIndex,
    bindOptions,
    suggestions,
    isBusy,
  },
}: InputTagSearchProps) {
  return (
    <div className="">
      <div>
        <input
          type="text"
          className="py-[0.1em] rounded-lg pl-[0.5rem] text-sm border border-black"
          {...bindInput}
        />
        {isBusy && (
          <div className="w-4 h-4 border-2 border-dashed rounded-full border-slate-500 animate-spin"></div>
        )}
      </div>
      <ul
        className="w-[12rem] scroll-smooth absolute max-h-[260px] overflow-x-hidden overflow-y-auto"
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
