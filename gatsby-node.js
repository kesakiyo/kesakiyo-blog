const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve("./src/templates/blog-post.js")
  const tags = path.resolve("./src/templates/tags.js")
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                tags
              }
              frontmatter {
                type
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges.filter(edge => {
    const type = edge.node.frontmatter.type
    return type === "blog"
  })

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  posts
    .reduce((acc, post) => [...acc, ...post.node.fields.tags], [])
    .filter((tag, idx, self) => self.indexOf(tag) === idx)
    .forEach(tag => {
      createPage({
        path: `tags/${tag}`,
        component: tags,
        context: {
          tag,
        },
      })
    })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = (() => {
      if (node.frontmatter.path) {
        return node.frontmatter.path
      }
      return createFilePath({ node, getNode })
    })()
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })

    const tags = (() => {
      if (typeof node.frontmatter.tags !== "string") {
        return []
      }
      return node.frontmatter.tags.split(/\W+/g)
    })()
    createNodeField({
      node,
      name: "tags",
      value: tags,
    })
  }
}
