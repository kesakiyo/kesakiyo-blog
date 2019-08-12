import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class ChangelogTemplate extends React.Component {
  render() {
    const changelog = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={changelog.frontmatter.title}
          description={changelog.frontmatter.description || changelog.excerpt}
        />
        <div dangerouslySetInnerHTML={{ __html: changelog.html }} />
      </Layout>
    )
  }
}

export default ChangelogTemplate

export const pageQuery = graphql`
  query ChangelogBySlug {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: "changelog" } }) {
      excerpt(pruneLength: 160)
      frontmatter {
        title
      }
      html
    }
  }
`
