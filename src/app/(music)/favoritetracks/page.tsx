import { redirect } from 'next/navigation';

export default function FavoriteTracksRedirect() {
  redirect('/categories/favorite-tracks');
}
