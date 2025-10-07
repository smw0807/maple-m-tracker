import Image from 'next/image';

interface CharacterImageProps {
  imageUrl: string;
  characterName: string;
}

export default function CharacterImage({
  imageUrl,
  characterName,
}: CharacterImageProps) {
  return (
    <div className="lg:col-span-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          캐릭터 이미지
        </h2>
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
          <Image
            src={imageUrl}
            alt={characterName}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
