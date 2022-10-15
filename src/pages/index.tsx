import * as React from 'react'
import type { HeadFC } from 'gatsby'

const IndexPage = () => {
  return (
    <main className="flex flex-col h-[100vh] px-20 py-6">
      <h1 className="mt-[30vh] text-6xl font-bold">我很小，但很快。</h1>
      <p className="text-base mt-3">
        接入你也许只需要一行代码。
        <label className="swap swap-flip text-xl top-2">
          <input type="checkbox" />
          <div className="swap-on">🚀</div>
          <div className="swap-off">✈️</div>
        </label>
      </p>

      <div className="mockup-code max-w-xl mt-12">
        <pre data-prefix="$">
          <code>{`fetch('http://example.com/movies.json')`}</code>
        </pre>
      </div>

      <p className="text-center text-sm text-slate-400 mt-auto">
        Copyright © 2022 - All right reserved by Message
      </p>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Message</title>
