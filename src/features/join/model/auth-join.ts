// 파이어베이스 회원가입 실패 알림메세지
export const getErrorMessage = (code: string): string => {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
    'auth/invalid-email': '유효하지 않은 이메일 형식입니다.',
    'auth/weak-password': '비밀번호는 최소 6자 이상이어야 합니다.',
    'auth/operation-not-allowed': '이메일/비밀번호로 회원가입이 허용되지 않습니다.',
    default: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.',
  };
  return messages[code] || messages.default;
};

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
