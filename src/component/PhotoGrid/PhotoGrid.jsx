import React, { useState, useEffect } from 'react';
import { fetchPhotos } from '../../api';
import { Box, CircularProgress, Card, CardHeader, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPhotos(page).then((res) => {
      setPhotos((prevPhotos) => [...prevPhotos, ...res.data]);
      if (res.data.length === 0) setHasMore(false);
    });
  }, [page]);

  return (
    <InfiniteScroll
      dataLength={photos.length}
      next={() => setPage(page + 1)}
      hasMore={hasMore}
      loader={<CircularProgress />}
      endMessage={<p>No more photos to display.</p>}
      style={{ overflow: 'hidden' }}
    >
      <Box 
        sx={{
          display: 'flex',
          flexWrap: 'wrap', 
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 2,
          padding: 2,
          minHeight: '100vh',
        }}
      >
        {photos.map((photo) => (
          <Card 
            key={photo.id} 
            sx={{
              width: '200px',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Link to={`/photos/${photo.id}`}>
              {/* CardHeader for the author's name */}
              <CardHeader 
                title={photo.user.name}
                sx={{
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#555',
                  margin: '8px 0',
                }}
              />
              
              {/* CardMedia for the image */}
              <CardMedia
                component="img"
                image={photo.urls.thumb}
                alt={photo.alt_description}
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Link>
          </Card>
        ))}
      </Box>
    </InfiniteScroll>
  );
};

export default PhotoGrid;
