export default {
  preset: 'ts-jest', // 使用 ts-jest 处理 TypeScript
  testEnvironment: 'jsdom', // 浏览器环境模拟（测试 React 组件需要）
  moduleNameMapper: {
    // 处理 Webpack 别名（与 tsconfig.json 的 paths 对应）
    '^@/(.*)$': '<rootDir>/src/$1',
    // 模拟静态资源（如 CSS、图片）
    '\\.(css|less|scss|png)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'], // 测试初始化脚本
  collectCoverageFrom: ['src/**/*.{ts,tsx}'], // 收集测试覆盖率
  coveragePathIgnorePatterns: ['/node_modules/', 'index.ts'] // 忽略覆盖率统计的文件
};