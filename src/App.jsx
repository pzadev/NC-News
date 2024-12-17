import './App.css'
import { Route } from 'react-router'
import { Routes } from 'react-router'
import Header from './Components/Header'
import Nav from './Components/Nav'
import Articles from './Components/Articles'
import SingleArticle from './Components/SingleArticle'

function App() {
 

  return (
    <>
    <Header/>
    <Nav/>
    <Routes>
    <Route path="/" element={<Articles />} />
    <Route path="/articles" element={<Articles />} />
    <Route path="/articles/:article_id" element={<SingleArticle />} />
    </Routes>
    </>
  )
}

export default App
