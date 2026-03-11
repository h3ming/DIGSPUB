import { json } from '@sveltejs/kit';

export async function GET({ url }) {
  const question = url.searchParams.get('question');
  const category = url.searchParams.get('category');

  const response = await fetch(
    `https://eightballapi.com/api/${category}?question=${encodeURIComponent(question)}`
  );
  const data = await response.json();

  return json(data);
}