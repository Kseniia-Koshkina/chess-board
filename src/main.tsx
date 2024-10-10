import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ChessBoard from './ChessBoard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChessBoard/>
  </StrictMode>,
)
