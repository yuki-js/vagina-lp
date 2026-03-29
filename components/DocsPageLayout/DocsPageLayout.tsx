import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { DocsSidebar } from "../DocsSidebar/DocsSidebar";
import styles from "./DocsPageLayout.module.css";
import { motion } from "framer-motion";

interface DocsPageLayoutProps {
  title: string;
  activeSlug?: string;
  children: React.ReactNode;
}

export function DocsPageLayout({ title, activeSlug, children }: DocsPageLayoutProps) {
  return (
    <div className={styles.root}>
      <Header />
      
      <main className={styles.container}>
        <div className={styles.layoutWrapper}>
          <DocsSidebar activeSlug={activeSlug} />
          
          <motion.div 
            className={styles.content}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <header className={styles.pageHeader}>
              <div className={styles.breadcrumb}>Documentation / {title}</div>
              <h1 className={styles.title}>{title}</h1>
            </header>
            
            <div className={styles.body}>
              {children}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      
      <div className={styles.bgText}>DOCS</div>
    </div>
  );
}
