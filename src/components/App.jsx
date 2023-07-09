import { useState, useEffect } from 'react';

import { fetchImages } from 'services/api';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { ImagesGalleryDiv } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState({});

  useEffect(() => {
    async function getImages(query) {
      if (!query) {
        return;
      }

      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchImages(query, page);

        if (totalHits < 1) {
          setError(`Nothing found for your request "${query}"`);
        } else {
          setError(null);
        }

        setImages(prevState => {
          return [...prevState, ...hits];
        });

        setTotalHits(totalHits);
      } catch (error) {
        setError('Something went wrong...');
      } finally {
        setIsLoading(false);
      }
    }

    getImages(query);
  }, [page, query]);

  const handleSubmit = searchQuery => {
    if (searchQuery === query) {
      return;
    }

    setPage(1);
    setQuery(searchQuery);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const showModalWindow = largeImage => {
    setShowModal(prevState => !prevState);
    setModalImage(largeImage);

    return;
  };

  const lastPage = Math.ceil(totalHits / 12) > page;

  return (
    <ImagesGalleryDiv>
      <SearchBar handleSubmit={handleSubmit} />

      {showModal && (
        <Modal showModal={showModalWindow} largeImage={modalImage} />
      )}
      {images && <ImageGallery images={images} openModal={showModalWindow} />}

      {isLoading && <Loader />}

      {images.length > 0 && lastPage && <Button onClickLoadMore={loadMore} />}

      {error && (
        <p
          style={{
            color: 'black',
            backgroundColor: 'red',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          {' '}
          {error}{' '}
        </p>
      )}
    </ImagesGalleryDiv>
  );
};
