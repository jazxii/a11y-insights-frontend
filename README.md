## A11y Insights Web App — UI Design Overview

This document summarizes all the **UI screens** designed for the A11y Insights application, focusing on a dark professional theme optimized for accessibility testers, developers, and managers.

---

### 🎯 Design Goals
- Professional dark theme with blue highlights
- Fully accessible (WCAG 2.2 AA compliant)
- Keyboard navigable and screen reader friendly
- Developer-focused layout with actionable sections
- Consistent Inter font with high contrast and modern UI

---

## 1️⃣ Dashboard Screen

### **Purpose:**
To provide an overview of all accessibility reports, insights, and metrics at a glance.

### **Layout Overview:**
- **Top Bar:** Logo (A11y Insights), search field, and profile/settings icon
- **Sidebar Navigation:** Dashboard, Upload/Analyze, Reports, Settings
- **Main Section:**
  - **Summary Cards:** Total Reports, Open Issues, Last Analysis Run
  - **Recent Reports Table:** Columns for Report Title, Date, Platform, Issues Found, and Status

### **Accessibility Considerations:**
- High color contrast (≥ 4.5:1)
- Visible keyboard focus states
- ARIA roles for cards and tables
- Semantic HTML structure

---

## 2️⃣ Upload / Analyze Screen

### **Purpose:**
To let users input accessibility analysis data either by **JIRA Ticket** or **User Story**.

### **Layout Overview:**
- **Top Toggle:** Analyze via JIRA Ticket | Analyze via User Story
- **Form Fields (JIRA Mode):**
  - Ticket ID *(required)*
  - Summary, Description *(optional)*
  - Collapsible Metadata section with Project, Pillar, Team, Assignee, Fix Version, Priority
  - **Button:** Analyze Ticket (high contrast blue)
- **Form Fields (User Story Mode):**
  - User Story Title, Description, Acceptance Criteria
  - Optional Metadata: Platform, Priority, Sprint, Labels
  - **Button:** Run Accessibility Analysis

### **Accessibility Considerations:**
- Labeled form inputs and ARIA descriptions
- Large clickable areas
- Keyboard shortcuts: Alt+J / Alt+U for toggle modes

---

## 3️⃣ Reports Screen

### **Purpose:**
To display a list of all generated accessibility reports and allow quick actions.

### **Layout Overview:**
- **Top Bar:** Logo, Search, Profile Icon
- **Sidebar Navigation:** Dashboard, Upload/Analyze, Reports *(active)*, Settings
- **Main Table:**
  - Columns: Report Title, Ticket ID, Platform, Date, Issues Found, Status
  - **Action Buttons (per row):** View Results, Edit, Export, Add to JIRA

### **Accessibility Considerations:**
- Proper table semantics with headers and ARIA roles
- Focus outlines and hover indicators
- Action buttons are keyboard navigable and screen reader labeled

---

## 4️⃣ Results Page

### **Purpose:**
To display detailed accessibility report results generated in Markdown and JSON formats.

### **Layout Overview:**
- **Breadcrumb:** Dashboard / Reports / Report Title / Ticket ID
- **Header Section:**
  - Title: Accessibility Analysis — [User Story / Ticket]
  - Metadata Chips: Platform, Date, Status, Ticket ID
  - Action Buttons: Edit Report, Add to JIRA, Export as Markdown, Export as PDF
- **Content Toggle:** Markdown View | JSON View
- **Markdown View:**
  - Displays structured accessibility report:
    - Accessibility Developer Checklist (with Intent, Examples, Implementation Tips, WCAG Reference)
    - Accessibility Acceptance Criteria (for JIRA)
- **JSON View:** Collapsible, syntax-highlighted JSON structure

### **Accessibility Considerations:**
- ARIA-live for view toggle feedback
- Keyboard shortcuts: Alt+M (Markdown), Alt+J (JSON), Alt+E (Edit), Alt+X (Export)
- Semantic sectioning (<main>, <section>, <article>)
- Resizable text and zoom-friendly

---

## 5️⃣ Overall Theme & Typography

- **Primary Color:** Blue (#1E88E5)
- **Background:** Deep Charcoal (#0E0E0E)
- **Cards / Panels:** #1A1A1A
- **Text:** White and light gray with strong contrast
- **Font:** Inter (16px base)
- **Button Style:** Rounded corners (8px), blue glow on hover

---

### ✅ Summary of User Flow
1. **Dashboard:** Overview of reports and key metrics.
2. **Upload/Analyze:** Enter JIRA ticket or user story details to run analysis.
3. **Reports:** View all past analyses with actions.
4. **Results:** Review Markdown or JSON accessibility report and export/share.

---

### 🧩 Future Enhancements
- Search and filter reports by WCAG criterion
- Integrate AI summary for findings
- Add team collaboration and report comments
- Real-time accessibility score visualization
