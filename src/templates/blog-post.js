import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import { FaTags } from "react-icons/fa"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogWrapper = styled.div`
  padding: 0 30px;
`

const Title = styled.h1`
  font-size: 34px;
  color: #434a53;
  padding-bottom: 20px;
  font-weight: 500;
  margin: 0;
`

const Tags = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  padding-bottom: 50px;

  ul {
    height: 22px;

    li {
      display: inline-block;
      padding: 0 7px;
      color: #999999;
      font-size: 14px;

      &:hover {
        cursor: pointer;
        color: #5f5e5e;
      }
    }
  }
`

const MarkdownWrapper = styled.div`
  color: #555;

  a {
    color: #0687f0;
    text-decoration: none;
    box-shadow: none;
  }

  p {
    font-size: 16px;
    line-height: 29px;
    margin: 0;
    padding: 0 0 30px 0;
  }

  h2 {
    font-size: 26px;
    color: #434a53;
    padding-top: 10px;
    padding-bottom: 20px;
    margin: 0;
    font-weight: 500;
  }

  h3 {
    font-size: 23px;
    color: #434a53;
    padding-top: 10px;
    padding-bottom: 20px;
    font-weight: 500;
  }

  h4,
  h5,
  h6 {
    font-size: 20px;
    color: #434a53;
    padding-top: 10px;
    padding-bottom: 20px;
    font-weight: 500;
  }

  blockquote {
    border-left: 5px solid #f0f0f0;
    padding-left: 20px;
    margin: 0 0 50px 0;

    p {
      font-size: 15px;
      color: #666;
      padding-bottom: 15px;
    }
  }

  ul,
  ol {
    list-style: disc;
    padding: 0 0 0 45px;
    margin-bottom: 23px;

    li {
      line-height: 24px;
      border: 0 none;
      font-size: 16px;
      margin-bottom: 10px;

      p {
        padding-bottom: 15px;
      }
    }
  }
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <BlogWrapper>
          <Title>{post.frontmatter.title}</Title>
          <Tags>
            <FaTags color="#bbbaba" />
            <ul>
              {post.fields.tags.map(tag => (
                <li key={tag}>
                  <Link to={`/tags/${tag}`}>{tag}</Link>
                </li>
              ))}
            </ul>
          </Tags>
          <MarkdownWrapper dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr />
          <Bio />
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </BlogWrapper>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
      fields {
        tags
      }
    }
  }
`
