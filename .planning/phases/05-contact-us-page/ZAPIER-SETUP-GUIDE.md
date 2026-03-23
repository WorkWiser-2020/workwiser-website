# Zapier Setup Guide: Netlify Forms to Google Sheets

This guide walks you through connecting the WorkWiser contact form (powered by Netlify Forms) to a Google Sheets spreadsheet via Zapier, plus setting up email notifications in Netlify. Complete these steps after the site is deployed to Netlify.

---

## Part 1: Netlify Email Notifications

Set up instant email alerts every time someone submits the contact form.

1. Log in to your Netlify account at **app.netlify.com**
2. Navigate to your site (e.g., "workwiser")
3. Go to **Site configuration** (or "Site settings") in the top menu
4. In the left sidebar, click **Notifications** (under "Integrations" or "Site configuration")
5. Click **Add notification** and select **Email notification**
6. In the notification settings:
   - **Event:** Form submission received
   - **Form:** select `contact`
   - **Email to notify:** `info@workwiser.io`
7. Click **Save**

From this point forward, every contact form submission will trigger an email to info@workwiser.io.

---

## Part 2: Zapier — Netlify Forms to Google Sheets

Log every submission as a row in a Google Sheets spreadsheet for tracking and reporting.

> **Note:** Zapier's free tier allows 100 tasks/month. For a B2B contact form, this is more than sufficient.

### Prerequisites

- A Zapier account (free at zapier.com)
- A Google Sheets spreadsheet with these column headers in row 1:
  `First Name | Last Name | Job Title | Company Name | Email | Location | Message`

### Steps

1. **Log in to Zapier** at zapier.com (create a free account if you don't have one)
2. Click **"Create"** then select **"Zaps"** to start building a new Zap
3. **Set the Trigger:**
   - Search for **"Netlify"** in the app search box
   - Select the **Netlify** app
   - Choose the event: **"New Form Submission"**
   - Click **Continue**
4. **Connect your Netlify account:**
   - Click **"Sign in to Netlify"**
   - Authorize Zapier via OAuth (you'll be redirected to Netlify)
   - After authorization, return to Zapier
5. **Configure the trigger:**
   - **Site:** select your WorkWiser site
   - **Form:** select `contact`
   - Click **Continue**
6. **Test the trigger:**
   - Before testing, submit a test entry on your deployed site (visit `/contact` and fill out the form)
   - Back in Zapier, click **"Test trigger"** — you should see the test submission data
   - If no data appears, submit the form again and retry the test
7. **Set the Action:**
   - Search for **"Google Sheets"** in the app search box
   - Select the **Google Sheets** app
   - Choose the event: **"Create Spreadsheet Row"**
   - Click **Continue**
8. **Connect your Google account:**
   - Click **"Sign in to Google"**
   - Authorize Zapier to access Google Sheets
9. **Configure the action:**
   - **Drive:** My Google Drive (or the drive where your spreadsheet lives)
   - **Spreadsheet:** select your target spreadsheet
   - **Worksheet:** select the correct tab/sheet
10. **Map form fields to columns:**
    | Zapier field (from Netlify) | Google Sheets column |
    |-----------------------------|----------------------|
    | `firstName`                 | Column A (First Name) |
    | `lastName`                  | Column B (Last Name) |
    | `jobTitle`                  | Column C (Job Title) |
    | `company`                   | Column D (Company Name) |
    | `email`                     | Column E (Email) |
    | `location`                  | Column F (Location) |
    | `message`                   | Column G (Message) |
11. **Test the action:**
    - Click **"Test action"** — verify a new row appears in your Google Sheet with the test data
12. **Name and activate the Zap:**
    - Give the Zap a descriptive name, e.g. `WorkWiser Contact Form -> Google Sheets`
    - Click **"Publish"** to turn it on

Your Zap is now live. Every new form submission will automatically appear as a new row in your Google Sheet.

---

## Troubleshooting

- **No data in test trigger:** Make sure you submitted the form on the *deployed* Netlify site (not localhost). Netlify Forms only captures submissions on the live domain.
- **Fields show as blank in Sheets:** Re-check the field mapping in step 10. The field IDs from Netlify match the `name` attributes on the form inputs.
- **Zap hits 100-task limit:** Upgrade to Zapier Starter or consider Netlify's built-in webhook to Google Sheets via Apps Script as an alternative.
