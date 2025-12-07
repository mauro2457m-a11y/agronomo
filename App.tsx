
import React, { useState, useCallback } from 'react';
import { Crop, CropInfo } from './types';
import { CROPS } from './constants';
import { fetchCropInfo } from './services/geminiService';
import Header from './components/Header';
import CropCard from './components/CropCard';
import CropDetails from './components/CropDetails';
import LoadingSpinner from './components/LoadingSpinner';
import { ArrowLeftIcon } from './components/Icons';

const App: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [cropInfo, setCropInfo] = useState<CropInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectCrop = useCallback(async (crop: Crop) => {
    setSelectedCrop(crop);
    setIsLoading(true);
    setError(null);
    setCropInfo(null);
    try {
      const info = await fetchCropInfo(crop.name);
      setCropInfo(info);
    } catch (err) {
      console.error(err);
      setError('Falha ao buscar informações. A API pode estar indisponível ou a chave de API não foi configurada. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBack = () => {
    setSelectedCrop(null);
    setCropInfo(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-green-50/50 text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        {selectedCrop ? (
          <div>
            <button
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold transition-colors duration-200"
            >
              <ArrowLeftIcon />
              Voltar para a seleção de culturas
            </button>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              {selectedCrop.name}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Análise detalhada de pragas e doenças.
            </p>
            {isLoading && <LoadingSpinner />}
            {error && <p className="text-center text-red-600 bg-red-100 p-4 rounded-lg">{error}</p>}
            {cropInfo && !isLoading && <CropDetails data={cropInfo} />}
          </div>
        ) : (
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gray-800 mb-4">
              Seu Assistente Agrícola Inteligente
            </h1>
            <p className="text-lg md:text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Selecione uma cultura abaixo para obter informações detalhadas sobre pragas, doenças e tratamentos recomendados pela IA.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {CROPS.map((crop) => (
                <CropCard key={crop.id} crop={crop} onSelect={handleSelectCrop} />
              ))}
            </div>
          </div>
        )}
      </main>
      <footer className="text-center p-6 mt-12 bg-white border-t border-gray-200">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} Guia do Agrônomo com IA. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
