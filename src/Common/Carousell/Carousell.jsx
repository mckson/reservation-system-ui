/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import NextIcon from '@material-ui/icons/KeyboardArrowRight';
import { IconButton, makeStyles } from '@material-ui/core';
import SelectedImage from './SelectedImage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  smallImage: {
    width: 80,
    height: 80,
    margin: 2.5,
    cursor: 'pointer',
  },
  selectedSmallImage: {
    width: 75,
    height: 75,
    padding: 2.5,
    borderWidth: 2.5,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  navigationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'inherit',
    justifySelf: 'center',
  },
  button: {
    color: theme.palette.primary.main,
  },
}));

const Carousell = ({ imagesUrls, altText }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(imagesUrls[0]);

  const classes = useStyles();

  const handleNextClick = () => {
    let nextIndex;
    if (selectedImageIndex < imagesUrls.length - 1) {
      nextIndex = selectedImageIndex + 1;
    } else {
      nextIndex = 0;
    }
    setSelectedImageIndex(nextIndex);
    setSelectedImage(imagesUrls[nextIndex]);
  };

  const handleBackClick = () => {
    let previosIndex;
    if (selectedImageIndex > 0) {
      previosIndex = selectedImageIndex - 1;
    } else {
      previosIndex = imagesUrls.length - 1;
    }
    setSelectedImageIndex(previosIndex);
    setSelectedImage(imagesUrls[previosIndex]);
  };

  const handleSelectedImageChanged = (index) => {
    setSelectedImageIndex(index);
    setSelectedImage(imagesUrls[index]);
  };

  //   const arrayToShow = (index) => {
  //     if (index < 3) {
  //       return imagesUrls.slice(0, 6);
  //     }
  //     if (index > imagesUrls.length - 4) {
  //       return imagesUrls.slice(imagesUrls.length - 7, imagesUrls - 1);
  //     }
  //     return imagesUrls.slice(index, index + 6);
  //   };

  return (
    <div className={classes.root}>
      <SelectedImage url={selectedImage} onClick={() => handleNextClick()} />
      {imagesUrls?.length > 1 ? (
        <>
          <div className={classes.navigationContainer}>
            <IconButton
              size="small"
              className={classes.button}
              onClick={() => handleBackClick()}
            >
              <BackIcon />
            </IconButton>

            <IconButton
              size="small"
              className={classes.button}
              onClick={() => handleNextClick()}
            >
              <NextIcon />
            </IconButton>
          </div>
          <div className={classes.imageContainer}>
            {imagesUrls.map((imageUrl, index) => (
              <div
                className={
                  index === selectedImageIndex
                    ? classes.selectedSmallImage
                    : classes.smallImage
                }
                variant="outlined"
                onClick={() => handleSelectedImageChanged(index)}
              >
                <img className={classes.image} src={imageUrl} alt={altText} />
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

Carousell.propTypes = {
  imagesUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  altText: PropTypes.string,
};

Carousell.defaultProps = {
  altText: 'image',
};

export default Carousell;
