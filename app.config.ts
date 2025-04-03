type AppEnvironment = 'development' | 'production';

const appEnv = (process.env.APP_ENV || 'development') as AppEnvironment;

const baseConfig = {
  name: "TodoTask",
  slug: "todotask",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.yourdomain.todotask"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    package: "com.yourdomain.todotask"
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  plugins: [
    "expo-font",
    "expo-router"
  ],
  experiments: {
    tsconfigPaths: true
  },
  extra: {
    environment: appEnv,
  }
};

const envSpecificConfigs: Record<AppEnvironment, any> = {
  development: {
    name: "TodoTask Dev",
    android: {
      package: "com.yourdomain.todotask.dev"
    },
    ios: {
      bundleIdentifier: "com.yourdomain.todotask.dev"
    },
    extra: {
      apiUrl: "https://dev-api.yourdomain.com",
      eas: {
        projectId: "your-eas-project-id"
      }
    }
  },
  production: {
    name: "TodoTask Prod",
    android: {
      package: "com.yourdomain.todotask.prod"
    },
    extra: {
      apiUrl: "https://api.yourdomain.com",
      eas: {
        projectId: "your-eas-project-id"
      }
    }
  }
};

export default () => {
  console.log('Building config for environment:', appEnv);
  return {
    ...baseConfig,
    ...envSpecificConfigs[appEnv],
    extra: {
      ...baseConfig.extra,
      ...envSpecificConfigs[appEnv].extra,
    }
  };
};