import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"

const PostWrapper = styled.div`
  padding: 20px 50px;
  border-bottom: 1px solid #e6e6e6;
`

const PostTitle = styled.h3`
  margin: 0;
  font-size: 26px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 400;
  color: #1e1e1e;
`

const PostParagraph = styled.p`
  margin-top: 22px;
  font-size: 14px;
  line-height: 24px;
  display: block;
  max-height: 48px;
  color: #505050;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
`

class Posts extends React.Component {
  render() {
    const { posts } = this.props
    return (
      <div>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <Link
              style={{ boxShadow: `none` }}
              to={node.fields.slug}
              key={node.id}
            >
              <PostWrapper key={node.fields.slug}>
                <PostTitle>{title}</PostTitle>
                <PostParagraph
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </PostWrapper>
            </Link>
          )
        })}
      </div>
    )
  }
}

Posts.defaultProps = {
  posts: [],
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export default Posts
