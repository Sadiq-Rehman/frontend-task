export default function Badge({ label, variant = "success" }) {
  return (
    <span className={`badge ${variant}`}>
      {label}
    </span>
  );
}