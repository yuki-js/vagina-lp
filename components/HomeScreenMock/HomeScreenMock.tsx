import {
  MdStar,
  MdHistory,
  MdContacts,
  MdApps,
  MdAdd,
  MdSettings,
  MdPhone,
  MdHeadsetMic,
  MdSearch,
  MdChevronRight,
  MdFolder,
  MdStore,
} from "react-icons/md";
import styles from "./HomeScreenMock.module.css";

interface SpeedDialCard {
  id: string;
  name: string;
  emoji?: string;
  voice: string;
  isDefault?: boolean;
}

interface CallSession {
  id: string;
  date: string;
  duration: string;
}

interface Agent {
  id: string;
  name: string;
  provider: string;
  initial: string;
  color: string;
}

interface Feature {
  icon: typeof MdFolder;
  label: string;
  color: string;
}

const mockSpeedDials: SpeedDialCard[] = [
  {
    id: "default",
    name: "VAGINA",
    voice: "alloy",
    isDefault: true,
  },
  {
    id: "1",
    name: "Assistant",
    emoji: "🤖",
    voice: "shimmer",
  },
  {
    id: "2",
    name: "Teacher",
    emoji: "👨‍🏫",
    voice: "echo",
  },
  {
    id: "3",
    name: "Friend",
    emoji: "😊",
    voice: "nova",
  },
];

const mockSessions: CallSession[] = [
  { id: "1", date: "Today, 2:30 PM", duration: "5m 23s" },
  { id: "2", date: "Yesterday, 11:45 AM", duration: "12m 05s" },
  { id: "3", date: "Dec 18, 3:15 PM", duration: "3m 47s" },
];

const mockAgents: Agent[] = [
  { id: "1", name: "Research Assistant", provider: "GPT-4", initial: "R", color: "#6c63ff" },
  { id: "2", name: "Code Helper", provider: "Claude 3", initial: "C", color: "#2196F3" },
  { id: "3", name: "Writing Coach", provider: "GPT-4", initial: "W", color: "#4CAF50" },
];

const mockFeatures: Feature[] = [
  { icon: MdFolder, label: "Files", color: "#FFB300" },
  { icon: MdStore, label: "Tools", color: "#2196F3" },
];

export type TabType = "speed-dial" | "sessions" | "agents" | "more";

interface HomeScreenMockProps {
  activeTab?: TabType;
}

const tabOrder: TabType[] = ["speed-dial", "sessions", "agents", "more"];

export function HomeScreenMock({ activeTab = "speed-dial" }: HomeScreenMockProps) {
  const activeIndex = tabOrder.indexOf(activeTab);

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.spacer} />
        <h1 className={styles.title}>VAGINA</h1>
        <div className={styles.actions}>
          <button className={styles.iconButton} aria-label="Add">
            <MdAdd />
          </button>
          <button className={styles.iconButton} aria-label="Settings">
            <MdSettings />
          </button>
        </div>
      </div>

      {/* Tab Content with PageView */}
      <div className={styles.content}>
        <div
          className={styles.pageView}
          style={{
            transform: `translateX(-${activeIndex * 25}%)`
          }}
        >
          <div className={styles.page}>
            <SpeedDialTabContent />
          </div>
          <div className={styles.page}>
            <SessionsTabContent />
          </div>
          <div className={styles.page}>
            <AgentsTabContent />
          </div>
          <div className={styles.page}>
            <MoreTabContent />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className={styles.bottomNav}>
        <button className={styles.navItem} data-active={activeTab === "speed-dial"}>
          <MdStar />
          <span className={styles.navLabel}>Speed Dial</span>
        </button>
        <button className={styles.navItem} data-active={activeTab === "sessions"}>
          <MdHistory />
          <span className={styles.navLabel}>Sessions</span>
        </button>
        {/* Center space for FAB */}
        <div className={styles.navSpacer} />
        <button className={styles.navItem} data-active={activeTab === "agents"}>
          <MdContacts />
          <span className={styles.navLabel}>Agents</span>
        </button>
        <button className={styles.navItem} data-active={activeTab === "more"}>
          <MdApps />
          <span className={styles.navLabel}>More</span>
        </button>
      </div>

      {/* Floating Action Button */}
      <div className={styles.fab}>
        <MdPhone />
      </div>
    </div>
  );
}

function SpeedDialTabContent() {
  return (
    <>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Speed Dial</h2>
        <p className={styles.sectionSubtitle}>Quick access to your favorite characters</p>
      </div>
      <div className={styles.grid}>
        {mockSpeedDials.map((dial) => (
          <div key={dial.id} className={styles.card}>
            <div className={styles.cardIcon}>
              {dial.isDefault ? (
                <div className={styles.defaultIcon}>
                  <MdHeadsetMic />
                </div>
              ) : (
                <span className={styles.emoji}>{dial.emoji}</span>
              )}
            </div>
            <h3 className={styles.cardName}>{dial.name}</h3>
            <p className={styles.cardVoice}>{dial.voice}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function SessionsTabContent() {
  return (
    <div className={styles.listContainer}>
      {mockSessions.map((session) => (
        <div key={session.id} className={styles.listItem}>
          <div className={styles.listItemIcon}>
            <MdPhone />
          </div>
          <div className={styles.listItemContent}>
            <div className={styles.listItemTitle}>{session.date}</div>
            <div className={styles.listItemSubtitle}>{session.duration}</div>
          </div>
          <MdChevronRight className={styles.listItemArrow} />
        </div>
      ))}
    </div>
  );
}

function AgentsTabContent() {
  return (
    <>
      <div className={styles.searchBar}>
        <MdSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search agents..."
          className={styles.searchInput}
        />
      </div>
      <div className={styles.listContainer}>
        {mockAgents.map((agent) => (
          <div key={agent.id} className={styles.listItem}>
            <div 
              className={styles.avatar}
              style={{ backgroundColor: `${agent.color}33`, color: agent.color }}
            >
              {agent.initial}
            </div>
            <div className={styles.listItemContent}>
              <div className={styles.listItemTitle}>{agent.name}</div>
              <div className={styles.listItemSubtitle}>{agent.provider}</div>
            </div>
            <MdChevronRight className={styles.listItemArrow} />
          </div>
        ))}
      </div>
    </>
  );
}

function MoreTabContent() {
  return (
    <div className={styles.featureGrid}>
      {mockFeatures.map((feature, index) => (
        <div key={index} className={styles.featureCard}>
          <div 
            className={styles.featureIcon}
            style={{ 
              background: `linear-gradient(135deg, ${feature.color}CC, ${feature.color}66)` 
            }}
          >
            <feature.icon />
          </div>
          <div className={styles.featureLabel}>{feature.label}</div>
        </div>
      ))}
    </div>
  );
}
