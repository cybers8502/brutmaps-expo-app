// plugins/disableUserScriptSandboxing.js
const {withXcodeProject} = require('expo/config-plugins');

/**
 * @param {import('expo/config').ExpoConfig} config
 * @param {{configurations?: string[], value?: 'YES'|'NO'}} [options]
 */
module.exports = function withDisableUserScriptSandboxing(
  config,
  {configurations = ['Debug'], value = 'NO'} = {},
) {
  return withXcodeProject(config, (cfg) => {
    const proj = cfg.modResults;
    const xc = proj.pbxXCBuildConfigurationSection();

    for (const key in xc) {
      const item = xc[key];
      if (!item || typeof item !== 'object') continue;

      const name = item.name || item.comment;
      if (!name) continue;

      if (configurations.some((c) => String(name).includes(c))) {
        item.buildSettings = item.buildSettings || {};
        item.buildSettings.ENABLE_USER_SCRIPT_SANDBOXING = value;
      }
    }
    return cfg;
  });
};
