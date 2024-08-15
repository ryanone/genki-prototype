import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import commonStyles from '@/styles/common.module.css';
import styles from './RootBoundary.module.css';

export default function RootBoundary() {
  const error = useRouteError();

  if (
    isRouteErrorResponse(error) ||
    (error as Error).message === 'Book loader error'
  ) {
    return (
      <div className={styles.rootBoundary}>
        <h1>404 Not Found</h1>
        <p>Sorry, the page you are looking for cannot be found.</p>
        <p>お探しのページは見つかりませんでした。</p>
        <div className={styles.actions}>
          <Link to="/" className={`${styles.button} ${commonStyles.button}`}>
            Return to the Index / TOPページに戻る
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.rootBoundary}>
      <h1>Error</h1>
      <p>
        Sorry an error occurred in loading the page. Please try and reload the
        page or return to the Index page using the link below.
      </p>
      <p>
        申し訳ございませんが、ページの読み込み中にエラーが発生しました。ページを再読み込みするか、以下のリンクを使用してTOPページに戻ってください。
      </p>
      <div className={styles.actions}>
        <Link to="/" className={`${styles.button} ${commonStyles.button}`}>
          Return to the Index / TOPページに戻る
        </Link>
      </div>
    </div>
  );
}
