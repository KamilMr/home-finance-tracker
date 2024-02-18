import {useState} from 'react';

import {Card, CardMedia, IconButton, Input, Container} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {useFetch} from '../hooks';

// resizeImg helpers
const readFile = (file) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(reader.result);
    reader.onerror = (e) => rej(e);
    reader.readAsDataURL(file);
  });

const createImg = (src) =>
  new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = (e) => rej(e);
    img.src = src;
  });

const getBlob = (cv) => new Promise((res) => cv.toBlob(res, 'image/jpeg', 0.7));

const sizeBox = (w, h, size) =>
  [w, h].map((d) => d * Math.min(size / Math.max(w, h), 1));

const resizeImg = async (file) => {
  // set canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // image into canvas
  const fileUri = await readFile(file);
  const img = await createImg(fileUri);

  // resize
  const BBOX_MAX = 2000;
  const [w, h] = sizeBox(img.width, img.height, BBOX_MAX);

  // size cv
  canvas.width = w;
  canvas.height = h;

  // draw image into canvas
  ctx.drawImage(img, 0, 0, w, h);

  return getBlob(canvas);
};

const ImagesLoader = ({setImageUrl, imageUrl}) => {
  const [image, setImages] = useState(imageUrl);
  const cf = useFetch();
  const deleteImage = () => {
    setImages();
    setImageUrl();
  };
  const handleSelectImage = async (evt) => {
    const form = new FormData();
    if (evt.target.files[0]) {
      const img = await resizeImg(evt.target.files[0]);
      form.append('image', img);
      let resp = await cf({
        path: 'expenses/image',
        method: 'POST',
        body: form,
        file: true,
      }).then((res) => res.json());
      if (resp.d?.url) {
        setImages(resp.d.url) ;
        setImageUrl(resp.d.url);
      }
    }
  };

  return (
    <Container sx={styles.root}>
      {image && (
        /* eslint-disable-next-line */
        <div css={styles.image}>
          <Card css={{width: 100}}>
            <CardMedia
              component="img"
              image={image}
              height="100"
              disabled
            />
          </Card>
          <IconButton
            onClick={deleteImage}
            css={styles.deleteButton}
            size="large">
            <DeleteIcon color="primary" />
          </IconButton>
        </div>
      )}
      <div css={styles.addImage}>
        <label htmlFor="button-file">
          <Input
            type="file"
            id="button-file"
            onChange={handleSelectImage}
            style={{display: 'none'}}
            inputProps={{accept: 'image/*'}}
          />
          {!image && (
            <IconButton component="span" style={{width: 'auto'}} size="large">
              <AddCircleIcon color="primary" fontSize="large" />
            </IconButton>
          )}
        </label>
      </div>
    </Container>
  );
};

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  image: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  deleteButton: {
    marginTop: 2,
    marginBottom: 2,
  },
  addImage: {
    minWidth: 100,
    height: 100,
    border: '1px dotted',
    marginRight: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ImagesLoader;
