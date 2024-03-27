const posts = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    title: 'title1',
    mainTag: 'Ubuntu',
    extraTag:['tag1', 'tag2'],
    content: 'hoge',
    dateTime: new Date().toISOString(),
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    title: 'title2',
    mainTag: 'C',
    extraTag:['tag3', 'tag4'],
    content: 'fuga',
    dateTime: new Date().toISOString(),
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    title: 'title3',
    mainTag: 'Go',
    extraTag:['tag5', 'tag6'],
    content: 'piyo',
    dateTime: new Date().toISOString(),
  },
  ]
  
  module.exports = {
    posts,
  };
