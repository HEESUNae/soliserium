'use server';

export async function authJoinAction(_: unknown, formData: FormData) {
  try {
    const userId = formData.get('id')?.toString();
    const userPW = formData.get('pw')?.toString();
    const userName = formData.get('name')?.toString();
    const userProile = formData.get('profile');

    if (!userId || !userPW || !userName || !userProile) {
      return {
        status: false,
        data: null,
        message: '필수 양식을 작성해주세요.',
      };
    }

    return {
      status: true,
      data: { userId, userPW, userName, userProile },
      message: null,
    };
  } catch (e) {
    return {
      status: false,
      data: null,
      message: `에러가 발생했습니다. ${e}`,
    };
  }
}
