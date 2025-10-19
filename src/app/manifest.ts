import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'МосТруба',
    short_name: 'МосТруба',
    description: 'Рекомендательный сервис прогнозирования возникновения технологических ситуаций',
    start_url: '/',
    display: 'standalone',
    orientation: 'natural',
    background_color: '#001529',
    theme_color: '#001529',
    lang: 'ru-RU',
    scope: '/',
    id: '/',
    icons: [
      {
        src: 'icons/icon-128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'icons/icon-256.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: 'icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    screenshots: [
      {
        "src": "images/screen.png",
        "sizes": "512x512",
        "type": "image/png",
        "form_factor": "wide",
        "label": "Application"
      },
      {
        "src": "images/screen.png",
        "sizes": "512x512",
        "type": "image/png",
        "form_factor": "narrow",
        "label": "Application",
      }
    ]
  }
}