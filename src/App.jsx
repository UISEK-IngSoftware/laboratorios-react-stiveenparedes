import { Container } from '@mui/material'
import Header from './components/Header'

import PokemonList from './pages/PokemonList'
import PokemonForm from './pages/PokemonForm'
import PokemonDetail from "./pages/PokemonDetail"

import TrainerList from "./pages/TrainerList"
import TrainerForm from "./pages/TrainerForm"
import TrainerDetail from "./pages/TrainerDetail"

import LoginPage from './pages/LoginPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <>
      <Container>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Pokemons */}
            <Route path="/" element={<PokemonList />} />
            <Route path="/add-pokemon" element={<PokemonForm />} />
            <Route path="/edit-pokemon/:id" element={<PokemonForm />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />

            {/* Trainers */}
            <Route path="/trainers" element={<TrainerList />} />
            <Route path="/add-trainer" element={<TrainerForm />} />
            <Route path="/edit-trainer/:id" element={<TrainerForm />} />
            <Route path="/trainer/:id" element={<TrainerDetail />} />

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  )
}

export default App
