import core from 'core';
import { PRIORITY_ONE } from 'constants/actionPriority';
import ANNOTATION_CREATE_TOOL_NAMES from 'constants/annotationCreateToolNames';
import actions from 'actions';
import selectors from 'selectors';


export default store => (toolNames = ANNOTATION_CREATE_TOOL_NAMES) => {
  const toolNameArray = typeof toolNames === 'string' ? [ toolNames ] : toolNames;
  const dataElements = selectors.getToolButtonDataElements(store.getState(), toolNameArray);

  toolNameArray.forEach(toolName => {
    core.getTool(toolName).disabled = false;
  });
  store.dispatch(actions.enableElements(dataElements, PRIORITY_ONE));
};
