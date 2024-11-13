type ReportItemProps = {
  month: string;
  selectedMonth: string | null | undefined;
  handleToggle: (month: string) => void;
  content: string; // 리포트 내용을 전달할 수 있도록 props 추가
};

const ReportItem = ({ month, selectedMonth, handleToggle, content }: ReportItemProps) => {
  return (
    <div>
      <div
        className="mb-7 p-4 bg-gray-200 text-black rounded-lg cursor-pointer"
        onClick={() => handleToggle(month)}
      >
        {month} 월간 리포트
      </div>
      {selectedMonth === month && (
        <div className="p-4 bg-blue-100 rounded-lg">
          <h2>{month} 리포트 내용</h2>
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default ReportItem;