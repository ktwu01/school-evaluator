# Requirements Document

## Introduction

The School Evaluator is a web application designed to help prospective students make informed decisions about school offers by providing a comprehensive comparison tool. The application allows users to input various factors for different school offers (tuition, scholarships, living costs, program details, and personal preferences) and provides a comparative analysis with calculated metrics like ROI and weighted scores to answer the key question: "Is this school worth attending?"

## Requirements

### Requirement 1: School Data Input

**User Story:** As a prospective student, I want to input detailed information about school offers, so that I can compare them systematically.

#### Acceptance Criteria

1. WHEN a user visits the application THEN the system SHALL display input forms for at least two schools
2. WHEN a user enters school information THEN the system SHALL accept the following data fields:
   - School name (text input)
   - Annual tuition cost in USD (numeric input)
   - Annual scholarship amount in USD (numeric input)
   - Annual living cost in USD (numeric input)
   - Program length in years (numeric input)
   - Expected post-graduation salary in USD per year (numeric input)
3. WHEN a user enters qualitative preferences THEN the system SHALL accept ratings on a 1-10 scale for:
   - School reputation
   - Location preference
   - Program fit
4. WHEN a user provides invalid input THEN the system SHALL display appropriate validation messages
5. WHEN a user clears a form THEN the system SHALL reset all fields to empty state

### Requirement 2: Financial Calculations

**User Story:** As a prospective student, I want to see calculated financial metrics for each school, so that I can understand the true cost and return on investment.

#### Acceptance Criteria

1. WHEN a user enters complete school data THEN the system SHALL calculate net annual cost as (tuition - scholarship + living cost)
2. WHEN a user enters complete school data THEN the system SHALL calculate total program cost as (net annual cost × program length)
3. WHEN a user enters salary expectations THEN the system SHALL calculate estimated 5-year ROI as ((5-year salary - total program cost) / total program cost × 100)
4. WHEN calculations are performed THEN the system SHALL display results in a clear, formatted manner with currency symbols and percentage signs
5. WHEN input data changes THEN the system SHALL automatically recalculate all metrics in real-time

### Requirement 3: Comparative Analysis

**User Story:** As a prospective student, I want to see a side-by-side comparison of schools with clear recommendations, so that I can easily identify the better option.

#### Acceptance Criteria

1. WHEN two schools have complete data THEN the system SHALL display a comparison table showing all metrics side by side
2. WHEN comparing schools THEN the system SHALL calculate a weighted score using the formula: (reputation × 0.3 + location × 0.2 + program fit × 0.3 + normalized ROI × 0.2)
3. WHEN displaying comparison results THEN the system SHALL highlight the school with better financial metrics using visual indicators
4. WHEN displaying comparison results THEN the system SHALL highlight the school with higher weighted score using visual indicators
5. WHEN one school significantly outperforms another THEN the system SHALL display a clear recommendation message

### Requirement 4: User Experience and Interface

**User Story:** As a user, I want an intuitive and responsive interface, so that I can easily navigate and use the comparison tool on any device.

#### Acceptance Criteria

1. WHEN a user accesses the application THEN the system SHALL display a responsive design that works on desktop, tablet, and mobile devices
2. WHEN a user interacts with form elements THEN the system SHALL provide immediate visual feedback for focus states and validation
3. WHEN a user views results THEN the system SHALL use clear visual hierarchy with appropriate typography and spacing
4. WHEN a user needs help THEN the system SHALL provide tooltips or help text for complex fields
5. WHEN a user completes the comparison THEN the system SHALL provide options to reset or modify inputs easily

### Requirement 5: Internationalization Support

**User Story:** As a user who speaks different languages, I want to use the application in my preferred language, so that I can understand all content clearly.

#### Acceptance Criteria

1. WHEN a user visits the application THEN the system SHALL detect and display content in the appropriate locale (English, Spanish, French, Japanese, Chinese)
2. WHEN displaying currency amounts THEN the system SHALL format numbers according to the user's locale while maintaining USD as the base currency
3. WHEN displaying text content THEN the system SHALL use the appropriate translations from the locale files
4. WHEN switching languages THEN the system SHALL preserve user input data while updating the interface language
5. WHEN displaying calculated results THEN the system SHALL format percentages and numbers according to locale conventions

### Requirement 6: Data Persistence and State Management

**User Story:** As a user, I want my input data to be preserved during my session, so that I don't lose my work if I accidentally refresh or navigate away.

#### Acceptance Criteria

1. WHEN a user enters data THEN the system SHALL store input values in browser local storage
2. WHEN a user refreshes the page THEN the system SHALL restore previously entered data from local storage
3. WHEN a user clears data THEN the system SHALL remove stored data from local storage
4. WHEN a user has incomplete data THEN the system SHALL save partial entries and restore them on page load
5. WHEN local storage is not available THEN the system SHALL gracefully degrade and function without persistence