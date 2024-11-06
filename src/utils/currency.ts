export default function convertToKoreanWon(value: number): string {
  if (value < 1000) return `${value}`; // 천 원 미만일 때는 원으로 표시

  const units: string[] = ["", "만", "천", "백"]; // 단위 배열
  let result: string = "";
  let currentValue: number = value;

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

  console.log(currentValue);

  // 원 단위 (1원~99원)
  if (currentValue > 0) {
    result += ` ${currentValue}원`;
  }

  return result.trim() + "원"; // 공백 제거 후 반환
}