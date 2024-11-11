export const convertToKoreanWon = (value: number): string => {
  if (value < 1000) return `${value}`; // 천 원 미만일 때는 원으로 표시
  if (value === 0) return "0원"; // 0일 때는 0원으로 표시

  const isNegative = value < 0;
  let currentValue = Math.abs(value); // 음수일 경우 절대값으로 변환

  if (currentValue < 1000) return `${isNegative ? '-' : ''}${currentValue}원`; // 천 원 미만일 때는 원으로 표시

  const units: string[] = ["", "만", "천", "백"]; // 단위 배열
  let result: string = "";

  // 만원 이상일 경우 단위를 순서대로 추가
  if (currentValue >= 10000) {
    const manUnit: number = Math.floor(currentValue / 10000);
    result += `${manUnit}${units[1]}`; // 만 단위 추가
    currentValue %= 10000;
  }

  // 천원 단위
  if (currentValue >= 1000) {
    const thousandUnit: number = Math.floor(currentValue / 1000);
    result += ` ${thousandUnit}${units[2]}`; // 천 단위 추가
    currentValue %= 1000;
  }

  // 백원 단위
  if (currentValue >= 100) {
    const hundredUnit: number = Math.floor(currentValue / 100);
    result += ` ${hundredUnit}${units[3]}`; // 백 단위 추가
    currentValue %= 100;
  }

  // 원 단위 (1원~99원)
  if (currentValue > 0) {
    result += ` ${currentValue}원`;
  }

  return (isNegative ? '-' : '') + result.trim() + "원"; // 음수일 경우 '-' 추가 후 반환
}

export const formatNumberWithComma = (value: number): string => {
  return value.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + " 원";