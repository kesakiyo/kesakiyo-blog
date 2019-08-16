import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Image from "gatsby-image"

const Nav = styled.nav`
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e6e6e6;

  .profile {
    position: absolute;
    left: 20px;
    top: 50%;
    height: 40px;
    display: flex;
    align-items: center;
    transform: translateY(-50%);

    span {
      margin-left: 7px;
      font-size: 17px;
      font-weight: bold;
    }
  }

  li {
    display: inline-block;
    list-style: none;
    color: #a0a0a0;
    font-size: 16px;
    padding: 0 16px;

    .active {
      color: #000;
      border-bottom: 2px solid #9f5afd;
    }
  }
`

const GlobalNav = () => {
  const data = useStaticQuery(graphql`
    query GlobalNavQuery {
      avatar: file(absolutePath: { regex: "/profile-thumb.png/" }) {
        childImageSharp {
          fixed(width: 40, height: 40) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Nav>
      <Link to="/">
        <div className="profile">
          <Image
            className="profile-thumb"
            fixed={data.avatar.childImageSharp.fixed}
            style={{
              minWidth: 40,
              borderRadius: `100%`,
            }}
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
          <span className="nickname">kesakiyo</span>
        </div>
      </Link>
      <ul>
        <li>
          <Link to="/" activeClassName="active">
            Home
          </Link>
        </li>
        <li>
          <Link to="/algorithm" activeClassName="active">
            Algorithm
          </Link>
        </li>
        <li>
          <Link to="/dev" activeClassName="active">
            Dev
          </Link>
        </li>
        <li>
          <Link to="/about" activeClassName="active">
            About
          </Link>
        </li>
      </ul>
    </Nav>
  )
}

export default GlobalNav
