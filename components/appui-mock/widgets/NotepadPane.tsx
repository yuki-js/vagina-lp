import React, { useState } from "react";
import styles from "./NotepadPane.module.css";

interface NotepadTab {
  id: string;
  title: string;
  content: string;
  mimeType: "text/plain" | "text/html" | "text/markdown";
}

interface NotepadPaneProps {
  onBackPressed?: () => void;
  hideBackButton?: boolean;
  tabs?: NotepadTab[];
  isCallActive?: boolean;
  onTabSelect?: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
}

function NotepadTabBar({
  tabs,
  selectedTabId,
  onTabSelect,
  onTabClose,
}: {
  tabs: NotepadTab[];
  selectedTabId?: string;
  onTabSelect?: (id: string) => void;
  onTabClose?: (id: string) => void;
}) {
  return (
    <div className={styles.tabBar}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.tab} ${tab.id === selectedTabId ? styles.tabActive : ""}`}
          onClick={() => onTabSelect?.(tab.id)}
        >
          <span className={styles.tabTitle}>{tab.title}</span>
          <button
            className={styles.tabClose}
            onClick={(e) => {
              e.stopPropagation();
              onTabClose?.(tab.id);
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

function NotepadContent({ tab }: { tab: NotepadTab }) {
  return (
    <div className={styles.content}>
      {tab.mimeType === "text/html" ? (
        <div
          className={styles.htmlContent}
          dangerouslySetInnerHTML={{ __html: tab.content }}
        />
      ) : (
        <pre className={styles.plainContent}>{tab.content}</pre>
      )}
    </div>
  );
}

export function NotepadPane({
  onBackPressed,
  hideBackButton = false,
  tabs = [
    {
      id: "1",
      title: "example.md",
      content: "# Example\n\nこれはサンプルノートパッドです。\n\n- Item 1\n- Item 2",
      mimeType: "text/markdown",
    },
  ],
  isCallActive = true,
  onTabSelect,
  onTabClose,
}: NotepadPaneProps) {
  const [selectedTabId, setSelectedTabId] = useState(tabs[0]?.id);
  const selectedTab = tabs.find((t) => t.id === selectedTabId);

  const handleTabSelect = (id: string) => {
    setSelectedTabId(id);
    onTabSelect?.(id);
  };

  const handleTabClose = (id: string) => {
    onTabClose?.(id);
    if (selectedTabId === id && tabs.length > 1) {
      const remainingTabs = tabs.filter((t) => t.id !== id);
      setSelectedTabId(remainingTabs[0]?.id);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        {!hideBackButton && (
          <button className={styles.backButton} onClick={onBackPressed}>
            ← 通話画面
          </button>
        )}
        <h2 className={styles.title}>ノートパッド</h2>
        <div className={styles.spacer} />
      </div>

      {/* Tab Bar */}
      {tabs.length > 0 && (
        <NotepadTabBar
          tabs={tabs}
          selectedTabId={selectedTabId}
          onTabSelect={handleTabSelect}
          onTabClose={handleTabClose}
        />
      )}

      {/* Content Area */}
      {tabs.length === 0 ? (
        <div className={styles.emptyState}>
          <p>ノートパッドはまだ作成されていません</p>
        </div>
      ) : selectedTab ? (
        <NotepadContent tab={selectedTab} />
      ) : (
        <div className={styles.emptyState}>
          <p>タブを選択してください</p>
        </div>
      )}
    </div>
  );
}
