// 이미지 파일을 cloudinary 저장소에 저장하고 이미지 url 반환
export const getProfileImg = async (value: File) => {
  const formData = new FormData();
  formData.append('file', value);
  formData.append('upload_preset', 'soliserium');
  formData.append('folder', 'profile');
  formData.append('exif', 'false');
  formData.append(
    'transformation',
    JSON.stringify([
      { width: 1000, height: 1000, crop: 'limit' }, // 해상도 제한
      { quality: 'auto:eco' }, // 화질 자동 최적화
      { fetch_format: 'auto' }, // 최적 파일 형식
    ])
  );

  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  return await fetch(url, { method: 'POST', body: formData }).then((res) => res.json());
};
