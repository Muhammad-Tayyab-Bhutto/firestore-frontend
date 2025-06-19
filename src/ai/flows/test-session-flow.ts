
'use server';
/**
 * @fileOverview Manages test sessions, including fetching questions and submitting answers.
 *
 * - getTestQuestions - Fetches a set of questions for a test.
 * - submitTestAnswers - Submits the answers for a test.
 * - TestQuestionSchema - The Zod schema for a single test question.
 * - TestQuestion - The TypeScript type for a single test question.
 * - GetTestQuestionsInputSchema - Input schema for fetching questions.
 * - GetTestQuestionsOutputSchema - Output schema for fetching questions.
 * - SubmitTestAnswersInputSchema - Input schema for submitting answers.
 * - SubmitTestAnswersOutputSchema - Output schema for submitting answers.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const TestQuestionSchema = z.object({
  id: z.number().describe('Unique identifier for the question.'),
  text: z.string().describe('The question text.'),
  type: z.enum(['mcq', 'text', 'truefalse']).describe('The type of question.'),
  options: z.array(z.string()).optional().describe('Options for MCQ or true/false questions.'),
  // correctAnswer: z.string().optional().describe('The correct answer (for backend validation/scoring if needed).')
});
export type TestQuestion = z.infer<typeof TestQuestionSchema>;

export const GetTestQuestionsInputSchema = z.object({
  testId: z.string().optional().describe('The ID of the test to fetch questions for.'),
});
export type GetTestQuestionsInput = z.infer<typeof GetTestQuestionsInputSchema>;

export const GetTestQuestionsOutputSchema = z.object({
  questions: z.array(TestQuestionSchema).describe('An array of test questions.'),
});
export type GetTestQuestionsOutput = z.infer<typeof GetTestQuestionsOutputSchema>;

export const SubmitTestAnswersInputSchema = z.object({
  testId: z.string().describe('The ID of the test.'),
  answers: z.record(z.string(), z.string()).describe('A record of question IDs to answers.'), // Assuming questionId is string in record
});
export type SubmitTestAnswersInput = z.infer<typeof SubmitTestAnswersInputSchema>;

export const SubmitTestAnswersOutputSchema = z.object({
  success: z.boolean().describe('Whether the submission was successful.'),
  message: z.string().describe('A message regarding the submission.'),
  // score: z.number().optional().describe('The score if calculated immediately.')
});
export type SubmitTestAnswersOutput = z.infer<typeof SubmitTestAnswersOutputSchema>;


// Sample questions - in a real scenario, these would come from a database or question bank
const sampleQuestions: TestQuestion[] = [
  { id: 1, text: "What is the powerhouse of the cell?", type: "mcq", options: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi Apparatus"] },
  { id: 2, text: "Describe the process of photosynthesis in your own words (max 100 words).", type: "text" },
  { id: 3, text: "True or False: The Earth is flat.", type: "truefalse", options: ["True", "False"] },
  { id: 4, text: "What is 12 multiplied by 12?", type: "mcq", options: ["124", "144", "164", "132"] },
  { id: 5, text: "List two primary colors.", type: "text"},
  { id: 6, text: "What is the chemical symbol for water?", type: "mcq", options: ["H2O", "CO2", "O2", "NaCl"] },
  { id: 7, text: "Explain the difference between a meteor and a meteorite.", type: "text"},
  { id: 8, text: "Is the sun a star or a planet?", type: "truefalse", options: ["Star", "Planet"]},
];


const getTestQuestionsFlow = ai.defineFlow(
  {
    name: 'getTestQuestionsFlow',
    inputSchema: GetTestQuestionsInputSchema,
    outputSchema: GetTestQuestionsOutputSchema,
  },
  async (input) => {
    // In a real app, fetch questions based on input.testId from a database
    console.log('Fetching questions for testId:', input.testId || 'N/A');
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { questions: sampleQuestions };
  }
);

export async function getTestQuestions(input: GetTestQuestionsInput): Promise<GetTestQuestionsOutput> {
  return getTestQuestionsFlow(input);
}

const submitTestAnswersFlow = ai.defineFlow(
  {
    name: 'submitTestAnswersFlow',
    inputSchema: SubmitTestAnswersInputSchema,
    outputSchema: SubmitTestAnswersOutputSchema,
  },
  async (input) => {
    // In a real app, save answers to a database and potentially score them
    console.log(`Submitting answers for testId: ${input.testId}`, input.answers);
    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Basic check:
    const allAnswered = sampleQuestions.every(q => input.answers[q.id.toString()] && input.answers[q.id.toString()].trim() !== '');
    if (!allAnswered) {
        // This logic is more for client-side, but as an example of backend response
        // return { success: false, message: "Not all questions were answered." };
    }

    // Placeholder for actual scoring or more complex processing
    return { success: true, message: 'Test answers submitted successfully.' };
  }
);

export async function submitTestAnswers(input: SubmitTestAnswersInput): Promise<SubmitTestAnswersOutput> {
  return submitTestAnswersFlow(input);
}
