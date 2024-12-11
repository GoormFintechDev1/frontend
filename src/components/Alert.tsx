interface SelectProps {
    isOpen: boolean; 
    message: string; 
  };


export default function Alert({isOpen, message}:SelectProps) {

    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-80 h-14 flex items-center justify-center">
                <p className="text-center font-bold text-sm">❌  {message}</p>
            </div>
        </div>
    )
}
