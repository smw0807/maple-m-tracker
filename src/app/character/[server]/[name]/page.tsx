import { getOCID, getCharacterBasic } from '@/app/api/character';
import CharacterNotFound from '@/components/card/CharacterNotFound';

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ server: string; name: string }>;
}) {
  const { server, name } = await params;
  const serverName = decodeURIComponent(server);
  const characterName = decodeURIComponent(name);
  const ocid = await getOCID(characterName, serverName);
  if (!ocid) {
    return <CharacterNotFound />;
  }
  console.log('ocid', ocid);
  // const characterBasic = await getCharacterBasic(ocid);
  // console.log('characterBasic', characterBasic);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {characterName}
        </h1>
      </div>
    </div>
  );
}
