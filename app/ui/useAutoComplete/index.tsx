import {
  ChangeEvent,
  KeyboardEvent,
  MouseEventHandler,
  useRef,
  useState,
} from 'react';

const KEY_CODES = {
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
  ESCAPE: 'Space',
  ENTER: 'Enter',
};
export function useAutoComplete({ source, onChange }: useAutoCompleteProps) {
  const [textValue, setTextValue] = useState('');
  const [isBusy, setBusy] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<Array<AutoCompleteElement>>(
    [],
  );
  const listRef = useRef<HTMLUListElement>(null!);

  function selectOption(index: number) {
    if (index > -1) {
      onChange(suggestions[index]);
      setTextValue(suggestions[index].name);
    }
    clearSuggestions();
  }

  async function getSuggestions(searchTerm: string) {
    if (searchTerm && source) {
      const options = await source(searchTerm);
      setSuggestions(options);
    }
  }

  function clearSuggestions() {
    setSuggestions([]);
    setSelectedIndex(-1);
  }

  function onTextChange(e: ChangeEvent<HTMLInputElement>) {
    const searchTerm = e.target.value;
    setBusy(true);
    setTextValue(searchTerm);
    clearSuggestions();

    getSuggestions(searchTerm);
    setBusy(false);
  }

  const optionHeight = listRef?.current?.children[0]?.clientHeight as number;

  function scrollUp() {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
    if (typeof listRef?.current?.scrollTop !== 'undefined') {
      listRef.current.scrollTop -= optionHeight;
    }
  }

  function scrollDown() {
    if (selectedIndex < suggestions.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
    if (typeof listRef?.current?.scrollTop !== 'undefined') {
      listRef.current.scrollTop = selectedIndex * 1; // optionHeight
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const keyOperation = {
      [KEY_CODES.DOWN]: scrollDown,
      [KEY_CODES.UP]: scrollUp,
      [KEY_CODES.ENTER]: () => selectOption(selectedIndex),
      [KEY_CODES.ESCAPE]: clearSuggestions,
      // [KEY_CODES.PAGE_DOWN]: pageDown,
      // [KEY_CODES.PAGE_UP]: pageUp,
    };

    if (keyOperation[e.code]) {
      keyOperation[e.code]();
      return;
    }

    setSelectedIndex(-1);
  }

  return {
    bindOption: {
      onClick: (e: MouseEventHandler<HTMLLIElement>) => {
        const nodes = Array.from(listRef.current.children);
        console.log(nodes);
        selectOption(nodes.indexOf(e.target.closest('li')));
      },
    },
    bindInput: {
      value: textValue,
      onChange: onTextChange,
      onKeyDown,
    },
    bindOptions: { ref: listRef },
    isBusy,
    suggestions,
    selectedIndex,
  };
}

export interface AutoCompleteElement {
  id: number;
  name: string;
}

interface useAutoCompleteProps {
  source: (search: string) => Promise<AutoCompleteElement[]>;
  onChange: (element: AutoCompleteElement) => void;
}
