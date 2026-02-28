// =============================================================================
// CORE TYPES & INTERFACES
// =============================================================================

// User & Authentication Types
export interface UserInfo {
  name: string;
  email: string;
  userId: string;
}

export interface UserProfileData {
  name: string;
  email: string;
  profession?: string;
  goals?: string;
  country: string;
}

export interface ProfileData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  specialization: string;
  languages: string;
  teachingCategories: string;
}

// Course Types
export type CourseCategory =
  | "Web Development"
  | "Data Science"
  | "Design & UI/UX"
  | "DevOps & Cloud";

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type CourseStatus = "Published" | "Draft" | "Archived";

export interface Course {
  id: string | number;
  title?: string;
  name?: string;
  description?: string;
  creator?: string;
  category?: CourseCategory;
  level?: CourseLevel;
  rating?: number;
  students?: number;
  duration?: string;
  price?: number | string;
  img?: string;
  thumbnail_url?: string;
  published?: boolean;
  status?: CourseStatus;
  language?: string;
  nextLesson?: string;
  progress?: string;
}

// Module Types
export interface Module {
  id: string;
  title: string;
  description?: string;
  course_id: string;
  order_index: number;
  created_at: number;
}

export interface AddModuleRequest {
  course_id: string;
  title: string;
  description?: string;
}

// Wallet & Blockchain Types
export interface WalletConnectionResponse {
  isConnected: boolean;
}

export interface WalletAddressResponse {
  address: string;
}

export interface WalletAccessResponse {
  address?: string;
  error?: string;
}

export interface WalletError extends Error {
  message: string;
}

export interface FreighterResponse<T = unknown> {
  data?: T;
  error?: string;
}

export interface SaveProfileResponse {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

// Course Access Types
export interface CourseUser {
  address: string;
}

export interface CourseUsers {
  course_id: string;
  users: CourseUser[];
}

export interface ListUserCoursesResponse {
  courses: Course[];
  total: number;
}

export interface GetCoursesByInstructorResponse {
  courses: Course[];
  total: number;
}

// UI Component Types
export interface WelcomePageBlockProps {
  icon: React.ReactElement;
  text: string;
  figure: number;
}

export interface FeaturedCourseProps {
  id: number;
  title: string;
  description: string;
  img: string;
}

export interface CourseCardProps {
  course: Course;
}

export interface FilterState {
  searchTerm: string;
  selectedCategories: CourseCategory[];
  selectedLevels: CourseLevel[];
}

// Navigation Types
export interface DropdownMenuItem {
  title: string;
  icon: React.ReactElement;
  href: string;
}

export interface DefaultNavigationProps {
  onConnect: () => void;
  isConnecting: boolean;
}

export interface UserNavigationProps {
  userInfo: UserInfo;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  onDropdownItemClick: (href: string) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export interface UserDropdownProps {
  userInfo: UserInfo;
  onItemClick: (href: string) => void;
  setShowDropdown: (show: boolean) => void;
}

export interface NavbarMenuProps {
  variant?: "default" | "withUser";
  userInfo?: UserInfo;
}

// Instructor Types
export interface InstructorCourse {
  id: string | number;
  title: string;
  description: string;
  students: number;
  rating: number;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

export interface CoursesProps {
  courses: InstructorCourse[];
  onEdit: (course: InstructorCourse) => void;
  onDelete: (courseId: string | number) => void;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Form Types
export interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface FormState {
  isLoading: boolean;
  errors: Record<string, string>;
  values: Record<string, unknown>;
}

// Hook Return Types
export interface UseSaveProfileReturn {
  saveProfile: (data: ProfileData) => Promise<ContractResult | null>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

// Constants
export const COURSE_CATEGORIES: CourseCategory[] = [
  "Web Development",
  "Data Science",
  "Design & UI/UX",
  "DevOps & Cloud",
];

export const COURSE_LEVELS: CourseLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

export const COURSE_STATUSES: CourseStatus[] = [
  "Published",
  "Draft",
  "Archived",
];

//use save types

export interface ProfileData {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  specialization: string;
  languages: string;
  teachingCategories: string;
}

export interface FreighterResponse {
  error?: string;
}

export interface AddressResponse extends FreighterResponse {
  address: string;
}

export interface AllowedResponse extends FreighterResponse {
  isAllowed: boolean;
}

export interface SignTransactionResponse extends FreighterResponse {
  signedTxXdr: string;
  signerAddress: string;
}

export interface ContractResult {
  success: boolean;
  result?: unknown;
  hash: string;
}

export interface UseSaveProfileReturn {
  saveProfile: (profileData: ProfileData) => Promise<ContractResult | null>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  transactionHash: string | null;
  checkConnection: () => Promise<boolean>;
  retrievePublicKey: () => Promise<string>;
}

export interface UseWalletReturn {
  checkConnection: () => Promise<boolean>;
  retrievePublicKey: () => Promise<string>;
  getUserAddress: () => Promise<string>;
  signTransaction: (
    xdrString: string,
    networkPassphrase: string,
    signWith: string
  ) => Promise<string>;
}
