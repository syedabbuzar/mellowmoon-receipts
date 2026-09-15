# MellowMoon Receipts

MellowMoon SoftTech Pvt. Ltd. — Internship Receipt Generator Portal

Build a premium, professional Frontend UI/UX only for an internal Internship & Training Receipt Management Portal for:

MellowMoon SoftTech Pvt. Ltd.

VERY IMPORTANT

This task is ONLY for the frontend UI.

DO NOT BUILD:

Backend

API

Database

Authentication backend

Firebase

Supabase

LocalStorage

SessionStorage

IndexedDB

Any persistence mechanism

Any real API calls

I will build the backend separately later.

The frontend must be designed in a way that a REST API/backend can easily be connected later.

Use realistic mock/static data only to demonstrate the UI.

TECH STACK

Use:

React

TypeScript

Vite

Tailwind CSS

React Router

Lucide React icons

Do not use:

TanStack Router

TanStack Query

Backend frameworks

Database libraries

Keep the code clean, modular and production-quality.

MAIN PRODUCT

Create a professional internal portal called:

MellowMoon Receipt Manager

Purpose:

The company admin will use this portal to create and manage receipts for students enrolled in:

Training + Internship

The final product should look like a real SaaS/admin dashboard, not a basic form.

DESIGN DIRECTION

MellowMoon SoftTech branding:

Premium

Corporate

Modern

Minimal

Professional

Dark Navy + Gold

Clean typography

Elegant cards

Subtle shadows

Smooth but minimal animations

No cartoon UI

No excessive gradients

No unnecessary animations

Dashboard can use a dark premium theme.

The actual receipt preview should be:

White

Clean

A4 document style

Professional

Print-friendly

APPLICATION LAYOUT

Create:

┌─────────────────────────────────────────────────────┐
│ Sidebar                  │ Main Content              │
│                          │                           │
│ MellowMoon Logo          │ Page Header               │
│                          │                           │
│ Dashboard                │                           │
│ Create Receipt           │                           │
│ Receipts                 │                           │
│ Students                 │                           │
│ Courses                  │                           │
│ Program Types            │                           │
│ Durations                │                           │
│ Settings                 │                           │
│                          │                           │
└─────────────────────────────────────────────────────┘


Sidebar should be collapsible.

Responsive mobile sidebar/drawer.

1. DASHBOARD UI

Create a premium dashboard.

Header:

Dashboard
Welcome back, Admin


Statistics cards:

Total Receipts
Paid Receipts
Pending Receipts
Total Fee
Total Collected
Total Pending


Use mock data only for UI demonstration.

Example:

Total Receipts       125
Paid Receipts         90
Pending Receipts      35

Total Fee             ₹5,75,000
Collected             ₹4,50,000
Pending               ₹1,25,000


Add a recent receipts table:

Receipt No.
Student
Course
Total Fee
Paid
Pending
Status
Date
Action


Add:

View All Receipts


button.

2. CREATE RECEIPT PAGE

This is the most important page.

Create a professional form with a two-column layout.

Left:

Receipt form.

Right:

Live receipt preview.

Desktop:

┌──────────────────────────┬───────────────────────────┐
│ Receipt Details          │ Receipt Preview            │
│                          │                           │
│ Student Information      │                           │
│ Internship Information   │       A4 Receipt          │
│ Payment Information      │                           │
│                          │                           │
│ [Save Receipt]           │                           │
└──────────────────────────┴───────────────────────────┘


On mobile, stack them vertically.

3. STUDENT INFORMATION UI

Create a card:

Student Information

Fields:

Student Full Name *
College / University Name *
Course / Degree *
Year / Semester *
Email *
Mobile Number *


Use professional input fields.

Add proper frontend validation states.

Show:

Normal

Focus

Error

Disabled

states.

4. PROGRAM INFORMATION

Create:

Internship Information

Fields:

Program Type *
Internship Course *
Duration *
Start Date *
End Date
Batch / Reference


Program Type initial UI options:

Training + Internship
Internship
Training
Custom


5. INTERNSHIP COURSE UI

Initial options:

Python Full Stack
Python & Agentic AI
MERN Full Stack
Data Analytics
Java Full Stack


The UI must be designed so that future backend data can populate this dropdown.

Do not permanently couple the UI to these courses.

Create a separate:

Courses Management

page.

6. DURATION UI

Initial options:

2 Months
6 Months
Custom


The UI must support future dynamic options.

When selecting:

2 Months


show:

Start Date: 12/09/2026
End Date: 12/11/2026


When selecting:

6 Months


show:

Start Date: 12/09/2026
End Date: 12/03/2027


For frontend demonstration, implement the end-date calculation in the UI.

When:

Custom


is selected, enable the End Date input.

The eventual backend can handle the final business logic later.

7. PAYMENT INFORMATION UI

Create:

Payment Information

Fields:

Total Fee *
Amount Paid *
Pending Amount
Payment Mode
Transaction ID / UTR


IMPORTANT:

Total Fee must be manually entered.

Do NOT hardcode any fee.

Example:

Total Fee: ₹15,000
Amount Paid: ₹5,000


The UI should instantly display:

Pending Amount: ₹10,000


And:

Payment Status: Pending


If:

Total Fee: ₹15,000
Amount Paid: ₹15,000


display:

Pending Amount: ₹0
Payment Status: Paid


Pending amount must be visually read-only.

8. PAYMENT STATUS UI

Do not make status a normal manually editable input.

Display it as a dynamic status badge.

Example:

🟡 Pending


or:

🟢 Paid


Use the status consistently across:

Form

Receipt Preview

Receipt Table

Dashboard

Student Profile

9. PAYMENT MODE

Dropdown:

UPI
Cash
Bank Transfer
Other


If:

UPI


or:

Bank Transfer


is selected, visually reveal:

Transaction ID / UTR


10. RECEIPT NUMBER UI

Receipt number should appear automatically in the UI.

Mock example:

MMST-2026-0001


Do not create backend logic.

Just create the frontend presentation/placeholder structure so the backend can later provide the actual receipt number.

Receipt number should be displayed as read-only.

11. RECEIPT DATE

Show:

Receipt Date
12 September 2026


Default visually to the current date.

Allow editing from the UI.

12. LIVE RECEIPT PREVIEW

Create a high-quality A4 receipt preview.

The preview must update as the user changes the form.

Receipt structure:

--------------------------------------------------

             [MELLOWMOON LOGO]

          MELLOWMOON SOFTTECH
                Pvt. Ltd.

        Company Address
        Email | Phone | Website
        CIN

              PAYMENT RECEIPT

Receipt No: MMST-2026-0001
Receipt Date: 12 September 2026

--------------------------------------------------

STUDENT INFORMATION

Student Name
College / University
Course / Degree
Year / Semester
Email
Mobile

--------------------------------------------------

INTERNSHIP INFORMATION

Program
Internship Course
Duration
Start Date
End Date
Batch / Reference

--------------------------------------------------

PAYMENT INFORMATION

Total Fee                 ₹15,000
Amount Paid                ₹5,000
Pending Amount            ₹10,000

Payment Mode                    UPI
Transaction ID             XXXXXXX

Payment Status              PENDING

--------------------------------------------------

Received towards Training + Internship fees.

             For MellowMoon SoftTech Pvt. Ltd.

                 Authorized Signatory

--------------------------------------------------


Make the actual design much more polished than this textual representation.

13. COMPANY INFORMATION

Create:

Company Settings

Fields:

Company Name
Logo
Address
Email
Phone
Website
CIN


Use mock company information in the UI:

MellowMoon SoftTech Pvt. Ltd.


The settings page should look ready for future backend integration.

Do not persist changes using localStorage.

For now, changes can update React state only.

14. RECEIPTS PAGE

Create a professional receipt management table.

Header:

Receipts


Buttons:

+ Create Receipt


Search:

Search receipt number or student name...


Filters:

All
Paid
Pending


Date filter.

Table:

Receipt No.
Date
Student
Course
Total Fee
Paid
Pending
Status
Actions


Actions:

View
Edit
Print
Download
Delete


Use mock receipt data.

15. RECEIPT DETAILS PAGE

Create a detailed receipt page.

Display:

Receipt information

Student information

Internship information

Payment information

Include a large receipt preview.

Actions:

Download PDF
Print Receipt
Edit Receipt


16. STUDENTS PAGE

Create a student management UI.

Header:

Students


Button:

+ Add Student


Search:

Search student...


Table:

Student
College
Course
Email
Mobile
Total Fee
Paid
Pending
Status
Actions


Student details page should show:

Student Profile

Student Name
College
Course
Email
Mobile

Payment Summary

Total Fee
Paid
Pending
Status

Receipt History


Use mock data only.

17. COURSES MANAGEMENT PAGE

Create a complete course management UI.

Header:

Courses


Button:

+ Add Course


Table:

Course Name
Status
Created
Actions


Actions:

Edit
Activate
Deactivate
Delete


Add Course modal:

Course Name
Status

[Cancel]
[Add Course]


Initial mock courses:

Python Full Stack
Python & Agentic AI
MERN Full Stack
Data Analytics
Java Full Stack


Design the frontend so these will later come from an API.

18. PROGRAM TYPES PAGE

Create:

Program Types


Initial mock options:

Training + Internship
Internship
Training
Custom


Allow UI actions:

Add
Edit
Activate
Deactivate
Delete


No persistence for now.

19. DURATIONS PAGE

Create:

Duration Management


Initial:

2 Months
6 Months
Custom


Allow:

Add Duration
Edit
Activate
Deactivate
Delete


The UI should be future-backend ready.

20. SETTINGS PAGE

Sections:

Company Information

Company Name
Logo
Address
Email
Phone
Website
CIN


Receipt Settings

Receipt Prefix
Receipt Number Format
Default Date Format
Currency


Example:

Receipt Prefix: MMST
Currency: INR (₹)


Do not implement actual backend persistence.

21. PDF / PRINT UI

Add buttons:

Download PDF
Print Receipt


Implement frontend-only PDF/print functionality if possible.

The generated/printed receipt must contain ONLY the A4 receipt.

Do not include:

Sidebar

Dashboard

Buttons

Form

Navigation

22. MOCK DATA

Use a separate mock-data file.

Example:

mockReceipts.ts
mockStudents.ts
mockCourses.ts
mockProgramTypes.ts
mockDurations.ts


This is only for demonstrating the UI.

Make it easy to replace mock data with API responses later.

23. API-READY ARCHITECTURE

Even though NO API should be created now, structure the frontend cleanly for future backend integration.

For example:

src/
│
├── components/
│   ├── layout/
│   ├── dashboard/
│   ├── receipt/
│   ├── students/
│   ├── courses/
│   └── common/
│
├── pages/
│   ├── Dashboard.tsx
│   ├── CreateReceipt.tsx
│   ├── Receipts.tsx
│   ├── ReceiptDetails.tsx
│   ├── Students.tsx
│   ├── StudentDetails.tsx
│   ├── Courses.tsx
│   ├── ProgramTypes.tsx
│   ├── Durations.tsx
│   └── Settings.tsx
│
├── mock/
│   ├── receipts.ts
│   ├── students.ts
│   ├── courses.ts
│   ├── programTypes.ts
│   └── durations.ts
│
├── types/
│   └── index.ts
│
├── utils/
│   ├── calculations.ts
│   ├── dateUtils.ts
│   └── currency.ts
│
└── App.tsx


Keep data access separated from UI components so the backend/API can later replace the mock data without redesigning the UI.

24. COMPONENT REUSABILITY

Create reusable components:

Input
Select
DatePicker
CurrencyInput
StatusBadge
Modal
DataTable
SearchBar
FilterDropdown
StatCard
ReceiptPreview
ReceiptHeader
StudentInfoCard
PaymentSummary
EmptyState
ConfirmDialog
Toast


Do not duplicate UI code unnecessarily.

25. VALIDATION UI

Implement frontend validation for:

Required fields

Email

Mobile

Total Fee

Amount Paid

Dates

Example:

Total Fee is required
Amount Paid cannot be greater than Total Fee
Please enter a valid email address


Do not rely on backend validation because backend is not part of this task.

26. EMPTY STATES

Create professional empty states.

Example:

No receipts found

Create your first internship receipt to get started.

[Create Receipt]


Similarly for:

Students

Courses

Program Types

Durations

27. RESPONSIVE DESIGN

Desktop:

Premium dashboard experience.

Tablet:

Adaptive layout.

Mobile:

Collapsible sidebar

Single-column forms

Horizontal scrolling tables where necessary

Receipt preview optimized for small screens

Large touch-friendly buttons

28. ACCESSIBILITY

Use:

Proper labels

Keyboard navigation

Focus states

Semantic HTML

Accessible dialogs

Accessible buttons

Good contrast

29. IMPORTANT: NO LOCAL STORAGE

Do NOT use:

localStorage
sessionStorage
IndexedDB


Do not save data in browser storage.

Use React state and mock data only.

When the page refreshes, mock data can reset.

That is completely acceptable for this frontend-only phase.

30. IMPORTANT: NO API

Do NOT create:

fetch()
axios API calls
REST endpoints
GraphQL
Firebase
Supabase


The UI should only demonstrate the frontend experience.

31. FINAL QUALITY REQUIREMENT

The result should feel like a real professional internal product for:

MellowMoon SoftTech Pvt. Ltd.

Not a basic CRUD template.

Focus heavily on:

Excellent UI/UX

Professional spacing

Premium typography

Consistent design system

Responsive layouts

Clean receipt design

Live preview

Clear payment information

Professional tables

Useful dashboard

Reusable components

API-ready frontend architecture

The most important screen is:

Create Receipt + Live Receipt Preview

Make this screen exceptionally polished.

The backend will be developed separately later, so keep the frontend code clean and easy to connect to APIs in the future.


logo is attached name of company is MellowMoon SoftTech Pvt . Ltd .
cin :-U62013ME2026PTC475254
Email:- mellowmoonsofttech@gmail.com 
website :- www.mellwomoonsofttech.com 
Contact :- 91 7058123707
,7796442339

address : Baba nagar nanded . 
give me updated site

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/402477a1-c135-4cfb-8c67-7a2fb07d47ae).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
