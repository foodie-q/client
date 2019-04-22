import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {width: '100%'},
  listItemContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  listItem: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'white',
    minWidth: 170,
    maxWidth: 200,
    height: 170,
    maxHeight: 320,
    backgroundColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles
