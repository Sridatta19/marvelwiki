/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const comicTemplate = path.resolve(`src/templates/comic.js`)
  return graphql(`
    {
      allContentfulComic {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    result.data.allContentfulComic.edges.forEach(edge => {
      createPage({
        path: `/comics/${edge.node.slug}`,
        component: comicTemplate,
        context: {
          slug: edge.node.slug,
        },
      })
    })
  })
}
