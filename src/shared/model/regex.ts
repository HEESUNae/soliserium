// 정규식 체크
export const checkRegex = (name: string, value: string) => {
  let isValid = false;
  if (name === 'id') {
    isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value); // 이메일
  } else if (name === 'name') {
    isValid = /^(?! )[a-zA-Z가-힣 ]+$/.test(value); // 영문 + 숫자 포함
  } else if (name === 'pw') {
    isValid = /^[A-Za-z0-9]{6,}$/.test(value); // 6자 이상, 영문 + 숫자 포함
  } else {
    isValid = true;
  }
  return isValid;
};
