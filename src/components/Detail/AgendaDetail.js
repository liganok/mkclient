import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip'

import agent from '../../agent'
import ItemList from './ItemList'

import * as types from '../../constants/actionTypes'

const mapStateToProps = state => ({ ...state.agendaDetail, inProgress: state.common.inProgress })
const mapDispatchToProps = dispatch => ({
  onLoad: (payload) => dispatch({ type: types.AGENDA_GET_DETAIL, payload }),
  onUpdateAppName: (payload) => dispatch({ type: types.UPDATE_APP_NAME, payload: payload }),

  onSaveAgenda: agenda => {
    let ISOStartedAt = new Date(agenda.startedAt).toISOString()
    let savedAgenda = { ...agenda, startedAt: ISOStartedAt }
    dispatch({ type: types.AGENDA_SAVE, payload: agent.Agenda.save(savedAgenda) })
  },
  onChangeField: (id, key, value) => {
    dispatch({ type: types.AGENDA_UPDATE_FIELD, id: id, key: key, value: value })
  },
  onMenuItemTap: (id, value) => dispatch({ type: types.AGENDA_MENU_ITEM_TAP, id: id, value: value }),
  onActionMouseOver: value => dispatch({ type: types.AI_ACTION_MOUSE_OVER, payload: value }),
  onActionMouseOut: value => dispatch({ type: types.AI_ACTION_MOUSE_OUT, payload: value }),
  onActionCopy: (value, isFromTemplate) =>
    dispatch({ type: types.AI_ACTION_COPY, payload: isFromTemplate ? agent.Agenda.getTemplateDetail(value) : agent.Agenda.getAgendaDetail(value) }),
  onRedirect: (value = null) =>
    dispatch({ type: types.REDIRECT, value: value })
})

class AgendaDetail extends React.Component {
  constructor() {
    super()
    this.isFromTemplate = false
  }
  componentWillMount() {
    const { match, onLoad, onUpdateAppName } = this.props
    this.isFromTemplate = match.path.indexOf('template') > 0
    if (match.params.id) {
      if (this.isFromTemplate) {
        onLoad(agent.Agenda.getTemplateDetail(match.params.id))
        onUpdateAppName('Template')
      } else {
        onLoad(agent.Agenda.getAgendaDetail(match.params.id))
        onUpdateAppName('Agenda')
      }
    } else {
      onUpdateAppName('Agenda')
    }
  }

  componentWillUnmount() {
    //alert('hello')
  }

  render() {

    const {
      currentAgenda,
      mouseOverId,
      isShowActions,
      onChangeField,
      onActionMouseOver,
      onActionMouseOut,
      onMenuItemTap,
      onSaveAgenda,
      onActionCopy,
      inProgress,
      onRedirect,
      isUpdated = false,
    } = this.props
    return (
      <div>
        <ItemList
          agenda={currentAgenda}
          mouseOverId={mouseOverId}
          isShowActions={isShowActions}
          onChangeField={onChangeField}
          onActionMouseOver={onActionMouseOver}
          onActionMouseOut={onActionMouseOut}
          onMenuItemTap={onMenuItemTap}
        />
        <Grid container spacing={0} justify="flex-end" style={{ marginTop: 10 }}>
          <Tooltip title="Start the meeting">
            <div>
              <Button variant="raised" size="small" color="primary"
                style={{ margin: '0 0 20px 5px' }}
                disabled={isUpdated || (currentAgenda.id.substring(0, 3) === 'NEW')}
                onClick={() => onRedirect(`/${this.isFromTemplate ? 'template' : 'agenda'}/play/${currentAgenda.id}`)} >
                Start
              </Button>
            </div>
          </Tooltip>
          <Button
            style={{ margin: '0 0 20px 5px', display: this.isFromTemplate && 'none' }}
            size="small"
            disabled={inProgress}
            variant="raised" color="primary"
            onClick={() => onSaveAgenda(currentAgenda)}>
            Save
          </Button>
          <Button
            style={{ margin: '0 0 20px 5px', display: !this.isFromTemplate && 'none' }}
            size="small"
            disabled={inProgress}
            variant="raised" color="primary"
            onClick={() => { onActionCopy(currentAgenda.id, true), this.isFromTemplate = false }}>
            Copy
          </Button>
        </Grid>
      </div>
    )
  }
}
AgendaDetail.propTypes = {
  match: PropTypes.object,
  currentAgenda: PropTypes.object,
  mouseOverId: PropTypes.string,
  isShowActions: PropTypes.bool,
  onLoad: PropTypes.func,
  onChangeField: PropTypes.func,
  onActionMouseOver: PropTypes.func,
  onActionMouseOut: PropTypes.func,
  onMenuItemTap: PropTypes.func,
  onSaveAgenda: PropTypes.func

}
export default connect(mapStateToProps, mapDispatchToProps)(AgendaDetail)