import { Header, MovieCard } from './index'

import { Genre, Movie } from '../types'
import { useEffect, useState } from 'react'

import '../styles/content.scss'
import { api } from '../services/api'

interface ContentProps {
  selectedGenre: Genre
  selectedGenreId: number
}

export function Content({ selectedGenre, selectedGenreId }: ContentProps) {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data)
    })
  }, [selectedGenreId])

  return (
    <div className="container">
      <Header title={selectedGenre.title} />
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
