/*eslint-disable*/
import { ApolloClient, InMemoryCache, HttpLink, gql } from 'apollo-boost';
import AuthHelper from './authHelper';
import { currentApiUrlPrefix } from '../../config/environmentConfig';

export default class GQLClient {
  constructor(config) {
    const { endPoint, cache = false, param } = config;

    this.client = new ApolloClient({
      link: new HttpLink({
        // uri: `${API_BASE_URL}${endPoint}`,
        uri: param == 1 ? endPoint : `${currentApiUrlPrefix}/${endPoint}`,
      }),

      cache: new InMemoryCache(),
      defaultOptions: this.cacheHandler(config),
    });

    this.initHeaders(config);
  }

  cacheHandler(config) {
    let cache = config.cache;

    if (!config.cache) {
      return {};
    }

    const defaultOptions = {
      watchQuery: {
        fetchPolicy: cache,
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: cache,
        errorPolicy: 'all',
      },
    };

    return defaultOptions;
  }

  query(request, variables) {
    return this.client.query({
      query: gql`
        ${request.toString()}
      `,
      context: {
        headers: this.headers,
      },
      variables: variables,
    });
  }

  mutation(request, variables) {
    return this.client.mutate({
      mutation: gql`
        ${request.toString()}
      `,
      context: {
        headers: this.headers,
      },
      variables: variables,
    });
  }

  initHeaders({ requireAuth = false, customHeaders = {} }) {
    // this.headers =  requireAuth === true ? AuthHelper.getAuthHeaders() : {};
    this.headers = AuthHelper.getAuthHeaders();
    this.headers = { ...this.headers, ...customHeaders };
  }
}
