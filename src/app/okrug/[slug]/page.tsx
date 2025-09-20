'use client'

import { useParams } from 'next/navigation'

const okrugMap = new Map([['1', 'Центральный округ'], ['2', 'Северный округ'], ['3', 'Южный округ']]);

export default function ExampleClientComponent() {
  const params = useParams<{ slug: string; }>();

  return <h1>{okrugMap.get(params.slug)}</h1>
}