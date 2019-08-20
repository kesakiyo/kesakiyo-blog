import React from "react"
import styled from "styled-components"

import GlobalNav from "./global-nav"

const Main = styled.main`
  max-width: 940px;
  margin: 50px auto;
  background-color: white;
`

const Footer = styled.footer`
  max-width: 940px;
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
  justify-content: center;
`

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <GlobalNav />
        <Main>{children}</Main>
        <Footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </Footer>
      </div>
    )
  }
}

export default Layout
