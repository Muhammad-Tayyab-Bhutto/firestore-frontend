// This is an AI-powered function to validate uploaded challan slips automatically, using AI/OCR technology.
// It flags the challan for admin approval if the validation is uncertain.
// - validateChallan - A function that handles the challan validation process.
// - ValidateChallanInput - The input type for the validateChallan function.
// - ValidateChallanOutput - The return type for the validateChallan function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateChallanInputSchema = z.object({
  challanDataUri: z
    .string()
    .describe(
      "A photo of the challan slip, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

export type ValidateChallanInput = z.infer<typeof ValidateChallanInputSchema>;

const ValidateChallanOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the challan is valid or not.'),
  confidence: z.number().describe('The confidence level of the validation (0-1).'),
  flagForAdminApproval: z
    .boolean()
    .describe('Whether the challan needs to be reviewed by an admin.'),
  extractedData: z
    .object({
      paymentDate: z.string().optional().describe('The payment date on the challan.'),
      amountPaid: z.number().optional().describe('The amount paid on the challan.'),
      bankName: z.string().optional().describe('The name of the bank.'),
      accountNumber: z.string().optional().describe('The account number.'),
    })
    .optional()
    .describe('Extracted data from the challan using OCR.'),
});

export type ValidateChallanOutput = z.infer<typeof ValidateChallanOutputSchema>;

export async function validateChallan(input: ValidateChallanInput): Promise<ValidateChallanOutput> {
  return validateChallanFlow(input);
}

const validateChallanPrompt = ai.definePrompt({
  name: 'validateChallanPrompt',
  input: {schema: ValidateChallanInputSchema},
  output: {schema: ValidateChallanOutputSchema},
  prompt: `You are an AI-powered system designed to validate uploaded challan slips (fee payment slips) using OCR technology.

  Analyze the image of the challan provided and determine if it is a valid payment slip.

  Here is the challan slip:
  {{media url=challanDataUri}}

  Output in JSON format:
  - isValid: boolean (Whether the challan is valid or not.)
  - confidence: number (The confidence level of the validation (0-1).)
  - flagForAdminApproval: boolean (Whether the challan needs to be reviewed by an admin.)
  - extractedData: object (Extracted data from the challan using OCR. Optional.)
    - paymentDate: string (The payment date on the challan.)
    - amountPaid: number (The amount paid on the challan.)
    - bankName: string (The name of the bank.)
    - accountNumber: string (The account number.)`,
});

const validateChallanFlow = ai.defineFlow(
  {
    name: 'validateChallanFlow',
    inputSchema: ValidateChallanInputSchema,
    outputSchema: ValidateChallanOutputSchema,
  },
  async input => {
    const {output} = await validateChallanPrompt(input);
    return output!;
  }
);
