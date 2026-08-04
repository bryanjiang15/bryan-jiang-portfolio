type SpotifyEmbedController = {
  addListener: (
    event: 'playback_update',
    cb: (e: { data: { isPaused: boolean; position: number; duration: number } }) => void,
  ) => void
  removeListener?: (event: string, cb?: unknown) => void
  destroy?: () => void
}

export type SpotifyIFrameAPI = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void
}

type SpotifyWindow = Window & {
  onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void
  __spotifyIframeApi?: SpotifyIFrameAPI
}

let apiPromise: Promise<SpotifyIFrameAPI> | null = null

/** Loads Spotify’s embed IFrame API once (needed for playback events). */
export function getSpotifyIframeApi(): Promise<SpotifyIFrameAPI> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Spotify IFrame API requires a browser'))
  }

  const w = window as SpotifyWindow
  if (w.__spotifyIframeApi) return Promise.resolve(w.__spotifyIframeApi)

  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const prev = w.onSpotifyIframeApiReady
      w.onSpotifyIframeApiReady = (api) => {
        w.__spotifyIframeApi = api
        prev?.(api)
        resolve(api)
      }

      if (!document.querySelector('script[data-spotify-iframe-api]')) {
        const script = document.createElement('script')
        script.src = 'https://open.spotify.com/embed/iframe-api/v1'
        script.async = true
        script.dataset.spotifyIframeApi = 'true'
        document.body.appendChild(script)
      }
    })
  }

  return apiPromise
}
