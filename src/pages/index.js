import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import { motion, useAnimation } from "framer-motion"
import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

import Layout from "../components/layout"

const IndexPage = ({ data: { allContentfulGroup } }) => {
  const [selectedComic, setComic] = useState(null)
  const [selectedMember, setMember] = useState(null)
  const controls = useAnimation()
  const memberControls = useAnimation()
  const [once, setOnce] = useState(false)
  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y < -5 && !once) {
      controls.start("half")
      setOnce(true)
    }
  }, [])
  useEffect(() => {
    memberControls.start(i => ({
      opacity: 1,
      x: 0,
      transition: { type: "spring", delay: i * 0.2, duration: 2 },
    }))
  }, [])
  const {
    edges: [{ node }],
  } = allContentfulGroup
  const variants = {
    half: { maxHeight: "300px", transition: { duration: 1 } },
    full: { maxHeight: "720px" },
  }
  const closeDialog = () => {
    setComic(null)
    setMember(null)
  }
  return (
    <Layout
      title="Home"
      closeDialog={closeDialog}
      selectedComic={selectedComic}
      selectedMember={selectedMember}
    >
      <>
        <div
          id="get"
          className="mt-4 pl-12 w-full md:w-3/5 relative"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            animate={{ rotateY: 0 }}
            style={{ originX: 0, originY: 0.5 }}
            transition={{
              from: 90,
              duration: 2,
              ease: [0.04, 0, 0, 0.91],
            }}
          >
            <motion.img
              id="logo"
              className="object-scale-down text-left h-auto w-full"
              src={node.image.file.url}
              alt="Avengers"
              initial="full"
              variants={variants}
              animate={controls}
            ></motion.img>
          </motion.div>
          <div className="mt-8 overflow-y-scroll">
            {documentToReactComponents(node.history.json, {
              renderNode: {
                [BLOCKS.HEADING_3]: (node, children) => (
                  <h2 className="text-xl font-semibold pb-4">{children}</h2>
                ),
                [BLOCKS.PARAGRAPH]: (node, children) => (
                  <p className="text-sm font-medium pb-4">{children}</p>
                ),
              },
            })}
            <h2 className="text-3xl font-mont pb-4">Explore</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {node.comics.map((comic, i) => {
                return (
                  <motion.div
                    key={`${comic.id}-${i}`}
                    onClick={() => setComic(comic)}
                    layoutId={comic.id}
                    className="flex flex-col"
                  >
                    <Img
                      className="object-cover w-40 h-40"
                      fluid={comic.image.fluid}
                    />
                    <p className="text-xs text-gray-900 font-semibold text-sm">
                      {comic.title}
                    </p>
                    <span className="text-xs text-gray-700">
                      {comic.writer}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 pl-12 relative">
          <div
            className="flex flex-col justify-around"
            style={{ minHeight: "640px" }}
          >
            <h1 className="text-5xl font-mont">Avengers</h1>
            <div className="mb-4">
              <p className="text-gray-900 font-mont text-sm">
                Base of Operations
              </p>
              <span className="text-gray-700">{node.baseOfOperations}</span>
            </div>
            <div className="mb-4">
              <p className="text-gray-900 font-mont text-sm">Slogan</p>
              <span className="text-gray-700">Avengers Assemble !!!</span>
            </div>
            <div className="mb-4">
              <p className="text-gray-900 font-mont text-sm">
                Place of formation
              </p>
              <span className="text-gray-700">Detroit, Michigan</span>
            </div>
            <div className="mb-4">
              <p className="text-gray-900 font-mont text-sm">Creators</p>
              <span className="text-gray-700">Stan Lee, Jack Kirby</span>
            </div>
            <div className="mb-4">
              <p className="text-gray-900 font-mont text-sm">
                First Appearance
              </p>
              <span className="text-gray-700">Avengers #1 (1963)</span>
            </div>
            <div>
              <p className="text-gray-900 text-lg font-mont">Members</p>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {node.members.map((member, i) => (
                  <motion.div
                    key={member.id}
                    custom={i}
                    layoutId={member.id}
                    style={{ opacity: 0 }}
                    initial={{ x: -200, opacity: 0 }}
                    onClick={() => setMember(member)}
                    animate={memberControls}
                    className="flex flex-col"
                  >
                    <Img
                      className="object-cover w-24 h-24"
                      fluid={member.avatar.fluid}
                    />
                    <span className="text-xs font-medium text-gray-700 work-break">
                      {member.fullName}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allContentfulGroup {
      edges {
        node {
          id
          title
          history {
            history
            json
          }
          baseOfOperations
          image {
            file {
              url
            }
          }
          members {
            id
            fullName
            gender
            powers
            groupAffiliation
            bio {
              bio
              json
            }
            avatar {
              fluid(maxWidth: 800) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
          comics {
            id
            title
            slug
            writer
            published(fromNow: true)
            description {
              json
              description
            }
            artists
            image {
              fluid(maxWidth: 800) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
