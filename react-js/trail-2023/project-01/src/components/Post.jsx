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
      </header>
      <div className={styles.content}>
        <p>Post content</p>

        <p> <a href="#">https://github.com/felipepichl</a> </p>

        <p> 
          <a href="#">#newproject</a>{' '} 
          <a href="#">#nlw</a>{' '} 
          <a href="#">#dreamsacpe</a> 
        </p>

      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea 
          placeholder='Deixe um cmentário'
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>
    
    </article>
  )
}