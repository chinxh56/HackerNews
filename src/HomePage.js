import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {style} from './styles/style';
import {COLORS} from './styles/COLORS';

const HomePage = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [story, setStory] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const batchSize = 15;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/JSON',
      }),
    })
      .then(res => res.json())
      .then(rjson => {
        setData(rjson);
        const sortedData = rjson.sort((a, b) => b - a);
        setData(sortedData);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      fetchNewStory(startIndex, batchSize);
    }
  }, [data]);

  const fetchNewStory = (start, count) => {
    setIsLoading(true);
    const idsToFetch = data.slice(start, start + count);
    Promise.all(
      idsToFetch.map(id =>
        fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?printpretty`,
          {
            method: 'GET',
            headers: new Headers({
              'Content-Type': 'application/JSON',
            }),
          },
        ).then(res => res.json()),
      ),
    )
      .then(stories => {
        setStory(prevStory => [...prevStory, ...stories]);
        setStartIndex(start + count);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderItem = ({item}) => {
    // Extract date components
    const date = new Date(item.time * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return (
      <TouchableOpacity
        style={style.dataContainer}
        onPress={() => {
          navigation.navigate('DetailsPage', {state: item});
        }}>
        <View style={style.dataFlex}>
          <View style={style.dataFlexDate}>
            <Text style={[style.dataName]}>{item.by} on </Text>
            <Text style={[style.dataName]}>{`${year}-${month}-${day}`} </Text>
          </View>
          <Text style={[style.dataName]}>Score {item.score} </Text>
        </View>
        <Text style={[style.dataTitle]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const handleEndReached = () => {
    if (!isLoading) {
      fetchNewStory(startIndex, batchSize);
    }
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View style={style.loadingIndicator}>
        <ActivityIndicator size="large" color={COLORS.orange} />
      </View>
    );
  };

  return (
    <View style={[style.container]}>
      <View style={[style.header]}>
        <Text style={[style.headerlOGO]}>Y</Text>
        <Text style={[style.headerText]}>Hacker News</Text>
      </View>
      <View style={[style.flatList]}>
        {story.length <= 0 ? (
          <View style={style.loadingIndicator}>
            <ActivityIndicator size="large" color={COLORS.orange} />
          </View>
        ) : (
          <FlatList
            data={story}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default HomePage;
