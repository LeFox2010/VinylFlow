export interface SpotifyTokenResponse { access_token: string; token_type: "Bearer"; scope?: string; expires_in: number; refresh_token?: string; }
export interface SpotifySession { accessToken: string; refreshToken: string; expiresAt: number; scope: string; }
export interface SpotifyApiError { error?: { status?: number; message?: string }; }
