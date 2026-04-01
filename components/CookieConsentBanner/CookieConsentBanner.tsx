import { useState, useEffect } from "react";
import styles from "./CookieConsentBanner.module.css";

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookie-consent");
    if (!hasConsented) {
      setIsVisible(true);
    }
    
    // Check if the user's preferred language is English (or non-Japanese)
    if (navigator.language && !navigator.language.startsWith("ja")) {
      setIsEnglish(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.textContent}>
          {isEnglish ? (
            <p className={styles.text}>
              We use cookies to analyze site usage and improve our services. By clicking "Accept", you consent to our use of cookies. Please review our <a href="/legal/privacy-policy">Privacy Policy</a> for more details.
            </p>
          ) : (
            <p className={styles.text}>
              当サイトでは、利用状況の把握やサービス向上のためにCookieを利用しています。Cookieの使用に同意いただける場合は「同意する」ボタンをクリックしてください。詳細は<a href="/legal/privacy-policy#10-cookie等の利用">プライバシーポリシー</a>をご確認ください。
            </p>
          )}
        </div>
        <button className={styles.button} onClick={handleAccept}>
          {isEnglish ? "Accept" : "同意する"}
        </button>
      </div>
    </div>
  );
}
