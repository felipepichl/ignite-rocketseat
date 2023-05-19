import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

export function Post({ author, publishedAt }) {
  const publishedDateFormatted = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
  }).format(publishedAt)

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.authorUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time 
         title="11 de Maio de às 11h"
         dateTime=''
        >
          {publishedDateFormatted}
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

      <div className={styles.commentList}>
        <Comment />
      </div>
    
    </article>
  )
}