import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postVideogame, getGenres, getAllPlatforms } from '../../actions/index';
import { validateName, validateDescription, validatePlatforms, validateGenres, validateImageURL, validateDate } from '../../helpers/validaciones';
import { useDispatch, useSelector } from 'react-redux';
import style from './VideoGameCreate.module.css';

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);

  const [input, setInput] = useState({
    name: "",
    description: "",
    platforms: [],
    background_image: "",
    released: "",
    rating: 0.1,
    genres: []
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    platforms: [],
    background_image: "",
    released: "",
    rating: 0.1,
    genres: []
  });

  const [descriptionLength, setDescriptionLength] = useState(0);
  const maxDescriptionLength = 255;

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "rating") {
      const floatValue = parseFloat(value);

      if (!isNaN(floatValue)) {
        setInput({
          ...input,
          [name]: floatValue,
        });
        return;
      }
    }

    if (name === "description") {
      setDescriptionLength(value.length);
    }

    setInput({
      ...input,
      [name]: value,
    });
  }

  const handlePlatforms = (event) => {
    setInput({
      ...input,
      platforms: [...input.platforms, event.target.value]
    });
  };

  function handleGenre(event) {
    setInput({
      ...input,
      genres: [...input.genres, event.target.value]
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fieldErrors = {
      name: validateName(input.name),
      description: validateDescription(input.description),
      platforms: validatePlatforms(input.platforms),
      background_image: validateImageURL(input.background_image),
      released: validateDate(input.released),
      genres: validateGenres(input.genres)
    };

    setErrors(fieldErrors);

    const hasErrors = Object.values(fieldErrors).some((error) => error !== "");
    if (hasErrors) {
      return;
    }

    console.log(input);
    dispatch(postVideogame(input));
    alert('Videogame Created Successfully');
    setInput({
      name: "",
      description: "",
      platforms: [],
      background_image: "",
      released: '',
      rating: 0.1,
      genres: []
    });
    history.push('/home');
  }

  function handleDeleteGenre(element) {
    setInput({
      ...input,
      genres: input.genres.filter(gen => gen !== element)
    });
  }

  function handleDeletePlatform(element) {
    setInput({
      ...input,
      platforms: input.platforms.filter(gen => gen !== element)
    });
  }

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getAllPlatforms());
  }, [dispatch]);

  return (
    <div className={style.container}>
        <div className={style.divButton}>
          <Link to='/home' style={{ textDecoration: 'none' }}>
            <button className={style.goBackButton}>Go Back</button>
          </Link>
        </div>
      <div className={style.bodyContainer}>
        <section className={style.formContainer}>
          <header>Add a new game!</header>
          <form onSubmit={(event) => handleSubmit(event)} className={style.formGame}>
            <div className={style.inputBox}>
              <label>Name</label>
              <input
                type='text'
                value={input.name}
                name='name'
                id='name'
                placeholder='Enter a videogame'
                onChange={(event) => handleChange(event)}
              />
              {errors.name && <span className={style.errorMessage}>{errors.name}</span>}
            </div>
            <div className={style.descriptionBody}>
                <div className={style.descriptionWrapper}>
                <label>Description</label>
                <textarea
                    value={input.description}
                    name='description'
                    id='description'
                    placeholder='Enter a description'
                    onChange={(event) => handleChange(event)}
                    maxLength={maxDescriptionLength}
                />
                <span className={style.descriptionLength}>
                    {`${descriptionLength}/${maxDescriptionLength}`}
                </span>
                </div>
                <div className={style.flexBox}>
                    {errors.description && <span className={style.errorMessage}>{errors.description}</span>}
                </div>
            </div>
            <div className={style.selectBox}>
              <select
                id="platforms"
                onChange={(e) => {
                  handlePlatforms(e);
                }}
              >
                <option hidden value="visualize">Select platforms...</option>
                <option value="Xbox Series S/X" >Xbox Series S/X</option>
                <option value="PlayStation 5">PlayStation 5</option>
                <option value="PC">PC</option>
                <option value="Xbox One">Xbox One</option>
                {platforms?.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.flexBox}>
                {errors.platforms && <span className={style.errorMessage}>{errors.platforms}</span>}
            </div>
            <div className={style.optionsContainer}>
              {input.platforms.map(el =>
                <div className={style.optionsCard} onClick={() => handleDeletePlatform(el)}>
                  <button type='button' className={style.optionsBtn}>{el}</button>
                </div>
              )}
            </div>
            <div className={style.inputBox}>
              <label>Image</label>
              <input
                type='text'
                value={input.background_image}
                name='background_image'
                placeholder='Enter an URL for image'
                onChange={(event) => handleChange(event)}
              />
              {errors.background_image && <span className={style.errorMessage}>{errors.background_image}</span>}
            </div>
            <div className={style.inputBox}>
              <label>Released</label>
              <input
                type='text'
                value={input.released}
                name='released'
                placeholder="aaaa-mm-dd"
                onChange={(event) => handleChange(event)}
              />
              {errors.released && <span className={style.errorMessage}>{errors.released}</span>}
            </div>
            <div className={style.inputBox}>
              <label>Rating</label>
              <input
                type="number"
                step="0.01"
                lang="en"
                min="0.01"
                max="5"
                value={input.rating}
                name='rating'
                onChange={(event) => handleChange(event)}
              />
            </div>
            <div className={style.selectBox}>
              <select onChange={(event) => handleGenre(event)}>
                <option hidden value="visualize">Select Genres...</option>
                <option value="Action">Action</option>
                <option value="Shooter">Shooter</option>
                <option value="MORPG">MORPG</option>
                <option value="Masive">Masive</option>
                {genres.map((genre) => (
                  <option value={genre.name} key={genre.id}>{genre.name}</option>
                ))}
              </select>
            </div>
            <div className={style.flexBox}>
               {errors.genres && <span className={style.errorMessage}>{errors.genres}</span>}
            </div>
            <div className={style.optionsContainer}>
              {input.genres.map(el =>
                <div className={style.optionsCard} onClick={() => handleDeleteGenre(el)}>
                  <button type='button' className={style.optionsBtn}>{el}</button>
                </div>
              )}
            </div>
            <div className={style.buttonContainer}>
              <button type='submit' className={style.submitButton}>Create Game</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}