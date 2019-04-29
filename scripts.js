
const songLyricsArray = "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye".split(', ');

// initial redux state
const initialState = {
  songLyricsArray: songLyricsArray,
  arrayPosition: 0,
}

//reducer

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'NEXT_LYRIC':
      let newArrayPosition = state.arrayPosition + 1;
      newState = {songLyricsArray: state.songLyricsArray, arrayPosition: newArrayPosition}
      return newState;
    case 'RESTART_SONG':
      newState = initialState;
      return newState;
    default:
      return state;
  }
}

//jest tests + setup
const { expect } = window;

expect(reducer(initialState, {type: null})).toEqual(initialState);

expect(reducer(initialState, {type: 'NEXT_LYRIC' })).toEqual({
  songLyricsArray:songLyricsArray,
  arrayPosition: 1
})

expect(reducer({
  songLyricsArray: songLyricsArray,
  arrayPosition: 1,
},
{ type: 'RESTART_SONG'})
).toEqual(initialState);

// redux store
const { createStore } = Redux;
const store = createStore(reducer);

// render
const renderlyrics = () => {
  const lyricsDisplay = document.getElementById('lyrics');
  while (lyricsDisplay.firstChild) {
    lyricsDisplay.removeChild(lyricsDisplay.firstChild);
  }
  const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
  const renderedLine = document.createTextNode(currentLine);
  document.getElementById('lyrics').appendChild(renderedLine);
}

window.onload = function() {
  renderlyrics();
}


//func

const userClick = () => {
  const currentState = store.getState();
  if (currentState.arrayPosition === currentState.songLyricsArray.length - 1) {
    store.dispatch({ type: 'RESTART_SONG'} );
  } else {
    store.dispatch({type: 'NEXT_LYRIC'});
    console.log(store.getState());
  }
}

//subscribe

store.subscribe(renderlyrics);
