import React from "react"
import Img from "gatsby-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import { motion, AnimatePresence } from "framer-motion"

const Comic = ({ comic, closeDialog }) => {
  if (comic == null) {
    return null
  }
  return (
    <AnimatePresence>
      <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
        <div
          onClick={closeDialog}
          className="fixed inset-0 transition-opacity overflow-hidden"
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          className="bg-white overflow-y-scroll rounded-lg px-4 pt-5 pb-4 shadow-xl transform transition-all sm:max-w-2xl sm:w-full sm:p-6 w-full lg:max-w-4xl lg:flex z-10 max-h-modal"
          role="dialog"
          onClick={closeDialog}
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <motion.div layoutId={comic.id}>
            <Img
              className="h-64 lg:h-auto lg:w-64 bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              imgStyle={{
                objectFit: "cover",
                width: "52rem",
              }}
              fluid={comic.image.fluid}
            />
          </motion.div>
          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-2">
              <p className="text-sm text-gray-600">
                {`Published: ${comic.published}`}
              </p>
              <h1 className="text-gray-900 font-mont text-2xl mb-2 text-blue-1000">
                {comic.title}
              </h1>
              {documentToReactComponents(comic.description.json, {
                renderNode: {
                  [BLOCKS.HEADING_3]: (node, children) => (
                    <h2 className="text-xl font-semibold pb-4">{children}</h2>
                  ),
                  [BLOCKS.HEADING_4]: (node, children) => (
                    <h2 className="font-semibold pb-2">{children}</h2>
                  ),
                  [BLOCKS.PARAGRAPH]: (node, children) => (
                    <p className="text-gray-700 text-base pb-2 break-all">
                      {children}
                    </p>
                  ),
                },
              })}
            </div>
            <div className="mb-4">
              <p className="text-gray-900 font-mont text-sm">Writers</p>
              <span className="text-gray-700">{comic.writer}</span>
            </div>
            <div>
              <p className="text-gray-900 font-mont text-sm">Artists</p>
              <span className="text-gray-700">{comic.artists}</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default Comic
