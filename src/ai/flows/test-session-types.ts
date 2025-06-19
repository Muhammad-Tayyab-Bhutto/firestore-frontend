
/**
 * @fileOverview Defines Zod schemas and TypeScript types for test sessions.
 * This file is intended for shared type definitions between server flows and client components.
 */

import { z } from 'genkit';

export const TestQuestionSchema = z.object({
  id: z.number().describe('Unique identifier for the question.'),
  text: z.string().describe('The question text.'),
  type: z.enum(['mcq', 'text', 'truefalse']).describe('The type of question.'),
  options: z.array(z.string()).optional().describe('Options for MCQ or true/false questions.'),
  correctAnswer: z.string().optional().describe('The correct answer (for backend validation/scoring if needed).')
});
export type TestQuestion = z.infer<typeof TestQuestionSchema>;

export const GetTestQuestionsInputSchema = z.object({
  testId: z.string().optional().describe('The ID of the test to fetch questions for.'),
});
export type GetTestQuestionsInput = z.infer<typeof GetTestQuestionsInputSchema>;

export const GetTestQuestionsOutputSchema = z.object({
  questions: z.array(TestQuestionSchema).describe('An array of test questions.'),
  instructions: z.string().optional().describe('Instructions for the test.'),
});
export type GetTestQuestionsOutput = z.infer<typeof GetTestQuestionsOutputSchema>;

export const SubmitTestAnswersInputSchema = z.object({
  testId: z.string().describe('The ID of the test.'),
  answers: z.record(z.string(), z.string()).describe('A record of question IDs to answers.'), // Assuming questionId is string in record
  isAutoSubmitted: z.boolean().optional().describe('Flag indicating if the test was submitted automatically due to proctoring violation or time expiry.'),
  autoSubmitReason: z.string().optional().describe('Reason for automatic submission.'),
});
export type SubmitTestAnswersInput = z.infer<typeof SubmitTestAnswersInputSchema>;

export const SubmitTestAnswersOutputSchema = z.object({
  success: z.boolean().describe('Whether the submission was successful.'),
  message: z.string().describe('A message regarding the submission.'),
  score: z.number().optional().describe('The score achieved if calculated, as a percentage.'),
  passed: z.boolean().optional().describe('Whether the student passed the test based on a threshold.'),
  proctoringViolation: z.boolean().optional().describe('Indicates if a proctoring violation was recorded during the test.')
});
export type SubmitTestAnswersOutput = z.infer<typeof SubmitTestAnswersOutputSchema>;
