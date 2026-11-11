/* MLI website: back-end settings. Loaded before the site, so this file can change without a rebuild.
   Full contract: API.md (endpoints, payloads, errors) and api/openapi.yaml. */
window.MLI_CONFIG = {
  /* 'mock': the site runs on built-in demo data in the browser (no server).
     'live': every call goes to baseUrl using the endpoint map in API.md. */
  mode: 'mock',

  baseUrl: '/api/v1',          // e.g. 'https://api.misrlife.com/v1'
  timeoutMs: 20000,
  authScheme: 'bearer',        // 'bearer' (token in Authorization header) or 'cookie' (HttpOnly session cookie)
  credentials: 'same-origin',  // set to 'include' when the API is on another origin and uses cookies
  headers: {},                 // extra headers on every call, e.g. { 'X-Channel': 'web' }

  /* Rename any path without touching the site, e.g. { 'auth.login': ['POST', '/customer/sign-in'] } */
  endpoints: {},

  /* Staged migration: in live mode, a call the back end answers with 501 not_mapped keeps working on the built-in demo
     data, so services can be switched on one at a time. Turn off for production. */
  mockFallback: false,

  /* Optional bridge for a non-REST back end such as the ePortal5 middleware (CallMW.aspx).
     transport(name, { body, params, token, lang, rest }) must resolve to the response shape in API.md.
     See api/adapters/eportal5.example.js. Leave null to use plain REST. */
  transport: null,

  googleClientId: '',          // Google Identity Services client ID; empty keeps Google sign-in in demo mode
  recaptchaSiteKey: '',        // reCAPTCHA v3 site key for public forms; empty turns it off

  payment: { returnPath: '#/buy/result' }  // the gateway sends the customer back here with ?order=<id>
};

/* Ready-made setups (copy one over the values above):
   1. Demo, no server:            { mode: 'mock' }
   2. Gateway on the same domain:  { mode: 'live', baseUrl: '/api/v1', authScheme: 'cookie', credentials: 'same-origin', mockFallback: true }
      (api/bff/server.js serves the site and the API together; this is the recommended set-up for UAT and production)
   3. Gateway on another domain:   { mode: 'live', baseUrl: 'https://api.misrlife.com/api/v1', authScheme: 'cookie', credentials: 'include' }
      (add the site origin to ALLOWED_ORIGINS on the gateway)
   4. Public reads straight from ePortal5, everything else through the gateway:
      load api/adapters/eportal5.example.js, then { mode: 'live', baseUrl: '/api/v1', authScheme: 'cookie', transport: MLI_EPORTAL5.transport } */
