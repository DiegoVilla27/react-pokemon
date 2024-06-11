const API_URL_BASE: string = "https://api-pokemon.s3.eu-north-1.amazonaws.com";

export const environments = {
  apiFirst: `${API_URL_BASE}/generation-one.json`,
  apiSecond: `${API_URL_BASE}/generation-two.json`
};
