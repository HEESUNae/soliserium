'use server';

export async function authJoinAction(_: unknown, formData: FormData) {
  try {
    const userId = formData.get('id')?.toString();
    const userPW = formData.get('pw')?.toString();

    if (!userId || !userPW) {
      return {
        status: false,
        data: null,
        message: '아이디 또는 패스워드를 확인해주세요.',
      };
    }

    return {
      status: true,
      data: { userId, userPW },
      message: null,
    };
  } catch (e) {
    console.log(e);
    return {
      status: false,
      data: null,
      message: `에러가 발생했습니다. ${e}`,
    };
  }
}
