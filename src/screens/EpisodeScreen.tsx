import React, {useEffect, useState, useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import {NavigationProps} from '../typescript/interfaces';
import Loading from '../components/Loading';
import Item from '../components/Item';
import {getEpisode} from '../tvmaze/api';
import {EpisodeDetail} from '../typescript/interfaces';
import {formatSummary} from '../common/utils';
import WhiteSquare from '../components/WhiteSquare';
import BlueSquare from '../components/BlueSquare';
import SmallHeight from '../components/SmallHeight';

export default function EpisodeScreen({route, navigation}: NavigationProps) {
  const {id, season, number, name, serieName} = route.params;
  const [episode, setEpisode] = useState<EpisodeDetail>() as any;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: serieName,
    });
  }, [navigation]);

  useEffect(() => {
    getEpisode(id, (data: EpisodeDetail) => {
      setEpisode(data);
    });
  }, []);

  return (
    <Scroll>
      {episode ? (
        <>
          <BlueSquare text={`Season ${season}`} center />
          <Item
            id={id}
            canClick={false}
            name={`${number}. ${name}`}
            image={episode.image !== null ? episode.image.medium : ''}
            category="Episode"
            favorite={false}
            showFavorite={false}
          />
          <WhiteSquare text={formatSummary(episode.summary)} />
          <SmallHeight />
        </>
      ) : (
        <Loading margin={50} />
      )}
    </Scroll>
  );
}

const Scroll = styled.ScrollView``;
