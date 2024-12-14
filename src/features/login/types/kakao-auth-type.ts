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
