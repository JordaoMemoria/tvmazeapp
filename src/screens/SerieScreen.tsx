import React, {useEffect, useState} from 'react';
import Item from '../components/Item';
import styled from 'styled-components/native';
import Loading from '../components/Loading';
import {Dimensions} from 'react-native';
import {getSerie, getEpisodesOfSerie} from '../tvmaze/api';
import {NavigationProps, ShowDetail, Episode} from '../typescript/interfaces';
import styles from '../common/styles';
import {formatSummary} from '../common/utils';
import BlueSquare from '../components/BlueSquare';
import WhiteSquare from '../components/WhiteSquare';
import RowButton from '../components/RowButton';
import {useSelector} from 'react-redux';
import {selectFavoriteSeries} from '../redux/slices/favoriteSeriesSlice';
import {filterIDs} from '../common/utils';

export default function SerieScreen({route, navigation}: NavigationProps) {
  const {id, name, image} = route.params;

  const [serie, setSerie] = useState<ShowDetail>() as any;
  const [episodes, setEpisodes] = useState<Episode[]>() as any;
  const favoriteSeries = filterIDs(useSelector(selectFavoriteSeries));

  const formatGenresAndSchedule = (array: string[], type: string) => {
    if (array.length === 2) {
      return `${array[0]}, ${array[1]}.`;
    }
    return array.reduce((response: string, genre: string, index: number) => {
      if (index === 1) {
        return `${response}, ${genre}, `;
      }
      if (type === 'genres') {
        return index !== array.length - 1
          ? `${response}${genre}, `
          : `${response}${genre}.`;
      } else {
        return index !== array.length - 1
          ? `${response}${genre}, `
          : `${response}${genre}`;
      }
    });
  };

  const formatSchedule = () => {
    if (serie.schedule.time === '' && serie.schedule.days.length === 0) {
      return 'No schedule found';
    }
    if (serie.schedule.time === '') {
      return formatGenresAndSchedule(serie.schedule.days, 'schedules');
    }
    return (
      formatGenresAndSchedule(serie.schedule.days, 'schedules') +
      ' at ' +
      serie.schedule.time +
      '. '
    );
  };

  const goToEpisodeDetail = (e: Episode) => {
    const epRoute = route.name === 'SerieF' ? 'EpisodeF' : 'Episode';
    navigation.navigate(epRoute, {
      id: e.id,
      season: e.season,
      number: e.number,
      name: e.name,
      serieName: serie.name,
    });
  };

  const generateFlatList = () => {
    let key = 1;
    let season = 0;
    let components = [];
    for (let e of episodes) {
      if (e.season !== season) {
        season = e.season;
        components.push(<BlueSquare key={key} text={`Season ${e.season}`} />);
        key++;
        components.push(<BlueLine key={key} />);
        key++;
      }
      components.push(
        <RowButton
          key={key}
          text={`${e.number}. ${e.name}`}
          onClick={() => goToEpisodeDetail(e)}
        />,
      );
      key++;
    }
    return components;
  };

  useEffect(() => {
    getSerie(id, (data: ShowDetail) => {
      setSerie(data);
    });
    getEpisodesOfSerie(id, (data: Episode[]) => {
      setEpisodes(data);
    });
  }, []);

  const isFavorite = favoriteSeries.includes(id) ? true : false;

  return (
    <Scroll>
      <Item
        category="Series"
        id={id}
        canClick={false}
        favorite={isFavorite}
        showFavorite={true}
        name={name}
        image={image}
      />

      {serie && episodes ? (
        <>
          {serie.genres.length !== 0 ? (
            <BlueSquare
              text={formatGenresAndSchedule(serie.genres, 'genres')}
            />
          ) : null}
          <WhiteSquare text={formatSummary(serie.summary)} />
          <WhiteSquare text={formatSchedule()} />
          {generateFlatList()}
        </>
      ) : (
        <Loading margin={50} />
      )}
    </Scroll>
  );
}

const Scroll = styled.ScrollView``;
const BlueLine = styled.View`
  margin-top: 10px;
  height: 1px;
  background-color: ${styles.colors.primary};
  width: ${Dimensions.get('screen').width}px;
`;
