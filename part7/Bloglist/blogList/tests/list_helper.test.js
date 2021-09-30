const listHelper = require('../utils/list_helper')

describe('dummy test', () => {
    test('dummy returns one', () => {
        const blogs = []
      
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
      })
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

describe('favorite blog', () => {
    const listOfBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 15,
            __v: 0
        }
    ]
    test('favorite blog should be equal to', () => {
        const result = listHelper.favoriteBlog(listOfBlogs)
        expect(result).toEqual( 
            {
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                likes: 15
            }
        )
      })

// describe('top author', () => {
//     const listOfBlogs = [
//         {
//             _id: '5a422aa71b54a676234d17f8',
//             title: 'Go To Statement Considered Harmful',
//             author: 'Edsger W. Dijkstra',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 5,
//             __v: 0
//         },
//         {
//             _id: '5a422aa71b54a676234d17f8',
//             title: 'Go To Statement Considered Harmful',
//             author: 'Matthew Everitt',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 10,
//             __v: 0
//         },
//         {
//             _id: '5a422aa71b54a676234d17f8',
//             title: 'Go To Statement Considered Harmful',
//             author: 'Edsger W. Dijkstra',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 15,
//             __v: 0
//         },
//         {
//             _id: '5a422aa71b54a676234d17f8',
//             title: 'Go To Statement Considered Harmful',
//             author: 'Edsger W. Dijkstra',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 7,
//             __v: 0
//         },
//         {
//             _id: '5a422aa71b54a676234d17f8',
//             title: 'Go To Statement Considered Harmful',
//             author: 'Matthew Everitt',
//             url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//             likes: 18,
//             __v: 0
//         }
//     ]
//     test('top author should be equal to', () => {
//         const result = listHelper.topAuthor(listOfBlogs)
//         expect(result).toEqual( 
//             {
//                 author: 'Edsger W. Dijkstra',
//                 blogs: 3
//             }
//         )
//     })
// })

})