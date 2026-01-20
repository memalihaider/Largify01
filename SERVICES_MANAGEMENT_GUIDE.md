# Services Management Integration Guide

**Last Updated**: Schema Audit
**Version**: 1.0

## Overview

Services Management is now fully integrated into the Largify ERP admin portal. This guide explains how services work, how to manage them, and how they integrate across the platform.

## Quick Start

### Accessing Services Management

1. Go to **ERP Portal** → **Content Management** → **⚙️ Services Management**
2. Alternatively, direct URL: `http://localhost:3000/erp/cms/services-management`

### Core Features

- **Create/Edit/Delete Services**: Full CRUD interface
- **View Modes**: Table or Grid layout
- **Filtering**: By status (All, Published, Drafts)
- **Searching**: Search across title and description
- **Sorting**: Sort by title, order, date, or usage
- **Bulk Operations**: Select multiple services for batch deletion
- **Status Management**: Publish/Draft workflow
- **Feature Flagging**: Mark services as featured

---

## Service Structure

### Service Schema

Each service contains the following fields:

```typescript
interface Service {
  id: string;                      // Unique identifier
  title: string;                   // Service name (required)
  description: string;             // Full description (required)
  shortDescription?: string;       // Brief description (100 chars)
  category?: string;               // Category: Standard/Premium/Enterprise
  iconType?: string;              // Icon identifier
  price?: number;                 // Service pricing
  features?: string[];            // Feature list
  benefits?: string[];            // Key benefits
  imageUrl?: string;              // Featured image
  isPublished: boolean;            // Publish status
  isFeatured?: boolean;            // Featured on homepage
  orderIndex?: number;             // Display order
  usedInProjects?: number;         // Number of active projects
  usedByClients?: number;          // Number of clients using
  metadata?: Record<string, any>;  // Custom data storage
  createdAt: Date;                 // Created timestamp
  updatedAt?: Date;                // Last modified timestamp
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Auto-generated unique ID |
| `title` | string | Yes | Service name displayed on all pages |
| `description` | string | Yes | Full description of the service |
| `shortDescription` | string | No | Brief teaser (100 chars) |
| `category` | string | No | Service tier: Standard, Premium, or Enterprise |
| `iconType` | string | No | Icon type for visual identification |
| `price` | number | No | Service pricing in USD |
| `features` | string[] | No | List of features included |
| `benefits` | string[] | No | Key benefits for the client |
| `imageUrl` | string | No | Featured image URL |
| `isPublished` | boolean | Yes | Controls visibility on public pages |
| `isFeatured` | boolean | No | Highlights on homepage |
| `orderIndex` | number | No | Display order (lower = first) |
| `usedInProjects` | number | No | Count of active projects |
| `usedByClients` | number | No | Count of clients |
| `metadata` | object | No | Custom fields for extensions |
| `createdAt` | Date | Yes | Creation date |
| `updatedAt` | Date | No | Last modification date |

---

## Creating a New Service

### Step-by-Step

1. **Open Services Management**
   - Navigate to `/erp/cms/services-management`
   - Click **+ Add New Service**

2. **Fill in Basic Information**
   - **Title**: Enter the service name (e.g., "Custom ERP Implementation")
   - **Description**: Write a comprehensive description
   - **Category**: Select Standard, Premium, or Enterprise

3. **Add Details**
   - **Price**: Enter the base service price
   - **Features**: List key features (comma-separated or added individually)
   - **Benefits**: List main benefits to clients

4. **Publishing Options**
   - **Publish Service**: Toggle to make visible on public pages
   - **Featured**: Toggle to highlight on homepage

5. **Save**
   - Click **Create Service**
   - Service appears immediately in the list

### Example Service

```
Title: Custom ERP Implementation
Description: Tailored enterprise resource planning system built specifically for your business processes. Includes full integration with existing systems, custom workflows, and comprehensive training.
Category: Premium
Price: 75000
Features:
  - Inventory Management
  - Supply Chain Integration
  - Real-time Reporting
  - Custom Workflows
  - User Training
Benefits:
  - Reduced operational costs
  - Improved efficiency
  - Better data visibility
  - Scalable architecture
```

---

## Editing Services

### Modify Existing Service

1. **Find Service**
   - Search or browse the services list
   - In Table view: Click **Edit** button
   - In Grid view: Click **Edit** button on service card

2. **Update Fields**
   - Modify any field as needed
   - Update pricing, features, or description

3. **Save Changes**
   - Click **Update Service**
   - Changes appear immediately

### Common Updates

- **Changing Status**: Toggle publish status to hide/show on public pages
- **Featured Flag**: Toggle to promote to homepage
- **Pricing**: Update to reflect new rates
- **Features**: Add or remove capabilities

---

## Publishing & Visibility

### Publishing Workflow

```
Draft → Review → Published
 ↓
 Draft shows only in admin
 ↓
 Published shows on all public pages
```

### Status Indicators

- **Published**: Green badge, visible on public pages
- **Draft**: Gray badge, admin only
- **Featured**: Star badge (★), highlighted on homepage

### Where Services Appear

Once published, services automatically appear in:

1. **Public Services Page**
   - URL: `/services`
   - Shows all published services
   - Displays in order specified by `orderIndex`

2. **Service Cards on Homepage**
   - Featured services only
   - Sorted by order index

3. **Project Proposal Generation**
   - Services available for quotes
   - Can be mixed and combined

4. **Admin Dashboard**
   - Service usage statistics
   - Client availability metrics

---

## Filtering & Searching

### Search Functionality

- **Search by Title**: Type service name
- **Search by Description**: Matches content words
- **Real-time**: Results update as you type

### Filtering Options

| Filter | Options |
|--------|---------|
| Status | All / Published / Drafts |
| View | Table / Grid |
| Sort | Title / Order / Date / Usage |

### Example Queries

- Search "ERP" → Shows all ERP-related services
- Search "integration" → Shows services with integration features
- Filter "Published only" → Shows live services
- Sort by "Usage" → Most popular first

---

## Bulk Operations

### Selecting Multiple Services

1. **Click checkbox** next to service name
2. **Select multiple** services
3. **All toggle** in header selects all visible services
4. **Delete Selected** button appears

### Batch Delete

1. Select services to delete
2. Click **Delete Selected**
3. Confirm in popup dialog
4. Services are permanently removed

**Note**: Use with caution - deletion is permanent.

---

## View Modes

### Table View

**Best for**: Detailed analysis, quick edits, sorting

- Column view with all details
- Easy sorting by clicking headers
- Click row to see full details
- Best for bulk operations
- Sortable columns:
  - Title (A-Z)
  - Category
  - Price (low-high)
  - Used in Projects
  - Status

### Grid View

**Best for**: Visual browsing, featured services

- Card-based layout
- Thumbnail images
- Quick overview
- Better for presentation
- Ideal for featured service browsing

### Switching Views

- Toggle buttons at top of page
- Current view is highlighted
- View preference persists

---

## Integration Points

### Services → Quotations

Services are used when creating quotations:

1. **New Quotation** → Select from service list
2. **Add Line Items** → Choose services from catalog
3. **Pricing**: Uses configured service prices
4. **Description**: Pulls from service description

### Services → Projects

Link services to project deliverables:

1. **Create Project** → Select primary service
2. **Project Details** → Shows associated service
3. **Billing** → Based on service pricing
4. **Scope** → References service features

### Services → Public Pages

Services display on public website:

1. **Services Page** (`/services`) - All published services
2. **Featured Services** - Only marked as featured
3. **Service Details** - Full description, features, benefits
4. **Call to Action** - "Discuss Your Project" link to booking

### Services → CMS

Manage alongside other content:

1. **CMS Dashboard** → Services tab shows count
2. **Services Management** → Dedicated interface
3. **Bulk Operations** → Supported for services
4. **SEO Fields** → Can be added to metadata

---

## Statistics & Metrics

### Dashboard Stats

The Services Management page displays:

| Metric | Meaning |
|--------|---------|
| Total Services | Count of all services |
| Published | Services currently live |
| Featured | Services on homepage |
| Total Portfolio Value | Sum of all service prices |

### Service Metrics

Each service tracks:

- **Used in Projects**: Number of active projects using this service
- **Used by Clients**: Number of clients who purchased this service
- **Price**: Base pricing for quotes/invoices

### Accessing Metrics

1. View at top of Services Management page
2. Click on a service to see usage details
3. Filter to see metrics for specific categories

---

## Best Practices

### Service Naming

✓ **Good**
- "Custom ERP Implementation"
- "Security Audit & Hardening"
- "Mobile App Development"

✗ **Poor**
- "Service 1"
- "Development work"
- "Consulting"

### Descriptions

✓ **Good**
- Clear problem → solution
- Specific deliverables
- Measurable outcomes
- 100-200 words

✗ **Poor**
- Generic statements
- Vague promises
- Too short or too long

### Pricing Strategy

- **Consistent**: Use same pricing across channels
- **Transparent**: Clearly state what's included
- **Updated**: Keep prices current
- **Tiered**: Offer different service levels

### Organization

- **Categories**: Use consistently
- **Order**: Arrange by importance
- **Features**: Limit to 5-7 key features
- **Featured**: Only 2-3 featured services

---

## Troubleshooting

### Services Not Appearing on Public Page

**Problem**: Published services not showing on `/services`

**Solution**:
1. Verify `isPublished` is true
2. Check if service description is empty
3. Clear browser cache
4. Verify mock data is loaded

### Search Not Working

**Problem**: Search returns no results

**Solution**:
1. Check spelling of search term
2. Search appears in title or description
3. Try shorter search terms
4. Use filters instead

### Can't Edit Service

**Problem**: Edit button is disabled

**Solution**:
1. Verify you have edit permissions (admin role)
2. Try refreshing the page
3. Check browser console for errors
4. Try in different browser

### Services Disappeared

**Problem**: Services were deleted accidentally

**Solution**:
1. Check "Drafts Only" filter
2. Clear search/filter criteria
3. Reload the page
4. Check browser localStorage (if dev)

---

## Advanced Usage

### Custom Metadata

Add custom fields via metadata:

```javascript
service.metadata = {
  "serviceLevel": "enterprise",
  "requiresContract": true,
  "estimatedDelivery": "12 weeks",
  "supportIncluded": "24/7 email",
  "warrantyCoverage": "1 year"
}
```

### Bulk Import (Future)

Currently manual entry. Future: CSV import support

### API Access (Future)

Services available via API:
- `GET /api/services` - List all
- `GET /api/services/:id` - Single service
- `POST /api/services` - Create
- `PUT /api/services/:id` - Update
- `DELETE /api/services/:id` - Delete

---

## Performance Notes

### Optimization Tips

1. **Keep Descriptions Short**: Improves load time
2. **Compress Images**: Reduces page load
3. **Limit Features**: 5-7 features is optimal
4. **Archive Old Services**: Keep active list clean

### Scaling

- **Current**: Handles 100+ services smoothly
- **Optimized**: Table with pagination for 1000+
- **Future**: Server-side data loading for enterprise

---

## FAQ

**Q: Can I change a service ID?**
A: No, IDs are immutable. Create new and delete old.

**Q: How many services should I have?**
A: 3-7 for clarity. Too many dilutes messaging.

**Q: Can services be free?**
A: Yes, leave price empty or set to 0.

**Q: What if I want to discontinue a service?**
A: Uncheck "Publish" instead of deleting. Keeps history.

**Q: Can I schedule service changes?**
A: Not yet. Planned for future releases.

**Q: How are services priced?**
A: Base price is set in admin. Projects can override.

---

## Next Steps

### Implementation Checklist

- [ ] Create 5-7 core services
- [ ] Publish to public page
- [ ] Add featured services
- [ ] Set pricing
- [ ] Connect to quotations
- [ ] Monitor usage metrics
- [ ] Update quarterly

### Future Enhancements

- [ ] Service bundles
- [ ] Tiered pricing
- [ ] Service packages
- [ ] Add-on services
- [ ] Usage limits
- [ ] Scheduled publishing
- [ ] Service automation

---

## Support & Resources

### Documentation
- Admin Portal Audit: `ADMIN_PORTAL_AUDIT.md`
- PDF Generation: `PDF_GENERATION_GUIDE.md`
- CMS Guide: `PROJECT_MODAL_DOCUMENTATION.md`

### Quick Links
- Services Management: `/erp/cms/services-management`
- Services Page: `/services`
- CMS Dashboard: `/erp/cms`
- Admin Portal: `/erp`

### Contact
For technical issues or feature requests, contact the development team.

---

**Document Version**: 1.0
**Last Updated**: Initial Release
**Next Review**: After first month of use
