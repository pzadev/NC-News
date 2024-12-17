import './App.css'
import { Route } from 'react-router'
import { Routes } from 'react-router'
import Header from './Components/Header'
import Nav from './Components/Nav'
import Articles from './Components/Articles'
import SingleArticle from './Components/SingleArticle'
import User from './Components/User'
import UserProvider from './Components/UserContext'

function App() {
 

  return (
    <>
    <UserProvider>
    <Header/>
    <Nav/>
    <Routes>
    <Route path="/" element={<Articles />} />
    <Route path="/articles" element={<Articles />} />
    <Route path="/user" element={<User />} />
    <Route path="/articles/:article_id" element={<SingleArticle />} />
    </Routes>
    </UserProvider>
    </>
  )
}

export default App
