module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // react-native-reanimated/plugin must always be listed last.
    plugins: ['@babel/plugin-transform-class-static-block', 'react-native-reanimated/plugin'],
  };
};