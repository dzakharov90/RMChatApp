import { AsyncStorage } from 'react-native';
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import reducer from '../reducers';
import promise from '../promise';
import startRabbitMq, { rabbitmqMiddleware } from '../middlewares';

export default function configureStore(onCompletion:()=>void):any {
  const enhancer = compose(
    applyMiddleware(rabbitmqMiddleware, thunk, promise),
    //devTools({
      //name: 'rm-chat-app', realtime: true,
    //}),
  );

  const store = createStore(reducer, enhancer);
  persistStore(store, { storage: AsyncStorage }, onCompletion);
  startRabbitMq(store);
  return store;
}
