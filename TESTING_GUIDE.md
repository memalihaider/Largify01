# Testing Guide - Real-Time Project Management System

## Quick Start

Run the development server:
```bash
npm run dev
```

Then navigate to the portals:

---

## 🧪 Testing Checklist

### 1. Client Portal - Real-Time Projects

**URL**: `http://localhost:3000/client/client-001/projects`

**Test Steps**:
- [ ] Page loads with project list
- [ ] Projects display with progress bars
- [ ] Stats update correctly (Total Initiatives, Mean Velocity, etc.)
- [ ] Click on any project card
- [ ] Detail page loads with full tracking information
- [ ] Progress indicators animate smoothly
- [ ] Tasks list displays all tasks
- [ ] Milestones show with completion status
- [ ] Risks display with severity levels

**Action Buttons on Detail Page**:
- [ ] Click "New Development" button → Modal opens
  - [ ] Fill form with title, description, priority
  - [ ] Click "Submit" → Form submits to `/api/projects/[projectId]/development`
  - [ ] Modal closes after submission
  
- [ ] Click "Settings" button → Modal opens with project settings form
  - [ ] Update project name/description
  - [ ] Click "Submit"
  
- [ ] Click "Security Report" button → Modal opens
  - [ ] Click "Generate Report" → Processes request
  - [ ] Modal closes
  
- [ ] Click "Request Asset" button → Modal opens
  - [ ] Select asset type (Hardware/Software/Service/Infrastructure)
  - [ ] Fill description and priority
  - [ ] Click "Submit" → POST to `/api/projects/[projectId]/assets`
  
- [ ] Click "New Application" button → Modal opens
  - [ ] Enter application name and type
  - [ ] Fill description
  - [ ] Click "Submit" → POST to `/api/projects/[projectId]/applications`
  
- [ ] Click "Initialize App" button → Modal opens
  - [ ] Enter application details
  - [ ] Initialize flag is set to true
  - [ ] Click "Submit" → Application status changes to "ready"

**Real-Time Updates**:
- [ ] Leave detail page open for 5 seconds
- [ ] Progress bar updates automatically
- [ ] Task counts refresh
- [ ] No page reload needed

### 2. Admin Portal - Project Management

**URL**: `http://localhost:3000/erp/projects`

**Test Steps**:
- [ ] See all projects across all clients
- [ ] Filter by status works
- [ ] Search functionality filters results
- [ ] Stats show project count

**Admin Detail Page**:
**URL Pattern**: `/erp/projects/[projectId]` (create link in projects list)

**Test Steps**:
- [ ] Admin stats display (team members, task counts, overdue tasks, risks)
- [ ] Overall progress bar shows correct percentage
- [ ] Task list shows first 10 tasks
- [ ] Risks section displays with severity colors
- [ ] Admin action buttons available:
  - [ ] Project Settings
  - [ ] Security Audit
  - [ ] Allocate Resources
  - [ ] Manage Team
  - [ ] Export Report
  - [ ] Broadcast Message

### 3. Employee Portal - Personal Projects

**URL**: `http://localhost:3000/employee/projects`

**Test Steps**:
- [ ] Page loads showing "My Projects"
- [ ] Stats display correctly:
  - [ ] Assigned Projects count
  - [ ] Active count
  - [ ] Completed count
  - [ ] My Tasks count
  
- [ ] Project cards show:
  - [ ] Project name and description
  - [ ] Status badge
  - [ ] Priority badge
  - [ ] Progress percentage
  - [ ] Start/end dates
  - [ ] Team size
  - [ ] Task count for this project
  
- [ ] Action buttons work:
  - [ ] "View Details" navigates to `/employee/projects/[projectId]`
  - [ ] "My Tasks" button (placeholder for task view)

**Real-Time Updates**:
- [ ] Leave page open for 5+ seconds
- [ ] Project stats refresh automatically
- [ ] Progress bars update
- [ ] No manual refresh needed

### 4. Cross-Portal Synchronization

**Test Real-Time Sync**:
1. Open Client Portal in Tab 1: `/client/client-001/projects/proj-001`
2. Open Admin Portal in Tab 2: `/erp/projects/proj-001/admin-detail`
3. Open Employee Portal in Tab 3: `/employee/projects`

4. In Tab 2 (Admin), click "Request Asset" and submit a request
5. Wait 5 seconds
6. Check if request appears in other portals
7. Progress percentage should match across all portals

### 5. API Endpoints Testing

Use a tool like Postman or curl:

**Get all projects**:
```bash
curl http://localhost:3000/api/projects
```

**Get specific project**:
```bash
curl http://localhost:3000/api/projects/proj-001
```

**Create new development**:
```bash
curl -X POST http://localhost:3000/api/projects/proj-001/development \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Description","priority":"high","projectId":"proj-001"}'
```

**Request asset**:
```bash
curl -X POST http://localhost:3000/api/projects/proj-001/assets \
  -H "Content-Type: application/json" \
  -d '{"assetType":"hardware","description":"New server","priority":"high","projectId":"proj-001"}'
```

**Create application**:
```bash
curl -X POST http://localhost:3000/api/projects/proj-001/applications \
  -H "Content-Type: application/json" \
  -d '{"appName":"Mobile App","appType":"mobile","description":"New app","projectId":"proj-001","initialize":true}'
```

### 6. Theme & Styling Verification

- [ ] Client Portal uses cyan/blue theme on dark background
- [ ] Admin Portal uses purple/blue theme on dark background
- [ ] Employee Portal uses green/emerald theme on dark background
- [ ] All backgrounds are slate-900/950 (dark)
- [ ] Text is white/slate-300/400
- [ ] Progress bars have gradients
- [ ] Cards have subtle borders and shadows
- [ ] Hover states show color transitions
- [ ] Mobile responsiveness works (resize to mobile width)

### 7. Loading & Error States

- [ ] Initial page load shows spinner
- [ ] While fetching data, "Loading..." appears
- [ ] If project not found, error message displays
- [ ] Form submission shows "Processing..." button
- [ ] Modal closes after successful submission
- [ ] Empty state appears if no projects assigned (Employee Portal)

### 8. Performance & Responsiveness

- [ ] Page loads within 2 seconds
- [ ] Real-time updates don't cause lag
- [ ] Animations are smooth (no jank)
- [ ] Mobile layout is readable and functional
- [ ] Tablet layout looks good
- [ ] Desktop layout is well-organized

---

## 🔍 What to Look For

### Successful Indicators ✅
- Projects list updates every 5 seconds without page reload
- Detail pages show complete information
- Action buttons open working modals
- Form submissions complete successfully
- Data persists and shows across portals
- Dark theme is consistent throughout
- No console errors
- Animations are smooth
- Loading states work correctly

### Potential Issues ❌
- Projects not updating (check API response)
- Modal not opening (check console for errors)
- Form not submitting (check network tab)
- Progress not showing correctly (verify data structure)
- Theme inconsistent (check class names)
- Loading state stuck (check API timeout)

---

## 📱 Responsive Testing

Test at these breakpoints:
- [ ] Mobile (320px - small phone)
- [ ] Tablet (768px)
- [ ] Desktop (1024px+)
- [ ] Large Desktop (1920px+)

All project lists and details should be readable at all sizes.

---

## 🚀 Next Steps for Production

1. **Database Integration**: Connect to real PostgreSQL instead of mock data
2. **Authentication**: Verify user roles before showing projects
3. **Notifications**: Add toast notifications for actions
4. **WebSockets**: Replace polling with WebSocket for instant updates
5. **Caching**: Add Redis for performance optimization
6. **Error Logging**: Implement Sentry or similar
7. **Unit Tests**: Add Jest tests for components and API
8. **E2E Tests**: Add Cypress/Playwright for testing workflows

---

## 📞 Support

If something doesn't work:
1. Check browser console for errors
2. Check network tab for failed API calls
3. Verify mock data is populated correctly
4. Check TypeScript types match data structure
5. Ensure all components are imported correctly
6. Verify dark theme CSS classes are applied

---

**Happy Testing! 🎉**
