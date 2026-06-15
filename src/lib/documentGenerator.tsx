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
    <Page size="A4" style={{ ...styles.page, padding: 40, backgroundColor: '#020611' }}>
      
      {/* Header section with deep blue styling */}
      <View style={{ marginBottom: 40, paddingBottom: 20, borderBottom: '1px solid #1e293b', alignItems: 'center' }}>
        <Text style={{ fontSize: 10, color: '#1877F2', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 10 }}>{officer.role}</Text>
        <Text style={{ fontSize: 36, color: '#ffffff', fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>{officer.name}</Text>
        <Text style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', letterSpacing: 1 }}>{officer.force}  •  {officer.years}  •  Age {officer.age}</Text>
      </View>
      
      {/* Quote */}
      <View style={{ marginBottom: 40, alignItems: 'center', paddingHorizontal: 40 }}>
        <Text style={{ fontSize: 16, fontStyle: 'italic', color: '#ffffff', textAlign: 'center', lineHeight: 1.5 }}>
          {officer.quote}
        </Text>
      </View>

      <Text style={{ fontSize: 14, marginTop: 20, marginBottom: 20, fontWeight: 'bold', color: '#ffffff', textTransform: 'uppercase', letterSpacing: 1 }}>Book of Condolence</Text>
      
      {tributes.map((tribute: any, i: number) => (
        <View key={i} style={{ marginBottom: 15, padding: 20, backgroundColor: '#0f172a', borderRadius: 8, borderLeft: '4px solid #1877F2' }}>
          <Text style={{ fontSize: 12, marginBottom: 15, color: '#e2e8f0', lineHeight: 1.5, fontStyle: 'italic' }}>"{tribute.text}"</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#ffffff', marginRight: 10 }}>{tribute.name}</Text>
            <Text style={{ fontSize: 9, color: '#1877F2', textTransform: 'uppercase', letterSpacing: 1 }}>{tribute.type}</Text>
          </View>
        </View>
      ))}

      <Text style={{ position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 10, color: '#475569', textAlign: 'center', borderTop: '1px solid #1e293b', paddingTop: 10 }}>
        Generated via itstopsnow.org - Honouring their service.
      </Text>
    </Page>
  </Document>
);

export const generateMemorialPDF = async (officer: any, tributes: any[]) => {
  const blob = await pdf(<MemorialPDF officer={officer} tributes={tributes} />).toBlob();
  return blob;
};

