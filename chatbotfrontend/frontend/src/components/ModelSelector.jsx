function ModelSelector({ selectedModel, setSelectedModel }) {
  return (
    <div className="model-selector">
      <label htmlFor="model-select">AI Model: </label>
      <select 
        id="model-select" 
        value={selectedModel} 
        onChange={(e) => setSelectedModel(e.target.value)}
      >
        <option value="llama3.2">Llama 3.2</option>
        <option value="mistral">Mistral</option>
        <option value="codellama">CodeLlama</option>
      </select>
    </div>
  );
}

export default ModelSelector;