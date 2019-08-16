import React from "react"

import GlobalNav from "./global-nav"

class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <GlobalNav />
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    )
  }
}

export default Layout
