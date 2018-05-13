import { h, app } from "hyperapp"
import { Link, Route, location } from '@hyperapp/router';
import actions from './actions';
import state from './state';
import view from './components/MainScreen';

const interop = app(state, actions, view, document.body);
document.body.addEventListener('keydown', interop.handleKeyDown); 

const unsubscribe = location.subscribe(interop.location);