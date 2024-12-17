// 이미지 파일을 cloudinary 저장소에 저장하고 이미지 url 반환
export const getProfileImg = async (value: File) => {
  const formData = new FormData();
  formData.append('file', value);
  formData.append('upload_preset', 'soliserium');
  formData.append('api_key', `${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}`);
  formData.append('folder', 'profile');

  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const data = await fetch(url, { method: 'POST', body: formData }).then((res) => res.json());

  // Cloudinary에서 반환된 이미지 URL을 JPEG 형식으로 변환
  const imageUrl = data.secure_url; // Cloudinary에서 반환된 원본 이미지 URL
  const transformedImageUrl = `${imageUrl.replace('/image/upload', '/image/upload/f_jpg')}`; // JPEG로 변환

  return transformedImageUrl; // 변환된 URL 반환
};
