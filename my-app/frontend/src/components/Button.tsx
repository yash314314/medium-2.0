

// Update the props to include the `onClick` type
type ButtonProps = {
  label: string;
  onClick: () => void;  // onClick prop with function type
};

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}  // Correctly bind the onClick event
      className="bg-black text-white py-2 px-4 rounded hover:bg-gray-600"
    >
      {label}
    </button>
  );
}
