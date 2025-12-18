export interface RequiredOptions {
  name: string;
  amount: {
    value: number;
    unit: string;
  };
  releaseForm: string;
  expirationDate: Date;
}

export interface OptionalOptions {
  internationalName?: string;
  group?: string[];
  producer?: {
    name: string;
    country: string;
  };
  activeSubstance?: {
    name: string;
    value: number;
    unit: string;
  }[];
  releaseDate?: Date;
  commentary?: string;
}
