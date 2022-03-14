import axios from 'axios'
import { Person } from '../typescript/interfaces'

const getAllSeries = async (page: number, callback: Function) => {
  const response = await axios.get(`https://api.tvmaze.com/shows?page=${page}`)
  callback(response.data)
}

const searchSeries = async (term: string, callback: Function) => {
  const response = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${term}`
  )
  const shows = response.data.map((object: any) => object.show)
  callback(shows)
}

const searchPeople = async (term: string, callback: Function) => {
  const response = await axios.get(
    `https://api.tvmaze.com/search/people?q=${term}`
  )
  const people = response.data.map((object: any) => object.person)
  callback(people)
}

const getSerie = async (id: number, callback: Function) => {
  const response = await axios.get(`https://api.tvmaze.com/shows/${id}`)
  callback(response.data)
}

const getEpisodesOfSerie = async (id: number, callback: Function) => {
  const response = await axios.get(
    `https://api.tvmaze.com/shows/${id}/episodes`
  )
  callback(response.data)
}

const getEpisode = async (id: number, callback: Function) => {
  const response = await axios.get(`https://api.tvmaze.com/episodes/${id}`)
  callback(response.data)
}

const getPerson = async (id: number, callback: Function) => {
  const response = await axios.get(
    `https://api.tvmaze.com/people/${id}/castcredits?embed=show`
  )
  if (response.data.length === 0) {
    callback('No series found')
    return
  }
  const filterShows = response.data.map((element: any) => {
    const { id, name, image } = element._embedded.show
    return {
      id,
      name,
      image: image !== null ? image.medium : ''
    }
  })
  callback(filterShows)
}

export {
  getAllSeries,
  searchSeries,
  searchPeople,
  getSerie,
  getEpisodesOfSerie,
  getEpisode,
  getPerson
}
