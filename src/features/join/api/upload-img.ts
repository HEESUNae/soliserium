// 이미지 파일을 cloudinary 저장소에 저장하고 이미지 url 반환
export const getProfileImg = async (value: File) => {
  const formData = new FormData();
  formData.append('file', value);
  formData.append('upload_preset', 'soliserium');
  formData.append('folder', 'profile');
  formData.append('transformation[quality]', 'auto');
  formData.append('transformation[fetch_format]', 'auto');

  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  return await fetch(url, { method: 'POST', body: formData }).then((res) => res.json());
};
