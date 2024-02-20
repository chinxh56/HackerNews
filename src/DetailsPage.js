import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {style} from './styles/style';
import {COLORS} from './styles/COLORS';

const DetailsPage = () => {
  const data = useRoute();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (data.params.state) {
      setItem(data.params.state);
      getAllComment(data.params.state);
    }
  }, [data.params.state]);

  const getAllComment = item => {
    setLoading(true);
    Promise.all(
      item.kids.map(id =>
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
      .then(comment => {
        setComments(comment);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchComment = commentId => {
    // Check if the comment already exists in the comments state
    const existingComment = comments.find(comment => comment.id === commentId);
    if (existingComment) {
      return; // If the comment exists, exit the function
    }

    // Fetch the comment
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${commentId}.json?printpretty`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      },
    )
      .then(res => res.json())
      .then(comment => {
        setComments(prevComments => [...prevComments, comment]);
        // console.log(comments);
      })
      .catch(err => console.error(err));
  };

  const renderItem = ({item}) => {
    const renderNestedComments = comment => {
      return (
        <View style={style.commentContainer}>
          <View style={style.dataFlexDate}>
            <Text style={[style.dataCommentName, style.orange]}>
              {comment.by}{' '}
            </Text>
            <Text style={[style.dataCommentName]}>on </Text>
            <Text style={[style.dataCommentName]}>
              {getDate(comment.time)}{' '}
            </Text>
          </View>
          <Text style={[style.dataName]}>{comment.text}</Text>
          {comment.kids && comment.kids.length > 0 && (
            <View style={style.nestedCommentsContainer}>
              {comment.kids.map(kidId => {
                const nestedComment = comments.find(c => c.id === kidId);
                if (nestedComment) {
                  return renderNestedComments(nestedComment);
                } else {
                  fetchComment(kidId);
                }
              })}
            </View>
          )}
        </View>
      );
    };

    return renderNestedComments(item);
  };

  const getDate = time => {
    // Extract date components
    const date = new Date(time * 1000); // Assuming item.timestamp contains the Unix timestamp
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  };

  return loading ? (
    <View style={style.loadingIndicator}>
      <ActivityIndicator size="large" color={COLORS.orange} />
    </View>
  ) : (
    <View style={[style.container]}>
      <View style={[style.header]}>
        <Text style={[style.headerlOGO]}>Y</Text>
        <Text style={[style.headerText]}>Hacker News</Text>
      </View>
      <View style={style.details}>
        <View style={style.dataContainer2}>
          <View style={style.dataFlex}>
            <View style={style.dataFlexDate}>
              <Text style={[style.dataName, style.orange]}>
                {item ? item.by : null}{' '}
              </Text>
              <Text style={[style.dataName]}>on </Text>
              <Text style={[style.dataName]}>
                {item ? getDate(item.time) : null}
              </Text>
            </View>
            <Text style={[style.dataName]}>
              Score {item ? item.score : null}
            </Text>
          </View>
          <Text style={[style.dataTitle]}>{item ? item.title : null}</Text>
        </View>
        <Text style={[style.commentsText]}>Comments</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default DetailsPage;
