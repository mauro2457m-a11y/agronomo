
export interface Crop {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Pest {
  name: string;
  scientificName: string;
  description: string;
  controlMethods: string[];
}

export interface Disease {
  name: string;
  agent: string;
  symptoms: string;
  controlMethods: string[];
}

export interface CropInfo {
  pests: Pest[];
  diseases: Disease[];
}
