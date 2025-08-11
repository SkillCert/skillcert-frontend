interface DeleteConfirmModalProps {
  modalTitle?: string;
  modalText?: string;
  setIsModalOpen: (val: boolean) => void;
}

export default function DeleteConfirmModal({
  modalTitle = "Modal title",
  modalText = "Modal text",
  setIsModalOpen,
}: DeleteConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="relative flex flex-col items-start justify-center p-6 bg-gray-950 rounded-xl shadow-lg w-[90%] md:w-[70%] xl:w-[40%] text-white font-sans space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-400 w-full py-2 space-y-2">
          <p className="text-3xl font-medium font-poppins">{modalTitle}</p>
          <p>{modalText}</p>
        </div>
        <div className="w-full flex items-end justify-end space-x-6">
          <button className="border border-gray-400 text-gray-400 rounded-lg px-3 py-1">
            Cancel
          </button>
          <button className="bg-purple-600 rounded-lg px-3 py-1">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
