# Employee Portal Enhancement Plan

**Status**: Ready for Implementation
**Version**: 1.0
**Target Coverage**: 60% → 85%

---

## Phase 1: Critical Enhancements (1 Week)

### 1. Leave Balance Display

**Enhancement**: Show leave balance on dashboard and leave page

**Components to Add**:
```
Dashboard:
├── Leave Balance Card
│   ├── Total Balance
│   ├── Used This Year
│   ├── Remaining
│   └── Accrual Chart

Leave Page:
├── Leave Summary Panel
│   ├── Annual Balance
│   ├── Monthly Accrual
│   ├── Leave Types
│   │   ├── Vacation Days
│   │   ├── Sick Days
│   │   ├── Personal Days
│   │   └── Floating Holidays
│   └── Year-to-Date Usage
```

**Data Needed**:
```typescript
interface LeaveBalance {
  employeeId: string;
  year: number;
  leaveType: string;
  totalAllocation: number;
  used: number;
  remaining: number;
  pending: number;
  accrualPerMonth: number;
}
```

**Schema Update**: Add to types.ts
```typescript
export interface LeaveBalance {
  id: string;
  employeeId: string;
  year: number;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
  accrualDate?: Date;
  carryoverDays?: number;
  metadata?: Record<string, any>;
}
```

**Files to Create**:
- `/components/LeaveBalanceCard.tsx`
- `/app/employee/leave-balance/page.tsx`

**Estimated Time**: 1 day

---

### 2. Attendance Dashboard

**Enhancement**: Track attendance status and history

**Components to Add**:
```
New Page: /employee/attendance

├── Today's Status
│   ├── Check-in Time
│   ├── Check-out Time
│   ├── Hours Worked
│   └── Quick Check-in Button

├── Attendance Summary
│   ├── Present Days
│   ├── Absent Days
│   ├── Late Arrivals
│   ├── Early Departures
│   └── Attendance Rate

├── Attendance Calendar
│   ├── Month View
│   ├── Color-coded Days
│   └── Quick Stats

├── Attendance History
│   ├── Daily Records
│   ├── Filter by Month
│   └── Export Option
```

**Data Needed**:
```typescript
interface AttendanceRecord {
  employeeId: string;
  date: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  hoursWorked?: number;
  status: 'present' | 'absent' | 'late' | 'left_early' | 'half_day';
  leaveType?: string;
  notes?: string;
}
```

**Schema Update**: Add to types.ts
```typescript
export interface Attendance {
  id: string;
  employeeId: string;
  date: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  hoursWorked?: number;
  status: 'present' | 'absent' | 'late' | 'on_leave';
  leaveId?: string;
  notes?: string;
  createdAt: Date;
}
```

**Files to Create**:
- `/app/employee/attendance/page.tsx`
- `/components/AttendanceCard.tsx`
- `/components/AttendanceCalendar.tsx`

**Mock Data**: Add to lib/mock-data.ts
```typescript
export const mockAttendance: Attendance[] = [
  // 20 sample attendance records
];
```

**Estimated Time**: 2 days

---

### 3. Enhanced Employee Profile

**Enhancement**: Complete employee information management

**Updates to `/employee/profile/page.tsx`**:
```
Profile Sections:
├── Personal Information (Editable)
│   ├── First Name / Last Name
│   ├── Email / Phone
│   ├── Personal Bio
│   ├── Date of Birth
│   └── Personal Contact

├── Employment Information (Read-only)
│   ├── Employee Code
│   ├── Employee ID
│   ├── Hire Date
│   ├── Employment Type
│   ├── Status
│   ├── Department
│   ├── Position
│   ├── Manager
│   └── Reporting To

├── Skills & Expertise
│   ├── Technical Skills
│   ├── Language Skills
│   ├── Certifications
│   ├── Add New Skill
│   └── Skill Proficiency

├── Emergency Contacts
│   ├── Contact Name
│   ├── Relationship
│   ├── Phone Number
│   └── Add More

├── Bank & Tax Information (View only)
│   ├── Bank Account
│   ├── Tax ID
│   └── Salary Currency

├── Work Statistics
│   ├── Total Hours Logged
│   ├── Tasks Completed
│   ├── Leave Taken
│   ├── Projects Active
│   └── Team Size
```

**Schema Usage**:
- Employee.skills
- Employee.certifications
- Employee.employeeCode
- Employee.employmentType
- Employee.hireDate
- User custom fields

**Files to Update**:
- `/app/employee/profile/page.tsx` (major update)
- `/components/SkillsEditor.tsx` (new)
- `/components/EmergencyContactForm.tsx` (new)

**Estimated Time**: 2 days

---

### 4. Leave Calendar & History

**Enhancement**: Visual leave management with calendar

**Components to Add**:
```
Leave Page Enhancement:

├── Leave Calendar (New)
│   ├── Month View
│   ├── Color-coded Leave Days
│   ├── Holidays Marked
│   └── Team Leave Visibility (Optional)

├── Leave Types Section (New)
│   ├── Vacation Days
│   ├── Sick Days
│   ├── Personal Leave
│   ├── Floating Holidays
│   └── Unpaid Leave

├── Leave Policy (New)
│   ├── Annual Allocation
│   ├── Carryover Rules
│   ├── Accrual Schedule
│   └── Blackout Dates
```

**Files to Update**:
- `/app/employee/leave/page.tsx` (major update)

**Estimated Time**: 1 day

---

## Phase 2: Important Enhancements (2 Weeks)

### 1. Project Details & Timeline

**Enhancement**: Expand project view with full details

**New Page**: `/employee/projects/[id]`
```
Project Details:
├── Project Header
│   ├── Project Name
│   ├── Status Badge
│   ├── Client Name
│   └── Project Manager

├── Project Timeline
│   ├── Start Date
│   ├── End Date
│   ├── Duration
│   ├── Progress Bar
│   └── Milestones

├── Team Members
│   ├── List of Team
│   ├── Roles
│   └── Contact Info

├── Your Contributions
│   ├── Tasks Assigned
│   ├── Hours Logged
│   ├── Deliverables
│   └── Performance

├── Project Documents
│   ├── Project Files
│   ├── Specifications
│   ├── Reports
│   └── Download Links

├── Budget (If Authorized)
│   ├── Total Budget
│   ├── Spent
│   ├── Remaining
│   └── Burn Rate

├── Communication
│   ├── Project Updates
│   ├── Announcements
│   └── Team Discussions
```

**Files to Create**:
- `/app/employee/projects/[id]/page.tsx`
- `/components/ProjectTimeline.tsx`
- `/components/ProjectTeam.tsx`

**Estimated Time**: 3 days

---

### 2. Team Directory & Organization

**Enhancement**: Browse team and organizational structure

**New Page**: `/employee/team-directory`
```
Directory Features:
├── Employee Search
│   ├── Search by Name
│   ├── Filter by Department
│   ├── Filter by Location
│   └── Filter by Skills

├── Employee Cards
│   ├── Profile Picture
│   ├── Name & Title
│   ├── Department
│   ├── Email/Phone
│   ├── Manager
│   └── Quick Message Button

├── Department View
│   ├── Department List
│   ├── Department Size
│   ├── Department Head
│   └── Members List

├── Org Chart View
│   ├── Hierarchy Display
│   ├── Reporting Lines
│   ├── Click to Expand
│   └── Print Option
```

**Files to Create**:
- `/app/employee/team-directory/page.tsx`
- `/components/EmployeeCard.tsx`
- `/components/OrgChart.tsx`

**Estimated Time**: 3 days

---

### 3. Personal Documents Management

**Enhancement**: Secure document storage and access

**Update** `/employee/profile/page.tsx` with:
```
Document Management:
├── Document Upload
│   ├── Drag & Drop
│   ├── Category Selection
│   ├── Expiry Date (for certs)
│   └── Auto-organize

├── Document Categories
│   ├── Employment Contracts
│   ├── Certifications
│   ├── ID Documents
│   ├── Tax Forms
│   ├── Pay Stubs
│   ├── Performance Reviews
│   └── Personal

├── Document List
│   ├── File Name
│   ├── Upload Date
│   ├── Expiry Date
│   ├── Category
│   ├── Download Link
│   └── Delete Option

├── Sharing
│   ├── Share with Manager
│   ├── Share with HR
│   └── Revoke Access
```

**Files to Update**:
- `/app/employee/profile/page.tsx`

**Estimated Time**: 2 days

---

### 4. Performance & Goals

**Enhancement**: Goal setting and performance tracking

**New Page**: `/employee/goals`
```
Goals & Performance:
├── Personal OKRs
│   ├── Quarterly Goals
│   ├── Annual Goals
│   ├── Progress Tracking
│   └── Target vs Actual

├── Performance Reviews
│   ├── Recent Reviews
│   ├── Review History
│   ├── Self-Assessment
│   ├── Manager Feedback
│   └── Rating

├── 360 Feedback
│   ├── Peer Feedback
│   ├── Manager Feedback
│   ├── Direct Reports (if any)
│   └── Self Assessment

├── Development Plans
│   ├── Training Needs
│   ├── Skill Development
│   ├── Career Path
│   └── Action Items
```

**Schema Types Needed**:
```typescript
export interface Goal {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  type: 'okr' | 'smart' | 'behavioral';
  quarter?: number;
  year: number;
  targetValue: number;
  currentValue: number;
  status: 'not_started' | 'in_progress' | 'completed' | 'abandoned';
  weight?: number; // For goal weighting
  createdAt: Date;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  period: string;
  rating: number;
  feedback: string;
  strengths?: string[];
  improvements?: string[];
  goals?: Goal[];
  createdAt: Date;
}
```

**Files to Create**:
- `/app/employee/goals/page.tsx`
- `/app/employee/performance/page.tsx`

**Estimated Time**: 3 days

---

## Phase 3: Nice-to-Have Enhancements (Later)

### 1. Internal Communication Hub
- Messages
- Announcements
- Team Updates
- Comments on items

### 2. Learning & Development
- Training catalog
- Course enrollment
- Certificates
- Progress tracking

### 3. Equipment & IT Assets
- Device tracking
- License management
- Support tickets
- Inventory

### 4. Compensation & Benefits
- Pay stubs
- Tax documents
- Benefits info
- Deductions

---

## Implementation Checklist

### Phase 1 (Critical - 1 Week)

**Week 1 - Leave & Attendance**:
- [ ] Add LeaveBalance schema
- [ ] Create leave balance component
- [ ] Build attendance page
- [ ] Create attendance records mock data
- [ ] Update dashboard with both
- [ ] Enhance profile page
- [ ] Add skills management UI

**Estimated Hours**: 60 hours

### Phase 2 (Important - 2 Weeks)

**Week 1 - Projects & Team**:
- [ ] Create project detail page
- [ ] Build project timeline
- [ ] Add team directory
- [ ] Create org chart

**Week 2 - Documents & Performance**:
- [ ] Enhance document management
- [ ] Create goals page
- [ ] Add performance reviews
- [ ] Build 360 feedback

**Estimated Hours**: 100 hours

### Phase 3 (Nice-to-Have - Ongoing)
- [ ] Communication features
- [ ] Learning platform
- [ ] Equipment tracking
- [ ] Compensation details

**Estimated Hours**: 150+ hours

---

## Schema Updates Needed

### New Types to Add to `lib/types.ts`

```typescript
// Attendance
export interface Attendance {
  id: string;
  employeeId: string;
  date: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  hoursWorked?: number;
  status: 'present' | 'absent' | 'late' | 'on_leave';
  notes?: string;
  createdAt: Date;
}

// Leave Balance
export interface LeaveBalance {
  id: string;
  employeeId: string;
  year: number;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
  leaveType: string;
  metadata?: Record<string, any>;
}

// Goals & Performance
export interface Goal {
  id: string;
  employeeId: string;
  title: string;
  type: 'okr' | 'smart' | 'behavioral';
  quarter?: number;
  year: number;
  targetValue: number;
  currentValue: number;
  status: 'not_started' | 'in_progress' | 'completed';
  weight?: number;
  createdAt: Date;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  period: string;
  rating: number;
  feedback: string;
  strengths?: string[];
  improvements?: string[];
  createdAt: Date;
}
```

### Update Existing Types

**Employee**:
- Ensure all fields are used in UI or marked as internal

**User**:
- Add manager relationship
- Add direct reports array

---

## Mock Data Updates

Add to `lib/mock-data.ts`:

```typescript
// Attendance records
export const mockAttendance: Attendance[] = [];

// Leave balances
export const mockLeaveBalances: LeaveBalance[] = [];

// Goals
export const mockGoals: Goal[] = [];

// Performance reviews
export const mockPerformanceReviews: PerformanceReview[] = [];
```

---

## Testing Checklist

### Functionality
- [ ] All new pages load
- [ ] Data displays correctly
- [ ] Filters work
- [ ] Search works
- [ ] Sorting works
- [ ] Forms submit
- [ ] Edits save
- [ ] Delete confirmations
- [ ] Error handling

### UI/UX
- [ ] Responsive design
- [ ] Mobile layout
- [ ] Accessibility
- [ ] Keyboard navigation
- [ ] Color contrast
- [ ] Loading states
- [ ] Empty states
- [ ] Error messages

### Performance
- [ ] Page load < 3s
- [ ] Search response < 500ms
- [ ] Smooth scrolling
- [ ] No memory leaks
- [ ] Optimized images
- [ ] Lazy loading

---

## Success Metrics

### Coverage
- Leave balance: 100%
- Attendance: 95%
- Profile: 90%
- Projects: 80%
- Goals: 75%
- **Target**: 85% overall

### Usage
- Login rate: > 80%
- Feature usage: > 60%
- User satisfaction: > 4/5

### Business
- Time savings: 10+ hours/month per employee
- Error reduction: 50% fewer manual entries
- Data accuracy: 95%+

---

## Cost Estimate

| Phase | Dev Hours | QA Hours | Design Hours | Total |
|-------|-----------|----------|--------------|-------|
| Phase 1 | 60 | 10 | 5 | 75 hours |
| Phase 2 | 100 | 15 | 10 | 125 hours |
| Phase 3 | 150+ | 20+ | 15+ | 185+ hours |

**Total**: ~385 hours (~10 weeks at 40 hrs/week)

---

## Timeline

| Week | Focus | Deliverables |
|------|-------|--------------|
| 1 | Leave & Attendance | 2 new pages, 1 updated page |
| 2 | Profile & Skills | Enhanced profile page |
| 3 | Projects | New project detail page |
| 4 | Team & Directory | New team directory page |
| 5 | Documents | Updated document management |
| 6 | Performance | 2 new pages for goals |
| 7 | Polish & Testing | Bug fixes, optimization |
| 8 | Deploy Phase 1-2 | Production release |

---

## Dependencies

### External
- None

### Internal
- Schema updates
- Mock data updates
- Component library
- Styling (Tailwind)

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Performance issues | Medium | Test with large datasets |
| Schema conflicts | High | Careful merge planning |
| User adoption | High | Good UX, training docs |
| Data inconsistency | High | Careful mock data sync |

---

## Next Steps

1. **Approval**: Get stakeholder approval for Phase 1
2. **Planning**: Schedule development sprints
3. **Development**: Start with Phase 1 critical items
4. **Testing**: QA testing after each component
5. **Deployment**: Roll out in phases
6. **Feedback**: Gather user feedback
7. **Iterate**: Make improvements based on feedback

---

**Document Version**: 1.0
**Status**: Ready for Implementation
**Next Review**: After Phase 1 completion
