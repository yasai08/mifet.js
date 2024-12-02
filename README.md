mifet.js
========
#### Short for javascript fetch
### Installation
```bash
npm install mifet
```
### Usage
```js
import { get, port, put, del } from 'path';

get('url')
  .t((data) => {
    console.log(data);
  })
  .c((error) => {
    console.error('Fetch Error:', error);
  });

post('url', {
  title: 'foo',
  body: 'bar',
  userId: 1
})
  .t(data => console.log('Posted data:', data))
  .c(err => console.error('Error:', err));

put('url', {
  id: 1,
  title: 'updated title',
  body: 'updated body',
  userId: 1
})
  .t(data => console.log('Updated data:', data))
  .c(err => console.error('Error:', err));

del('url')
  .t(() => console.log('Resource deleted successfully'))
  .c(err => console.error('Error:', err));
```
```
.t => .then
.c => .catch

('url', body)
```
