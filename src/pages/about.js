import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class AboutPage extends React.Component {
  render() {
    const resume = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={resume.frontmatter.title}
          description={resume.frontmatter.description || resume.excerpt}
        />
        <div dangerouslySetInnerHTML={{ __html: resume.html }} />
      </Layout>
    )
  }
}

export default AboutPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { type: { eq: "resume" } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
      }
    }
  }
`
