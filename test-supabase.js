import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Lade Umgebungsvariablen aus login.env
dotenv.config({ path: './.env' });

const supabaseUrl = 'https://gezhdauazitnymbtmlat.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY; // Wird aus der Umgebungsvariable geladen
const supabase = createClient(supabaseUrl, supabaseKey);

// Test 1: Lesezugriff testen
async function testReadAccess() {
  try {
    const { data, error } = await supabase.from('cards').select('*').limit(1);
    if (error) {
      console.error('Lesezugriff fehlgeschlagen:', error.message);
    } else {
      console.log('Lesezugriff erfolgreich:', data);
    }
  } catch (err) {
    console.error('Fehler beim Lesezugriff:', err);
  }
}

// Test 2: Schreibzugriff testen (sollte fehlschlagen)
async function testWriteAccess() {
  try {
    const { data, error } = await supabase.from('cards').insert({
      card_id: 'test',
      language: 'en',
      name: 'Test Card'
    });
    if (error) {
      console.error('Schreibzugriff fehlgeschlagen (erwartet):', error.message);
    } else {
      console.log('Schreibzugriff erfolgreich (unerwartet):', data);
    }
  } catch (err) {
    console.error('Fehler beim Schreibzugriff:', err);
  }
}

// Tests ausführen
(async () => {
  await testReadAccess();
  await testWriteAccess();
})();