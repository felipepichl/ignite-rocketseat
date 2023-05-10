import { Post } from "./Post";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import styles from './App.module.css';

import './styles/global.css';

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
        <Post
          author="Felipe Pichl"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, officiis quo maiores eaque inventore vero laborum! Repellendus dolor provident porro eum omnis, fuga fugit autem veritatis cum modi molestiae fugiat!"
        />
        </main>
      </div>
    </div>
  )
}


