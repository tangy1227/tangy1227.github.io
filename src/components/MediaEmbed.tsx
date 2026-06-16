import { useState } from 'react'

type Props = {
  type: 'youtube' | 'soundcloud'
  /** YouTube video id, or full SoundCloud track/playlist URL */
  id: string
  title: string
  /** Optional custom cover image (defaults to the YouTube thumbnail) */
  cover?: string
}

export default function MediaEmbed({ type, id, title, cover }: Props) {
  const [loaded, setLoaded] = useState(false)

  const isYouTube = type === 'youtube'
  const coverSrc = cover ?? (isYouTube ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined)
  const src = isYouTube
    ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
    : `https://w.soundcloud.com/player/?url=${encodeURIComponent(id)}&auto_play=true&color=%23ffb800&hide_related=true`

  if (loaded) {
    return (
      <div className="media">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Play ${title}`}
      className="media group block w-full text-left"
    >
      {coverSrc ? (
        <img
          src={coverSrc}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        // SoundCloud has no simple thumbnail URL — use a branded cover
        <div className="absolute inset-0 bg-[#161616] flex items-center justify-center">
          <span className="font-display font-bold uppercase tracking-[0.2em] text-white/30 text-sm">
            SoundCloud
          </span>
        </div>
      )}
      <span className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors" />
      <span className="play-btn" aria-hidden="true" />
      <span className="absolute bottom-0 left-0 right-0 p-4 z-10 flex items-end bg-gradient-to-t from-black/60 to-transparent">
        <span className="font-display font-semibold text-white text-sm md:text-base">{title}</span>
      </span>
    </button>
  )
}
