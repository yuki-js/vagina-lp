import { ALL_DOCS } from "./DocsRegistry";
import { DocsPageLayout } from "../../components/DocsPageLayout/DocsPageLayout";

export default function Page() {
  return (
    <DocsPageLayout title="Documentation Overview">
      <p>Select a document:</p>
      <ul>
        {ALL_DOCS.map((doc) => (
          <li key={doc.slug}>
            <a href={`/docs/${doc.slug}`}>{doc.title}</a>
          </li>
        ))}
      </ul>
    </DocsPageLayout>
  );
}
