import "./Layout.css";
import { CookieConsentBanner } from "../components/CookieConsentBanner/CookieConsentBanner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-content">
      {children}
      <CookieConsentBanner />
    </div>
  );
}
