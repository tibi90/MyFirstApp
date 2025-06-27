const fs = require('fs');
const path = require('path');

// Simple bundle creation for testing
const indexJs = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
const appTsx = fs.readFileSync(path.join(__dirname, 'App.tsx'), 'utf8');

// Create a minimal bundle
const bundle = `
var __DEV__ = false;

// React Native polyfills
global.ErrorUtils = {
  setGlobalHandler: () => {},
  getGlobalHandler: () => {},
};

// Basic require implementation
var modules = {};
var require = function(id) {
  if (modules[id]) {
    return modules[id].exports;
  }
  var module = { exports: {} };
  modules[id] = module;
  return module.exports;
};

// Register React
modules['react'] = { exports: {
  default: { createElement: () => {}, Component: class {} },
  useEffect: () => {},
}};

// Register React Native
modules['react-native'] = { exports: {
  AppRegistry: {
    registerComponent: (name, getComponent) => {
      console.log('Registered component:', name);
      // This would normally start the app
    }
  },
  View: {},
  Text: {},
  SafeAreaView: {},
  StyleSheet: { create: (s) => s },
}};

// App code
${appTsx.replace(/import.*from.*;/g, '')}

// Index.js
${indexJs.replace(/import.*from.*;/g, '')}
`;

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, 'android/app/src/main/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Write the bundle
fs.writeFileSync(path.join(assetsDir, 'index.android.bundle'), bundle);
console.log('Bundle created at:', path.join(assetsDir, 'index.android.bundle'));