import React from "react";
import styles from "./ChatPane.module.css";

interface ChatPaneProps {
  onBackPressed?: () => void;
  hideBackButton?: boolean;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  onSendMessage?: () => void;
  isCallActive?: boolean;
}

interface ChatBubbleProps {
  role: "user" | "assistant";
  children: string;
}

function TypingIndicator() {
  return (
    <div className={styles.typingIndicator}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
}

interface CharacterByCharacterTextProps {
  text: string;
  characterDelay?: number;
}

function CharacterByCharacterText({
  text,
  characterDelay = 50,
}: CharacterByCharacterTextProps) {
  const [displayedCount, setDisplayedCount] = React.useState(0);

  React.useEffect(() => {
    if (displayedCount < text.length) {
      const timer = setTimeout(() => {
        setDisplayedCount((prev) => prev + 1);
      }, characterDelay);
      return () => clearTimeout(timer);
    }
  }, [displayedCount, text.length, characterDelay]);

  return <>{text.slice(0, displayedCount)}</>;
}

export function ChatBubble({ role, children }: ChatBubbleProps) {
  const [isShowingTyping, setIsShowingTyping] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);
  const isUser = role === "user";

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowingTyping(false);
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.bubble} ${
        isUser ? styles.userBubble : styles.assistantBubble
      } ${isShowingTyping ? styles.visible : isVisible ? styles.visible : styles.hidden}`}
    >
      {!isUser && <div className={styles.avatar}>🤖</div>}
      <div className={styles.content}>
        {isShowingTyping ? (
          <TypingIndicator />
        ) : isUser ? (
          children
        ) : (
          <CharacterByCharacterText text={children} />
        )}
      </div>
    </div>
  );
}

const MESSAGES = [
  { role: "user" as const, content: "もしもし" },
  {
    role: "assistant" as const,
    content: "こんにちは！何かお手伝いできることはありますか？",
  },
  { role: "user" as const, content: "1+1は？" },
  { role: "assistant" as const, content: "ケツマンコ。" },
];

export function ChatPane({
  onBackPressed,
  hideBackButton = false,
  inputValue = "",
  onInputChange,
  onSendMessage,
  isCallActive = true,
}: ChatPaneProps) {
  const [displayedMessagesCount, setDisplayedMessagesCount] = React.useState(1);

  React.useEffect(() => {
    if (displayedMessagesCount < MESSAGES.length) {
      const timer = setTimeout(() => {
        setDisplayedMessagesCount((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [displayedMessagesCount]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        {!hideBackButton && (
          <button className={styles.backButton} onClick={onBackPressed}>
            ← 通話画面
          </button>
        )}
        <h2 className={styles.title}>チャット</h2>
        <div className={styles.spacer} />
      </div>

      {/* Messages Area */}
      <div className={styles.messagesContainer}>
        {MESSAGES.slice(0, displayedMessagesCount).map((msg, index) => (
          <ChatBubble key={index} role={msg.role}>
            {msg.content}
          </ChatBubble>
        ))}
      </div>

      {/* Input Area */}
      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder={
            isCallActive
              ? "メッセージを入力..."
              : "通話中でないと入力できません"
          }
          value={inputValue}
          onChange={(e) => onInputChange?.(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSendMessage?.()}
          disabled={!isCallActive}
          className={styles.input}
        />
        <button
          className={styles.sendButton}
          onClick={onSendMessage}
          disabled={!isCallActive || !inputValue.trim()}
        >
          ➤
        </button>
      </div>
    </div>
  );
}
