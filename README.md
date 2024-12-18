## Soliserium

"Solace(위로)"와 "Cerium(공간)"의 조합으로, 위로와 안식을 주는 공간이라는 뜻으로 고민상담을 주고받는 웹앱입니다.

현재 기획부터 개발까지 혼자 토이 프로젝트로 작업중입니다.

### 개발내용

- **로그인**
  - '이메일 저장'을 통해 자주 로그인하는 이메일을 저장할 수 있습니다.
  - SNS 소셜로그인 (Google, Kakao) 로그인이 가능합니다.
- **회원가입**
  - 서비스 사용시 타인에게 보여질 프로필 이미지를 등록합니다.
    사용자가 업로드한 이미지는 Cloudinary 에 Restful API로 저장됩니다.
  - 이름은 영어, 한글, 띄어쓰기를 포함하여 작성해야합니다.
  - 이메일은 로그인할 아이디로 이메일 형식이여야 합니다.
  - 비밀번호는 영어, 한글을 포함하여 6글자 이상이여 합니다.
  - 필수인 값을 모두 입력하면 회원가입 버튼이 활성화됩니다.

### 기술스택

**Langauge** : HTML, CSS, TypeScript  
**Framework** : Next.js

:memo: **package.json**

| 이름                | 버전    |
| :------------------ | :------ |
| @react-oauth/google | ^0.12.1 |
| jwt-decode          | ^4.0.0  |
| axios               | ^1.7.9  |
| firebase            | ^11.0.2 |
| zustand             | ^5.0.2  |
