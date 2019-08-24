import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import PropTypes from "prop-types"
import { FaTags } from "react-icons/fa"

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
  padding-bottom: 25px;
`

const Tags = styled.div`
  height: 22px;
  display: flex;
  align-items: center;

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

class Posts extends React.Component {
  render() {
    const { posts } = this.props
    return (
      <div>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <PostWrapper key={node.id}>
              <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                <PostTitle>{title}</PostTitle>
                <PostParagraph
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </Link>
              <Tags>
                <FaTags color="#bbbaba" />
                <ul>
                  {node.fields.tags.map(tag => (
                    <li key={tag}>
                      <Link to={`/tags/${tag}`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </Tags>
            </PostWrapper>
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
