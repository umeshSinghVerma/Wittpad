// schemas/book.js
const book = {
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'book_image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true // <-- Defaults to false
      }
    },
    {
      name: 'book_author',
      title: 'Author',
      type: 'array',
      of: [{
        name: 'authors',
        title: "Author",
        type: 'reference',
        to: [{ type: 'authorDetails' }]
      }]
    },
    {
      name: 'book_tagline',
      title: 'Tagline',
      type: 'string'
    },
    {
      name: 'book_timeToRead',
      title: 'Time To Read',
      type: 'number'
    },
    {
      name: 'about',
      title: 'About',
      type: 'string'
    },
    {
      name: 'book_category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }]
    },
    {
      name: 'book_topic',
      title: 'Topic',
      type: 'string',
      options: {
        list: 
          // Get the currently selected category document
          // const category = document.category;
          // console.log('this is thing ',document,category);

          // Return the topics of the selected category as options
          // return category.topics.map(topic => ({
          //   title: topic,
          //   value: topic
          // }));
          [
            { "title": "Alabama", "value": "AL" },
            { "title": "Alaska", "value": "AK" },
            { "title": "Arizona", "value": "AZ" },
            // ...
          ]
        
      }
    },
    {
      name:'book_keyIdea',
      title:'Key Ideas',
      type:'array',
      of:[{type:"string"}]
    },
    {
      name:'book_bestQuote',
      title:'Best Quote',
      type:'string',
    },
    {
      name:'book_whoShouldRead',
      title:'Who Should Read It?',
      type:'array',
      of:[{type:"string"}]
    },
    {
      name:'book_buyLink',
      title:'Buy Link',
      type:'url',
    },
    {
      name: 'book_ratingsReceived',
      title: 'Ratings Received',
      type: 'array',
      of: [
        {
          name:'book_ratingByUser',
          type:'object',
          title:'Rating',
          fields:[
            {name:'user_email',type:'email',title:'Email'},
            {name:'starRating',type:'number',title:'Rating'}
          ]
        }
      ]
    }
  ]
}


export default book;

