import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import { actions } from "store/reducers";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch)
}