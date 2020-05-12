import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import { motion, AnimatePresence } from "framer-motion"

const Comic = ({ data }) => {
  return (
    <Layout title="data.contentfulComic.title">
      <AnimatePresence>
        <div id="get" className="mt-4 pl-12 w-full md:w-3/5 relative">
          <Link to="/">
            <motion.img
              id="logo"
              animate
              layoutId={data.contentfulComic.id}
              className="object-scale-down text-left h-auto w-full"
              src={data.contentfulComic.image.file.url}
              alt="Avengers"
              initial="full"
            ></motion.img>
          </Link>
          <div className="mt-8 overflow-y-scroll">
            {documentToReactComponents(data.contentfulComic.description.json, {
              renderNode: {
                [BLOCKS.HEADING_3]: (node, children) => (
                  <h2 className="text-xl font-semibold pb-4">{children}</h2>
                ),
                [BLOCKS.PARAGRAPH]: (node, children) => (
                  <p className="text-sm font-medium pb-4">{children}</p>
                ),
              },
            })}
          </div>
        </div>
        <div
          id="get1"
          className="w-full md:w-2/5 relative pl-12 overflow-hidden"
        >
          <div
            className="flex flex-col justify-around"
            style={{ minHeight: "320px" }}
          >
            <h1 className="text-4xl">{data.contentfulComic.title}</h1>
            <div>
              <p className="text-gray-900 font-semibold text-sm">Writer</p>
              <span className="text-gray-700">
                {data.contentfulComic.writer}
              </span>
            </div>
            <div>
              <p className="text-gray-900 font-semibold text-sm">Artists</p>
              <span className="text-gray-700">
                {data.contentfulComic.artists}
              </span>
            </div>
            <div>
              <p className="text-gray-900 font-semibold text-sm">Published</p>
              <span className="text-gray-700">
                {data.contentfulComic.published}
              </span>
            </div>
          </div>
        </div>
      </AnimatePresence>
    </Layout>
  )
}

export const query = graphql`
  query comicQuery($slug: String!) {
    contentfulComic(slug: { eq: $slug }) {
      id
      title
      slug
      published(fromNow: true)
      writer
      description {
        json
        description
      }
      artists
      image {
        file {
          url
        }
      }
    }
  }
`
export default Comic
