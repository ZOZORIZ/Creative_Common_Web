import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Initialize Google APIs
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets'
  ],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const eventType = formData.get('eventType') as string;
    const eventDate = formData.get('eventDate') as string;
    const department = formData.get('department') as string;
    const message = formData.get('message') as string;

    // Handle file uploads
    const references = formData.get('references') as File;
    const logo = formData.get('logo') as File;

    console.log('Files received:', {
      references: references ? { name: references.name, type: references.type, size: references.size } : null,
      logo: logo ? { name: logo.name, type: logo.type, size: logo.size } : null
    });

    let referencesLink = '';
    let logoLink = '';

    // Upload files to Cloudinary
    if (references) {
      console.log('Starting references file upload...');
      const bytes = await references.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Convert buffer to base64
      const base64String = buffer.toString('base64');
      const dataURI = `data:${references.type};base64,${base64String}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'creative_common',
        resource_type: 'auto'
      });

      referencesLink = result.secure_url;
      console.log('References file link:', referencesLink);
    }

    if (logo) {
      console.log('Starting logo file upload...');
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Convert buffer to base64
      const base64String = buffer.toString('base64');
      const dataURI = `data:${logo.type};base64,${base64String}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'creative_common',
        resource_type: 'auto'
      });

      logoLink = result.secure_url;
      console.log('Logo file link:', logoLink);
    }

    // Add to Google Sheets with file links
    console.log('Adding data to Google Sheets...');
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:J',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          name,
          email,
          phone,
          eventType,
          eventDate,
          department,
          message,
          referencesLink,
          logoLink
        ]],
      },
    });

    console.log('Google Sheets Response:', response.data);

    return NextResponse.json({ 
      success: true,
      message: 'Form submitted successfully',
      fileLinks: {
        references: referencesLink,
        logo: logoLink
      }
    });
  } catch (error) {
    console.error('Error in upload-and-submit:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 