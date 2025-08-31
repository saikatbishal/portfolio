import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Example from './src/App.portfolio'
import ErrorBoundary from '@kombai/react-error-boundary'
import './src/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
        <Example />
    </ErrorBoundary>
  </StrictMode>,
)