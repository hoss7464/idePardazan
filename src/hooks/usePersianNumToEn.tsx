const usePersianNumToEn=(input: string)=> {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const englishDigits = '0123456789';
  let convertedNumber = '';
  for (const char of input) {
    const index = persianDigits.indexOf(char);
    if (index !== -1) {
      convertedNumber += englishDigits[index];
    } else {
      convertedNumber += char;
    }
  }
  return convertedNumber;
}
export default usePersianNumToEn