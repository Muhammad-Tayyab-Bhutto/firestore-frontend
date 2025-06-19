
import {genkit} from 'genkit';
// import {googleAI} from '@genkit-ai/googleai'; // Temporarily commented out if GOOGLE_API_KEY is an issue for non-AI flows

export const ai = genkit({
  plugins: [
    // googleAI() // Temporarily commented out
  ],
  // model: 'googleai/gemini-2.0-flash', // Default model not needed if googleAI plugin is out
  // Ensure Genkit can operate without a model-providing plugin if flows are purely data-driven
  // If other plugins are essential and don't rely on googleAI, they can remain.
});
