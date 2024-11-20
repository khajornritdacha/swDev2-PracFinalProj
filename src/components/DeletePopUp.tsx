import React from "react";

interface DeletePopUpProps {
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeletePopUp: React.FC<DeletePopUpProps> = ({ onClose, onConfirm }) => (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-100s">
    <div className="bg-white p-6 rounded shadow-md w-96 opacity-100 z-120">
      <h2 className="text-lg font-semibold text-center mb-4">
        Delete the restaurant
      </h2>
      <div className="flex justify-between">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onConfirm}
        >
          Confirm
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default DeletePopUp;
