import React, { useState } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Image from "gatsby-image"
import { FaBars } from "react-icons/fa"
import classNames from "classnames"

const Nav = styled.nav`
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e6e6e6;
  background-color: white;

  .fa-bars {
    display: none;
    cursor: pointer;
  }

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

  @media only screen and (max-width: 720px) {
    height: 50px;

    .fa-bars {
      position: absolute;
      top: 50%;
      left: 20px;
      display: block;
      transform: translateY(-50%);
    }

    .profile {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .profile-thumb {
        display: none !important;
      }
    }

    ul {
      position: absolute;
      top: 51px;
      left: 0;
      right: 0;
      margin: 0;
      padding: 0;
      background-color: white;
      border-bottom: 1px solid #e6e6e6;
      display: none;

      &.show {
        display: block;
      }

      li {
        position: relative;
        height: 50px;
        display: block;
        text-align: center;

        .link {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;

          &.active {
            border-bottom: none;
            background-color: #f4f4f4;
          }
        }
      }
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

  const [showMenuList, setShowMenuList] = useState(false)

  return (
    <Nav>
      <FaBars
        className="fa-bars"
        size="1.2em"
        onClick={() => setShowMenuList(!showMenuList)}
      />
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
      <ul
        className={classNames({
          show: showMenuList,
        })}
      >
        <li>
          <Link className="link" to="/" activeClassName="active">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/algorithm" activeClassName="active">
            Algorithm
          </Link>
        </li>
        <li>
          <Link className="link" to="/dev" activeClassName="active">
            Dev
          </Link>
        </li>
        <li>
          <Link className="link" to="/about" activeClassName="active">
            About
          </Link>
        </li>
      </ul>
    </Nav>
  )
}

export default GlobalNav
