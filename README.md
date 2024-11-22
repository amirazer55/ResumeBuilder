# ResumeBuilder

**ResumeBuilder** is a modern, interactive web application built with **ReactJS**, **Vite**, and **shadcn-ui**, designed to help users create, preview, and customize resumes seamlessly. The app offers real-time updates, PDF downloads, and customization options to make resume building efficient and user-friendly.

---

## Features

- **Dynamic Form Builder**: Add personal details, skills, education, and work history.
- **Real-Time Preview**: Instantly preview your resume with real-time updates.
- **PDF Export**: Download your resume in a professionally formatted PDF file.
- **Customization Options**: Adjust fonts, sizes, and styles to suit your needs.
- **Auto-Save**: Automatically saves progress to local storage.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **User-Friendly UI**: Built with `shadcn-ui` for an elegant and intuitive user experience.

---

## Technologies Used

- **ReactJS**: Front-end library for building the UI.
- **Vite**: Fast development environment and build tool.
- **shadcn-ui**: UI library for consistent and customizable components.
- **TypeScript**: Strongly typed JavaScript for improved development experience.
- **React Hook Form**: Efficient form management and validation.
- **Zod**: Schema validation for forms.
- **Lodash**: Utility library for debounce functionality.
- **@react-pdf/renderer**: Generate PDF documents directly in the app.

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (or yarn)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/resume-builder.git
   cd resume-builder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open the app in your browser at [http://localhost:5173](http://localhost:5173).

---

## Scripts

- **Start Development Server**:
  ```bash
  npm run dev
  ```

- **Build for Production**:
  ```bash
  npm run build
  ```

- **Preview Production Build**:
  ```bash
  npm run preview
  ```

- **Lint Code**:
  ```bash
  npm run lint
  ```

---

## Project Structure

The project is structured as follows:

```plaintext
src/
├── _components/       # Reusable components like form and template
├── _utils/            # Utility files, schemas, and constants
├── shared/            # Shared components (e.g., PDF Preview)
├── Resume.tsx         # Main Resume component
├── Resume.service.ts  # Logic for managing state and form actions
├── main.tsx           # Entry point
└── styles/            # Global and component-specific styles
```

---

## Usage

1. **Fill in the Form**:
   Add personal details, skills, education, and work experience using the dynamic form.

2. **Customize Settings**:
   Open the settings dialog to customize font family and size.

3. **Preview Resume**:
   Switch to the preview tab to see how your resume will look.

4. **Export**:
   - Download your resume as a PDF using the "Download PDF" button.
   - Export your data as JSON for reuse.

5. **Save Progress**:
   Your progress is automatically saved in local storage.

---

## Dependencies

The app uses the following dependencies for development and production:

### Production Dependencies
- React, ReactDOM, and React Router
- TailwindCSS for styling
- React Hook Form and Zod for form handling and validation
- @react-pdf/renderer for PDF generation
- lodash for utility functions

### Development Dependencies
- Vite for development and build
- TypeScript for type safety
- ESLint and Prettier for code quality
- TailwindCSS for CSS styling

---
