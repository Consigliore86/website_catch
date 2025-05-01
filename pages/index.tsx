import { supabase } from '../utils/supabase/client';

export default async function Home() {
  const { data, error } = await supabase
    .from('cards')
    .select(`
      card_id,
      name,
      sets (set_id, name, series (series_id, series_name))
    `)
    .limit(5);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Pokémon TCG App</h1>
      {error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {data?.map((card) => (
            <li key={card.card_id}>
              {card.name} - Set: {card.sets.name} - Series: {card.sets.series.series_name}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}