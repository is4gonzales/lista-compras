import ItemLista from "./ItemLista";
import { useState } from "react";

function App() {
  const [itens, setItens] = useState([
    { id: 1, texto: "Arroz", comprado: false },
    { id: 2, texto: "Feijão", comprado: false },
    { id: 3, texto: "Leite", comprado: false },
  ]);

  const [novoItem, setNovoItem] = useState("");

  function removerItem(id) {
    setItens((atual) => atual.filter((item) => item.id !== id));
  }

  function adicionarItem() {
    if (!novoItem.trim()) return;
    setItens((atual) => [...atual, { id: Date.now(), texto: novoItem, comprado: false }]);
    setNovoItem("");
  }

  function alternarComprado(id) {
    setItens((atual) =>
      atual.map((item) =>
        item.id === id ? { ...item, comprado: !item.comprado } : item
      )
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de compras</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
          placeholder="Novo item"
          className="border border-gray-200 rounded-lg px-3 py-2 flex-1"
        />
        <button
          onClick={adicionarItem}
          className="bg-teal-700 text-white rounded-lg px-4 py-2"
        >
          Adicionar
        </button>
      </div>

      {itens.length === 0 && <p className="text-gray-500">Sua lista está vazia.</p>}

      {itens.map((item) => (
        <ItemLista
          key={item.id}
          texto={
            <span
              onClick={() => alternarComprado(item.id)}
              className={item.comprado ? "line-through" : ""}
            >
              {item.texto}
            </span>
          }
          onRemover={() => removerItem(item.id)}
        />
      ))}
    </div>
  );
}

export default App;
