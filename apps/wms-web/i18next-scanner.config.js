module.exports = {
  input: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    // Use ! to filter out files or directories
    "!app/**/*.test.{ts,tsx}",
  ],
  output: "./locales",
  options: {
    debug: true,
    func: {
      list: ["t"],
      extensions: [".ts", ".tsx"],
    },
    trans: false,
    lngs: ["en", "vi"],
    defaultLng: "en",
    defaultNs: "common",
    defaultValue: function (lng, ns, key) {
      return key;
    },
    removeUnusedKeys: false,
    resource: {
      loadPath: "locales/{{lng}}.json",
      savePath: "{{lng}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
};
