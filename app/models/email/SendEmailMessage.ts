interface SendEmailMessage {
    subject: string;
    body: string;
    toEmails: string[];
    ccEmails?: string[] | null;
    attachments?: EmailAttachment[] | null;
}

interface EmailAttachment {
    fileName: string;
    fileSize: number;
}