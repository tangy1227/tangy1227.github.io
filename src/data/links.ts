// Central place for every external link on the site.
// Update a URL here and it changes everywhere it's used.
export const links = {
  email: 'owentang1227@gmail.com',
  soundcloud: 'https://soundcloud.com/tangy1227',
  youtube: 'https://www.youtube.com/@Tangy1227',
  github: 'https://github.com/tangy1227',
  linkedin: 'https://www.linkedin.com/in/yilong-t/',
  instagram: 'https://www.instagram.com/yilong_tang',
  // TODO: drop the PDF into public/ and set e.g. '/Yilong-Tang-CV.pdf'.
  // The "Download CV" link stays hidden while this is empty.
  cv: '',
}

/** A repo under the GitHub account above. */
export const repo = (name: string) => `${links.github}/${name}`

/** Watch page for a YouTube video id. */
export const youtubeVideo = (id: string) => `https://www.youtube.com/watch?v=${id}`

// Social row shown in the Contact section and the mobile menu.
export const socials = [
  { label: 'GitHub', href: links.github },
  { label: 'LinkedIn', href: links.linkedin },
  { label: 'YouTube', href: links.youtube },
  { label: 'SoundCloud', href: links.soundcloud },
  { label: 'Instagram', href: links.instagram },
]
