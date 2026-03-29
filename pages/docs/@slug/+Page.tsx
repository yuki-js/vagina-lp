import { usePageContext } from "vike-react/usePageContext";
import { getDocBySlug } from "../DocsRegistry";
import { DocsPageLayout } from "../../../components/DocsPageLayout/DocsPageLayout";
import { MarkdownContent } from "../../../components/MarkdownContent/MarkdownContent";

export default function Page() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams.slug;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return (
      <DocsPageLayout title="Not Found">
        <p>The requested documentation could not be found.</p>
      </DocsPageLayout>
    );
  }

  return (
    <DocsPageLayout title={doc.title} activeSlug={slug}>
      <MarkdownContent content={doc.content} />
    </DocsPageLayout>
  );
}
