import {Colors} from '../../config/Colors';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000',
    // paddingHorizontal: 15,
  },
  sContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
    alignItems: 'center',
  },
  moviesCard: {
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 55,
    alignItems: 'center',
    marginTop: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  scroll: {paddingHorizontal: 10, marginBottom: 10},
  gamesCard: {
    backgroundColor: Colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 55,
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 10,
  },
  leftTab: {
    flex: 0.5,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  moreText: {
    color: Colors.appColor,
    fontSize: 18,
    fontWeight: '500',
  },
  tabText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  rightTab: {
    flex: 0.5,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
};
