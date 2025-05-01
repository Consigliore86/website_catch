import Image from 'next/image';
import { supabase } from '../utils/supabase/client';

// Typen für die Datenstruktur definieren
interface Series {
  series_id: string;
  series_name: string;
}

interface Set {
  set_id: string;
  name: string;
  series: Series;
}

interface Card {
  card_id: string;
  name: string;
  image_url: string;
  sets: Set;
}

interface HomeProps {
  data: Card[];
  error: { message: string } | null;
}

export default function Home({ data, error }: HomeProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Catch & Collect</h1>
      {error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full">
          {data?.map((card) => (
            <div
              key={card.card_id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105"
            >
              {card.image_url ? (
                <Image
                  src={card.image_url}
                  alt={card.name}
                  width={200}
                  height={280}
                  className="rounded-md mb-4"
                  priority
                />
              ) : (
                <div className="w-[200px] h-[280px] bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
              <h2 className="text-lg font-semibold text-center">{card.name}</h2>
              <p className="text-sm text-gray-600">Set: {card.sets?.name || 'Unknown'}</p>
              <p className="text-sm text-gray-600">Series: {card.sets?.series?.series_name || 'Unknown'}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from('cards')
    .select(`
      card_id,
      name,
      image_url,
      sets (set_id, name, series (series_id, series_name))
    `)
    .limit(5);

  return {
    props: {
      data: data || [],
      error: error || null,
    },
  };
}