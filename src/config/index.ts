const config = {
  appName: `${process.env.NEXT_PUBLIC_APP_NAME || ''}`,
  apiBaseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}`,
  jwtSecret: `${process.env.JWT_SECRET || ''}`,
  clientId: `${process.env.NEXT_PUBLIC_API_CLIENT_ID || ''}`,
  recordPerPage: +(process.env.NEXT_PUBLIC_DEFAULT_RECORD_PER_PAGE || 25),
  enviroment: process.env.NODE_ENV || 'development',
};
export default config;


