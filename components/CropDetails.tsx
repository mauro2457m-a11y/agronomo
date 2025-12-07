
import React from 'react';
import { CropInfo } from '../types';
import { BugIcon, DiseaseIcon, ShieldCheckIcon } from './Icons';

interface CropDetailsProps {
  data: CropInfo;
}

const DetailCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);


const CropDetails: React.FC<CropDetailsProps> = ({ data }) => {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-3">
          <BugIcon className="h-8 w-8" />
          Pragas Comuns
        </h2>
        <div className="space-y-6">
          {data.pests.length > 0 ? data.pests.map((pest, index) => (
            <DetailCard key={`pest-${index}`} title={pest.name} icon={<BugIcon className="h-6 w-6 text-orange-600" />}>
              <p className="text-sm text-gray-500 italic mb-3">{pest.scientificName}</p>
              <p className="text-gray-700 mb-4">{pest.description}</p>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 flex items-center gap-2 mb-2"><ShieldCheckIcon className="h-5 w-5 text-blue-600" />Métodos de Controle:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {pest.controlMethods.map((method, i) => (
                    <li key={`pest-method-${index}-${i}`}>{method}</li>
                  ))}
                </ul>
              </div>
            </DetailCard>
          )) : <p>Nenhuma praga comum encontrada.</p>}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-3">
          <DiseaseIcon className="h-8 w-8" />
          Doenças Comuns
        </h2>
        <div className="space-y-6">
          {data.diseases.length > 0 ? data.diseases.map((disease, index) => (
             <DetailCard key={`disease-${index}`} title={disease.name} icon={<DiseaseIcon className="h-6 w-6 text-red-600" />}>
              <p className="text-sm text-gray-500 italic mb-3">Agente: {disease.agent}</p>
              <p className="text-gray-700 mb-4"><strong>Sintomas:</strong> {disease.symptoms}</p>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 flex items-center gap-2 mb-2"><ShieldCheckIcon className="h-5 w-5 text-blue-600" />Métodos de Controle:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {disease.controlMethods.map((method, i) => (
                    <li key={`disease-method-${index}-${i}`}>{method}</li>
                  ))}
                </ul>
              </div>
            </DetailCard>
          )) : <p>Nenhuma doença comum encontrada.</p>}
        </div>
      </section>
    </div>
  );
};

export default CropDetails;
