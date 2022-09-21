import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    moviesData: [],
    tvShowsData: [],
    selectedData: [],
  },

  reducers: {
    storeSelectedData: (state, action) => {
      let _checkExisting = state.selectedData.filter(
        x => x.episodeId == action.payload.episodeId,
      );

      if (_checkExisting.length > 0 && action.payload.isAdded !== true) {
        let i = state.selectedData.findIndex(
          obj => obj.episodeId === action.payload.episodeId,
        );
        state.selectedData.splice(i, 1);
      } else if (
        _checkExisting.length == 0 &&
        action.payload.isAdded === true
      ) {
        state.selectedData.push(action.payload);
      }
      // state.selectedData=[];
    },
    storeAllData: (state, action, data) => {
      let _checkExisting = state.selectedData.filter(
        x => x.episodeId == action.payload.episodeId,
      );
      console.log("===========Started==========");
      console.log(action.payload.isAdded, _checkExisting.length);
      if (action.payload.isAdded != true) {
        console.log(state.selectedData.length);
        console.log([...action.payload.dataList].length);
        state.selectedData = [...action.payload.dataList];
      } else if (
        action.payload.isAdded === true
      ) {
        console.log(action.payload.dataList.length);
        console.log(state.selectedData.length);
        console.log([...state.selectedData, ...action.payload.dataList].length);
        state.selectedData = [...state.selectedData, ...action.payload.dataList];
      }
    },
    storeMovies: (state, action) => {
      state.moviesData.push(action.payload);
    },
    deleteMovies: (state, action) => {
      let i;
      let remainingItems = state.moviesData.filter((item, index) => {
        if (item.id == action.payload) {
          i = index;
          return index;
        }
      });
      state.moviesData.splice(i, 1);
    },
    storeTvShow: (state, action) => {
      state.tvShowsData.push(action.payload);
    },
    deleteTvShow: (state, action) => {
      let i;
      let remainingItems = state.tvShowsData.filter((item, index) => {
        if (item.id == action.payload) {
          i = index;
          return index;
        }
      });
      state.tvShowsData.splice(i, 1);
    },
    //multiple
    deleteMultipleMovies: (state, action) => {
      state.moviesData = action.payload;
    },
    deletemultipleTvShows: (state, action) => {
      state.tvShowsData = action.payload;
    },
    storeTvSeason: (state, action) => {
      let seasonsData = action.payload.seasons;
      let i;
      let remainingItems = state.tvShowsData.filter((item, index) => {
        if (item.id == action.payload.id) {
          i = index;
          return index;
        }
      });
      state.tvShowsData[i].seasons = seasonsData;
      // console.log('RRRRedux', JSON.stringify(state.tvShowsData));
    },
    storeTvEpisode: (state, action) => {
      let episodes = action.payload.data;
      let i;
      let seasonIndex;
      let episodeId;
      let remainingItems = state.tvShowsData.filter((item, index) => {
        if (item.id == action.payload.tvShowId) {
          i = index;
          let checkEpi = state.tvShowsData[i].seasons.filter(
            (_item, _index) => {
              if (_item.id == action.payload.data.id) {
                seasonIndex = _index;
              }
            },
          );
          // return index;
        }
      });
      state.tvShowsData[i].seasons[seasonIndex] = episodes;
      // console.log('RRRRedux', JSON.stringify(state.tvShowsData));
    },
    storeEpisode: (state, action) => {
      // console.log('storeEpisode_called');
      // state.selectedData.push(action.payload);

      let TvDramaId = action.payload.tvId;
      let dramaIndex;
      let seasonIndex;
      let episodeIndex;
      let episodeId = action.payload.episodeId;
      let seasonId = action.payload.seasonId;
      // console.log('RRRRedux', JSON.stringify(state.tvShowsData));

      let remainingItems = state.tvShowsData.filter((item, index) => {
        if (item.id == TvDramaId) {
          dramaIndex = index;
          let checkEpi = state.tvShowsData[index].seasons.filter(
            (_item, _index) => {
              if (_item.id == seasonId) {
                seasonIndex = _index;

                let checkepi = state.tvShowsData[index].seasons[
                  _index
                ].episodes.filter((episode, epiIndex) => {
                  if (episode.id == episodeId) {
                    episodeIndex = epiIndex;
                  }
                });
              }
              return;
            },
          );

          return index;
        }
      });
      state.tvShowsData[dramaIndex].seasons[seasonIndex].episodes[
        episodeIndex
      ].isAdd = action.payload.isAdded;

      // console.log(
      //   'RRRRedux',
      //   JSON.stringify(
      //     state.tvShowsData[dramaIndex].seasons[seasonIndex].episodes,
      //   ),
      // );
    },
  },
});
export const {
  deleteMovies,
  storeMovies,
  storeTvShow,
  storeAllData,
  deleteTvShow,
  deleteMultipleMovies,
  deletemultipleTvShows,
  storeTvSeason,
  storeTvEpisode,
  storeEpisode,
  storeSelectedData,
} = userSlice.actions;
// export const AddDate = _data => dispatch => {
//   dispatch(storeMovies(_data));
// };

export const selectedMovies = state => state.user.moviesData;
export const selectTvShows = state => state.user.tvShowsData;
export const selectEpiData = state => state.user.selectedData;
export default userSlice.reducer;
