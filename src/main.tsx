import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/ChessBoardStyles.css"
import Board from './components/Board.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Board/>
  </StrictMode>,
)
