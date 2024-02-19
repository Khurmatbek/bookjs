import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './Context/UserContext.jsx'
import { TokenProvider } from './Context/TokenContext.jsx'
import { AuthorProvider } from './Context/AuthorContext.jsx'
import { BookProvider } from './Context/BookContext.jsx'
import { MeProvider } from './Context/MeContext.jsx'
import { DarkProvider } from './Context/DarkContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <TokenProvider>
        <AuthorProvider>
          <BookProvider>
            <MeProvider>
              <DarkProvider>
                <App />
              </DarkProvider>
            </MeProvider>
          </BookProvider>
        </AuthorProvider>
      </TokenProvider>
    </UserProvider>
  </BrowserRouter>
)
