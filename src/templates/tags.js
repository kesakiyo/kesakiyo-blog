import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class TagsTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        {posts.map(post => (
          <div key={post.node.id}>{post.node.id}</div>
        ))}
      </Layout>
    )
  }
}

export default TagsTemplate

export const tagsQuery = graphql`
  query PostsByTag($tag: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(filter: { fields: { tags: { in: [$tag] } } }) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
