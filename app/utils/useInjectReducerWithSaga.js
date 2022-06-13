import { useInjectReducer } from './injectReducer';
import { useInjectSaga } from './injectSaga';

const useInjectReducerWithSaga = ({ key, reducer, saga }) => {
    key && reducer &&   useInjectReducer({
    key,
    reducer,
  });
  key && saga && useInjectSaga({ key, saga });
};

export { useInjectReducerWithSaga };
