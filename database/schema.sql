-- =====================================================
-- LARGIFY SOLUTIONS - COMPLETE DATABASE SCHEMA
-- Business Operating System for SME Tech Company
-- =====================================================

-- =====================================================
-- CORE TABLES - Authentication & Users
-- =====================================================

-- Users table (for both employees and system access)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    user_type VARCHAR(50) DEFAULT 'employee', -- 'employee', 'customer', 'partner'
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer Profiles (linked to users for registration)
CREATE TABLE customer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    company_name VARCHAR(255),
    company_website VARCHAR(255),
    industry VARCHAR(100),
    business_size business_size,
    job_title VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    verification_token VARCHAR(255),
    verification_token_expires TIMESTAMP,
    verified_at TIMESTAMP,
    is_verified BOOLEAN DEFAULT false,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Roles table
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '{}',
    is_system_role BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User roles junction table
CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_by UUID REFERENCES users(id),
    PRIMARY KEY (user_id, role_id)
);

-- Sessions table for JWT management
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    device_info JSONB,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    revoked_at TIMESTAMP
);

-- Activity logs for audit trail
CREATE TABLE activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- CRM MODULE - Leads & Clients
-- =====================================================

-- Lead sources enum
CREATE TYPE lead_source AS ENUM (
    'website',
    'booking',
    'linkedin',
    'referral',
    'cold_outreach',
    'event',
    'other'
);

-- Lead status enum
CREATE TYPE lead_status AS ENUM (
    'new',
    'contacted',
    'qualified',
    'proposal_sent',
    'negotiation',
    'won',
    'lost',
    'dormant'
);

-- Business size enum
CREATE TYPE business_size AS ENUM (
    'solo',
    'micro',      -- 1-10 employees
    'small',      -- 11-50 employees
    'medium',     -- 51-200 employees
    'large'       -- 200+ employees
);

-- Companies/Organizations
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    website VARCHAR(255),
    size business_size,
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    linkedin_url VARCHAR(255),
    logo_url VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contacts (people at companies)
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    job_title VARCHAR(100),
    linkedin_url VARCHAR(255),
    linkedin_id VARCHAR(100),
    is_primary BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leads
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    source lead_source NOT NULL,
    status lead_status DEFAULT 'new',
    service_interest VARCHAR(100),
    problem_summary TEXT,
    budget_range VARCHAR(50),
    timeline VARCHAR(50),
    score INTEGER DEFAULT 0,
    estimated_value DECIMAL(15, 2),
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    converted_at TIMESTAMP,
    lost_reason TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CRM Clients (converted leads from CRM module)
CREATE TABLE crm_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    client_code VARCHAR(20) UNIQUE,
    status VARCHAR(50) DEFAULT 'active',
    contract_start DATE,
    contract_end DATE,
    payment_terms VARCHAR(50),
    account_manager UUID REFERENCES users(id) ON DELETE SET NULL,
    total_revenue DECIMAL(15, 2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Communication logs
CREATE TABLE communications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    crm_client_id UUID REFERENCES crm_clients(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    type VARCHAR(50) NOT NULL, -- email, call, meeting, whatsapp, linkedin
    direction VARCHAR(10), -- inbound, outbound
    subject VARCHAR(255),
    content TEXT,
    scheduled_at TIMESTAMP,
    completed_at TIMESTAMP,
    outcome VARCHAR(100),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- BOOKING SYSTEM
-- =====================================================

-- Service types for booking
CREATE TABLE booking_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration_minutes INTEGER DEFAULT 60,
    price DECIMAL(10, 2),
    is_active BOOLEAN DEFAULT true,
    color VARCHAR(7), -- hex color
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Availability slots
CREATE TABLE availability_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    day_of_week INTEGER, -- 0-6 (Sunday-Saturday)
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    is_recurring BOOLEAN DEFAULT true,
    specific_date DATE, -- for non-recurring slots
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES booking_services(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    -- Guest info (if not a lead yet)
    guest_company VARCHAR(255),
    guest_name VARCHAR(200),
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(20),
    guest_business_size business_size,
    problem_summary TEXT,
    -- Booking details
    scheduled_start TIMESTAMP NOT NULL,
    scheduled_end TIMESTAMP NOT NULL,
    timezone VARCHAR(50) DEFAULT 'UTC',
    status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, completed, cancelled, no_show
    meeting_link VARCHAR(500),
    notes TEXT,
    -- Notifications
    email_confirmed BOOLEAN DEFAULT false,
    reminder_sent BOOLEAN DEFAULT false,
    whatsapp_notified BOOLEAN DEFAULT false,
    -- Metadata
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- PROJECT MANAGEMENT MODULE
-- =====================================================

-- Project types
CREATE TYPE project_type AS ENUM (
    'erp_implementation',
    'custom_software',
    'security_audit',
    'consultation',
    'support_retainer',
    'other'
);

-- Project status
CREATE TYPE project_status AS ENUM (
    'draft',
    'planning',
    'in_progress',
    'on_hold',
    'review',
    'completed',
    'cancelled'
);

-- Projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crm_client_id UUID REFERENCES crm_clients(id) ON DELETE CASCADE,
    project_code VARCHAR(20) UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type project_type NOT NULL,
    status project_status DEFAULT 'draft',
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
    -- Dates
    start_date DATE,
    target_end_date DATE,
    actual_end_date DATE,
    -- Budget
    budget DECIMAL(15, 2),
    actual_cost DECIMAL(15, 2) DEFAULT 0,
    -- Team
    project_manager UUID REFERENCES users(id) ON DELETE SET NULL,
    -- Progress
    progress_percentage INTEGER DEFAULT 0,
    -- Metadata
    tags TEXT[],
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project team members
CREATE TABLE project_members (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50), -- developer, designer, analyst, etc.
    hourly_rate DECIMAL(10, 2),
    allocated_hours INTEGER,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    left_at TIMESTAMP,
    PRIMARY KEY (project_id, user_id)
);

-- Milestones
CREATE TABLE milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    completed_date DATE,
    status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, completed
    deliverables TEXT[],
    payment_linked BOOLEAN DEFAULT false,
    payment_amount DECIMAL(10, 2),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
    parent_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'todo', -- todo, in_progress, review, done
    priority VARCHAR(20) DEFAULT 'medium',
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    -- Time tracking
    estimated_hours DECIMAL(5, 2),
    actual_hours DECIMAL(5, 2) DEFAULT 0,
    -- Dates
    start_date DATE,
    due_date DATE,
    completed_at TIMESTAMP,
    -- Metadata
    tags TEXT[],
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Task comments
CREATE TABLE task_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    attachments JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Time entries
CREATE TABLE time_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    description TEXT,
    hours DECIMAL(5, 2) NOT NULL,
    date DATE NOT NULL,
    billable BOOLEAN DEFAULT true,
    billed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TEAM MANAGEMENT MODULE
-- =====================================================

-- Employees (extends users)
CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    employee_code VARCHAR(20) UNIQUE,
    department VARCHAR(100),
    position VARCHAR(100),
    employment_type VARCHAR(50), -- full_time, part_time, contractor
    hire_date DATE,
    termination_date DATE,
    -- Compensation
    salary DECIMAL(15, 2),
    salary_currency VARCHAR(3) DEFAULT 'USD',
    hourly_rate DECIMAL(10, 2),
    -- Contact
    emergency_contact_name VARCHAR(200),
    emergency_contact_phone VARCHAR(20),
    -- Skills
    skills TEXT[],
    certifications TEXT[],
    -- Performance
    performance_notes TEXT,
    -- Metadata
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employee documents
CREATE TABLE employee_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50), -- contract, id, certificate, etc.
    file_url VARCHAR(500),
    expiry_date DATE,
    notes TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leave/Time off requests
CREATE TABLE leave_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- vacation, sick, personal, etc.
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days_count DECIMAL(3, 1),
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
    reason TEXT,
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- EMPLOYEE PORTAL CONFIGURATION (FOR ADMIN CONTROL)
-- =====================================================

-- Feature flags for the employee portal modules
CREATE TABLE employee_portal_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_enabled BOOLEAN DEFAULT true,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Portal-specific roles (separate from system roles so admin can delegate safely)
CREATE TABLE employee_portal_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    permissions JSONB DEFAULT '{}', -- optional coarse-grained flags
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feature-level permissions per portal role
CREATE TABLE employee_portal_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portal_role_id UUID REFERENCES employee_portal_roles(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES employee_portal_features(id) ON DELETE CASCADE,
    allowed_actions TEXT[] DEFAULT ARRAY['view'], -- e.g. view, create, update, delete, approve
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_employee_portal_role_feature UNIQUE (portal_role_id, feature_id)
);

-- Assign portal roles to employees (managed via admin portal)
CREATE TABLE employee_portal_user_roles (
    employee_id UUID REFERENCES employees(id) ON DELETE CASCADE,
    portal_role_id UUID REFERENCES employee_portal_roles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES users(id) ON DELETE SET NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (employee_id, portal_role_id)
);

-- =====================================================
-- FINANCE MODULE
-- =====================================================

-- Quotations
CREATE TABLE quotations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_number VARCHAR(50) UNIQUE,
    crm_client_id UUID REFERENCES crm_clients(id) ON DELETE SET NULL,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    -- Details
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'draft', -- draft, sent, accepted, rejected, expired
    -- Amounts
    subtotal DECIMAL(15, 2) DEFAULT 0,
    tax_rate DECIMAL(5, 2) DEFAULT 0,
    tax_amount DECIMAL(15, 2) DEFAULT 0,
    discount_amount DECIMAL(15, 2) DEFAULT 0,
    total DECIMAL(15, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    -- Dates
    issue_date DATE,
    valid_until DATE,
    accepted_at TIMESTAMP,
    -- Metadata
    terms_conditions TEXT,
    notes TEXT,
    metadata JSONB,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quotation line items
CREATE TABLE quotation_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_id UUID REFERENCES quotations(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity DECIMAL(10, 2) DEFAULT 1,
    unit_price DECIMAL(15, 2) NOT NULL,
    total DECIMAL(15, 2) NOT NULL,
    order_index INTEGER DEFAULT 0
);

-- Invoices
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(50) UNIQUE,
    crm_client_id UUID REFERENCES crm_clients(id) ON DELETE SET NULL,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    quotation_id UUID REFERENCES quotations(id) ON DELETE SET NULL,
    milestone_id UUID REFERENCES milestones(id) ON DELETE SET NULL,
    -- Details
    title VARCHAR(255),
    status VARCHAR(50) DEFAULT 'draft', -- draft, sent, paid, partial, overdue, cancelled
    -- Amounts
    subtotal DECIMAL(15, 2) DEFAULT 0,
    tax_rate DECIMAL(5, 2) DEFAULT 0,
    tax_amount DECIMAL(15, 2) DEFAULT 0,
    discount_amount DECIMAL(15, 2) DEFAULT 0,
    total DECIMAL(15, 2) DEFAULT 0,
    amount_paid DECIMAL(15, 2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'USD',
    -- Dates
    issue_date DATE,
    due_date DATE,
    paid_at TIMESTAMP,
    -- Metadata
    terms TEXT,
    notes TEXT,
    metadata JSONB,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoice line items
CREATE TABLE invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity DECIMAL(10, 2) DEFAULT 1,
    unit_price DECIMAL(15, 2) NOT NULL,
    total DECIMAL(15, 2) NOT NULL,
    order_index INTEGER DEFAULT 0
);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
    crm_client_id UUID REFERENCES crm_clients(id) ON DELETE SET NULL,
    -- Details
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    method VARCHAR(50), -- bank_transfer, card, paypal, crypto, cash
    reference VARCHAR(100),
    status VARCHAR(50) DEFAULT 'completed', -- pending, completed, failed, refunded
    -- Dates
    payment_date DATE NOT NULL,
    -- Metadata
    notes TEXT,
    metadata JSONB,
    recorded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Expenses
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    -- Details
    category VARCHAR(100) NOT NULL, -- software, hardware, travel, office, marketing, etc.
    description TEXT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    -- Vendor
    vendor VARCHAR(255),
    receipt_url VARCHAR(500),
    -- Dates
    expense_date DATE NOT NULL,
    -- Approval
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, reimbursed
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    -- Metadata
    tags TEXT[],
    metadata JSONB,
    submitted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- KNOWLEDGE BASE MODULE
-- =====================================================

-- Document categories
CREATE TABLE knowledge_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE,
    description TEXT,
    parent_id UUID REFERENCES knowledge_categories(id) ON DELETE SET NULL,
    icon VARCHAR(50),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents/Articles
CREATE TABLE knowledge_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES knowledge_categories(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    content TEXT,
    type VARCHAR(50) DEFAULT 'article', -- article, sop, template, architecture
    status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
    -- Access
    is_internal BOOLEAN DEFAULT true,
    visibility VARCHAR(50) DEFAULT 'all', -- all, role_specific
    allowed_roles UUID[],
    -- Metadata
    tags TEXT[],
    version INTEGER DEFAULT 1,
    views_count INTEGER DEFAULT 0,
    -- Authorship
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    last_edited_by UUID REFERENCES users(id) ON DELETE SET NULL,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Document attachments
CREATE TABLE knowledge_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID REFERENCES knowledge_documents(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    file_size INTEGER,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- LINKEDIN INTEGRATION
-- =====================================================

-- LinkedIn connections/profiles
CREATE TABLE linkedin_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    linkedin_id VARCHAR(100) UNIQUE,
    linkedin_url VARCHAR(255),
    profile_data JSONB,
    last_synced_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LinkedIn messages/interactions
CREATE TABLE linkedin_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    linkedin_profile_id UUID REFERENCES linkedin_profiles(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    message_id VARCHAR(100),
    direction VARCHAR(10), -- inbound, outbound
    content TEXT,
    sent_at TIMESTAMP,
    imported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- NOTIFICATIONS & MESSAGING
-- =====================================================

-- Notification templates
CREATE TABLE notification_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- email, whatsapp, in_app
    subject VARCHAR(255),
    body TEXT NOT NULL,
    variables TEXT[], -- list of available variables
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    link VARCHAR(500),
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- SYSTEM CONFIGURATION
-- =====================================================

-- System settings
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- File uploads
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    file_path VARCHAR(500) NOT NULL,
    file_url VARCHAR(500),
    mime_type VARCHAR(100),
    file_size INTEGER,
    entity_type VARCHAR(50), -- project, task, client, etc.
    entity_id UUID,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active);

-- Activity logs
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);

-- Leads
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_assigned ON leads(assigned_to);
CREATE INDEX idx_leads_created ON leads(created_at);

-- Clients
CREATE INDEX idx_clients_company ON clients(company_id);
CREATE INDEX idx_clients_status ON clients(status);

-- Projects
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_manager ON projects(project_manager);

-- Tasks
CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_milestone ON tasks(milestone_id);

-- Employee portal
CREATE INDEX idx_employee_portal_user_roles_employee ON employee_portal_user_roles(employee_id);
CREATE INDEX idx_employee_portal_user_roles_role ON employee_portal_user_roles(portal_role_id);
CREATE INDEX idx_employee_portal_permissions_role ON employee_portal_permissions(portal_role_id);
CREATE INDEX idx_employee_portal_permissions_feature ON employee_portal_permissions(feature_id);

-- Bookings
CREATE INDEX idx_bookings_scheduled ON bookings(scheduled_start);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_email ON bookings(guest_email);

-- Invoices
CREATE INDEX idx_invoices_client ON invoices(client_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due ON invoices(due_date);

-- =====================================================
-- INITIAL DATA - ROLES
-- =====================================================

INSERT INTO roles (name, description, permissions, is_system_role) VALUES
('admin', 'Full system access', '{"all": true}', true),
('manager', 'Department management access', '{"crm": true, "projects": true, "team": true, "finance": {"view": true}}', true),
('developer', 'Development team member', '{"projects": true, "tasks": true, "knowledge": true}', true),
('finance', 'Finance department access', '{"finance": true, "clients": {"view": true}}', true),
('viewer', 'Read-only access', '{"view_only": true}', true);

-- =====================================================
-- INITIAL DATA - BOOKING SERVICES
-- =====================================================

INSERT INTO booking_services (name, description, duration_minutes, is_active, color) VALUES
('ERP Discovery Call', 'Initial consultation to understand your ERP needs and business processes', 45, true, '#3B82F6'),
('Custom Software Consultation', 'Discuss your custom software requirements and technical specifications', 60, true, '#10B981'),
('Security Assessment Intro', 'Overview of our security audit and hardening services', 30, true, '#EF4444'),
('General Consultation', 'General business and technology consultation', 30, true, '#8B5CF6');

-- =====================================================
-- INITIAL DATA - KNOWLEDGE CATEGORIES
-- =====================================================

INSERT INTO knowledge_categories (name, slug, description, icon, order_index) VALUES
('Standard Operating Procedures', 'sops', 'Company SOPs and processes', 'FileText', 1),
('Architecture Documents', 'architecture', 'System architecture and technical documentation', 'Code', 2),
('Templates', 'templates', 'Reusable document and code templates', 'Copy', 3),
('Client Documentation', 'client-docs', 'Client-specific system documentation', 'Users', 4),
('Security Guidelines', 'security', 'Security policies and best practices', 'Shield', 5);

-- =====================================================
-- INITIAL DATA - EMPLOYEE PORTAL
-- =====================================================

INSERT INTO employee_portal_features (key, name, description) VALUES
('projects', 'Projects', 'View and manage assigned projects'),
('tasks', 'Tasks', 'Work on project tasks and subtasks'),
('time_entries', 'Time Tracking', 'Log and review work hours'),
('leave', 'Leave & PTO', 'Request and track leave'),
('expenses', 'Expenses', 'Submit and track reimbursements'),
('knowledge', 'Knowledge Base', 'Access internal documentation'),
('profile', 'Profile & Documents', 'Manage personal info and documents');

INSERT INTO employee_portal_roles (name, description, permissions, is_default) VALUES
('Portal Admin', 'Full employee portal administration', '{"all": true}', false),
('Team Lead', 'Manage team tasks and approvals', '{"manage_team": true}', false),
('Employee', 'Standard employee self-service access', '{"self_service": true}', true);

-- Portal Admin: all actions on all features
INSERT INTO employee_portal_permissions (portal_role_id, feature_id, allowed_actions)
SELECT r.id, f.id, ARRAY['view','create','update','delete','approve']
FROM employee_portal_roles r
JOIN employee_portal_features f ON true
WHERE r.name = 'Portal Admin';

-- Team Lead: elevated actions for projects/tasks/approvals
WITH lead_perms AS (
    SELECT 'Team Lead'::text AS role_name, * FROM (VALUES
        ('projects', ARRAY['view','update']::TEXT[]),
        ('tasks', ARRAY['view','create','update','review']),
        ('time_entries', ARRAY['view','create','update']),
        ('leave', ARRAY['view','approve']),
        ('expenses', ARRAY['view','approve']),
        ('knowledge', ARRAY['view','create','update']),
        ('profile', ARRAY['view','update'])
    ) AS v(feature_key, actions)
)
INSERT INTO employee_portal_permissions (portal_role_id, feature_id, allowed_actions)
SELECT r.id, f.id, lp.actions
FROM lead_perms lp
JOIN employee_portal_roles r ON r.name = lp.role_name
JOIN employee_portal_features f ON f.key = lp.feature_key;

-- Employee: self-service access only
WITH employee_perms AS (
    SELECT 'Employee'::text AS role_name, * FROM (VALUES
        ('projects', ARRAY['view']::TEXT[]),
        ('tasks', ARRAY['view','update']),
        ('time_entries', ARRAY['view','create']),
        ('leave', ARRAY['view','create']),
        ('expenses', ARRAY['view','create']),
        ('knowledge', ARRAY['view']),
        ('profile', ARRAY['view','update'])
    ) AS v(feature_key, actions)
)
INSERT INTO employee_portal_permissions (portal_role_id, feature_id, allowed_actions)
SELECT r.id, f.id, ep.actions
FROM employee_perms ep
JOIN employee_portal_roles r ON r.name = ep.role_name
JOIN employee_portal_features f ON f.key = ep.feature_key;

-- =====================================================
-- CLIENT MANAGEMENT MODULE (Portal)
-- =====================================================
-- NOTE: This module is for external client portal users
-- CRM clients (internal converted leads) are in crm_clients table
-- =====================================================

-- Portal Clients table (separate portal user accounts for external customers)
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    company_name VARCHAR(255),
    password_hash VARCHAR(255) NOT NULL,
    logo_url VARCHAR(500),
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    website VARCHAR(500),
    industry VARCHAR(100),
    employees_count INTEGER,
    budget_currency VARCHAR(3) DEFAULT 'USD',
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP,
    notes TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Client applications/inquiries
CREATE TABLE client_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(100) NOT NULL, -- 'project_inquiry', 'support_request', 'consultation_request', 'partnership_proposal'
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'new', -- new, in_progress, under_review, approved, rejected, completed
    priority VARCHAR(50) DEFAULT 'medium', -- low, medium, high, urgent
    -- Assignment
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    -- Dates
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    completed_at TIMESTAMP,
    -- Tracking
    notes TEXT,
    attachments VARCHAR(500)[],
    tags TEXT[],
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Client project tracking (which projects/quotations are assigned to client)
CREATE TABLE client_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
    -- Access details
    access_granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    access_revoked_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    -- Tracking
    last_viewed TIMESTAMP,
    view_count INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active', -- active, archived, revoked
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(client_id, project_id)
);

-- Client task tracking
CREATE TABLE client_task_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
    -- Visibility
    is_visible_to_client BOOLEAN DEFAULT true,
    view_count INTEGER DEFAULT 0,
    last_viewed TIMESTAMP,
    -- Updates
    last_update_notification TIMESTAMP,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for client tables
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_is_active ON clients(is_active);
CREATE INDEX idx_client_applications_client_id ON client_applications(client_id);
CREATE INDEX idx_client_applications_status ON client_applications(status);
CREATE INDEX idx_client_applications_assigned_to ON client_applications(assigned_to);
CREATE INDEX idx_client_projects_client_id ON client_projects(client_id);
CREATE INDEX idx_client_projects_project_id ON client_projects(project_id);
CREATE INDEX idx_client_task_tracking_client_id ON client_task_tracking(client_id);
CREATE INDEX idx_client_task_tracking_task_id ON client_task_tracking(task_id);

-- =====================================================
-- TEAM & CERTIFICATIONS MODULE
-- =====================================================

-- Team Members
CREATE TABLE cms_team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    bio TEXT,
    expertise TEXT[],
    avatar_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    email VARCHAR(255),
    is_published BOOLEAN DEFAULT false,
    order_index INTEGER,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certified Service Providers
CREATE TABLE cms_certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    provider_name VARCHAR(255) NOT NULL,
    certification_name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url VARCHAR(500),
    certification_url VARCHAR(500),
    issued_date DATE,
    expiry_date DATE,
    certification_id VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    is_published BOOLEAN DEFAULT false,
    order_index INTEGER,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for team & certifications
CREATE INDEX idx_cms_team_members_published ON cms_team_members(is_published);
CREATE INDEX idx_cms_certifications_published ON cms_certifications(is_published);
CREATE INDEX idx_cms_certifications_active ON cms_certifications(is_active);

-- =====================================================
-- CMS MODULE - Content Management System
-- =====================================================

-- CMS Pages
CREATE TABLE cms_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CMS Sections (Hero, Services, Features, Testimonials, etc.)
CREATE TABLE cms_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID REFERENCES cms_pages(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(50) NOT NULL, -- hero, services, features, testimonials, cta, faq, stats
    title VARCHAR(255),
    subtitle TEXT,
    content JSONB NOT NULL DEFAULT '{}',
    order_index INTEGER NOT NULL,
    is_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CMS Services
CREATE TABLE cms_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_type VARCHAR(50), -- icon identifier
    features TEXT[],
    is_published BOOLEAN DEFAULT false,
    order_index INTEGER,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CMS Case Studies
CREATE TABLE cms_case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    challenge TEXT,
    solution TEXT,
    results JSONB DEFAULT '{}', -- array of {metric, label}
    testimonial_quote TEXT,
    testimonial_author VARCHAR(255),
    testimonial_role VARCHAR(255),
    tags TEXT[],
    image_url VARCHAR(500),
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CMS Testimonials
CREATE TABLE cms_testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quote TEXT NOT NULL,
    author_name VARCHAR(255) NOT NULL,
    author_role VARCHAR(255),
    author_company VARCHAR(255),
    author_avatar_url VARCHAR(500),
    rating INTEGER DEFAULT 5, -- 1-5 stars
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    order_index INTEGER,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CMS FAQs
CREATE TABLE cms_faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100),
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    order_index INTEGER,
    is_published BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CMS Team Members
CREATE TABLE cms_team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    department VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(500),
    email VARCHAR(255),
    linkedin_url VARCHAR(500),
    expertise TEXT[],
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    order_index INTEGER,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CMS Certified Service Providers
CREATE TABLE cms_service_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    provider_type VARCHAR(100) NOT NULL, -- cloud, consulting, integration, infrastructure
    certification_level VARCHAR(50), -- partner, preferred, premium
    certifications TEXT[],
    description TEXT,
    website_url VARCHAR(500),
    logo_url VARCHAR(500),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    services TEXT[], -- array of services they provide
    is_published BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    order_index INTEGER,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for CMS
CREATE INDEX idx_cms_pages_slug ON cms_pages(slug);
CREATE INDEX idx_cms_pages_status ON cms_pages(status);
CREATE INDEX idx_cms_sections_page_id ON cms_sections(page_id);
CREATE INDEX idx_cms_services_published ON cms_services(is_published);
CREATE INDEX idx_cms_case_studies_slug ON cms_case_studies(slug);
CREATE INDEX idx_cms_case_studies_featured ON cms_case_studies(is_featured);
CREATE INDEX idx_cms_testimonials_featured ON cms_testimonials(is_featured);
CREATE INDEX idx_cms_faqs_category ON cms_faqs(category);
CREATE INDEX idx_cms_team_members_featured ON cms_team_members(is_featured);
CREATE INDEX idx_cms_team_members_published ON cms_team_members(is_published);
CREATE INDEX idx_cms_service_providers_featured ON cms_service_providers(is_featured);
CREATE INDEX idx_cms_service_providers_type ON cms_service_providers(provider_type);

-- =====================================================
-- PROJECT MANAGEMENT - CLIENT ONBOARDING & LIFECYCLE
-- =====================================================

-- Project Phases (10-phase delivery model)
CREATE TABLE project_phases (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    phase_number INTEGER NOT NULL, -- 1-10
    phase_name VARCHAR(100) NOT NULL, -- e.g., "Qualification", "Pre-Contract Alignment"
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, in_progress, completed, blocked
    start_date TIMESTAMP,
    expected_end_date TIMESTAMP,
    actual_end_date TIMESTAMP,
    completion_percentage INTEGER DEFAULT 0,
    notes TEXT,
    assigned_to INTEGER REFERENCES employees(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Checklist Items (per phase)
CREATE TABLE project_checklist_items (
    id SERIAL PRIMARY KEY,
    project_phase_id INTEGER NOT NULL REFERENCES project_phases(id) ON DELETE CASCADE,
    item_text VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_by INTEGER REFERENCES employees(id),
    completed_at TIMESTAMP,
    notes TEXT,
    order_index INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Milestones (delivery gates)
CREATE TABLE project_milestones (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    milestone_name VARCHAR(150) NOT NULL,
    description TEXT,
    milestone_date TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, in_progress, completed, on_hold
    deliverables TEXT[], -- Array of deliverable descriptions
    acceptance_criteria TEXT,
    review_notes TEXT,
    client_approved BOOLEAN DEFAULT FALSE,
    client_approval_date TIMESTAMP,
    order_index INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Communications Log
CREATE TABLE project_communications (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    communication_type VARCHAR(50) NOT NULL, -- meeting, email, call, feedback
    communication_date TIMESTAMP NOT NULL,
    subject VARCHAR(200),
    notes TEXT NOT NULL,
    attendees TEXT[], -- JSON array of attendee names
    logged_by INTEGER NOT NULL REFERENCES employees(id),
    is_client_facing BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Documents
CREATE TABLE project_documents (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- proposal, contract, architecture, design, etc.
    document_name VARCHAR(200) NOT NULL,
    document_url VARCHAR(500),
    uploaded_by INTEGER NOT NULL REFERENCES employees(id),
    is_client_approved BOOLEAN DEFAULT FALSE,
    version INTEGER DEFAULT 1,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Payment Milestones
CREATE TABLE project_payment_milestones (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    milestone_number INTEGER NOT NULL,
    milestone_name VARCHAR(150) NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    due_date DATE,
    paid_date DATE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, due, overdue, paid
    invoice_id INTEGER REFERENCES invoices(id),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_project_phases_project_id ON project_phases(project_id);
CREATE INDEX idx_project_phases_status ON project_phases(status);
CREATE INDEX idx_project_checklist_items_phase_id ON project_checklist_items(project_phase_id);
CREATE INDEX idx_project_milestones_project_id ON project_milestones(project_id);
CREATE INDEX idx_project_milestones_status ON project_milestones(status);
CREATE INDEX idx_project_communications_project_id ON project_communications(project_id);
CREATE INDEX idx_project_communications_date ON project_communications(communication_date);
CREATE INDEX idx_project_documents_project_id ON project_documents(project_id);
CREATE INDEX idx_project_payment_milestones_project_id ON project_payment_milestones(project_id);
CREATE INDEX idx_project_payment_milestones_status ON project_payment_milestones(status);

-- =====================================================
-- PROJECT MANAGEMENT - TASK & MILESTONE ASSIGNMENTS
-- =====================================================

-- Task assignments to employees
CREATE TABLE task_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES users(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed', 'blocked')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    start_date DATE,
    due_date DATE NOT NULL,
    estimated_hours DECIMAL(5, 2),
    actual_hours DECIMAL(5, 2),
    completion_notes TEXT,
    completed_at TIMESTAMP,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Milestone assignments to employees
CREATE TABLE milestone_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    milestone_id UUID REFERENCES project_milestones(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES users(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'assigned' CHECK (status IN ('assigned', 'in_progress', 'completed', 'blocked')),
    responsibility_type VARCHAR(50) DEFAULT 'deliverable' CHECK (responsibility_type IN ('deliverable', 'review', 'approval', 'coordination')),
    start_date DATE,
    due_date DATE NOT NULL,
    completion_notes TEXT,
    completed_at TIMESTAMP,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Task assignment tracking indexes
CREATE INDEX idx_task_assignments_assigned_to ON task_assignments(assigned_to);
CREATE INDEX idx_task_assignments_task_id ON task_assignments(task_id);
CREATE INDEX idx_task_assignments_status ON task_assignments(status);
CREATE INDEX idx_task_assignments_due_date ON task_assignments(due_date);

-- Milestone assignment tracking indexes
CREATE INDEX idx_milestone_assignments_assigned_to ON milestone_assignments(assigned_to);
CREATE INDEX idx_milestone_assignments_milestone_id ON milestone_assignments(milestone_id);
CREATE INDEX idx_milestone_assignments_status ON milestone_assignments(status);
CREATE INDEX idx_milestone_assignments_due_date ON milestone_assignments(due_date);

-- =====================================================
-- PROJECT MANAGEMENT - MODULES & TEAM ASSIGNMENTS
-- =====================================================

-- Project modules/custom sections
CREATE TABLE project_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    module_name VARCHAR(255) NOT NULL,
    description TEXT,
    module_type VARCHAR(50) DEFAULT 'custom' CHECK (module_type IN ('custom', 'design', 'development', 'testing', 'deployment')),
    order_index INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'blocked')),
    start_date DATE,
    end_date DATE,
    budget_allocated DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project team members with roles
CREATE TABLE project_team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(100) NOT NULL,
    responsibility TEXT,
    allocation_percentage DECIMAL(3, 1) DEFAULT 100.0,
    start_date DATE,
    end_date DATE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, user_id)
);

-- Manual payment tracking linked to project
CREATE TABLE project_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    quotation_id UUID REFERENCES quotations(id),
    invoice_id UUID REFERENCES invoices(id),
    payment_type VARCHAR(20) NOT NULL CHECK (payment_type IN ('advance', 'milestone', 'final', 'monthly')),
    milestone_id UUID REFERENCES project_milestones(id),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_date DATE,
    due_date DATE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'due', 'overdue', 'paid', 'cancelled')),
    payment_method VARCHAR(50),
    reference_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project modules indexes
CREATE INDEX idx_project_modules_project_id ON project_modules(project_id);
CREATE INDEX idx_project_modules_status ON project_modules(status);

-- Project team members indexes
CREATE INDEX idx_project_team_members_project_id ON project_team_members(project_id);
CREATE INDEX idx_project_team_members_user_id ON project_team_members(user_id);

-- Project payments indexes
CREATE INDEX idx_project_payments_project_id ON project_payments(project_id);
CREATE INDEX idx_project_payments_status ON project_payments(status);
CREATE INDEX idx_project_payments_due_date ON project_payments(due_date);
CREATE INDEX idx_project_payments_quotation_id ON project_payments(quotation_id);
CREATE INDEX idx_project_payments_invoice_id ON project_payments(invoice_id);

-- =====================================================
-- MESSAGING MODULE - Chat & Communication
-- =====================================================

-- Conversation types
CREATE TYPE conversation_type AS ENUM (
    'direct',           -- 1-to-1 messages
    'group',            -- Group conversations
    'admin_support',    -- Admin support channel
    'team'              -- Team conversation
);

-- Conversations table
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    type conversation_type DEFAULT 'direct',
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    description TEXT,
    is_archived BOOLEAN DEFAULT false,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversation participants
CREATE TABLE conversation_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member',  -- 'admin', 'moderator', 'member'
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_read_at TIMESTAMP,
    is_muted BOOLEAN DEFAULT false,
    UNIQUE(conversation_id, user_id)
);

-- Messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'text',  -- 'text', 'file', 'system', 'notification'
    attachments JSONB,  -- Array of file objects
    reply_to UUID REFERENCES messages(id) ON DELETE SET NULL,  -- For message threading
    is_edited BOOLEAN DEFAULT false,
    edited_at TIMESTAMP,
    is_deleted BOOLEAN DEFAULT false,
    deleted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Message reactions (for emoji/reactions)
CREATE TABLE message_reactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reaction VARCHAR(10) NOT NULL,  -- emoji or reaction name
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(message_id, user_id, reaction)
);

-- Message read receipts
CREATE TABLE message_read_receipts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(message_id, user_id)
);

-- =====================================================
-- MESSAGING INDEXES
-- =====================================================

CREATE INDEX idx_conversations_created_by ON conversations(created_by);
CREATE INDEX idx_conversations_created_at ON conversations(created_at);
CREATE INDEX idx_conversations_is_archived ON conversations(is_archived);

CREATE INDEX idx_conversation_participants_conversation_id ON conversation_participants(conversation_id);
CREATE INDEX idx_conversation_participants_user_id ON conversation_participants(user_id);
CREATE INDEX idx_conversation_participants_joined_at ON conversation_participants(joined_at);

CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);
CREATE INDEX idx_messages_is_deleted ON messages(is_deleted);
CREATE INDEX idx_messages_reply_to ON messages(reply_to);

CREATE INDEX idx_message_reactions_message_id ON message_reactions(message_id);
CREATE INDEX idx_message_reactions_user_id ON message_reactions(user_id);

CREATE INDEX idx_message_read_receipts_message_id ON message_read_receipts(message_id);
CREATE INDEX idx_message_read_receipts_user_id ON message_read_receipts(user_id);

-- =====================================================
-- INITIAL DATA - SYSTEM SETTINGS
-- =====================================================

INSERT INTO system_settings (key, value, description, is_public) VALUES
('company_name', '"Largify Solutions"', 'Company name', true),
('company_email', '"info@largifysolutions.com"', 'Primary contact email', true),
('company_phone', '"+966 59 736 9443"', 'Primary contact phone', true),
('timezone', '"UTC"', 'Default system timezone', false),
('currency', '"USD"', 'Default currency', false),
('invoice_prefix', '"INV-"', 'Invoice number prefix', false),
('quotation_prefix', '"QUO-"', 'Quotation number prefix', false),
('project_prefix', '"PRJ-"', 'Project code prefix', false);