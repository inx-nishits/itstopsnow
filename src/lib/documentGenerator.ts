// Mock document generator for prototyping purposes
export async function generateMemorialPDF(officer: any, tributes: any[]) {
  return new Promise<Blob>((resolve) => {
    setTimeout(() => {
      const content = `Mock Memorial PDF for ${officer.name}\n\nTributes:\n${tributes.map(t => t.text).join('\n')}`;
      const blob = new Blob([content], { type: 'application/pdf' });
      resolve(blob);
    }, 2000);
  });
}

export async function generatePDF(data: any) {
  return new Promise<Blob>((resolve) => {
    setTimeout(() => {
      const content = `Mock Letter PDF to ${data.mpName}\n\n${data.content}`;
      const blob = new Blob([content], { type: 'application/pdf' });
      resolve(blob);
    }, 2000);
  });
}

export async function generateDOCX(data: any) {
  return new Promise<Blob>((resolve) => {
    setTimeout(() => {
      const content = `Mock Letter DOCX to ${data.mpName}\n\n${data.content}`;
      const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      resolve(blob);
    }, 2000);
  });
}
