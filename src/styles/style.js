import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from './COLORS';

const getHeight = data => {
  const screenHeight = (Dimensions.get('window').height * data) / 100;
  return screenHeight;
};

const getWidth = data => {
  const screenWidth = (Dimensions.get('window').width * data) / 100;
  return screenWidth;
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: getWidth(100),
    height: getHeight(100),
    backgroundColor: COLORS.lightGrey,
    alignItems: 'center',
  },
  header: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: getWidth(5),
    height: getHeight(8),
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 999,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerlOGO: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.white,
    textAlign: 'center',
    paddingHorizontal: '2%',
    marginRight: '2%',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  flatList: {
    marginTop: getHeight(8),
  },
  dataContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: '2%',
    marginHorizontal: '3%',
    marginVertical: '1%',
    paddingVertical: '3%',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.orange,
  },
  dataFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dataFlexDate: {
    flexDirection: 'row',
  },
  dataName: {
    // color: COLORS.grey,
    color: '#1a1a1c',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dataTitle: {
    color: COLORS.black,
    fontSize: 15,
    fontWeight: 'bold',
  },
  details: {
    marginTop: getHeight(8),
    paddingHorizontal: '5%',
  },
  dataContainer2: {
    width: getWidth(90),
    height: getHeight(10),
    justifyContent: 'space-evenly',
  },
  commentsText: {
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    color: COLORS.orange,
  },
  commentContainer: {
    paddingBottom: '5%',
  },
  dataCommentName: {
    color: COLORS.black,
    fontSize: 10,
    fontWeight: 'bold',
  },
  nestedCommentsContainer: {
    marginLeft: getWidth(10),
  },
  loadingIndicator: {
    height: getHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  orange: {
    color: COLORS.orange,
  },
});

export {style};
