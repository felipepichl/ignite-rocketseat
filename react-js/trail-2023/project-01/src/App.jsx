import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Post } from "./components/Post";

import styles from './App.module.css';

import './styles/global.css';

const posts = [
  {
    id: 1,
    author: {
      authorUrl: 'https://github.com/felipepichl.png',
      role: 'Manager'
    },
    content: [
      { type: 'paragraph', content: 'Hello guys' },
      { type: 'paragraph', content: 'This is my new post about cool things' },
      { type: 'link', content: 'github.com/felipepichl' },
    ],
    publishedAt: new Date('2023-05-03 07:50:00')
  },
  {
    id: 2,
    author: {
      authorUrl: 'https://github.com/diego3g.png',
      role: 'CTO @ Rocketseat'
    },
    content: [
      { type: 'paragraph', content: 'Say my brother Dev' },
      { type: 'paragraph', content: 'Now you learn about ReactJS' },
      { type: 'link', content: 'github.com/diego3g' },
    ],
    publishedAt: new Date('2023-05-03 15:00:00')
  }
]

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Post />
          <Post />
        </main>
      </div>
    </div>
  )
}


