export interface AddressResult {
  id: string;
  formattedAddress: string;
}

export async function lookupAddress(postcode: string): Promise<AddressResult[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const cleanPostcode = postcode.replace(/\s+/g, "").toUpperCase();
  
  if (cleanPostcode.length < 5) {
    throw new Error("Invalid postcode");
  }

  // Mock results based on the postcode provided
  return [
    { id: "1", formattedAddress: `1 High Street, London, ${postcode.toUpperCase()}` },
    { id: "2", formattedAddress: `2 High Street, London, ${postcode.toUpperCase()}` },
    { id: "3", formattedAddress: `3 High Street, London, ${postcode.toUpperCase()}` },
    { id: "4", formattedAddress: `Flat 1, 4 High Street, London, ${postcode.toUpperCase()}` },
    { id: "5", formattedAddress: `Flat 2, 4 High Street, London, ${postcode.toUpperCase()}` },
  ];
}
