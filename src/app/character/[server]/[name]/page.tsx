import { getOCID } from '@/app/api/character';
import Navigation from '@/components/Navigation';

interface CharacterPageProps {
  params: {
    server: string;
    name: string;
  };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const server = decodeURIComponent(params.server);
  const characterName = decodeURIComponent(params.name);

  const ocid = await getOCID(characterName, server);

  console.log(ocid);

  return (
    <div className="min-h-screen">
      <Navigation />
    </div>
  );
}
