"use client";
import { useEffect, useState } from 'react';
import useSWR from "swr";

const fetcher = (term: string) =>
  fetch("/api/openai?term=" + term).then((res) => res.json());

function AIAnalizer() {

  const { data, error, isLoading, isValidating } = useSWR(
    "suggestion",
    () => fetcher('hola'),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const generateText = () => {
    if (isLoading || isValidating) {
      return (
        <>
          <div className="animated-spin rounded-full h-10 w-10 border-b-2 border-white" />
          <p className="text-sm text-gray-400">AI Assistant is thinking...</p>
        </>
      );
    }
    if (error) return <>Error...</>;
    if (!data) return <>No data founded.</>;

    return (
      <>
        <div className="animate-pulse rounded-full h-10 w-10 bg-gradient-to-t from-white border-2 flex-shrink-0 border-white" />

        <div>
          <p className="text-sm text-gray-400">AI Assistant Suggests: {""}</p>
          <p className="italic text-xl">&quot;{data.suggestion}&quot;</p>
        </div>
      </>
    );
  };

  const [needs, setNeeds] = useState([]);
  const [wants, setWants] = useState([]);
  const [savings, setSavings] = useState([]);

  useEffect(() => {
    const getItemsFromLocalStorage = () => {
      const needsData = localStorage.getItem('needs');
      const wantsData = localStorage.getItem('wants');
      const savingsData = localStorage.getItem('savings');
  
      // Verificar si hay datos en el localStorage y actualizar el estado correspondiente
      if (needsData) {
        setNeeds(JSON.parse(needsData));
      }
      if (wantsData) {
        setWants(JSON.parse(wantsData));
      }
      if (savingsData) {
        setSavings(JSON.parse(savingsData));
      }
    };

    getItemsFromLocalStorage();
  }, []);

  const getPrompt = () => {
    return 'hola'
  }

  const [analysisResult, setAnalysisResult] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // setLoading(true);
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: getPrompt() }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      // setLoading(false);
      setAnalysisResult(data.result);
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div>
        <h1 className="text-center mb-4">Obten un analisis mediante IA de tus finanzas atravez del metodo 50 30 20</h1>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="fixed left-0 right-0 flex items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Analyze
          </button>
          </div>
        </form>

        {/* Mostrar el resultado del análisis */}
        <div className="flex space-x-5 items-center px-10">{generateText()}</div>
    </div>
  )
}

export default AIAnalizer