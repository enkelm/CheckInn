import { Listing, ReqConfig } from '.';
import { ENDPOINTS, createApiEndpoint } from '../lib/axios';
import { toggleAlert, toggleLoading } from '../store/ui-slice';

interface IGetAll {
  (reqConfig: ReqConfig): Promise<Listing[]>;
}

export const getAllListings: IGetAll = async ({ cancelToken, dispatch }) => {
  dispatch && dispatch(toggleLoading());
  const result = await createApiEndpoint(ENDPOINTS.HOTEL)
    .fetchAll(cancelToken)
    .then((res) => res.status < 400 && res.data)
    .catch(() => dispatch && dispatch(toggleAlert()))
    .finally(() => dispatch && dispatch(toggleLoading()));

  return result;
};

interface IGetById {
  (
    id: number,
    setLisiting: React.Dispatch<React.SetStateAction<Listing | undefined>>,
    reqConfig: ReqConfig,
  ): Promise<Listing>;
}

export const getListingById: IGetById = async (id, setLisiting, { cancelToken, dispatch }) => {
  dispatch && dispatch(toggleLoading());
  const result = await createApiEndpoint(ENDPOINTS.HOTEL)
    .fetchById(id, cancelToken)
    .then((res) => {
      res.status < 400 && setLisiting(res.data);
      return res.status < 400 && res.data;
    })
    .catch(() => dispatch && dispatch(toggleAlert()))
    .finally(() => dispatch && dispatch(toggleLoading()));

  return result;
};
