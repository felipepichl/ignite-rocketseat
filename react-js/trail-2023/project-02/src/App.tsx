import {ThemeProvider} from 'styled-components'
import { defaultTheme } from '../src/styles/themes/detault'

export function App() {  
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Hello World</h1>
    </ThemeProvider>
  )
}
