import { Link, routes } from '@redwoodjs/router'
import './MainLayout.css'
import { Container } from 'semantic-ui-react'

const MainLayout = ({ children }) => {
  return (
    <Container id='MainLayout'>
      <header>
        <h1>Emoji Stories</h1>
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
              <Link to={routes.games()}>Games</Link>
              <Link to={routes.about()}>About</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </Container>
  )
}

export default MainLayout
