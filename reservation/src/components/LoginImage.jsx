import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
    title: 'Doc1',
    rows: 2,
    cols: 2
  },
  {
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
    title: 'Doc2',
    rows: 2,
    cols: 2
  },
  {
    img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7',
    title: 'Doc3',
    rows: 2,
    cols: 2
  },
  {
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d',
    title: 'Doc4',
    rows: 2,
    cols: 2
  },
  {
    img: 'https://images.unsplash.com/photo-1612349316228-5942a9b489c2',
    title: 'Doc5',
    rows: 2,
    cols: 2
  },
  {
    img: 'https://plus.unsplash.com/premium_photo-1661766752153-9f0c3fad728f',
    title: 'Doc6',
    rows: 2,
    cols: 2
  }
];

// function srcset(image, size, rows = 1, cols = 1) {
//   return {
//     src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
//     srcSet: `${image}?w=${size * cols}&h=${
//       size * rows
//     }&fit=crop&auto=format&dpr=2 2x`
//   };
// }

export default function LoginImage() {
  return (
    <ImageList
      sx={{ width: 500, height: 'auto' }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            // src={srcset(item.img, 121, item.rows, item.cols)}
            src={`${item.img}?w=${121 * (item.rows || 1)}&h=${
              121 * (item.cols || 1)
            }&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}