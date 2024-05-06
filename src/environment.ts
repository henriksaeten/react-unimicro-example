export const API_BASE_URL = 'https://test.unimicro.no/api/';

export const OIDC_CONFIG = {
    authority: 'https://test-login.softrig.com',
    client_id: 'd966c686-aeca-48e5-819c-3df26a7a5f03',
    scope: 'AppFramework openid profile',
    redirect_uri: 'http://127.0.0.1:5173',
    post_logout_redirect_uri: 'http://127.0.0.1:5173',
    silent_redirect_uri: location.origin,
};

