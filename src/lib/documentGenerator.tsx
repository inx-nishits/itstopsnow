import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Font } from '@react-pdf/renderer';
import { Document as DocxDocument, Packer, Paragraph, TextRun } from 'docx';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 50,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#1e3a8a', // blue-900
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    marginBottom: 20,
    color: '#64748b', // slate-500
  },
  body: {
    fontSize: 12,
    lineHeight: 1.5,
    color: '#0f172a', // slate-900
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    right: 50,
    fontSize: 10,
    color: '#94a3b8',
    textAlign: 'center',
    borderTop: '1px solid #e2e8f0',
    paddingTop: 10,
  },
});

// PDF React Component
const LetterPDF = ({ content, mpName, senderName, senderAddress, date }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>IT STOPS NOW CAMPAIGN</Text>
      <Text style={styles.date}>{date}</Text>
      
      <Text style={styles.body}>Dear {mpName},</Text>
      
      {/* Split content by newlines and render as separate paragraphs */}
      {content.split('\n').map((paragraph: string, i: number) => (
        paragraph.trim() ? <Text key={i} style={styles.body}>{paragraph}</Text> : <Text key={i} style={{ fontSize: 10 }}>{'\n'}</Text>
      ))}

      <Text style={styles.body}>Yours sincerely,</Text>
      <Text style={[styles.body, { marginTop: 20, fontWeight: 'bold' }]}>{senderName}</Text>
      <Text style={styles.body}>{senderAddress}</Text>

      <Text style={styles.footer}>Generated via itstopsnow.org - Supporting Police Officer Welfare & Accountability</Text>
    </Page>
  </Document>
);

export const generatePDF = async (data: { content: string, mpName: string, senderName: string, senderAddress: string }) => {
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const blob = await pdf(<LetterPDF {...data} date={date} />).toBlob();
  return blob;
};

export const generateDOCX = async (data: { content: string, mpName: string, senderName: string, senderAddress: string }) => {
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  
  const paragraphs = data.content.split('\n').map(p => new Paragraph({
    children: [new TextRun({ text: p, size: 24, font: "Arial" })],
    spacing: { after: 200 }
  }));

  const doc = new DocxDocument({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [new TextRun({ text: "IT STOPS NOW CAMPAIGN", bold: true, size: 32, font: "Arial", color: "1E3A8A" })],
          spacing: { after: 400 }
        }),
        new Paragraph({
          children: [new TextRun({ text: date, size: 20, font: "Arial", color: "64748B" })],
          spacing: { after: 400 }
        }),
        new Paragraph({
          children: [new TextRun({ text: `Dear ${data.mpName},`, size: 24, font: "Arial" })],
          spacing: { after: 200 }
        }),
        ...paragraphs,
        new Paragraph({
          children: [new TextRun({ text: "Yours sincerely,", size: 24, font: "Arial" })],
          spacing: { before: 200, after: 400 }
        }),
        new Paragraph({
          children: [new TextRun({ text: data.senderName, bold: true, size: 24, font: "Arial" })],
        }),
        new Paragraph({
          children: [new TextRun({ text: data.senderAddress, size: 24, font: "Arial" })],
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  return blob;
};

// Memorial PDF Components
const MemorialPDF = ({ officer, tributes }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={{ fontSize: 32, marginBottom: 10, color: '#0f172a', fontWeight: 'bold', textAlign: 'center' }}>{officer.name}</Text>
      <Text style={{ fontSize: 14, marginBottom: 30, color: '#64748b', textAlign: 'center' }}>{officer.force} | {officer.years}</Text>
      
      <Text style={{ fontSize: 18, marginBottom: 20, fontStyle: 'italic', color: '#1e3a8a', textAlign: 'center' }}>
        {officer.quote}
      </Text>

      <Text style={{ fontSize: 14, marginTop: 40, marginBottom: 20, fontWeight: 'bold', color: '#0f172a' }}>Book of Condolence</Text>
      
      {tributes.map((tribute: any, i: number) => (
        <View key={i} style={{ marginBottom: 20, padding: 15, borderLeft: '3px solid #1e3a8a', backgroundColor: '#f8fafc' }}>
          <Text style={{ fontSize: 12, marginBottom: 10, color: '#334155' }}>"{tribute.text}"</Text>
          <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#0f172a' }}>{tribute.name}</Text>
          <Text style={{ fontSize: 10, color: '#64748b' }}>{tribute.type}</Text>
        </View>
      ))}

      <Text style={styles.footer}>Produced by It Stops Now - Memorial Archive</Text>
    </Page>
  </Document>
);

export const generateMemorialPDF = async (officer: any, tributes: any[]) => {
  const blob = await pdf(<MemorialPDF officer={officer} tributes={tributes} />).toBlob();
  return blob;
};

