# Design Document

## Overview

The School Evaluator enhancement will transform the existing placeholder component into a fully functional school comparison tool. The design leverages the existing Next.js architecture with TypeScript, Tailwind CSS, and the established UI component library. The application will provide real-time calculations, responsive design, and comprehensive comparison features while maintaining the existing internationalization support.

## Architecture

### Component Hierarchy
```
SchoolEvaluator (Main Container)
├── SchoolInputForm (Reusable form component)
│   ├── BasicInfoSection (School name, costs)
│   ├── PreferencesSection (Ratings with sliders)
│   └── ValidationDisplay (Error messages)
├── ComparisonResults (Results display)
│   ├── MetricsTable (Financial calculations)
│   ├── ScoreComparison (Weighted scores)
│   └── RecommendationBanner (Final recommendation)
└── ActionButtons (Calculate, Reset, Clear)
```

### State Management
- Use React's `useState` and `useEffect` hooks for local state management
- Implement custom hooks for calculations and local storage persistence
- Real-time calculation updates using derived state patterns

### Data Flow
1. User inputs data → Form validation → State update
2. State change → Trigger calculations → Update results
3. Results update → Display comparison → Show recommendations
4. State changes → Persist to localStorage → Restore on reload

## Components and Interfaces

### Core Data Types

```typescript
interface SchoolData {
  name: string;
  tuition: number;
  scholarship: number;
  livingCost: number;
  programLength: number;
  postGradSalary: number;
  reputation: number;
  location: number;
  programFit: number;
}

interface CalculatedMetrics {
  netAnnualCost: number;
  totalProgramCost: number;
  estimatedROI: number;
  weightedScore: number;
}

interface ComparisonResult {
  school1: SchoolData & CalculatedMetrics;
  school2: SchoolData & CalculatedMetrics;
  recommendation: {
    betterFinancially: 'school1' | 'school2' | 'tie';
    betterOverall: 'school1' | 'school2' | 'tie';
    message: string;
  };
}
```

### SchoolInputForm Component

**Purpose**: Reusable form component for entering school data
**Props**: 
- `schoolData: SchoolData`
- `onChange: (data: SchoolData) => void`
- `title: string`
- `t: (key: string) => string`

**Features**:
- Uses existing UI components (Input, Label, Slider, Card)
- Real-time validation with visual feedback
- Responsive grid layout for optimal mobile experience
- Tooltips for complex fields using existing Tooltip component

### ComparisonResults Component

**Purpose**: Display calculated metrics and comparison results
**Props**:
- `comparison: ComparisonResult | null`
- `t: (key: string) => string`

**Features**:
- Side-by-side comparison table
- Visual indicators for better performing school
- Formatted currency and percentage displays
- Responsive design with mobile-friendly stacking

### Custom Hooks

#### useSchoolCalculations
```typescript
const useSchoolCalculations = (school1: SchoolData, school2: SchoolData) => {
  // Returns calculated metrics and comparison results
  // Handles all financial calculations and weighted scoring
}
```

#### useLocalStorage
```typescript
const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Handles localStorage persistence with error handling
  // Returns [value, setValue] similar to useState
}
```

## Data Models

### Calculation Formulas

1. **Net Annual Cost**: `tuition - scholarship + livingCost`
2. **Total Program Cost**: `netAnnualCost × programLength`
3. **5-Year ROI**: `((postGradSalary × 5) - totalProgramCost) / totalProgramCost × 100`
4. **Weighted Score**: `(reputation × 0.3) + (location × 0.2) + (programFit × 0.3) + (normalizedROI × 0.2)`

### Normalization Logic
- ROI values will be normalized to 1-10 scale for weighted scoring
- Negative ROI values will be handled gracefully (minimum score of 1)
- All rating inputs constrained to 1-10 range with slider validation

### Data Validation Rules
- All numeric fields must be non-negative
- Program length must be between 0.5 and 10 years
- Salary expectations must be reasonable (> $0, < $1,000,000)
- Rating fields automatically constrained by slider components

## Error Handling

### Input Validation
- Real-time validation with immediate visual feedback
- Error messages displayed below invalid fields
- Form submission disabled until all validations pass
- Graceful handling of edge cases (empty fields, extreme values)

### Calculation Errors
- Division by zero protection in ROI calculations
- Handling of negative or unrealistic values
- Fallback values for incomplete data sets
- Clear error messages for calculation failures

### Storage Errors
- Graceful degradation when localStorage is unavailable
- Error boundaries to catch and handle component failures
- Fallback to session-only state if persistence fails

## Testing Strategy

### Unit Testing Focus Areas
1. **Calculation Logic**: Test all financial formulas with various input scenarios
2. **Validation Functions**: Test input validation with edge cases
3. **Custom Hooks**: Test localStorage persistence and calculation hooks
4. **Component Rendering**: Test component rendering with different prop combinations

### Integration Testing
1. **Form Interaction**: Test complete user workflows from input to results
2. **State Management**: Test state updates and persistence across page reloads
3. **Responsive Behavior**: Test component behavior across different screen sizes
4. **Internationalization**: Test translation loading and formatting in different locales

### Test Data Scenarios
- Complete valid data for both schools
- Partial data entry scenarios
- Edge cases (zero costs, very high salaries, extreme ratings)
- Invalid input handling
- Empty state and reset functionality

### Accessibility Testing
- Keyboard navigation through all form elements
- Screen reader compatibility for all interactive elements
- Color contrast validation for visual indicators
- Focus management and ARIA labels

## Performance Considerations

### Optimization Strategies
- Debounced calculations to prevent excessive re-renders during typing
- Memoization of expensive calculations using `useMemo`
- Lazy loading of non-critical components
- Efficient re-rendering using `useCallback` for event handlers

### Bundle Size Management
- Leverage existing UI components to avoid additional dependencies
- Tree-shaking optimization for unused translation keys
- Code splitting if component grows beyond reasonable size

### User Experience Optimizations
- Immediate visual feedback for all user interactions
- Progressive enhancement for advanced features
- Graceful loading states during calculations
- Smooth transitions and animations using existing Tailwind classes