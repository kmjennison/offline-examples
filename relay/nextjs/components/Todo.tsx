// @flow
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';
import RemoveTodoMutation from '../mutations/RemoveTodoMutation';
import RenameTodoMutation from '../mutations/RenameTodoMutation';
import TodoTextInput from './TodoTextInput';

import React, {useState, SyntheticEvent} from 'react';
import {createFragmentContainer, graphql} from 'react-relay';
import styled, {css} from 'styled-components';
//import type {Todo_todo} from 'relay/Todo_todo.graphql';
//import type {Todo_user} from 'relay/Todo_user.graphql';

type Props = {
  relay: any;
  todo: any; // Todo_todo,
  user: any; // Todo_user,
  disabled?: boolean;
};

const DivView = styled.div`
  display: ${props => (props.isEditing ? 'none' : 'flex')};
`;

const StyledLi = styled.li`
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
  flex: 1;
  ${props =>
    props.isEditing &&
    css`
      border-bottom: none;
      padding: 0;
      &:last-child {
        margin-bottom: -1px;
      }
    `}
`;

const ButtonDestroy = styled.button`
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
  &:after {
    content: '×';
  }
  ${StyledLi}:hover & {
    color: #af5b5e;
    display: block;
  }
`;

const InputToggle = styled.input`
  text-align: center;
  width: 40px;
  height: auto;

  margin: auto 0;
  border: none;
  -webkit-appearance: none;
  appearance: none;
  &:after {
    content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="%23bddad5" stroke-width="3"/></svg>');
  }
  ${props =>
    props.checked &&
    css`
      &:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="%23bddad5" stroke-width="3"/><path fill="%235dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
      }
    `}
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    background: none;
    height: 40px;
  }
`;

const StyledLabel = styled.label`
  word-break: break-all;
  padding: 15px 0px 15px 15px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  ${props =>
    props.completed &&
    css`
      color: #d9d9d9;
      text-decoration: line-through;
    `}
`;

// TODO MEDIA
export const Todo = ({relay, todo, user, disabled}: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleCompleteChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const complete = e.currentTarget.checked;
    ChangeTodoStatusMutation.commit(relay.environment, complete, todo, user);
  };

  const handleDestroyClick = () => removeTodo();
  const handleLabelDoubleClick = () => {
    if (!disabled) setIsEditing(true);
  };
  const handleTextInputCancel = () => setIsEditing(false);

  const handleTextInputDelete = () => {
    setIsEditing(false);
    removeTodo();
  };

  const handleTextInputSave = (text: string) => {
    setIsEditing(false);
    RenameTodoMutation.commit(relay.environment, text, todo);
  };

  const removeTodo = () =>
    RemoveTodoMutation.commit(relay.environment, todo, user);

  return (
    <StyledLi isEditing={isEditing}>
      <DivView isEditing={isEditing}>
        <InputToggle
          checked={todo.complete}
          onChange={handleCompleteChange}
          type="checkbox"
          disabled={disabled}
        />

        <StyledLabel
          completed={todo.complete}
          onDoubleClick={handleLabelDoubleClick}>
          {todo.text}
        </StyledLabel>
        {!disabled && <ButtonDestroy onClick={handleDestroyClick} />}
      </DivView>

      {isEditing && (
        <TodoTextInput
          edit
          isEditing={isEditing}
          commitOnBlur={true}
          initialValue={todo.text}
          onCancel={handleTextInputCancel}
          onDelete={handleTextInputDelete}
          onSave={handleTextInputSave}
        />
      )}
    </StyledLi>
  );
};

export default createFragmentContainer(Todo, {
  todo: graphql`
    fragment Todo_todo on Todo {
      complete
      id
      text
    }
  `,
  user: graphql`
    fragment Todo_user on User {
      id
      userId
      totalCount
      completedCount
    }
  `,
});
