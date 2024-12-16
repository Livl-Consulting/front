import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function apiUrl() {
  const url = process.env.API_URL;
  if (!url) {
    throw new Error("Missing API_URL env variable")
  }
  return url;
}


export const parseFormDataToJSON = (formData: FormData): object => {
  const result: object = {};

  // Iterate over each key-value pair in the FormData object
  formData.forEach((value, name) => {
    const keys = name
      .replace(/\]/g, '') // Remove all closing brackets
      .split('['); // Split by opening brackets

    keys.reduce((acc: any, key: string, index: number) => {
      const isLastKey = index === keys.length - 1;

      if (isLastKey) {
        // Parse key if it represents an array index
        const parsedKey = !isNaN(Number(key)) ? Number(key) : key;
        acc[parsedKey] = parseValue(value);
      } else {
        // Determine the next key type (object or array)
        const nextKey = keys[index + 1];
        acc[key] = acc[key] || (isNaN(Number(nextKey)) ? {} : []);
      }

      return acc[key];
    }, result);
  });

  return result;
};

// Function to parse stringified arrays and objects
function parseValue(value: any): any {
  try {
    if (value === "") {
      return undefined;
    }
    return JSON.parse(value);
  } catch {
    return value;
  }
}