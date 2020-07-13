<!--[meta]
section: api
subSection: field-adapters
title: OEmbed adapters
[meta]-->

# OEmbed adapters

The `OEmbed` field type (from `@koikorn/fields`) can fetch oEmbed data
from a number of providers such as [Iframely](https://iframely.com).

This package contains adapters for different providers.

## `IframelyOEmbedAdapter`

```javascript
const { Keystone } = require('@koikorn/keystone');
const { OEmbed } = require('@koikorn/fields');
const { IframelyOEmbedAdapter } = require('@koikorn/oembed-adapters');

const keystone = new Keystone(/* ... */);

const iframelyAdapter = new IframelyOEmbedAdapter({
  apiKey: '...', // Get one from https://iframely.com
});

keystone.createList('User', {
  fields: {
    portfolio: {
      type: OEmbed,
      adapter: iframelyAdapter,
    },
  },
});
```

The request to Iframely will include the following [parameters](https://iframely.com/docs/parameters):

- `iframe=1`
- `omit_script=1`
