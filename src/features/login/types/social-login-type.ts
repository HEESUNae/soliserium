export interface KakaoAuthResponse {
  access_token: string;
  connected_at: string;
  id: number;
  kakao_account: {
    profile?: {
      is_default_image: boolean;
      is_default_nickname: boolean;
      nickname: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };
    profile_image_needs_agreement: boolean;
    profile_nickname_needs_agreement: boolean;
  };
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
}

export interface NaverLoginOptions {
  clientId: string;
  callbackUrl: string;
  isPopup?: boolean;
  loginButton?: {
    color?: string;
    type?: number;
    height?: string | number;
  };
  callbackHandle?: boolean;
}

export interface NaverLogin {
  new (options: NaverLoginOptions): this;
  init(): void;
  getLoginStatus(callback: (status: boolean) => void): void;
  logout(): void;
  accessToken: { accessToken: string };
  user: {
    age: undefined;
    birthday: undefined;
    birthyear: undefined;
    email: string;
    gender: undefined;
    id: string;
    mobile: undefined;
    name: string;
    nickname: string;
    profile_image: string;
  };
}

declare global {
  interface Window {
    Kakao: {
      init(key: string): void;
      isInitialized(): boolean;
      Auth: {
        authorize(options: { redirectUri: string }): void;
        login(options: { success: (data: KakaoAuthResponse) => Promise<void>; fail: (error: unknown) => void }): void;
        logout(callback?: () => void): Promise<void>;
        getAccessToken(): string | null;
        setAccessToken(token: string): void;
      };
      API: {
        request: (options: { url: string }) => Promise<KakaoAuthResponse>;
      };
    };
    naver: {
      LoginWithNaverId: NaverLogin;
    };
  }
}
