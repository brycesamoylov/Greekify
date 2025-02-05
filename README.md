# Greek Vocabulary Master

A modern web application for learning essential Greek vocabulary. Built with React, TypeScript, and Tailwind CSS.

## Features

### Word Lists
- **Basic Words**: Top 100 most common Greek words
- **Travel Words**: 50 essential words for travelers
- **Greetings**: 10 common Greek greetings and expressions

### Learning Tools
- **List View**: Browse words with their translations, phonetic pronunciations, and mnemonics
- **Flashcard View**: Practice words in an interactive flashcard format
- **Progress Tracking**: Mark words as learned and track your progress
- **Search Function**: Search across all categories in both English and Greek
- **Category Badges**: Visual indicators showing which category each word belongs to when searching

### User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface using Shadcn UI components
- **Progress Bar**: Visual representation of learning progress
- **View Toggle**: Switch between list and flashcard views

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/greek-vocab-master.git
```

2. Install dependencies:
```bash
cd greek-vocab-master
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Technology Stack

- **Frontend Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Build Tool**: Vite
- **State Management**: React Hooks

## Project Structure

```
greek-vocab-master/
├── client/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── lib/          # Word lists and utilities
│   │   ├── pages/        # Page components
│   │   └── App.tsx       # Root component
├── public/               # Static assets
└── package.json         # Project dependencies
```

## Word Lists

### Basic Words
The basic words list includes the 100 most commonly used Greek words, each with:
- Greek text
- English translation
- Phonetic pronunciation
- Mnemonic device for memorization

### Travel Words
50 essential words and phrases for travelers, including:
- Common questions
- Basic needs
- Directions
- Food and drink terms

### Greetings
10 essential Greek greetings and expressions for:
- Formal and informal situations
- Different times of day
- Common courtesies

## Features in Development

- Dark/Light theme toggle
- Audio pronunciation
- Practice quizzes
- Spaced repetition learning
- Custom word lists
- Progress statistics
- Mobile app version

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Word lists curated from various Greek language learning resources
- UI components from Shadcn UI
- Icons from Lucide React 