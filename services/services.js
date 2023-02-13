import React from 'react';
import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=9944b829be7ab8e9d70b21084e53a668';

// get popular movies
export const getPopularMovies = async () => {
  const resp = await axios.get(`${baseUrl}/movie/popular?${apiKey}`);
  return resp.data.results;
};

// get upcoming movies
export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${baseUrl}/movie/upcoming/?${apiKey}`);
  return resp.data.results;
};

// Get popular tv shows
export const getPopularTv = async () => {
  const resp = await axios.get(`${baseUrl}/tv/popular/?${apiKey}`);
  return resp.data.results;
};
