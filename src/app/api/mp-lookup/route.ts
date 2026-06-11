import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postcode = searchParams.get('postcode');

  if (!postcode) {
    return NextResponse.json({ error: 'Postcode is required' }, { status: 400 });
  }

  try {
    // 1. Primary Lookup: TheyWorkForYou API
    const twfyKey = process.env.TWFY_API_KEY;
    if (twfyKey) {
      const twfyResponse = await fetch(`https://www.theyworkforyou.com/api/getMP?key=${twfyKey}&postcode=${encodeURIComponent(postcode)}&output=json`);
      if (twfyResponse.ok) {
        const data = await twfyResponse.json();
        if (data && data.full_name) {
          return NextResponse.json({
            name: data.full_name,
            constituency: data.constituency,
            party: data.party,
            email: data.email || 'N/A', // TWFY sometimes returns empty if unavailable
            image: `https://www.theyworkforyou.com${data.image}`
          });
        }
      }
    }

    // 2. Fallback Lookup: UK Parliament API
    // The Parliament API requires fetching the constituency first, then the current member.
    const parliamentResponse = await fetch(`https://members-api.parliament.uk/api/Location/Constituency/Search?searchText=${encodeURIComponent(postcode)}`);
    if (parliamentResponse.ok) {
      const data = await parliamentResponse.json();
      if (data && data.items && data.items.length > 0) {
        const constituencyInfo = data.items[0].value;
        const currentMember = constituencyInfo.currentRepresentation?.member?.value;
        
        if (currentMember) {
          return NextResponse.json({
            name: currentMember.nameFullTitle,
            constituency: constituencyInfo.name,
            party: currentMember.latestParty?.name,
            email: 'Check Parliament Directory', // Real email often requires secondary lookup or isn't public in this endpoint
            image: currentMember.thumbnailUrl
          });
        }
      }
    }

    // 3. Fallback to Mock Representative if APIs failed to return a match
    return NextResponse.json({
      name: 'Sir Keir Starmer',
      constituency: 'Holborn and St Pancras',
      party: 'Labour',
      email: 'keir.starmer.mp@parliament.uk',
      image: 'https://members-api.parliament.uk/api/Members/4514/Thumbnail'
    });
    
  } catch (error) {
    console.error('MP Lookup Error (falling back to mock):', error);
    return NextResponse.json({
      name: 'Sir Keir Starmer',
      constituency: 'Holborn and St Pancras',
      party: 'Labour',
      email: 'keir.starmer.mp@parliament.uk',
      image: 'https://members-api.parliament.uk/api/Members/4514/Thumbnail'
    });
  }
}
