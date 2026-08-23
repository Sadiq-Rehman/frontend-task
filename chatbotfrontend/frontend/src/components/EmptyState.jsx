export default function EmptyState({ title, description }) {
  return (
    <div className="empty-state">
      <h3>{title || "No messages yet"}</h3>
      <p>{description || "Start a conversation by typing a prompt below."}</p>
    </div>
  );
}