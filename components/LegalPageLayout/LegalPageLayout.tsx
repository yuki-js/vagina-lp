import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import styles from "./LegalPageLayout.module.css";
import { motion } from "framer-motion";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className={styles.root}>
      <Header />
      
      <main className={styles.container}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <header className={styles.pageHeader}>
            <h1 className={styles.title}>{title}</h1>
            {lastUpdated && (
              <p className={styles.lastUpdated}>Last Updated: {lastUpdated}</p>
            )}
            <div className={styles.divider} />
          </header>
          
          <div className={styles.body}>
            {children}
          </div>
        </motion.div>
      </main>

      <Footer />
      
      {/* Subtle background text decorative element */}
      <div className={styles.bgText}>LEGAL</div>
    </div>
  );
}
