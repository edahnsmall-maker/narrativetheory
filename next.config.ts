import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  // There's a stray package-lock.json in the user folder; without this, Turbopack
  // treats the whole user folder as the project root and dev chunks fail to load.
  turbopack: { root: path.resolve(process.cwd()) },
  outputFileTracingRoot: path.resolve(process.cwd()),
}

export default nextConfig
