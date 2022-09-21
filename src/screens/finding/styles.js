import {Colors} from '../../config/Colors';

export const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 15,
  },
  tabs: {
    backgroundColor: Colors.backgroundColor,
    height: 35,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
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
    fontSize: 16,
    fontWeight: '500',
  },
  tabText: {
    color: Colors.white,
    fontSize: 16,
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
