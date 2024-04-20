module.exports = {
  devServer: {
    proxy: {
      // 把以/api开头的路由都指向http://localhost: 3001，即模拟后端
      '/api': 'http://localhost:3001 ',
    },
  },
}
