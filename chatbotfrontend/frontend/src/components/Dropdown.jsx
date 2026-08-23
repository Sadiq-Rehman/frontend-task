export default function Dropdown({ options = [], selected, onSelect }) {
  return (
    <select 
      className="custom-dropdown" 
      value={selected} 
      onChange={(e) => onSelect(e.target.value)}
    >
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}