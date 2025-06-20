
'use server';
/**
 * @fileOverview Manages test sessions, including fetching questions and submitting answers.
 *
 * - getTestQuestions - Fetches a set of questions for a test.
 * - submitTestAnswers - Submits the answers for a test.
 */

import {ai} from '@/ai/genkit';
import {
  GetTestQuestionsInputSchema,
  type GetTestQuestionsInput,
  GetTestQuestionsOutputSchema,
  type GetTestQuestionsOutput,
  SubmitTestAnswersInputSchema,
  type SubmitTestAnswersInput,
  SubmitTestAnswersOutputSchema,
  type SubmitTestAnswersOutput,
  type TestQuestion
} from './test-session-types';


// Sample questions - in a real scenario, these would come from a database or question bank
const sampleQuestions: TestQuestion[] = [
  { id: 1, text: "What is the powerhouse of the cell?", type: "mcq", options: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi Apparatus"], correctAnswer: "Mitochondrion" },
  { id:2, text: "Describe the process of photosynthesis in your own words (max 100 words).", type: "text" }, // No correctAnswer for text type
  { id: 3, text: "True or False: The Earth is flat.", type: "truefalse", options: ["True", "False"], correctAnswer: "False" },
  { id: 4, text: "What is 12 multiplied by 12?", type: "mcq", options: ["124", "144", "164", "132"], correctAnswer: "144" },
  { id: 5, text: "List two primary colors.", type: "text"}, // No correctAnswer for text type
  { id: 6, text: "What is the chemical symbol for water?", type: "mcq", options: ["H2O", "CO2", "O2", "NaCl"], correctAnswer: "H2O" },
  { id: 7, text: "Explain the difference between a meteor and a meteorite.", type: "text"}, // No correctAnswer for text type
  { id: 8, text: "Is the sun a star or a planet?", type: "truefalse", options: ["Star", "Planet"], correctAnswer: "Star"},
];

const sampleInstructions = `
1. Ensure you are in a quiet, well-lit room, alone.
2. Your webcam and microphone must remain on throughout the test.
3. The test will be proctored using AI. Any suspicious activity (tab switching, losing focus, exiting fullscreen, prohibited shortcuts) will result in automatic test submission.
4. Do not switch tabs, open other applications, interact with browser extensions, or use external devices.
5. Copying, pasting, or screen recording is strictly prohibited.
6. Certain browser actions (e.g., refresh, new tab, developer tools) are restricted and will lead to test termination.
7. You have a limited time to complete the test. Manage your time wisely.
8. Read each question carefully before answering. You can navigate between questions.
9. For multiple-choice questions, select the best option. For text questions, provide a concise answer.
10. Once you submit the test, you cannot go back.
`;

const getTestQuestionsFlow = ai.defineFlow(
  {
    name: 'getTestQuestionsFlow',
    inputSchema: GetTestQuestionsInputSchema,
    outputSchema: GetTestQuestionsOutputSchema,
  },
  async (input) => {
    console.log('Fetching questions for testId:', input.testId || 'N/A');
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    return { questions: sampleQuestions, instructions: sampleInstructions };
  }
);

export async function getTestQuestions(input: GetTestQuestionsInput): Promise<GetTestQuestionsOutput> {
  return getTestQuestionsFlow(input);
}

const PASS_THRESHOLD_PERCENTAGE = 50;

const submitTestAnswersFlow = ai.defineFlow(
  {
    name: 'submitTestAnswersFlow',
    inputSchema: SubmitTestAnswersInputSchema,
    outputSchema: SubmitTestAnswersOutputSchema,
  },
  async (input) => {
    console.log(`Submitting answers for testId: ${input.testId}`, input.answers);
    if (input.isAutoSubmitted) {
      console.log(`Test auto-submitted due to: ${input.autoSubmitReason}`);
    }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

    let score: number | undefined = undefined;
    let passed: boolean | undefined = undefined;
    let numCorrect = 0;
    let totalScorableQuestions = 0;

    sampleQuestions.forEach(q => {
      if (q.type === 'mcq' || q.type === 'truefalse') {
        totalScorableQuestions++;
        if (q.correctAnswer && input.answers[q.id.toString()] === q.correctAnswer) {
          numCorrect++;
        }
      }
    });

    if (totalScorableQuestions > 0) {
      score = Math.round((numCorrect / totalScorableQuestions) * 100);
      passed = score >= PASS_THRESHOLD_PERCENTAGE;
    }

    // Simulate saving to database
    console.log({
      testId: input.testId,
      answers: input.answers,
      score,
      passed,
      proctoringViolation: input.isAutoSubmitted,
      proctoringViolationReason: input.autoSubmitReason,
      submissionTime: new Date().toISOString()
    });
    
    let message = 'Test answers submitted successfully.';
    if (score !== undefined) {
      message += ` Your score is ${score}%.`;
    }
    // The client-side toast will prepend information about auto-submission and the reason.
    // So, the flow's message here should be the core result.
    // If it was auto-submitted, the client already knows the reason from its local state/params.

    // Example of refined message logic:
    // If `input.isAutoSubmitted` is true, the client toast in `take-test/page.tsx` will display:
    // `Test automatically submitted due to ${autoSubmitReason}. ${response.message_from_flow}`
    // So, `response.message_from_flow` should just be the "Test answers submitted successfully. Your score is X%." part.

    return { 
      success: true, 
      message, // This message no longer redundantly includes the auto-submission reason.
      score,
      passed,
      proctoringViolation: input.isAutoSubmitted 
    };
  }
);

export async function submitTestAnswers(input: SubmitTestAnswersInput): Promise<SubmitTestAnswersOutput> {
  return submitTestAnswersFlow(input);
}
