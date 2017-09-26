import moment from 'moment';
import Message from './model/message.model';
import { Store } from './utils';

import './styles/modules/MessagesArea.scss';

moment.locale('pt-BR');

const template: any = require('./messages.html');

const store: Store<Message> = new Store<Message>();
const messages = store.list();

const messagesContent = messages
  .map((m: Message) => template({ m, relativeTime: moment(m.created).fromNow() }))
  .reduce((result, current) => result + current);

/* eslint no-undef: 0 */
(<HTMLElement> document.getElementById('messages')).innerHTML = messagesContent;

console.log('old-messages');
