/**
 * PDF Template Generators
 * Generates professional HTML templates for invoices and quotations
 */

interface CompanyInfo {
  name: string;
  logo?: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
}

interface ClientInfo {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  total: number;
}

export const generateQuotationPDF = (
  quotation: any,
  company: CompanyInfo,
  client: ClientInfo,
  items: LineItem[]
): string => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discount = quotation.discountAmount || 0;
  const tax = quotation.taxAmount || 0;
  const total = subtotal - discount + tax;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Quotation ${quotation.quotationNumber}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background: white;
          padding: 20px;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          border-bottom: 3px solid #0f172a;
          padding-bottom: 20px;
        }
        .company-section {
          flex: 1;
        }
        .company-logo {
          max-width: 120px;
          height: auto;
          margin-bottom: 10px;
        }
        .company-name {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .company-info {
          font-size: 12px;
          color: #666;
          line-height: 1.6;
        }
        .quotation-section {
          text-align: right;
        }
        .quotation-title {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .quotation-number {
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
        }
        .date-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          font-size: 12px;
          margin-bottom: 30px;
        }
        .date-item {
          background: #f8f9fa;
          padding: 10px;
          border-radius: 4px;
        }
        .date-label {
          color: #666;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .date-value {
          color: #0f172a;
          font-weight: 600;
        }
        .client-section {
          margin-bottom: 30px;
        }
        .section-title {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 5px;
        }
        .client-details {
          font-size: 13px;
          color: #333;
          line-height: 1.8;
          margin-bottom: 15px;
        }
        .client-details strong {
          display: block;
          color: #0f172a;
          margin-bottom: 4px;
          font-weight: 600;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        .items-table thead {
          background: #f8f9fa;
          border-top: 2px solid #0f172a;
          border-bottom: 2px solid #0f172a;
        }
        .items-table th {
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: #0f172a;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .items-table td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 13px;
          color: #333;
        }
        .items-table tbody tr:hover {
          background: #f9fafb;
        }
        .table-number {
          text-align: right;
          width: 60px;
        }
        .table-amount {
          text-align: right;
          width: 100px;
        }
        .summary-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }
        .summary-left {
          font-size: 12px;
          line-height: 1.8;
          color: #666;
        }
        .summary-right {
          text-align: right;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 10px;
          color: #666;
        }
        .summary-row.total {
          border-top: 2px solid #0f172a;
          border-bottom: 2px solid #0f172a;
          padding: 12px 0;
          margin-top: 15px;
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
        }
        .summary-row label {
          font-weight: 600;
        }
        .terms-section {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 30px;
          border-left: 4px solid #0f172a;
        }
        .terms-title {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          text-transform: uppercase;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }
        .terms-content {
          font-size: 12px;
          color: #666;
          line-height: 1.6;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .footer {
          border-top: 1px solid #e5e7eb;
          padding-top: 15px;
          font-size: 11px;
          color: #999;
          text-align: center;
          margin-top: 30px;
        }
        .page-break {
          page-break-after: always;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="company-section">
            ${company.logo ? `<img src="${company.logo}" alt="Logo" class="company-logo">` : ''}
            <div class="company-name">${company.name}</div>
            <div class="company-info">
              ${company.email ? `Email: ${company.email}<br>` : ''}
              ${company.phone ? `Phone: ${company.phone}<br>` : ''}
              ${company.address ? `Address: ${company.address}<br>` : ''}
              ${company.website ? `Website: ${company.website}` : ''}
            </div>
          </div>
          <div class="quotation-section">
            <div class="quotation-title">QUOTATION</div>
            <div class="quotation-number">${quotation.quotationNumber}</div>
          </div>
        </div>

        <div class="date-row">
          <div class="date-item">
            <div class="date-label">Issue Date</div>
            <div class="date-value">${new Date(quotation.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
          </div>
          <div class="date-item">
            <div class="date-label">Valid Until</div>
            <div class="date-value">${new Date(quotation.validUntil).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
          </div>
        </div>

        <div class="client-section">
          <div class="section-title">Bill To</div>
          <div class="client-details">
            <strong>${client.name}</strong>
            ${client.email ? `Email: ${client.email}<br>` : ''}
            ${client.phone ? `Phone: ${client.phone}<br>` : ''}
            ${client.address ? `Address: ${client.address}` : ''}
          </div>
        </div>

        <table class="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th class="table-number">Quantity</th>
              <th class="table-number">Rate</th>
              <th class="table-amount">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td class="table-number">${item.quantity}</td>
                <td class="table-number">$${item.rate.toFixed(2)}</td>
                <td class="table-amount">$${item.total.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="summary-section">
          <div class="summary-left">
            <strong style="color: #0f172a;">Project Title:</strong>
            <div>${quotation.title}</div>
            ${quotation.description ? `<br><strong style="color: #0f172a;">Description:</strong><div>${quotation.description}</div>` : ''}
          </div>
          <div class="summary-right">
            <div class="summary-row">
              <label>Subtotal:</label>
              <span>$${subtotal.toFixed(2)}</span>
            </div>
            ${discount > 0 ? `
              <div class="summary-row">
                <label>Discount:</label>
                <span>-$${discount.toFixed(2)}</span>
              </div>
            ` : ''}
            ${tax > 0 ? `
              <div class="summary-row">
                <label>Tax:</label>
                <span>$${tax.toFixed(2)}</span>
              </div>
            ` : ''}
            <div class="summary-row total">
              <label>TOTAL:</label>
              <span>${quotation.currency} ${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        ${quotation.termsConditions ? `
          <div class="terms-section">
            <div class="terms-title">Terms & Conditions</div>
            <div class="terms-content">${quotation.termsConditions}</div>
          </div>
        ` : ''}

        <div class="footer">
          <p>Thank you for your business. This quotation is valid until ${new Date(quotation.validUntil).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}.</p>
          <p>${company.name} | ${company.phone}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateInvoicePDF = (
  invoice: any,
  company: CompanyInfo,
  client: ClientInfo,
  items: LineItem[]
): string => {
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discount = invoice.discountAmount || 0;
  const tax = invoice.taxAmount || 0;
  const total = subtotal - discount + tax;
  const amountDue = total - (invoice.amountPaid || 0);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Invoice ${invoice.invoiceNumber}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
          background: white;
          padding: 20px;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
          background: white;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
          border-bottom: 3px solid #0f172a;
          padding-bottom: 20px;
        }
        .company-section {
          flex: 1;
        }
        .company-logo {
          max-width: 120px;
          height: auto;
          margin-bottom: 10px;
        }
        .company-name {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .company-info {
          font-size: 12px;
          color: #666;
          line-height: 1.6;
        }
        .invoice-section {
          text-align: right;
        }
        .invoice-title {
          font-size: 28px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .invoice-number {
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
        }
        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .status-paid {
          background: #d1fae5;
          color: #065f46;
        }
        .status-partial {
          background: #fef3c7;
          color: #92400e;
        }
        .status-sent {
          background: #dbeafe;
          color: #0c4a6e;
        }
        .date-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          font-size: 12px;
          margin-bottom: 30px;
        }
        .date-item {
          background: #f8f9fa;
          padding: 10px;
          border-radius: 4px;
        }
        .date-label {
          color: #666;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .date-value {
          color: #0f172a;
          font-weight: 600;
        }
        .parties-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }
        .party-section {
          flex: 1;
        }
        .section-title {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 5px;
        }
        .party-details {
          font-size: 13px;
          color: #333;
          line-height: 1.8;
        }
        .party-details strong {
          display: block;
          color: #0f172a;
          margin-bottom: 4px;
          font-weight: 600;
        }
        .items-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        .items-table thead {
          background: #f8f9fa;
          border-top: 2px solid #0f172a;
          border-bottom: 2px solid #0f172a;
        }
        .items-table th {
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: #0f172a;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .items-table td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 13px;
          color: #333;
        }
        .items-table tbody tr:hover {
          background: #f9fafb;
        }
        .table-number {
          text-align: right;
          width: 60px;
        }
        .table-amount {
          text-align: right;
          width: 100px;
        }
        .summary-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }
        .summary-left {
          font-size: 12px;
          line-height: 1.8;
          color: #666;
        }
        .summary-right {
          text-align: right;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 10px;
          color: #666;
        }
        .summary-row.total {
          border-top: 2px solid #0f172a;
          border-bottom: 2px solid #0f172a;
          padding: 12px 0;
          margin-top: 15px;
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
        }
        .summary-row.due {
          margin-top: 10px;
          padding: 10px;
          background: #fef3c7;
          border-radius: 4px;
          color: #92400e;
        }
        .summary-row label {
          font-weight: 600;
        }
        .payment-info {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 30px;
          border-left: 4px solid #0f172a;
        }
        .payment-title {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          text-transform: uppercase;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }
        .payment-details {
          font-size: 12px;
          color: #666;
          line-height: 1.6;
        }
        .terms-section {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 30px;
          border-left: 4px solid #0f172a;
        }
        .terms-title {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          text-transform: uppercase;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }
        .terms-content {
          font-size: 12px;
          color: #666;
          line-height: 1.6;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .footer {
          border-top: 1px solid #e5e7eb;
          padding-top: 15px;
          font-size: 11px;
          color: #999;
          text-align: center;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="company-section">
            ${company.logo ? `<img src="${company.logo}" alt="Logo" class="company-logo">` : ''}
            <div class="company-name">${company.name}</div>
            <div class="company-info">
              ${company.email ? `Email: ${company.email}<br>` : ''}
              ${company.phone ? `Phone: ${company.phone}<br>` : ''}
              ${company.address ? `Address: ${company.address}<br>` : ''}
              ${company.website ? `Website: ${company.website}` : ''}
            </div>
          </div>
          <div class="invoice-section">
            <div class="invoice-title">INVOICE</div>
            <div class="invoice-number">${invoice.invoiceNumber}</div>
            <div class="status-badge status-${invoice.status}">
              ${invoice.status === 'paid' ? 'Paid' : invoice.status === 'partial' ? 'Partial' : 'Sent'}
            </div>
          </div>
        </div>

        <div class="date-row">
          <div class="date-item">
            <div class="date-label">Invoice Date</div>
            <div class="date-value">${new Date(invoice.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
          </div>
          <div class="date-item">
            <div class="date-label">Due Date</div>
            <div class="date-value">${new Date(invoice.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
          </div>
          ${invoice.paidAt ? `
            <div class="date-item">
              <div class="date-label">Paid Date</div>
              <div class="date-value">${new Date(invoice.paidAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
            </div>
          ` : ''}
        </div>

        <div class="parties-section">
          <div class="party-section">
            <div class="section-title">From</div>
            <div class="party-details">
              <strong>${company.name}</strong>
              ${company.email ? `Email: ${company.email}<br>` : ''}
              ${company.phone ? `Phone: ${company.phone}<br>` : ''}
              ${company.address ? `Address: ${company.address}` : ''}
            </div>
          </div>
          <div class="party-section">
            <div class="section-title">Bill To</div>
            <div class="party-details">
              <strong>${client.name}</strong>
              ${client.email ? `Email: ${client.email}<br>` : ''}
              ${client.phone ? `Phone: ${client.phone}<br>` : ''}
              ${client.address ? `Address: ${client.address}` : ''}
            </div>
          </div>
        </div>

        <table class="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th class="table-number">Quantity</th>
              <th class="table-number">Rate</th>
              <th class="table-amount">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td>${item.description}</td>
                <td class="table-number">${item.quantity}</td>
                <td class="table-number">$${item.rate.toFixed(2)}</td>
                <td class="table-amount">$${item.total.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="summary-section">
          <div class="summary-left">
            <strong style="color: #0f172a; margin-bottom: 8px; display: block;">Invoice Details:</strong>
            <div>${invoice.title}</div>
            ${invoice.notes ? `<br><strong style="color: #0f172a; margin-bottom: 4px; display: block;">Notes:</strong><div>${invoice.notes}</div>` : ''}
          </div>
          <div class="summary-right">
            <div class="summary-row">
              <label>Subtotal:</label>
              <span>$${subtotal.toFixed(2)}</span>
            </div>
            ${discount > 0 ? `
              <div class="summary-row">
                <label>Discount:</label>
                <span>-$${discount.toFixed(2)}</span>
              </div>
            ` : ''}
            ${tax > 0 ? `
              <div class="summary-row">
                <label>Tax:</label>
                <span>$${tax.toFixed(2)}</span>
              </div>
            ` : ''}
            <div class="summary-row total">
              <label>TOTAL AMOUNT:</label>
              <span>${invoice.currency} ${total.toFixed(2)}</span>
            </div>
            ${invoice.amountPaid > 0 ? `
              <div class="summary-row">
                <label>Amount Paid:</label>
                <span>$${invoice.amountPaid.toFixed(2)}</span>
              </div>
              <div class="summary-row due">
                <label>AMOUNT DUE:</label>
                <span>$${Math.max(0, amountDue).toFixed(2)}</span>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="payment-info">
          <div class="payment-title">Payment Information</div>
          <div class="payment-details">
            <strong style="color: #0f172a;">Bank Details:</strong><br>
            Account Name: ${company.name}<br>
            Please reference Invoice Number: ${invoice.invoiceNumber}<br>
            Payment Due: ${new Date(invoice.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        ${invoice.terms ? `
          <div class="terms-section">
            <div class="terms-title">Payment Terms</div>
            <div class="terms-content">${invoice.terms}</div>
          </div>
        ` : ''}

        <div class="footer">
          <p>Thank you for your business!</p>
          <p>${company.name} | ${company.phone}</p>
          <p>Due: ${new Date(invoice.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
