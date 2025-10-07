import { getOCID, getCharacterBasic } from '@/app/api/character';
import CharacterNotFound from '@/components/card/CharacterNotFound';
import CharacterInfoWrapper from '@/components/character/CharacterInfoWrapper';
import CharacterImage from '@/components/character/CharacterImage';
import Image from 'next/image';

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ server: string; name: string }>;
}) {
  const { server, name } = await params;
  const serverName = decodeURIComponent(server);
  const characterName = decodeURIComponent(name);
  console.log('serverName', serverName);
  console.log('characterName', characterName);

  const ocid = await getOCID(characterName, serverName);
  if (!ocid) {
    return <CharacterNotFound />;
  }

  const characterBasic = await getCharacterBasic(ocid);
  console.log('characterBasic', characterBasic);
  if (!characterBasic) {
    return <CharacterNotFound />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatExp = (exp: number) => {
    return exp.toLocaleString('ko-KR');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* 기본 정보 헤더 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200 relative">
              <Image
                src={characterBasic.character_image}
                alt={characterBasic.character_name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {characterBasic.character_name}
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">월드:</span>
                  <span className="ml-2 font-medium">
                    {characterBasic.world_name}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">직업:</span>
                  <span className="ml-2 font-medium">
                    {characterBasic.character_job_name}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">레벨:</span>
                  <span className="ml-2 font-medium">
                    {characterBasic.character_level}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">경험치:</span>
                  <span className="ml-2 font-medium">
                    {formatExp(characterBasic.character_exp)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">성별:</span>
                  <span className="ml-2 font-medium">
                    {characterBasic.character_gender === 'Male'
                      ? '남자'
                      : '여자'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">생성일:</span>
                  <span className="ml-2 font-medium">
                    {formatDate(characterBasic.character_date_create)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">마지막 접속:</span>
                  <span className="ml-2 font-medium">
                    {formatDate(characterBasic.character_date_last_login)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">마지막 로그아웃:</span>
                  <span className="ml-2 font-medium">
                    {formatDate(characterBasic.character_date_last_logout)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3컬럼 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <CharacterInfoWrapper />
          <CharacterImage
            imageUrl={characterBasic.character_image}
            characterName={characterBasic.character_name}
          />
        </div>
      </div>
    </div>
  );
}
