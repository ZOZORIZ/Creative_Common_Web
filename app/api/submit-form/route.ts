import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Debug environment variables
console.log('Environment Variables:', {
  hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
  hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
  hasSheetId: !!process.env.GOOGLE_SHEET_ID,
  sheetId: process.env.GOOGLE_SHEET_ID,
  privateKeyLength: process.env.GOOGLE_PRIVATE_KEY?.length
});

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

if (!SPREADSHEET_ID) {
  console.error('Missing GOOGLE_SHEET_ID:', process.env.GOOGLE_SHEET_ID);
  throw new Error('GOOGLE_SHEET_ID is not defined in environment variables');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received form data:', body);
    
    const { name, email, phone, message, eventType, eventDate, budget } = body;

    if (!SPREADSHEET_ID) {
      console.error('Spreadsheet ID is missing in POST handler');
      throw new Error('Spreadsheet ID is missing');
    }

    console.log('Attempting to append to sheet:', SPREADSHEET_ID);

    // Add to Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          name,
          email,
          phone,
          eventType,
          eventDate,
          budget,
          message
        ]],
      },
    });

    console.log('Google Sheets Response:', response.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
} 