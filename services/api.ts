/**
 * API service for US50 Transport LLC
 * Handles communication with the backend API
 */

// Base URL for API requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Submit a quote request to the backend
 * 
 * @param quoteData - The form data from the quote request
 * @returns The response from the API
 */
export const submitQuoteRequest = async (quoteData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quoteData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit quote request');
    }

    return data;
  } catch (error) {
    console.error('Error submitting quote request:', error);
    throw error;
  }
};
