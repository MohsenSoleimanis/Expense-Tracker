// The survey definition as data (mirrors ux-research/05-survey-instrument.md).
// Edit here to change questions — App.jsx renders everything from this schema.
//
// Question types:
//   'single'   — pick one (radio).            allowOther: true adds an "Other" text box
//   'multi'    — pick many (checkbox).        allowOther: true adds an "Other" text box
//   'likert5'  — 1..5 agree scale
//   'number'   — numeric (used for price, with prefix '$')
//   'text'     — free text (textarea)
//
// Conditional display:
//   section.showIf(responses) -> boolean   (skip a whole section)
//   question.showIf(responses) -> boolean  (skip one question)

const isTracker = (r) => r.A1 !== 'No, never'

export const survey = {
  title: 'How do you keep track of your spending?',
  intro:
    "This anonymous survey takes about 5 minutes. There are no right answers — we just want to understand real habits. Please don't enter any account or card numbers. You can skip any question.",
  likertAnchors: ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'],
  sections: [
    {
      id: 'A',
      title: 'A little context',
      questions: [
        {
          id: 'A1',
          type: 'single',
          label: 'Do you currently keep track of your personal spending in any way?',
          options: ['Yes, regularly', 'Yes, on and off', 'No, but I used to', 'No, never'],
        },
        {
          id: 'A2',
          type: 'multi',
          label: 'Which methods have you used? (select all that apply)',
          options: [
            'A budgeting/expense app',
            'A spreadsheet',
            'Notes app / paper',
            "My bank's own app",
            'Just in my head',
          ],
          allowOther: true,
        },
        {
          id: 'A3',
          type: 'multi',
          label: 'Which apps have you tried? (select all that apply)',
          options: [
            'Monarch',
            'YNAB',
            'Copilot',
            'Rocket Money',
            'PocketGuard',
            'Monefy',
            'Money Manager',
            'Mint (before it closed)',
          ],
          allowOther: true,
          showIf: (r) => (r.A2 || []).includes('A budgeting/expense app'),
        },
      ],
    },
    {
      id: 'B',
      title: 'Your habits',
      showIf: isTracker,
      questions: [
        {
          id: 'B1',
          type: 'single',
          label: 'How often do you record or review your spending?',
          options: ['Multiple times a day', 'Daily', 'A few times a week', 'Weekly', 'Rarely'],
        },
        {
          id: 'B2',
          type: 'single',
          label: 'How do you usually record an expense?',
          options: [
            'Automatically (bank sync)',
            'Manually, myself',
            'A mix of both',
            "I don't record individual expenses",
          ],
        },
        {
          id: 'B3',
          type: 'single',
          label: 'How soon after spending do you usually record it?',
          options: ['Right at the moment', 'Same day', 'Within a few days', "I don't record it"],
        },
      ],
    },
    {
      id: 'C',
      title: 'Awareness vs. effort',
      showIf: isTracker,
      questions: [
        {
          id: 'C1',
          type: 'likert5',
          label: 'Recording my spending myself makes me more aware of where my money goes.',
        },
        { id: 'C2', type: 'likert5', label: 'Keeping my spending records updated feels like a chore.' },
        {
          id: 'C3',
          type: 'likert5',
          label: 'When an app tracks my spending automatically, I pay less attention to it.',
        },
      ],
    },
    {
      id: 'D',
      title: 'Starting and stopping',
      showIf: isTracker,
      questions: [
        {
          id: 'D1',
          type: 'single',
          label: 'Have you ever started using a spending tracker/app and then stopped?',
          options: ['Yes', 'No'],
        },
        {
          id: 'D2',
          type: 'single',
          label: 'What was the main reason you stopped?',
          options: [
            'Too tedious to keep up',
            'I kept forgetting',
            'It got too complicated',
            'Bank sync kept breaking',
            "I didn't trust it with my data",
            'It was too expensive',
            "I didn't find it useful",
            'I no longer needed it — I had my spending under control',
          ],
          allowOther: true,
          showIf: (r) => r.D1 === 'Yes',
        },
      ],
    },
    {
      id: 'E',
      title: 'Trust',
      questions: [
        {
          id: 'E1',
          type: 'single',
          label: 'How comfortable are you linking an app directly to your bank account?',
          options: [
            'Very uncomfortable',
            'Somewhat uncomfortable',
            'Neutral',
            'Somewhat comfortable',
            'Very comfortable',
          ],
        },
        {
          id: 'E2',
          type: 'single',
          label: 'What worries you most about a money app?',
          options: [
            'Being charged / hard to cancel',
            'Losing my data',
            'Privacy of my bank login',
            'It being inaccurate',
            'Nothing really worries me',
          ],
        },
        {
          id: 'E3',
          type: 'single',
          label: "Have you ever been frustrated by a money app's billing or subscription?",
          options: ['Yes', 'No', 'Never used a paid one'],
        },
      ],
    },
    {
      id: 'F',
      title: 'How money feels',
      questions: [
        {
          id: 'F1',
          type: 'likert5',
          label: "Sometimes I avoid checking my bank balance because I don't want to see it.",
        },
      ],
    },
    {
      id: 'G',
      title: 'Value & price (optional)',
      questions: [
        {
          id: 'G1',
          type: 'single',
          label: 'Have you ever paid for a budgeting/expense app?',
          options: ['Yes', 'No'],
        },
        {
          id: 'G2',
          type: 'number',
          prefix: '$',
          suffix: '/month',
          label: 'At what monthly price would this kind of app be SO EXPENSIVE you would not consider it?',
        },
        {
          id: 'G3',
          type: 'number',
          prefix: '$',
          suffix: '/month',
          label: 'At what price would it be EXPENSIVE, but you would still consider it?',
        },
        {
          id: 'G4',
          type: 'number',
          prefix: '$',
          suffix: '/month',
          label: 'At what price would it be a GOOD VALUE?',
        },
        {
          id: 'G5',
          type: 'number',
          prefix: '$',
          suffix: '/month',
          label: 'At what price would it be SO CHEAP you would question its quality?',
        },
      ],
    },
    {
      id: 'H',
      title: 'In your own words',
      questions: [
        {
          id: 'H1',
          type: 'text',
          label: 'What is the single most frustrating thing about keeping track of your spending?',
        },
        {
          id: 'H2',
          type: 'text',
          label: 'If a money app could do ONE thing perfectly for you, what would it be?',
        },
      ],
    },
    {
      id: 'I',
      title: 'About you (optional)',
      questions: [
        {
          id: 'I1',
          type: 'single',
          label: 'Age range',
          options: ['18–24', '25–34', '35–44', '45–54', '55+'],
        },
        { id: 'I2', type: 'text', label: 'Country / region', single: true },
        {
          id: 'I3',
          type: 'single',
          label: 'Life situation',
          options: ['Student', 'Employed', 'Freelance / self-employed', 'Not working'],
          allowOther: true,
        },
        {
          id: 'I4',
          type: 'single',
          label: 'Household',
          options: ['Live alone', 'With partner', 'With family', 'Shared / roommates'],
        },
      ],
    },
  ],
}
