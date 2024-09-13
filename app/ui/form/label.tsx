export function Label({ htmlFor, name }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-2xl mb-1">
      {name}
    </label>
  );
}

interface LabelProps {
  htmlFor: string;
  name: string;
}
