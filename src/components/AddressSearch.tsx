import React, { useEffect } from "react";

interface Props {
    onAddressSelect: (func:string) => void
}

function AddressSearch({ onAddressSelect }:Props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 주소 검색을 실행하는 함수
  const handleOpenPostcode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    new window.daum.Postcode({
      oncomplete: function (data) {
        onAddressSelect(data.address);
      },
    }).open();
  };

  return (
    <div>
      <button className="p-3 bg-gray-200 rounded-xl text-xs h-full" onClick={handleOpenPostcode}>우편번호 검색</button>
    </div>
  );
}

export default AddressSearch;