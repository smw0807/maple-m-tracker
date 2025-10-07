'use client';
import { useEffect, useState } from 'react';
import { getStat } from '@/app/api/character';
import { CharacterStat } from '@/model/charactor/charactor';

export default function Stats({ ocid }: { ocid: string }) {
  const [stat, setStat] = useState<CharacterStat | null>(null);
  useEffect(() => {
    const fetchStat = async () => {
      const stat = await getStat(ocid);
      setStat(stat);
    };
    fetchStat();
  }, [ocid]);
  console.log('stat', stat);
  if (!stat) {
    return <div>Stats {ocid}</div>;
  }
  return <div>Stats {ocid}</div>;
}
