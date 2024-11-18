import { useState } from 'react';

interface ReportItemProps {
  item: {
    title: string;
    contents: string[];
  }
}

const ReportItem = ({ item }: ReportItemProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="border rounded-lg shadow-md mb-4">
      <div
        className="p-4 bg-gray-100 cursor-pointer"
        onClick={toggleOpen}
      >
        <h2 className="text-xl font-semibold">{item.title}</h2>
      </div>
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-screen py-2' : 'max-h-0'} px-5`}
        style={{ transitionProperty: 'max-height' }}
      >
          {item.contents.map((content, index) => (
            <p key={index} className="py-2">
              {content}
            </p>
          ))}
        </div>
    </div>
  );
};

export default ReportItem;
