'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({ amount: 0 });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()  
    router.push(`/manage?amount=${formData.amount}`)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block font-medium text-gray-700">
          Total Amount
        </label>
        <input 
          type="number"
          id="amount"
          name="amount"
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
        />
        <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
          Next
        </button>
      </form>
    </main>
  );
}
