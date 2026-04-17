import { Link } from 'react-router-dom';
import { BookOpen, Calendar, CheckCircle } from 'lucide-react';
import { useUserStore } from '@/stores/useUserStore';
import { Card, Badge, Button } from '@/components/common';
import { daysUntil, DUE_SOON_THRESHOLD_DAYS, isOverdue as checkOverdue } from '@/utils/date';
import { extractWorkId } from '@/utils/bookKey';
import styles from './MyLoans.module.css';

export function MyLoans() {
  const { loans } = useUserStore();

  const activeLoans = loans.filter((loan) => !loan.returned);
  const returnedLoans = loans.filter((loan) => loan.returned);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Loans</h1>

      {loans.length === 0 ? (
        <Card className={styles.emptyCard}>
          <div className={styles.empty}>
            <BookOpen size={48} className={styles.emptyIcon} />
            <h2>No loans yet</h2>
            <p>Browse the catalog to find books to borrow.</p>
            <Link to="/">
              <Button>Browse Catalog</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <>
          {activeLoans.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Active Loans ({activeLoans.length})</h2>
              <div className={styles.loansList}>
                {activeLoans.map((loan) => {
                  const days = daysUntil(loan.dueDate);
                  const overdue = checkOverdue(loan.dueDate);
                  const dueSoon = days <= DUE_SOON_THRESHOLD_DAYS && days >= 0;

                  return (
                    <Card key={loan.id} className={styles.loanCard}>
                      <div className={styles.loanContent}>
                        <div className={styles.loanInfo}>
                          <Link
                            to={`/book/${extractWorkId(loan.bookKey)}`}
                            className={styles.loanTitle}
                          >
                            {loan.title}
                          </Link>
                          <p className={styles.loanAuthor}>{loan.author}</p>
                          <div className={styles.loanMeta}>
                            <span className={styles.loanDate}>
                              <Calendar size={14} />
                              Borrowed {new Date(loan.borrowedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className={styles.loanStatus}>
                          <Badge
                            variant={overdue ? 'error' : dueSoon ? 'warning' : 'success'}
                          >
                            {overdue
                              ? `Overdue by ${Math.abs(days)} days`
                              : `Due in ${days} days`}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}

          {returnedLoans.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Returned Books ({returnedLoans.length})
              </h2>
              <div className={styles.loansList}>
                {returnedLoans.map((loan) => (
                  <Card key={loan.id} className={`${styles.loanCard} ${styles.returned}`}>
                    <div className={styles.loanContent}>
                      <div className={styles.loanInfo}>
                        <Link
                          to={`/book/${extractWorkId(loan.bookKey)}`}
                          className={styles.loanTitle}
                        >
                          {loan.title}
                        </Link>
                        <p className={styles.loanAuthor}>{loan.author}</p>
                      </div>
                      <Badge variant="default">
                        <CheckCircle size={14} />
                        Returned
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
