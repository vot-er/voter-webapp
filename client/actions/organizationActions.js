import * as types from "../constants/actionTypes";
import axios from "axios";
import { handleErrorWithLogout } from "../utils/error";

export function getOne(organizationId) {
  return async function (dispatch) {
    return new Promise((resolve, reject) => {
      axios
        .get(`/api/organizations/${organizationId}`)
        .then((response) =>
          dispatch({
            type: types.MERGE_ORGANIZATIONS,
            items: [response.data.data],
          })
        )
        .catch(handleErrorWithLogout(reject, dispatch));
    });
  };
}

export function getAll(params) {
  return async function (dispatch) {
    return new Promise((resolve, reject) => {
      axios
        .get("/api/organizations", { params })
        .then((response) =>
          dispatch({
            type: types.MERGE_ORGANIZATIONS,
            items: response.data.data,
          })
        )
        .catch(handleErrorWithLogout(reject, dispatch));
    });
  };
}

export function create(body) {
  return async function (dispatch) {
    const { data } = await axios.post("/api/organizations", body);
    dispatch({
      type: types.MERGE_ORGANIZATIONS,
      items: [data.data],
    });
    return data;
  };
}

export function patch(organizationId, body) {
  return async function (dispatch) {
    const { data } = await axios.patch(
      `/api/organizations/${organizationId}`,
      body
    );
    dispatch({
      type: types.MERGE_ORGANIZATIONS,
      items: [data.data],
    });
    return data;
  };
}
