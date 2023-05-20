import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css';

export function Post({ author, publishedAt }) {
  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  })

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
         title={publishedDateFormatted}
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