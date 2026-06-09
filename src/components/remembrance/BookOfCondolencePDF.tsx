"use client";

import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  coverPage: {
    backgroundColor: '#010B19',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    height: '100%',
  },
  coverTitle: {
    fontSize: 32,
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  coverName: {
    fontSize: 48,
    color: '#fbbf24', // amber-400 equivalent for print
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  coverSubtitle: {
    fontSize: 18,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#010b19',
    marginBottom: 20,
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: 10,
  },
  body: {
    fontSize: 12,
    lineHeight: 1.6,
    color: '#334155',
    marginBottom: 15,
  },
  tributeBox: {
    marginBottom: 20,
    padding: 15,
    borderLeft: '2px solid #fbbf24',
    backgroundColor: '#f8fafc',
  },
  tributeMessage: {
    fontSize: 11,
    lineHeight: 1.5,
    fontStyle: 'italic',
    color: '#1e293b',
    marginBottom: 10,
  },
  tributeAuthor: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    color: '#94a3b8',
    textAlign: 'center',
    borderTop: '1px solid #f1f5f9',
    paddingTop: 10,
  },
});

export const BookOfCondolenceDocument = ({ memorial, tributes }: any) => (
  <Document>
    {/* COVER PAGE */}
    <Page size="A4" style={styles.coverPage}>
      <Text style={styles.coverTitle}>BOOK OF CONDOLENCE</Text>
      <Text style={styles.coverName}>{memorial.name}</Text>
      <Text style={styles.coverSubtitle}>{memorial.rank} • {memorial.force}</Text>
      <Text style={[styles.coverSubtitle, { fontSize: 14 }]}>Served: {memorial.yearsServed}</Text>
    </Page>

    {/* DEDICATION & BIO PAGE */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>In Remembrance</Text>
      <Text style={styles.body}>{memorial.biography.replace(/<[^>]+>/g, '') || "A dedicated officer who served with distinction."}</Text>
      
      {memorial.quote && (
        <View style={{ marginTop: 30, padding: 20, backgroundColor: '#f1f5f9' }}>
          <Text style={[styles.body, { fontStyle: 'italic', textAlign: 'center', color: '#0f172a' }]}>"{memorial.quote}"</Text>
        </View>
      )}

      <Text style={styles.footer}>It Stops Now - Book of Condolence</Text>
    </Page>

    {/* TRIBUTES PAGE(S) */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Tributes from the Community</Text>
      
      {tributes.length > 0 ? tributes.map((tribute: any, index: number) => (
        <View key={index} style={styles.tributeBox}>
          <Text style={styles.tributeMessage}>"{tribute.message}"</Text>
          <Text style={styles.tributeAuthor}>{tribute.authorName.toUpperCase()} — {tribute.relationship}</Text>
        </View>
      )) : (
        <Text style={styles.body}>There are currently no tributes recorded.</Text>
      )}

      <Text style={styles.footer}>It Stops Now - Book of Condolence</Text>
    </Page>

    {/* FINAL PAGE */}
    <Page size="A4" style={styles.page}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[styles.sectionTitle, { borderBottom: 'none', textAlign: 'center' }]}>Forever Remembered</Text>
        <Text style={styles.body}>At the time of this printing, {memorial.candleCount.toLocaleString()} candles have been lit in honour of {memorial.name}.</Text>
        <Text style={[styles.body, { marginTop: 40, color: '#94a3b8' }]}>Generated via itstopsnow.org</Text>
      </View>
    </Page>
  </Document>
);

export const generateBookOfCondolencePDF = async (memorial: any, tributes: any[]) => {
  const blob = await pdf(<BookOfCondolenceDocument memorial={memorial} tributes={tributes} />).toBlob();
  return blob;
};
