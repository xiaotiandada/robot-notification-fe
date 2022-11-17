import React, { FC } from 'react'
import type { HeadFC } from 'gatsby'
import { graphql } from 'gatsby'

type QueryData = {
  data: {
    allStrapiHomeSingle: {
      nodes: {
        id: string
        title: string
        description: string
      }[]
    }
  }
}

const IndexPage: FC<QueryData> = ({ data }) => {
  return (
    <main className="flex flex-col h-[100vh] px-20 py-6">
      <h1 className="mt-[30vh] text-6xl font-bold">
        {data.allStrapiHomeSingle.nodes[0].title}
      </h1>
      <div className="text-base mt-3">
        {data.allStrapiHomeSingle.nodes[0].description}
        <label className="swap swap-flip text-xl top-2">
          <input type="checkbox" />
          <div className="swap-on">🚀</div>
          <div className="swap-off">✈️</div>
        </label>
      </div>

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

export const query = graphql`
  query {
    allStrapiHomeSingle {
      nodes {
        id
        title
        description
      }
    }
  }
`

export default IndexPage

export const Head: HeadFC = () => <title>Message</title>
