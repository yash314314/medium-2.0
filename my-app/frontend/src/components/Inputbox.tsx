// Inputbox.tsx
export function Inputbox({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  style,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="mb-4 w-1/2">
      <label className="block text-sm font-bold mb-2 text-white">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
        style={style} // Ensure custom styles are applied here
      />
    </div>
  );
}
