// =====================================================
// LARGIFY SOLUTIONS - TYPE DEFINITIONS
// =====================================================

// =====================================================
// CORE TYPES
// =====================================================

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string; // Computed field: firstName + lastName
  phone?: string;
  avatarUrl?: string;
  profileImage?: string; // Additional high-resolution profile image URL
  title?: string; // Job title/position
  department?: string; // Department assignment
  bio?: string; // Professional biography
  isActive: boolean;
  status?: 'available' | 'busy' | 'away' | 'offline'; // Current availability status
  lastLogin?: Date;
  joinDate?: Date; // When they joined the company
  createdAt: Date;
  updatedAt?: Date; // Last modification timestamp
  role?: Role;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Record<string, unknown>;
  isSystemRole: boolean;
}

export type LeadSource = 'website' | 'booking' | 'linkedin' | 'referral' | 'cold_outreach' | 'event' | 'other';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'won' | 'lost' | 'dormant';
export type BusinessSize = 'solo' | 'micro' | 'small' | 'medium' | 'large';
export type ProjectType = 'erp_implementation' | 'custom_software' | 'security_audit' | 'consultation' | 'support_retainer' | 'other';
export type ProjectStatus = 'draft' | 'planning' | 'in_progress' | 'on_hold' | 'review' | 'completed' | 'cancelled';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

// =====================================================
// CRM TYPES
// =====================================================

export interface Company {
  id: string;
  name: string;
  industry?: string;
  website?: string;
  email?: string;
  phone?: string;
  size?: BusinessSize;
  address?: string;
  city?: string;
  country?: string;
  linkedinUrl?: string;
  logoUrl?: string;
  notes?: string;
  companyCode?: string;
  status?: 'active' | 'inactive' | 'prospect';
  annualRevenue?: number;
  employeeCount?: number;
  foundedYear?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  id: string;
  companyId?: string;
  company?: Company;
  firstName: string;
  lastName: string;
  fullName?: string; // Computed field: firstName + lastName
  email?: string;
  phone?: string;
  jobTitle?: string;
  linkedinUrl?: string;
  isPrimary: boolean;
  notes?: string;
  createdAt: Date;
}

export interface Lead {
  id: string;
  companyId?: string;
  company?: Company;
  contactId?: string;
  contact?: Contact;
  source: LeadSource;
  status: LeadStatus;
  serviceInterest?: string;
  problemSummary?: string;
  budgetRange?: string;
  timeline?: string;
  score: number;
  estimatedValue: number; // Estimated deal value
  assignedTo?: string;
  assignedToId?: string;
  assignedUser?: User;
  convertedAt?: Date;
  lostReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  companyId: string;
  company?: Company;
  leadId?: string;
  clientCode: string;
  status: string;
  contractStart?: Date;
  contractEnd?: Date;
  paymentTerms?: string;
  accountManager?: string;
  accountManagerUser?: User;
  totalRevenue: number;
  notes?: string;
  clientTier?: string;
  annualContractValue?: number;
  renewalDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Communication {
  id: string;
  leadId?: string;
  clientId?: string;
  contactId?: string;
  userId?: string;
  user?: User;
  type: string;
  direction?: 'inbound' | 'outbound';
  subject?: string;
  content?: string;
  scheduledAt?: Date;
  completedAt?: Date;
  outcome?: string;
  createdAt: Date;
}

// =====================================================
// BOOKING TYPES
// =====================================================

export interface BookingService {
  id: string;
  name: string;
  description?: string;
  durationMinutes: number;
  price?: number;
  isActive: boolean;
  color?: string;
}

export interface AvailabilitySlot {
  id: string;
  userId: string;
  dayOfWeek?: number;
  startTime: string;
  endTime: string;
  timezone: string;
  isRecurring: boolean;
  specificDate?: Date;
}

export interface Booking {
  id: string;
  serviceId?: string;
  service?: BookingService;
  leadId?: string;
  assignedTo?: string;
  guestCompany?: string;
  guestName: string;
  customerName: string; // Alias for guestName
  guestEmail: string;
  customerEmail: string; // Alias for guestEmail
  guestPhone?: string;
  guestBusinessSize?: BusinessSize;
  problemSummary?: string;
  scheduledStart: Date;
  scheduledEnd: Date;
  scheduledDate: string; // Formatted date string
  scheduledTime: string; // Formatted time string
  timezone: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  meetingLink?: string;
  notes?: string;
  emailConfirmed: boolean;
  createdAt: Date;
}

// =====================================================
// PROJECT TYPES
// =====================================================

export interface Project {
  id: string;
  clientId: string;
  client?: Client;
  projectCode: string;
  name: string;
  description?: string;
  type: ProjectType;
  status: ProjectStatus;
  priority: Priority;
  startDate?: Date;
  targetEndDate?: Date;
  endDate?: Date; // Alias for targetEndDate
  actualEndDate?: Date;
  budget?: number;
  actualCost: number;
  projectManager?: string;
  projectManagerUser?: User;
  progressPercentage: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMember {
  projectId: string;
  userId: string;
  user?: User;
  role?: string;
  hourlyRate?: number;
  allocatedHours?: number;
  joinedAt: Date;
}

export interface Milestone {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  dueDate?: Date;
  completedDate?: Date;
  status: 'pending' | 'in_progress' | 'completed';
  deliverables?: string[];
  paymentLinked: boolean;
  paymentAmount?: number;
  orderIndex: number;
}

export interface Task {
  id: string;
  projectId: string;
  project?: Project;
  milestoneId?: string;
  milestone?: Milestone;
  parentTaskId?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  assignedTo?: string;
  assignedToId?: string; // Alias for assignedTo
  assignedUser?: User;
  estimatedHours?: number;
  actualHours: number;
  startDate?: Date;
  dueDate?: Date;
  completedAt?: Date;
  tags?: string[];
  orderIndex: number;
  createdAt: Date;
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId?: string;
  user?: User;
  content: string;
  attachments?: unknown[];
  createdAt: Date;
}

export interface TimeEntry {
  id: string;
  taskId?: string;
  task?: Task;
  projectId: string;
  project?: Project;
  userId: string;
  user?: User;
  description?: string;
  hours: number;
  date: Date;
  billable: boolean;
  billed: boolean;
}

// =====================================================
// TEAM TYPES
// =====================================================

export interface Employee {
  id: string;
  userId: string;
  user?: User;
  employeeCode: string;
  department?: string;
  position?: string;
  jobTitle?: string; // Job title/position display name
  employmentType?: 'full_time' | 'part_time' | 'contractor';
  hireDate?: Date;
  terminationDate?: Date;
  status?: 'active' | 'on_leave' | 'inactive'; // Employment status
  salary?: number;
  salaryCurrency: string;
  hourlyRate?: number;
  skills?: string[];
  certifications?: string[];
  performanceNotes?: string;
  createdAt: Date;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employee?: Employee;
  type: string;
  startDate: Date;
  endDate: Date;
  daysCount: number;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
  approvedBy?: string;
  approvedAt?: Date;
  notes?: string;
  createdAt: Date;
}

// =====================================================
// FINANCE TYPES
// =====================================================

export interface Quotation {
  id: string;
  quotationNumber: string;
  clientId?: string;
  client?: Client;
  leadId?: string;
  projectId?: string;
  companyId?: string;
  title: string;
  description?: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  currency: string;
  issueDate?: Date;
  validUntil?: Date;
  acceptedAt?: Date;
  termsConditions?: string;
  notes?: string;
  items?: QuotationItem[];
  companyLogo?: string;
  companyName?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyAddress?: string;
  companyWebsite?: string;
  createdAt: Date;
}

export interface QuotationItem {
  id: string;
  quotationId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  orderIndex: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId?: string;
  client?: Client;
  projectId?: string;
  project?: Project;
  quotationId?: string;
  milestoneId?: string;
  title?: string;
  status: 'draft' | 'sent' | 'paid' | 'partial' | 'overdue' | 'cancelled';
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  totalAmount: number; // Alias for total
  amountPaid: number;
  currency: string;
  issueDate?: Date;
  dueDate?: Date;
  paidAt?: Date;
  terms?: string;
  notes?: string;
  items?: InvoiceItem[];
  createdAt: Date;
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  orderIndex: number;
}

export interface Payment {
  id: string;
  invoiceId?: string;
  invoice?: Invoice;
  clientId?: string;
  client?: Client;
  amount: number;
  currency: string;
  method?: string;
  reference?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentDate: Date;
  notes?: string;
  createdAt: Date;
}

export interface Expense {
  id: string;
  projectId?: string;
  project?: Project;
  category: string;
  description: string;
  amount: number;
  currency: string;
  vendor?: string;
  receiptUrl?: string;
  expenseDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed';
  approvedBy?: string;
  tags?: string[];
  submittedBy?: string;
  createdAt: Date;
}

// =====================================================
// KNOWLEDGE BASE TYPES
// =====================================================

export interface KnowledgeCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  icon?: string;
  orderIndex: number;
  documents?: KnowledgeDocument[];
}

export interface KnowledgeDocument {
  id: string;
  categoryId?: string;
  category?: KnowledgeCategory;
  title: string;
  slug: string;
  content?: string;
  type: 'article' | 'sop' | 'template' | 'architecture';
  status: 'draft' | 'published' | 'archived';
  isInternal: boolean;
  visibility: string;
  tags?: string[];
  version: number;
  viewsCount: number;
  authorId?: string;
  author?: User;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// =====================================================
// NOTIFICATION TYPES
// =====================================================

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message?: string;
  link?: string;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

// =====================================================
// DASHBOARD TYPES
// =====================================================

export interface DashboardStats {
  totalLeads: number;
  activeLeads: number; // Active leads count
  newLeadsThisMonth: number;
  totalClients: number;
  activeProjects: number;
  totalRevenue: number;
  revenueThisMonth: number;
  pendingInvoices: number;
  overdueInvoices: number;
  upcomingBookings: number;
  tasksInProgress: number;
  tasksDueToday: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface LeadsBySource {
  source: LeadSource;
  count: number;
  percentage: number;
}

export interface ProjectsByStatus {
  status: ProjectStatus;
  count: number;
}
// =====================================================
// CLIENT PORTAL TYPES
// =====================================================

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  logoUrl?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  website?: string;
  industry?: string;
  employeesCount?: number;
  budgetCurrency: string;
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: Date;
  notes?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientApplication {
  id: string;
  clientId: string;
  type: 'project_inquiry' | 'support_request' | 'consultation_request' | 'partnership_proposal';
  title: string;
  description?: string;
  status: 'new' | 'in_progress' | 'under_review' | 'approved' | 'rejected' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo?: string;
  submittedAt: Date;
  reviewedAt?: Date;
  completedAt?: Date;
  notes?: string;
  attachments?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientProject {
  id: string;
  clientId: string;
  projectId: string;
  project?: Project;
  accessGrantedAt: Date;
  accessRevokedAt?: Date;
  isActive: boolean;
  lastViewed?: Date;
  viewCount: number;
  status: 'active' | 'archived' | 'revoked';
  createdAt: Date;
}

export interface ClientTaskTracking {
  id: string;
  clientId: string;
  taskId: string;
  task?: Task;
  isVisibleToClient: boolean;
  viewCount: number;
  lastViewed?: Date;
  lastUpdateNotification?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// =====================================================
// CMS TYPES
// =====================================================

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  description?: string;
  status: 'draft' | 'published' | 'archived';
  isPublished: boolean;
  publishedAt?: Date;
  authorId?: string;
  sections?: CMSSection[];
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSSection {
  id: string;
  pageId: string;
  type: 'hero' | 'services' | 'features' | 'testimonials' | 'cta' | 'faq' | 'stats';
  title?: string;
  subtitle?: string;
  content: Record<string, any>;
  orderIndex: number;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSService {
  id: string;
  slug?: string;
  title: string;
  description: string;
  shortDescription?: string;
  category?: string;
  iconType?: string;
  price?: number;
  priceModel?: string;
  features?: string[];
  benefits?: string[];
  processSteps?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  technologies?: string[];
  deliverables?: string[];
  timeline?: string;
  imageUrl?: string;
  isPublished: boolean;
  isFeatured?: boolean;
  orderIndex?: number;
  usedInProjects?: number;
  usedByClients?: number;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSCaseStudy {
  id: string;
  slug: string;
  companyName: string;
  industry?: string;
  title: string;
  excerpt?: string;
  challenge?: string;
  solution?: string;
  results: Array<{ metric: string; label: string }>;
  testimonialQuote?: string;
  testimonialAuthor?: string;
  testimonialRole?: string;
  tags?: string[];
  imageUrl?: string;
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: Date;
  authorId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSTestimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  authorCompany?: string;
  authorAvatarUrl?: string;
  rating: number; // 1-5
  isPublished: boolean;
  isFeatured: boolean;
  orderIndex?: number;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSFAQ {
  id: string;
  category?: string;
  question: string;
  answer: string;
  orderIndex?: number;
  isPublished: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSTeamMember {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  bio?: string;
  expertise?: string[];
  avatarUrl?: string;
  linkedinUrl?: string;
  email?: string;
  isPublished: boolean;
  orderIndex?: number;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSProduct {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  iconType?: string;
  features: string[];
  benefits: string[];
  pricing?: {
    model: string;
    startingPrice?: string;
    plans?: Array<{
      name: string;
      price: string;
      features: string[];
      isPopular?: boolean;
    }>;
  };
  technologies?: string[];
  useCases?: string[];
  screenshots?: string[];
  demoUrl?: string;
  documentationUrl?: string;
  isPublished: boolean;
  isFeatured: boolean;
  orderIndex?: number;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSCertification {
  id: string;
  providerName: string;
  certificationName: string;
  description?: string;
  logoUrl?: string;
  certificationUrl?: string;
  issuedDate?: Date;
  expiryDate?: Date;
  certificationId?: string;
  isActive: boolean;
  isPublished: boolean;
  orderIndex?: number;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CMSServiceProvider {
  id: string;
  companyName: string;
  providerType: 'cloud' | 'consulting' | 'integration' | 'infrastructure';
  certificationLevel?: 'partner' | 'preferred' | 'premium';
  certifications?: string[];
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  services?: string[];
  isPublished: boolean;
  isFeatured: boolean;
  orderIndex?: number;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

// =====================================================
// PROJECT MANAGEMENT - CLIENT ONBOARDING & LIFECYCLE
// =====================================================

export type ProjectPhaseType = 
  | 'Qualification'
  | 'Pre-Contract Alignment'
  | 'Contract & Commercials'
  | 'Client System Setup'
  | 'Discovery & Technical Intake'
  | 'Architecture & Planning'
  | 'Execution Kickoff'
  | 'Delivery & Review'
  | 'Go-Live & Handover'
  | 'Post-Launch & Retention';

export type PhaseStatus = 'pending' | 'in_progress' | 'completed' | 'blocked';
export type MilestoneStatus = 'pending' | 'in_progress' | 'completed' | 'on_hold';
export type CommunicationType = 'meeting' | 'email' | 'call' | 'feedback' | 'document_review';
export type DocumentType = 'proposal' | 'contract' | 'architecture' | 'design' | 'requirements' | 'wireframes' | 'specification' | 'other';

export interface ProjectPhase {
  id: string;
  projectId: string;
  phaseNumber: number; // 1-10
  phaseName: ProjectPhaseType;
  status: PhaseStatus;
  startDate?: Date;
  expectedEndDate?: Date;
  actualEndDate?: Date;
  completionPercentage: number; // 0-100
  notes?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectChecklistItem {
  id: string;
  projectPhaseId: string;
  itemText: string;
  isCompleted: boolean;
  completedBy?: string;
  completedAt?: Date;
  notes?: string;
  orderIndex?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  milestoneName: string;
  description?: string;
  milestoneDate?: Date;
  status: MilestoneStatus;
  deliverables?: string[];
  acceptanceCriteria?: string;
  reviewNotes?: string;
  clientApproved: boolean;
  clientApprovalDate?: Date;
  orderIndex?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectCommunication {
  id: string;
  projectId: string;
  communicationType: CommunicationType;
  communicationDate: Date;
  subject?: string;
  notes: string;
  attendees?: string[];
  loggedBy: string;
  isClientFacing: boolean;
  createdAt: Date;
}

export interface ProjectDocument {
  id: string;
  projectId: string;
  documentType: DocumentType;
  documentName: string;
  documentUrl?: string;
  uploadedBy: string;
  isClientApproved: boolean;
  version: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectPaymentMilestone {
  id: string;
  projectId: string;
  milestoneNumber: number;
  milestoneName: string;
  amount: number;
  dueDate?: Date;
  paidDate?: Date;
  status: PaymentStatus;
  invoiceId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectLifecycle {
  phases: ProjectPhase[];
  milestones: ProjectMilestone[];
  communications: ProjectCommunication[];
  documents: ProjectDocument[];
  paymentMilestones: ProjectPaymentMilestone[];
  currentPhaseNumber: number;
  currentPhaseCompletion: number;
}

// =====================================================
// TASK & MILESTONE ASSIGNMENTS
// =====================================================

export type TaskAssignmentStatus = 'assigned' | 'in_progress' | 'completed' | 'blocked';
export type AssignmentPriority = 'low' | 'medium' | 'high' | 'urgent';
export type MilestoneResponsibilityType = 'deliverable' | 'review' | 'approval' | 'coordination';

export interface TaskAssignment {
  id: string;
  taskId: string;
  assignedTo: string;
  assignedBy?: string;
  status: TaskAssignmentStatus;
  priority: AssignmentPriority;
  startDate?: Date;
  dueDate: Date;
  estimatedHours?: number;
  actualHours?: number;
  completionNotes?: string;
  completedAt?: Date;
  assignedAt: Date;
  updatedAt: Date;
  task?: Task;
  assignee?: User;
}

export interface MilestoneAssignment {
  id: string;
  milestoneId: string;
  assignedTo: string;
  assignedBy?: string;
  status: TaskAssignmentStatus;
  responsibilityType: MilestoneResponsibilityType;
  startDate?: Date;
  dueDate: Date;
  completionNotes?: string;
  completedAt?: Date;
  assignedAt: Date;
  updatedAt: Date;
  milestone?: ProjectMilestone;
  assignee?: User;
}

export interface EmployeeWorkload {
  userId: string;
  user?: User;
  assignedTasks: TaskAssignment[];
  assignedMilestones: MilestoneAssignment[];
  tasksCompleted: number;
  tasksInProgress: number;
  tasksBlocked: number;
  upcomingDeadlines: (TaskAssignment | MilestoneAssignment)[];
}
// =====================================================
// PROJECT MANAGEMENT - MODULES & TEAM ASSIGNMENTS
// =====================================================

export type ModuleType = 'custom' | 'design' | 'development' | 'testing' | 'deployment';
export type ModuleStatus = 'planned' | 'in_progress' | 'completed' | 'blocked';

export interface ProjectModule {
  id: string;
  projectId: string;
  moduleName: string;
  description?: string;
  moduleType: ModuleType;
  orderIndex: number;
  status: ModuleStatus;
  startDate?: Date;
  endDate?: Date;
  budgetAllocated?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectTeamMember {
  id: string;
  projectId: string;
  userId: string;
  role: string;
  responsibility?: string;
  allocationPercentage: number;
  startDate?: Date;
  endDate?: Date;
  assignedAt: Date;
  user?: User;
}

export type PaymentType = 'advance' | 'milestone' | 'final' | 'monthly';
export type PaymentStatus = 'pending' | 'due' | 'overdue' | 'paid' | 'cancelled';

export interface ProjectPayment {
  id: string;
  projectId: string;
  quotationId?: string;
  invoiceId?: string;
  paymentType: PaymentType;
  milestoneId?: string;
  amount: number;
  currency: string;
  paymentDate?: Date;
  dueDate?: Date;
  status: PaymentStatus;
  paymentMethod?: string;
  referenceNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  quotation?: Quotation;
  invoice?: Invoice;
  milestone?: ProjectMilestone;
}