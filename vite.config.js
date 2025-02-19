export default {
  esbuild: {
    loader: 'jsx',
  },
  server: {
    allowedHosts: "all",
    allowedHosts: [
      '05b0-103-185-109-206.ngrok-free.app', // Old host
      'bf71-103-185-109-206.ngrok-free.app',  // New host
      'e124-103-185-109-206.ngrok-free.app'
    ],
  },
  optimizeDeps: {
    esbuild: {
      loader: {
        '.js': 'jsx'
      }
    }
  }
}
