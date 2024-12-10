type SelectProps = {
    isOpen: boolean; 
    title: string; 
    message?: string; 
    onConfirm: () => void; 
    onClose: () => void; 
    confirmText?: string; 
    cancelText?: string; 
  };

export default function Select({
    isOpen,
    title,
    message,
    onConfirm,
    onClose,
    confirmText = "확인",
    cancelText = "취소",
}: SelectProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 h-1/5 flex flex-col justify-around">
            <p className="text-lg font-bold mb-4 text-center">{title}</p>
            {message && <p className="text-sm text-gray-600 mb-6 text-center">{message}</p>}
            <div className="flex gap-4 justify-center">
              <button
                className="px-4 py-2 bg-emerald-400 text-white rounded-lg"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg"
                onClick={onClose}
              >
                {cancelText}
              </button>
            </div>
          </div>
        </div>
      );
    }