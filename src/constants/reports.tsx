import { ContactReportItem } from '@/@types/Report';

export const CONTACTS_REPORT_MOCK: ContactReportItem[] = [
  {
    id: '1',
    contactId: 'contact_001',
    destination: '+1234567890',
    message: 'Hello, this is a test message.',
    status: 'completed',
  },
  {
    id: '2',
    contactId: 'contact_002',
    destination: '+1234567891',
    message: 'Hello, this is another test message.',
    status: 'failed',
  },
  {
    id: '3',
    contactId: 'contact_003',
    destination: '+1234567892',
    message: 'Hi, your order has been shipped.',
    status: 'pending',
  },
  {
    id: '4',
    contactId: 'contact_004',
    destination: '+1234567893',
    message: 'Reminder: Your appointment is tomorrow.',
    status: 'completed',
  },
  {
    id: '5',
    contactId: 'contact_005',
    destination: '+1234567894',
    message: 'Thank you for your purchase!',
    status: 'pending',
  },
];
