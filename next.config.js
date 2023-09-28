const nextConfig = {
    transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
    reactStrictMode: true,
    images:{
      remotePatterns:[
        {
          protocol: "https",
          hostname: "*.googleusercontent.com",
          port: "",
          pathname: "**",
        },
      ],
    },
    webpack: (config) => {
      // this will override the experiments
      config.experiments = { ...config.experiments, topLevelAwait: true };
      // this will just update topLevelAwait property of config.experiments
      // config.experiments.topLevelAwait = true 
      return config;
    },
    experimental: { serverActions: true, },
  }
  
  module.exports = nextConfig