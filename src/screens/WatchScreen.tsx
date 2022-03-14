import React, {useState, useEffect} from 'react';
import Item from '../components/Item';
import Loading from '../components/Loading';
import ChangePage from '../components/ChangePage';
import SearchBarMaze from '../components/SearchBarMaze';
import {Show} from '../typescript/interfaces';
import {FlatList, StatusBar} from 'react-native';
import {getAllSeries, searchSeries, searchPeople} from '../tvmaze/api';
import SmallHeight from '../components/SmallHeight';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectFavoriteSeries,
  loadFavoriteSeries,
} from '../redux/slices/favoriteSeriesSlice';
import {
  selectFavoritePeople,
  loadFavoritePeople,
} from '../redux/slices/favoritePeopleSlice';
import {filterIDs} from '../common/utils';
import {load} from '../db/storage';

export default function WatchScreen() {
  const dispatch = useDispatch();
  const [data, setData] = useState<Show[]>([]);
  const [page, setPage] = useState(0);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState('');
  const [category, setCategory] = useState('Series');
  const favoriteSeries = filterIDs(useSelector(selectFavoriteSeries));
  const favoritePeople = filterIDs(useSelector(selectFavoritePeople));

  let flatlistRef: any = null;

  const onSearchChange = (term: string, currentCategory: string) => {
    setCategory(currentCategory);
    const trimTerm = term.trim();
    setTerm(trimTerm);
    if (trimTerm === '') {
      getAllSeries(page, (data: Show[]) => {
        setData(data);
      });
      return;
    }
    setSearching(true);
    currentCategory === 'Series'
      ? searchSeriesCategory(term)
      : seachPeopleCategory(term);
  };

  const searchSeriesCategory = (term: string) => {
    searchSeries(term, (data: Show[]) => {
      setData(data);
      setSearching(false);
    });
  };

  const seachPeopleCategory = (term: string) => {
    searchPeople(term, (data: Show[]) => {
      setData(data);
      setSearching(false);
    });
  };

  const onCancelSearch = () => {
    setCategory('Series');
    setSearching(false);
    if (data.length > 0) {
      flatlistRef.scrollToIndex({index: 0});
    }
    getAllSeries(page, (data: Show[]) => {
      setData(data);
    });
  };

  const updatePage = (increment: number) => {
    setLoading(true);
    if (data.length > 0) {
      flatlistRef.scrollToIndex({index: 0});
    }
    const newPage = page + increment;
    setPage(newPage);
    getAllSeries(newPage, (data: Show[]) => {
      setData(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    setLoading(true);
    load('favorite_series', (data: any) => {
      dispatch(loadFavoriteSeries(data));
    });
    load('favorite_people', (data: any) => {
      dispatch(loadFavoritePeople(data));
    });
    getAllSeries(page, (data: Show[]) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SearchBarMaze
        searching={searching}
        onType={onSearchChange}
        onCancel={onCancelSearch}
        category={category}
      />
      {loading ? (
        <Loading margin={50} />
      ) : (
        <FlatList
          ref={ref => {
            flatlistRef = ref;
          }}
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            const {id, name, image} = item;
            let isFavorite = false;
            if (category === 'Series') {
              isFavorite = favoriteSeries.includes(id) ? true : false;
            } else {
              isFavorite = favoritePeople.includes(id) ? true : false;
            }
            return (
              <Item
                id={id}
                canClick={true}
                name={name}
                image={image !== null ? image.medium : ''}
                favorite={isFavorite}
                showFavorite={true}
                category={category}
              />
            );
          }}
          ListFooterComponent={
            term !== '' ? (
              <SmallHeight />
            ) : (
              <ChangePage
                page={page}
                back={() => updatePage(-1)}
                next={() => updatePage(1)}
              />
            )
          }
        />
      )}
    </>
  );
}
