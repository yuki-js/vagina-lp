import { LegalPageLayout } from "../../components/LegalPageLayout/LegalPageLayout";
import { MarkdownContent } from "../../components/MarkdownContent/MarkdownContent";
import privacyContent from "../../docs/legal/privacy-policy.md?raw";

export default function Page() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="March 29, 2026">
      <MarkdownContent content={privacyContent} />
    </LegalPageLayout>
  );
}
