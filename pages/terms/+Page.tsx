import { LegalPageLayout } from "../../components/LegalPageLayout/LegalPageLayout";
import { MarkdownContent } from "../../components/MarkdownContent/MarkdownContent";
import termsContent from "../../docs/legal/terms-of-service.md?raw";

export default function Page() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="March 29, 2026">
      <MarkdownContent content={termsContent} />
    </LegalPageLayout>
  );
}
