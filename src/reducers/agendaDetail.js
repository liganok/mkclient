import {
  AGENDA_UPDATE_FIELD,
  AGENDA_CREATE,
  AGENDA_SAVE,
  AGENDA_CLOSE_DIALOG
} from '../constants/actionTypes';
const defaultState = {
  isAddAgenda: false,
  currentAgenda: {
    id: "594135259b216dbf27294451",
    name: "hello world 1",
    duration: 0,
    sequence: 0,
    subItems: [
      {
        id: "594135259b216dbf27294452",
        name: "hello world 1-1",
        duration: 0,
        sequence: 0,
        subItems: [
          {
            id: "594135259b216dbf27294453",
            name: "hello world 1-1-1",
            duration: 0,
            sequence: 0,
            subItems: [],
            startedAt: "2017-06-14T13:07:49.377Z",
          },
          {
            id: "594135259b216dbf27294454",
            name: "hello world 1-1-2",
            duration: 0,
            sequence: 0,
            subItems: [],
            startedAt: "2017-06-14T13:07:49.377Z",
          },
        ],
        startedAt: "2017-06-14T13:07:49.377Z",
      },
      {
        id: "594135259b216dbf25294455",
        name: "hello world 1-2",
        duration: 0,
        sequence: 0,
        subItems: [],
        startedAt: "2017-06-14T13:07:49.377Z",
      },
    ],
    startedAt: "2017-06-14T13:07:49.377Z",
  }
};

function changeAgenda(sourceAgenda, id, key, value) {
  let targetAgenda = sourceAgenda;
  if (targetAgenda.id === id) {
    Object.assign(targetAgenda, {
      [key]: value
    });
    return targetAgenda;
  } else {
    if (typeof(targetAgenda.subItems[0]) != 'undefined') {
      let subItemTmp = [];
      targetAgenda.subItems.forEach(item => {
        subItemTmp.push(changeAgenda(item, id, key, value));
      });
      Object.assign(targetAgenda, {
        subItems: subItemTmp
      });
      return targetAgenda;
    } else {
      return targetAgenda;
    }
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case AGENDA_UPDATE_FIELD:
      let currentAgenda = changeAgenda(state.currentAgenda,action.id,action.key,action.value);
      return {...state, [action.key]: action.value};
    case AGENDA_CREATE:
      return {...state, isAddAgenda: true};
    case AGENDA_SAVE:
      return {...state, currentAgenda: action.payload.agenda,};
    case AGENDA_CLOSE_DIALOG:
      return {...state, isAddAgenda: false, name: null, startTime: null};

    default:
      return state;
  }

  return state;
};