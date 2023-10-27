// schemas/book.js
const book = {
    name: 'book',
    title: 'Book',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'ratingsReceived',
        title: 'Ratings Received',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'user',
                title: 'User',
                type: 'reference',
                to: [{type: 'user'}]
              },
              {
                name: 'rating',
                title: 'Rating',
                type: 'number'
              }
            ]
          }
        ]
      }
    ]
  }


export default book;

