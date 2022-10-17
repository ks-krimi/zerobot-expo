const { getDefaultConfig } = require('expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)

defaultConfig.resolver.assetExts = [...defaultConfig.resolver.assetExts, 'riv']

module.exports = defaultConfig
