/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { AnimateSharedLayout } from "framer-motion"

import SEO from "./seo"
import Comic from "./comicDialog"
import Member from "./memberDialog"

const Layout = ({
  title,
  children,
  selectedComic,
  closeDialog,
  selectedMember,
}) => {
  return (
    <>
      <AnimateSharedLayout type="crossfade">
        <div className="px-4 lg:px-20 xl:px-32 py-4 flex flex-col-reverse md:flex-row overflow-hidden">
          {children}
          {selectedComic !== null && (
            <Comic closeDialog={closeDialog} comic={selectedComic} />
          )}
          {selectedMember !== null && (
            <Member closeDialog={closeDialog} member={selectedMember} />
          )}
        </div>
      </AnimateSharedLayout>
      <SEO title={title} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
