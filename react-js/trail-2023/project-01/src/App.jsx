import { Post } from "./Post"
import { Header } from "./components/Header"

export function App() {
  return (
    <>
      <Header />
      <Post
        author="Felipe Pichl"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, officiis quo maiores eaque inventore vero laborum! Repellendus dolor provident porro eum omnis, fuga fugit autem veritatis cum modi molestiae fugiat!"
      />
    </>
  )
}


