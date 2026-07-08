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

  const formattedPostcode = cleanPostcode.replace(/(.{3})$/, " $1");
  const isDarlington = cleanPostcode.startsWith("DL");

  if (isDarlington) {
    return [
      { id: "1", formattedAddress: `1 Northgate, Darlington, County Durham ${formattedPostcode}` },
      { id: "2", formattedAddress: `14 Tubwell Row, Darlington, County Durham ${formattedPostcode}` },
      { id: "3", formattedAddress: `Flat 2, 8 Bondgate, Darlington, County Durham ${formattedPostcode}` },
      { id: "4", formattedAddress: `22 Victoria Road, Darlington, County Durham ${formattedPostcode}` },
      { id: "5", formattedAddress: `The Old Post Office, 5 Horsemarket, Darlington, County Durham ${formattedPostcode}` },
    ];
  }

  return [
    { id: "1", formattedAddress: `1 High Street, London ${formattedPostcode}` },
    { id: "2", formattedAddress: `2 High Street, London ${formattedPostcode}` },
    { id: "3", formattedAddress: `3 High Street, London ${formattedPostcode}` },
    { id: "4", formattedAddress: `Flat 1, 4 High Street, London ${formattedPostcode}` },
    { id: "5", formattedAddress: `Flat 2, 4 High Street, London ${formattedPostcode}` },
  ];
}
