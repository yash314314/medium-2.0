/* eslint-disable @typescript-eslint/no-unused-vars */
interface DeleteConfirmationProps {
    onConfirm: () => void;
    onCancel: () => void;
    id: string; // or number if `id` is a number
  }
  
function DeleteConfirmation({ onConfirm, onCancel, id }:DeleteConfirmationProps) {
    
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-80 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-semibold text-gray-800">Confirm Delete</h2>
        <p className="text-gray-600 mt-2">Are you sure you want to delete this item?</p>
        <div className="mt-4 flex justify-around">
          <button 
            onClick={onCancel} 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
