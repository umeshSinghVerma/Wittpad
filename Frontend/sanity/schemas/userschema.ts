import book from "./bookschema";
const user = {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string'
      },
      {
        name: 'booksRated',
        title: 'Books Rated',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'book',
                title: 'Book',
                type: 'reference',
                to: [{type: 'book'}]
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
export default user;
