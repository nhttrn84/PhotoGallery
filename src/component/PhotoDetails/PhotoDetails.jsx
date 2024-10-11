import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPhotoDetails } from '../../api';
import { Typography, CircularProgress } from '@mui/material';

const PhotoDetails = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotoDetails(id).then((res) => {
      setPhoto(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <img src={photo.urls.full} alt={photo.alt_description} style={{ width: '100%' }} />
      <Typography align="center" variant="h5">{photo.alt_description || 'No title available'}</Typography>
      <Typography align="center" variant="subtitle1">by {photo.user.name}</Typography>
      <Typography align="center" marginBottom={'16px'} variant="body1">{photo.description || 'No description available'}</Typography>
    </div>
  );
};

export default PhotoDetails;
