// Mock data for civic issues - to be replaced with backend integration later
export const mockIssues = [
  {
    id: 1,
    title: "Pothole on Main Street",
    description: "Large pothole causing damage to vehicles near the intersection of Main St and Oak Ave",
    category: "Roads",
    status: "Pending",
    location: "Main St & Oak Ave",
    dateReported: "2025-01-15",
    reportedBy: "user123",
    adminAssigned: null,
    image: "https://via.placeholder.com/400x300/22c55e/ffffff?text=Pothole"
  },
  {
    id: 2,
    title: "Broken Street Light",
    description: "Street light has been out for over a week, creating safety concerns for pedestrians",
    category: "Utilities",
    status: "In Progress",
    location: "Park Avenue",
    dateReported: "2025-01-12",
    reportedBy: "user456",
    adminAssigned: "admin1",
    image: "https://via.placeholder.com/400x300/16a34a/ffffff?text=Street+Light"
  },
  {
    id: 3,
    title: "Overflowing Garbage Bins",
    description: "Multiple garbage bins in the park are overflowing, attracting pests and creating unsanitary conditions",
    category: "Waste",
    status: "Resolved",
    location: "Central Park",
    dateReported: "2025-01-10",
    reportedBy: "user789",
    adminAssigned: "admin2",
    image: "https://via.placeholder.com/400x300/15803d/ffffff?text=Garbage+Bins"
  },
  {
    id: 4,
    title: "Damaged Playground Equipment",
    description: "Swing set has broken chains and slide has sharp edges, posing safety risk to children",
    category: "Parks",
    status: "Pending",
    location: "Riverside Park",
    dateReported: "2025-01-14",
    reportedBy: "user321",
    adminAssigned: null,
    image: "https://via.placeholder.com/400x300/65a30d/ffffff?text=Playground"
  },
  {
    id: 5,
    title: "Water Main Leak",
    description: "Water continuously flowing from underground pipe, causing road damage and water waste",
    category: "Utilities",
    status: "In Progress",
    location: "Elm Street",
    dateReported: "2025-01-13",
    reportedBy: "user654",
    adminAssigned: "admin1",
    image: "https://via.placeholder.com/400x300/0ea5e9/ffffff?text=Water+Leak"
  }
];

export const issueCategories = [
  "Roads",
  "Utilities", 
  "Waste",
  "Parks",
  "Public Transportation",
  "Traffic Signals",
  "Sidewalks",
  "Street Cleaning",
  "Noise Complaints",
  "Other"
];

export const mockUsers = [
  {
    id: "user123",
    name: "John Doe",
    email: "john@example.com",
    role: "user"
  },
  {
    id: "user456", 
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user"
  },
  {
    id: "admin1",
    name: "Mike Johnson",
    email: "mike.admin@city.gov",
    role: "admin"
  },
  {
    id: "admin2",
    name: "Sarah Wilson",
    email: "sarah.admin@city.gov", 
    role: "admin"
  }
];

// Mock current user - will be managed by auth context later
export let currentUser = null;

export const setCurrentUser = (user) => {
  currentUser = user;
};

export const getCurrentUser = () => {
  return currentUser;
};