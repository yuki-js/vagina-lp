import { useEffect } from "react";
import { ALL_DOCS } from "./DocsRegistry";
import { DocsPageLayout } from "../../components/DocsPageLayout/DocsPageLayout";

export default function Page() {
  // If there are documents, redirect to the first one on the client side
  // In a real Vike app, we might do this on the server via redirect(),
  // but for simplicity, we'll do a quick client-side effect.
  useEffect(() => {
    if (ALL_DOCS.length > 0) {
      window.location.href = `/docs/${ALL_DOCS[0].slug}`;
    }
  }, []);

  return (
    <DocsPageLayout title="Documentation Overview">
      <p>Redirecting to documentation...</p>
    </DocsPageLayout>
  );
}
