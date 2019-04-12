module.exports = {
  url: '/performanceAudits',
  cover: '/images/collections/lighthouse.png',
  title: 'Performance audits',
  description:
    'How long does your app take to show content and become useable?',
  overview: `Lorem ipsum dolor set amet...`,
  topics: [
    {
      title: 'Metrics',
      guides: [
        'first-contentful-paint',
        'first-meaningful-paint',
        'speed-index',
        'first-cpu-idle',
        'interactive',
        'estimated-input-latency',
      ],
    },
    {
      title: 'Opportunities',
      guides: [
        'render-blocking-resources',
        'uses-responsive-images',
        'offscreen-images',
        'unminified-css',
        'unminified-javascript',
        'unused-css-rules',
        'uses-optimized-images',
        'uses-webp-images',
        'uses-text-compression',
        'uses-rel-preconnect',
        'time-to-first-byte',
        'redirects',
        'uses-rel-preload',
        'efficient-animated-content',
      ],
    },
    {
      title: 'Diagnostics',
      guides: [
        'total-byte-weight',
        'uses-long-cache-ttl',
        'dom-size',
        'critical-request-chains',
        'user-timings',
        'bootup-time',
        'mainthread-work-breakdown',
        'font-display',
      ],
    },
  ],
};
