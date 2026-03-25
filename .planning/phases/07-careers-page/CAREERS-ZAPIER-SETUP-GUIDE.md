# Zapier Setup Guide: Careers Form to Google Sheets

This guide walks you through connecting the WorkWiser careers application form (powered by Netlify Forms) to your existing recruitment Google Sheet via Zapier, plus setting up email notifications in Netlify. Complete these steps after the site is deployed to Netlify.

---

## Prerequisites

Before starting either Part 1 or Part 2, complete this step first.

**Create the "Website Applications" tab in your Google Sheet:**

1. Open your existing recruitment Google Sheet in Google Drive
2. At the bottom of the sheet, click the **+** button to add a new tab
3. Name the tab exactly **Website Applications** (no trailing spaces, capitalisation matters)
4. In row 1 of that tab, add these column headers in order:
   `Full Name | Email | Phone | Location | Role of Interest | Experience Level | LinkedIn/Resume | Cover Message`

> **Why do this first?** Zapier reads available worksheet tabs at setup time. If the "Website Applications" tab does not exist when you configure the Zap, it will not appear in the Worksheet dropdown. Create it now to avoid having to reconnect later.

---

## Part 1: Netlify Email Notifications

Set up instant email alerts every time someone submits the careers application form.

1. Log in to your Netlify account at **app.netlify.com**
2. Navigate to your site (e.g., "workwiser")
3. Go to **Site configuration** (or "Site settings") in the top menu
4. In the left sidebar, click **Notifications** (under "Integrations" or "Site configuration")
5. Click **Add notification** and select **Email notification**
6. In the notification settings:
   - **Event:** Form submission received
   - **Form:** select `careers`
   - **Email to notify:** `recruitment@workwiser.io`
7. Click **Save**

From this point forward, every careers form submission will trigger an email to recruitment@workwiser.io.

---

## Part 2: Zapier — Netlify Forms to Google Sheets

Log every application as a row in the "Website Applications" tab of your recruitment spreadsheet.

> **Note:** Zapier's free tier allows 100 tasks/month. For a job application form, this is more than sufficient.

### What you need

- A Zapier account (free at zapier.com)
- Your existing recruitment Google Sheet with the "Website Applications" tab set up (see Prerequisites above)

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
   - **Form:** select `careers` — do NOT select "All forms", as this would merge careers and contact submissions into the same Zap and mix job applications with client enquiries
   - Click **Continue**
6. **Test the trigger:**
   - Before testing, submit a test entry on your deployed site (visit `/careers` and fill out the form)
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
   - **Spreadsheet:** select your existing recruitment spreadsheet
   - **Worksheet:** select **Website Applications**
10. **Map form fields to columns:**
    | Zapier field (from Netlify) | Google Sheets column |
    |-----------------------------|----------------------|
    | `fullName`                  | Column A (Full Name) |
    | `email`                     | Column B (Email) |
    | `phone`                     | Column C (Phone) |
    | `location`                  | Column D (Location) |
    | `role`                      | Column E (Role of Interest) |
    | `experience`                | Column F (Experience Level) |
    | `linkedin`                  | Column G (LinkedIn/Resume) |
    | `coverMessage`              | Column H (Cover Message) |
11. **Test the action:**
    - Click **"Test action"** — verify a new row appears in the "Website Applications" tab with the test data
12. **Name and activate the Zap:**
    - Give the Zap a descriptive name, e.g. `WorkWiser Careers Form -> Google Sheets`
    - Click **"Publish"** to turn it on

Your Zap is now live. Every new careers application will automatically appear as a new row in the "Website Applications" tab.

---

## Troubleshooting

- **No data in test trigger:** Make sure you submitted the form on the *deployed* Netlify site (not localhost). Netlify Forms only captures submissions on the live domain.
- **Fields show as blank in Sheets:** Re-check the field mapping in step 10. The field IDs from Netlify match the `name` attributes on the form inputs (`fullName`, `email`, `phone`, `location`, `role`, `experience`, `linkedin`, `coverMessage`).
- **Worksheet tab not visible in Zapier:** The "Website Applications" tab must exist in the spreadsheet *before* running Zap setup. Zapier reads available worksheets at authorization time. If you created the tab after connecting your Google account, disconnect and reconnect the Google Sheets action step to refresh the list.
- **Form submissions mixing with contact form:** Confirm the Zapier trigger is set to form name `careers`, not "All forms". If it was set to "All forms", edit the trigger, change it to `careers`, save, and re-test.
- **Zap hits 100-task limit:** Upgrade to Zapier Starter or consider Netlify's built-in webhook to Google Sheets via Apps Script as an alternative.
