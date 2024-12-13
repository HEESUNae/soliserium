'use client';

import { useUserAuthStore } from '@/entities';
import { Button } from '@/shared';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from 'next/image';
import styles from './google-btn.module.css';

export const GoogleBtn = () => {
  // const router = useRouter();
  const { setUserAuth } = useUserAuthStore();

  // const googleLogin = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithRedirect(auth, provider);
  // };

  // useEffect(() => {
  //   getRedirectResult(auth)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access Google APIs.
  //       const credential = GoogleAuthProvider.credentialFromResult(result!);
  //       const token = credential?.accessToken;

  //       // The signed-in user info.
  //       const user = result?.user;
  //       console.log(token, user);
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       // const errorCode = error.code;
  //       // const errorMessage = error.message;
  //       // The email of the user's account used.
  //       // const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      const token = res.access_token;
      console.log('res', res);

      // const url = `https://accounts.google.com/o/oauth2/v2/auth?
      // scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly%20https%3A//www.googleapis.com/auth/calendar.readonly&
      // include_granted_scopes=true&
      // response_type=${token}&
      // state=state_parameter_passthrough_value&
      // redirect_uri=${process.env.NODE_ENV === 'development' ? 'http://localhost:3000/login' : 'https://soliserium.vercel.app/login'}&
      // client_id=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`;

      const result = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
          // redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/login' : 'https://soliserium.vercel.app/login',
        },
      });

      if (result) {
        const userData = {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          photoURL: result.data.picture,
          providerId: 'google',
        };
        setUserAuth(userData);
      }
      console.log('userInfoResponse', result); // 개인정보 확인가능
    },
    onError: () => {
      console.log('Login Failed');
    },
    flow: 'implicit',
  });

  return (
    <Button onClick={googleLogin}>
      <div className={styles.googleLoginBtn}>
        <Image src="/icons/logo-google.svg" alt="" width={24} height={24} />
        <p>Sign in width Google</p>
      </div>
    </Button>
  );
};
