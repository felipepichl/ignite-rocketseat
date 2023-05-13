import styles from './Post.module.css';

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <img 
            className={styles.avatar}
            src="https://github.com/felipepichl.png"   
          />
          <div className={styles.authorInfo}>
            <strong>Felipe Pichl</strong>
            <span>Manager</span>
          </div>
        </div>

        <time 
         title="11 de Maio de às 11h"
         dateTime=''>Publicado há 1h
        </time>

        <div className={styles.content}>
          Post content

        </div>
      </header>
    </article>
  )
}