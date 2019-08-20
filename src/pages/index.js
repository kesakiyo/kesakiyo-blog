import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const PostsWrapper = styled.div`
  max-width: 940px;
  margin: 50px auto;
  padding: 20px 50px 50px 50px;
  background-color: white;

  @media only screen and (max-width: 720px) {
    padding: 10px 20px;
  }
`

const PostWrapper = styled.div`
  padding: 20px 50px;
  border-bottom: 1px solid #e6e6e6;
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <PostsWrapper>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                <PostWrapper key={node.fields.slug}>
                  <h3>{title}</h3>
                  <small>{node.frontmatter.date}</small>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </PostWrapper>
              </Link>
            )
          })}
        </PostsWrapper>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "blog" } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
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
