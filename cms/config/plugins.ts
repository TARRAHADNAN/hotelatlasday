export default ({ env }) => ({
  // i18n Configuration
  i18n: {
    enabled: true,
    config: {
      locales: ['fr', 'en', 'ar'],
      defaultLocale: 'fr',
    },
  },

  // Cloudinary Upload Provider
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },

  // Users & Permissions
  'users-permissions': {
    enabled: true,
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
});
