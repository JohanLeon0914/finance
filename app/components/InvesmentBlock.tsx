import React, { useState } from 'react';
enum InvestmentType {
    Needs = 'needs',
    Wants = 'wants',
    Savings = 'savings',
  }
  
  interface Investment {
    title: string;
    type: InvestmentType; 
  }
export function InvestmentBlock({ title, type }: Investment) {
  const [items, setItems] = useState<{ title: string; description: string; amount: number }[]>([]);
  const [formData, setFormData] = useState({ title: '', description: '', amount: 0 });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.title && formData.description && formData.amount) {
      const updatedItems = [...items, formData];
      setItems(updatedItems);
  
      setFormData({ title: '', description: '', amount: 0 });
  
      switch (type) {
        case 'needs':
          localStorage.setItem('needs', JSON.stringify(updatedItems));
          break;
        case 'wants':
          localStorage.setItem('wants', JSON.stringify(updatedItems));
          break;
        case 'savings':
          localStorage.setItem('savings', JSON.stringify(updatedItems));
          break;
        default:
          break;
      }
    }
  };

  const calculateTotal = () => {
    let total: number = 0;
    items.forEach(item => {
      total += parseFloat(item.amount.toString());
    });
    return total;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {/* Aquí se listan los items */}
        {items.map((item, index) => (
          <div className="border-b pb-2" key={index}>
            <h3 className="text-md font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-sm font-semibold">{`$${item.amount}`}</p>
            <div className="mt-2">
              <button className="text-blue-500 mr-2">Editar</button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(index)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
        {/* TOTAL */}
        <div className='space-y-4 border-t pt-4'>
            <div>
                <h3 className="text-lg font-semibold">TOTAL</h3>
                <p className="text-xl font-bold">${calculateTotal()}</p>
            </div>
        </div>
    </div>
  );
}