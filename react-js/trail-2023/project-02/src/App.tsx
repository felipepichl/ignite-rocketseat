import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../src/styles/theme/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Dark side of the moon</h1>
    </ThemeProvider>
  )
}

export default App
