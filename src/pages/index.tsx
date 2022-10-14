import * as React from 'react'
import type { HeadFC } from 'gatsby'

const IndexPage = () => {
  return (
    <main className="flex flex-col justify-center h-[100vh] p-20">
      <h1 className="text-6xl font-bold">我很小，但很快。</h1>
      <p className="text-base mt-6">接入你也许只需要一行代码。🚀</p>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
