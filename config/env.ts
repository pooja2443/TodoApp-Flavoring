import Constants from 'expo-constants';

// Get the environment from process.env.APP_ENV first, then fall back to Constants
const environment = process.env.APP_ENV || 
                   (Constants.expoConfig?.extra?.environment) || 
                   'development';

// Environment configuration
export const ENV = {
  // Access environment directly from Constants.expoConfig.extra
  environment: Constants.expoConfig?.extra?.environment || 'development',
  isDevelopment: function() { return this.environment === 'development'; },
  isProduction: function() { return this.environment === 'production'; }
};

console.log('Current environment:', ENV.environment);