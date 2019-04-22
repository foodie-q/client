import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {width: '100%'},
  listItemContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listItem: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'white',
    minWidth: 170,
    maxWidth: 223,
    height: 160,
    maxHeight: 304,
    backgroundColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles
